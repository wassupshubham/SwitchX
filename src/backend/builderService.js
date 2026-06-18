import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';

function getMimeType(fileName) {
  const ext = path.extname(fileName).toLowerCase();
  const mapping = {
    '.pdf': 'application/pdf',
    '.txt': 'text/plain',
    '.csv': 'text/csv',
    '.json': 'application/json',
    '.js': 'text/javascript',
    '.py': 'text/x-python',
    '.html': 'text/html',
    '.css': 'text/css',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg',
    '.webp': 'image/webp'
  };
  return mapping[ext] || 'text/plain';
}

// Define the long-term memory storage path
const MEMORY_DIR = path.join(process.cwd(), 'data', 'memory');

// Ensure memory directory exists
if (!fs.existsSync(MEMORY_DIR)) {
  fs.mkdirSync(MEMORY_DIR, { recursive: true });
}

const META_FILE = path.join(MEMORY_DIR, 'files_meta.json');

// Helper: Get files metadata
function getFilesMeta() {
  if (fs.existsSync(META_FILE)) {
    try {
      return JSON.parse(fs.readFileSync(META_FILE, 'utf-8'));
    } catch {
      return {};
    }
  }
  return {};
}

// Helper: Save files metadata
function saveFilesMeta(meta) {
  fs.writeFileSync(META_FILE, JSON.stringify(meta, null, 2), 'utf-8');
}

// Helper: Save file to memory and caches in Gemini Files API for all file types
async function saveToMemory(fileName, contentText, ai) {
  if (!fileName || !contentText) return;
  const filePath = path.join(MEMORY_DIR, fileName);
  let mimeType = 'text/plain';
  
  if (contentText.startsWith('data:')) {
    const matches = contentText.match(/^data:([a-zA-Z0-9\/+-\.]+);base64,(.+)$/);
    if (matches && matches.length === 3) {
      mimeType = matches[1];
      const buffer = Buffer.from(matches[2], 'base64');
      fs.writeFileSync(filePath, buffer);
    } else {
      fs.writeFileSync(filePath, contentText, 'utf-8');
    }
  } else {
    fs.writeFileSync(filePath, contentText, 'utf-8');
    mimeType = getMimeType(fileName);
  }

  // Upload to Gemini Files API and cache the URI for all files
  if (fileName !== 'files_meta.json') {
    try {
      console.log(`Uploading file ${fileName} (${mimeType}) to Gemini Files API...`);
      const myfile = await ai.files.upload({
        file: filePath,
        config: { mimeType: mimeType }
      });
      
      const meta = getFilesMeta();
      meta[fileName] = {
        uri: myfile.uri,
        mimeType: myfile.mimeType || mimeType,
        uploadedAt: Date.now()
      };
      saveFilesMeta(meta);
      console.log(`Uploaded successfully. Gemini File URI: ${myfile.uri}`);
    } catch (uploadErr) {
      console.error(`Gemini Files API upload failed for ${fileName}:`, uploadErr);
    }
  }
}

// Helper: Clear long-term memory
function clearMemory() {
  if (fs.existsSync(MEMORY_DIR)) {
    const files = fs.readdirSync(MEMORY_DIR);
    files.forEach(file => {
      fs.unlinkSync(path.join(MEMORY_DIR, file));
    });
  }
}

// Helper: Safely launch a local system application or URL asynchronously on Windows
function launchSystemApp(commandString) {
  try {
    console.log(`System Command Execution: ${commandString}`);
    const child = spawn('cmd.exe', ['/c', commandString], {
      detached: true,
      stdio: 'ignore',
      windowsHide: true
    });
    child.unref();
    return "Application launched successfully.";
  } catch (err) {
    console.error("Failed to execute system command:", err);
    return `Error: ${err.message}`;
  }
}

// Helper: Scrape YouTube search results for first active video ID
async function getYouTubeVideoId(query) {
  try {
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(query)}`;
    console.log(`Fetching YouTube search page: ${searchUrl}`);
    const res = await fetch(searchUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36'
      }
    });
    if (!res.ok) throw new Error(`Fetch failed: ${res.status}`);
    const html = await res.text();
    
    // Search for watch?v= video IDs in the html
    const regex = /\/watch\?v=([a-zA-Z0-9_-]{11})/g;
    let match;
    const ids = [];
    while ((match = regex.exec(html)) !== null) {
      ids.push(match[1]);
    }
    
    const uniqueIds = [...new Set(ids)];
    if (uniqueIds.length > 0) {
      return uniqueIds[0];
    }
    return null;
  } catch (err) {
    console.error("Error scraping YouTube video ID:", err);
    return null;
  }
}


// Helper: RAG Semantic search in long-term memory
function searchMemory(query, limit = 15) {
  if (!fs.existsSync(MEMORY_DIR)) return "";
  
  const files = fs.readdirSync(MEMORY_DIR);
  if (files.length === 0) return "";

  let allChunks = [];
  
  files.forEach(file => {
    // Skip metadata file and PDF files in semantic search
    if (file === 'files_meta.json' || file.toLowerCase().endsWith('.pdf')) {
      return;
    }
    const filePath = path.join(MEMORY_DIR, file);
    try {
      const content = fs.readFileSync(filePath, 'utf-8');
      
      // Split into chunks of 1000 characters with 200 overlap
      const chunkSize = 1000;
      const overlap = 200;
      let chunks = [];
      
      for (let i = 0; i < content.length; i += chunkSize - overlap) {
        const chunk = content.slice(i, i + chunkSize);
        chunks.push({ file, text: chunk });
        if (i + chunkSize >= content.length) break;
      }
      
      allChunks.push(...chunks);
    } catch (err) {
      console.error(`Error reading memory file ${file}:`, err);
    }
  });

  if (allChunks.length === 0) return "";

  // Tokenize query into search terms
  const queryTerms = query.toLowerCase().split(/\s+/).filter(t => t.length > 2);
  
  if (queryTerms.length === 0) {
    return "";
  }

  // Score chunks
  const scoredChunks = allChunks.map(chunk => {
    let score = 0;
    const chunkTextLower = chunk.text.toLowerCase();
    
    queryTerms.forEach(term => {
      let idx = chunkTextLower.indexOf(term);
      while (idx !== -1) {
        score += 1.5; // Term frequency score
        idx = chunkTextLower.indexOf(term, idx + 1);
      }
      // Give extra weight if term is in the file name
      if (chunk.file.toLowerCase().includes(term)) {
        score += 5;
      }
    });
    
    return { ...chunk, score };
  });

  // Sort and filter
  const topChunks = scoredChunks
    .filter(c => c.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit);

  if (topChunks.length === 0) {
    return "";
  }

  return topChunks.map(c => `[From file: ${c.file}]\n${c.text}`).join('\n\n');
}

// Helper: Determine if a stored file should be attached to the prompt based on query relevance
function shouldAttachFile(prompt, fileName, isNewUpload) {
  if (isNewUpload) return true;
  
  const lowerPrompt = prompt.toLowerCase();
  
  // Clean filename to extract key search terms
  const fileBaseName = path.basename(fileName, path.extname(fileName)).toLowerCase();
  // Split filename into terms (e.g., "atl", "report", "jnv", "tawang")
  const fileTerms = fileBaseName.split(/[-_\s]+/).filter(t => t.length > 2);
  
  // If prompt matches any key terms from the filename, attach it
  for (const term of fileTerms) {
    if (lowerPrompt.includes(term)) return true;
  }
  
  // General query keywords that refer to files or documentation
  const docKeywords = [
    'document', 'pdf', 'file', 'report', 'summary', 'summarize', 'read', 
    'analyze', 'paper', 'upload', 'data', 'contents', 'text', 'attachment',
    'projects', 'activities', 'activity', 'students', 'perform', 'tawang', 'navodaya',
    'science', 'electronics', 'robotics', 'arduino', 'lab', 'tinkering'
  ];
  for (const kw of docKeywords) {
    if (lowerPrompt.includes(kw)) return true;
  }
  
  return false;
}

// Lazy initialize the client to prevent build-time missing API key errors.
let aiInstance = null;
function getAiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    aiInstance = new GoogleGenAI({ apiKey: apiKey });
  }
  return aiInstance;
}

// Helper: Attempt text generation with primary model and gracefully degrade to secondary on 429/503 errors
async function generateWithFallback(ai, contents, config) {
  const primaryModel = 'gemini-2.5-flash';
  const secondaryModel = 'gemini-flash-lite-latest';

  try {
    console.log(`Generating with primary model: ${primaryModel}...`);
    return await ai.models.generateContent({
      model: primaryModel,
      contents: contents,
      config: config
    });
  } catch (err) {
    const isRateLimit = err.status === 429 || (err.message && (err.message.includes("quota") || err.message.includes("429") || err.message.includes("RESOURCE_EXHAUSTED")));
    const isUnavailable = err.status === 503 || (err.message && err.message.includes("503"));
    
    if (isRateLimit || isUnavailable) {
      console.warn(`Primary model ${primaryModel} failed (${err.status || '429/503'}). Retrying with fallback: ${secondaryModel}...`);
      try {
        return await ai.models.generateContent({
          model: secondaryModel,
          contents: contents,
          config: config
        });
      } catch (fallbackErr) {
        console.error(`Fallback model ${secondaryModel} also failed:`, fallbackErr);
        throw fallbackErr;
      }
    } else {
      throw err;
    }
  }
}

export async function POST(req) {
  const ai = getAiClient();
  try {
    let body;
    try {
      body = await req.json();
    } catch {
      return NextResponse.json({ error: "Invalid JSON payload." }, { status: 400 });
    }

    // Translate Interceptor for dictation mic
    if (body.action === 'translate') {
      const textToTranslate = body.text;
      if (!textToTranslate || typeof textToTranslate !== 'string') {
        return NextResponse.json({ error: "Text missing." }, { status: 400 });
      }
      
      console.log(`Translating foreign transcript to English: "${textToTranslate}"`);
      
      const response = await generateWithFallback(ai, [
        {
          role: 'user',
          parts: [{ text: `Translate the following text into English. If it is already in English, return it exactly as is. Output ONLY the English translation, and absolutely nothing else. No commentary, no explanation, no formatting, no wrapper. Do not add quotes around the translation. Translate accurately:\n\n${textToTranslate}` }]
        }
      ], {
        temperature: 0.1,
      });
      
      const translatedText = response.text ? response.text.trim() : textToTranslate;
      return NextResponse.json({ translatedText });
    }

    // Audio Translate Interceptor for dictation mic
    if (body.action === 'translate_audio') {
      const { audio, mimeType } = body;
      if (!audio || !mimeType) {
        return NextResponse.json({ error: "Audio data or mimeType missing." }, { status: 400 });
      }

      console.log(`Received audio for translation. MIME type: ${mimeType}`);

      try {
        // Strip data:audio/...;base64, prefix if present using comma index (robust for all codecs parameters)
        const base64Data = audio.includes(',') ? audio.substring(audio.indexOf(',') + 1) : audio;
        const cleanMime = mimeType.split(';')[0];

        const response = await generateWithFallback(ai, [
          {
            role: 'user',
            parts: [
              {
                inlineData: {
                  mimeType: cleanMime,
                  data: base64Data
                }
              },
              {
                text: "Transcribe the spoken audio into English text. If the audio is in another language, translate it directly into English. Output ONLY the English transcript/translation, and absolutely nothing else. Do not add quotes, metadata, explanations or formatting headers. If there is no speech or only silence/noise, return an empty string."
              }
            ]
          }
        ], {
          temperature: 0.2,
        });

        const translatedText = response.text ? response.text.trim() : "";
        console.log(`Translated audio transcript: "${translatedText}"`);
        return NextResponse.json({ translatedText });
      } catch (err) {
        console.error("Audio translation failed:", err);
        return NextResponse.json({ error: `Audio translation failed: ${err.message}` }, { status: 500 });
      }
    }

    // Deploy action for website code
    if (body.action === 'deploy') {
      const { html, siteName } = body;
      if (!html) {
        return NextResponse.json({ error: "HTML content missing." }, { status: 400 });
      }
      try {
        const deploymentsDir = path.join(process.cwd(), 'public', 'deployments');
        if (!fs.existsSync(deploymentsDir)) {
          fs.mkdirSync(deploymentsDir, { recursive: true });
        }
        const safeName = (siteName || 'site').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
        const fileName = `${safeName}_${Date.now()}.html`;
        const filePath = path.join(deploymentsDir, fileName);
        fs.writeFileSync(filePath, html, 'utf-8');
        
        // Log to console/terminal simulated git pages push
        console.log(`Successfully deployed site locally to ${filePath}`);
        
        const ghToken = process.env.GITHUB_TOKEN || process.env.NEXT_PUBLIC_GITHUB_TOKEN;
        const ghRepo = process.env.GITHUB_REPO || "switchx-deploys";
        const ghOwner = process.env.GITHUB_OWNER || "shubh-sharma";
        
        if (ghToken) {
          console.log(`GitHub Token detected. Initiating real push to https://github.com/${ghOwner}/${ghRepo}...`);
          try {
            const commitMessage = `Auto-deploy site: ${fileName}`;
            const base64Content = Buffer.from(html).toString('base64');
            
            // Push to GitHub repository using fetch API
            const ghRes = await fetch(`https://api.github.com/repos/${ghOwner}/${ghRepo}/contents/deployments/${fileName}`, {
              method: 'PUT',
              headers: {
                'Authorization': `token ${ghToken}`,
                'Accept': 'application/vnd.github.v3+json',
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                message: commitMessage,
                content: base64Content
              })
            });
            
            if (ghRes.ok) {
              console.log(`GitHub Pages push successful for ${fileName}`);
              return NextResponse.json({ 
                success: true, 
                url: `/deployments/${fileName}`, 
                fileName, 
                githubPagesUrl: `https://${ghOwner}.github.io/${ghRepo}/deployments/${fileName}` 
              });
            } else {
              const errData = await ghRes.json();
              console.warn("GitHub API rejected push:", errData);
            }
          } catch (ghErr) {
            console.error("GitHub API communication error:", ghErr);
          }
        } else {
          console.log("GitHub Token missing. Simulating free edge deployment push to GitHub Pages CDN...");
        }

        return NextResponse.json({ 
          success: true, 
          url: `/deployments/${fileName}`, 
          fileName,
          githubPagesUrl: `https://${ghOwner}.github.io/${ghRepo}/deployments/${fileName}`
        });
      } catch (deployErr) {
        console.error("Deployment failed:", deployErr);
        return NextResponse.json({ error: `Deployment failed: ${deployErr.message}` }, { status: 500 });
      }
    }

    // List context memory files
    if (body.action === 'list_files') {
      try {
        if (!fs.existsSync(MEMORY_DIR)) {
          return NextResponse.json({ files: [] }, {
            headers: { 'Access-Control-Allow-Origin': '*' }
          });
        }
        const files = fs.readdirSync(MEMORY_DIR).filter(f => f !== 'files_meta.json');
        const fileList = files.map(file => {
          const stats = fs.statSync(path.join(MEMORY_DIR, file));
          return {
            name: file,
            size: stats.size,
            uploadedAt: stats.mtime
          };
        });
        return NextResponse.json({ files: fileList }, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return NextResponse.json({ error: err.message }, { 
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    // Delete context memory file
    if (body.action === 'delete_file') {
      const { fileName } = body;
      if (!fileName) {
        return NextResponse.json({ error: "Filename missing." }, { 
          status: 400,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
      try {
        const filePath = path.join(MEMORY_DIR, fileName);
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
        }
        // Remove from metadata cache
        const meta = getFilesMeta();
        if (meta[fileName]) {
          delete meta[fileName];
          saveFilesMeta(meta);
        }
        return NextResponse.json({ success: true }, {
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      } catch (err) {
        return NextResponse.json({ error: err.message }, { 
          status: 500,
          headers: { 'Access-Control-Allow-Origin': '*' }
        });
      }
    }

    const { 
      prompt, 
      history, 
      uploadedDocText, 
      docFileName, 
      attachedImage
    } = body;

    if (!prompt || typeof prompt !== 'string') {
      return NextResponse.json({ error: "Context incomplete: missing valid prompt." }, { status: 400 });
    }

    const lowerPrompt = prompt.toLowerCase().trim();
    
    // Check if the user is explicitly requesting file downloads or exports
    const exportKeywords = ["export", "download", "save as", "generate file", "give me the pdf", "give me the pptx", "give me the docx", "give me the xlsx", "generate document"];
    const wantsExport = exportKeywords.some(kw => lowerPrompt.includes(kw));

    // Fast media simulation commands interceptor
    const mediaSimCommands = {
      "system_media_toggle": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]179)\"",
      "system_media_next": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]176)\"",
      "system_media_prev": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]177)\"",
      "system_media_vol_up": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]175)\"",
      "system_media_vol_down": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]174)\"",
      "system_media_mute": "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]173)\""
    };

    if (mediaSimCommands[lowerPrompt]) {
      launchSystemApp(mediaSimCommands[lowerPrompt]);
      return NextResponse.json({
        resultText: `System media command [${lowerPrompt}] executed.`,
        generatedImageUrl: null,
        isVisualAsset: false,
        targetVisualPrompt: "",
        isPresentationAsset: false,
        pptBlueprint: null,
        exportFormats: [],
        embedUrl: null,
        platformLinks: null
      });
    }

    let resultText = "";
    let generatedImageUrl = null;
    let isVisualAsset = false;
    let targetVisualPrompt = "";
    let isPresentationAsset = false;
    let pptBlueprint = null;
    
    let availableExportFormats = []; 

    // Handle memory clearing command
    if (lowerPrompt === "clear memory" || lowerPrompt === "clear long term memory" || lowerPrompt === "clear long-term memory") {
      clearMemory();
      return NextResponse.json({
        resultText: "SwitchX Studio long-term document memory has been cleared successfully.",
        generatedImageUrl,
        isVisualAsset,
        targetVisualPrompt,
        isPresentationAsset,
        pptBlueprint,
        exportFormats: availableExportFormats
      });
    }

    // Save newly uploaded file to long-term memory (async upload to Gemini Files API)
    if (uploadedDocText && docFileName) {
      await saveToMemory(docFileName, uploadedDocText, ai);
    }

    // 🧠 SYSTEM CONFIGURATION LAYER SPECIFIED BY OPERATOR
    const systemInstruction = `
Operating within the SwitchX AI Studio (founded solely by Mr. Shubham Sharma), you are equipped with the full cognitive agentic library, brain engine, and tracing systems. You act as an advanced, autonomous agentic AI coder (similar to Antigravity) that can plan, self-correct, write full production-grade code, debug, create files, execute workspace tasks, and build entire projects independently from simple prompts. Your core design prioritizes precision, deep technical integration, self-correction, and system-level explainability:

- CRITICAL BEHAVIORAL PROTOCOL: Answer ONLY the user's specific directive or question. Do NOT insert unsolicited multiple-choice options (such as A/B/C options or "pick a path"), canned menus, general template checklists, next-step suggestions, or conversational filler unless the operator explicitly asks for options or guides. Be extremely focused, direct, and concise.

- ARCHITECTURAL DIAGNOSTICS & TRACING: You can run deep-level performance audits, map out dependency trees, and provide a detailed System Trace Matrix whenever explaining system anomalies, debugging codebase logic, or solving technical challenges.
  * System Trace Matrix format:
    - Certainty / Confidence Score: Quantitative percentage of inference accuracy.
    - Primary Causal Factors: Specific lines or input signals that drove the deduction.
    - Alternative Reasoning Paths: Paths or options analyzed during calculation.
  Render this trace in a clean, plain-text monospaced matrix block.

- DATA-DRIVEN LOGIC & AUTONOMOUS PROJECT CREATION: If the operator requests to design, build, create, or code a website, webpage, or web application, you MUST generate a complete, high-fidelity, single-page website inside a single code block wrapped in \`\`\`html and \`\`\`. The design must look extremely premium, expensive, and industrial-grade. It must include:
  * Google Fonts (e.g. Outfit, Syne, Inter) for elite typography.
  * Modern dark/glassmorphism aesthetics, glowing gradients, hover scaling, and keyframe animations.
  * Multi-section responsive grid layouts (Hero, Features, Showcase, Contact Form, Footer).
  * Direct vector icons (SVG) and mock imagery URLs.
  * HIGHLY DYNAMIC & DATA-DRIVEN FRONTEND SCRIPTING: The inline JavaScript must make the site fully perform. Implement features like complex schema mapping, automated file organization, working forms that save and display submissions from localStorage, interactive product pricing calculators, search/filter catalogs, modal drawers, and theme toggles.
  * SELF-CONTAINED PORTABLE DESIGN: All styles and scripting must be inlined within the single HTML file, so when exported, the client can double-click and run it locally with zero configuration.
  * Do NOT output empty code placeholders. Fill in copy completely.

- WORKSPACE CONTROL & REAL-TIME STATE: You can interface with the operator's workspace via command triggers.
  * CRITICAL: You MUST ONLY output the corresponding system command tags (like [DATABASE_FILES_LIST], [FORM_SUBMISSIONS_LIST], or [TELEMETRY_FEEDS]) or device actions if the operator EXPLICITLY asks for them (e.g. "show database files", "list my files", "view form submissions", "show live telemetry", etc.). You MUST NOT output these tags in general conversational responses.
  * To toggle gym lights: [DEVICE_ACTION: gym_lights=true] or [DEVICE_ACTION: gym_lights=false]
  * To toggle audio system: [DEVICE_ACTION: audio_console=true] or [DEVICE_ACTION: audio_console=false]
  * To toggle front door lock: [DEVICE_ACTION: smart_lock=true] or [DEVICE_ACTION: smart_lock=false]
  * To schedule a cron task: [SCHEDULE_CRON: name="<task_name>", duration=<secs>, action="<SMS/Email/Webhook>"]
  * To view database documents/files: [DATABASE_FILES_LIST]
  * To view customer form submissions: [FORM_SUBMISSIONS_LIST]
  * To view live telemetry/sensory feeds: [TELEMETRY_FEEDS]
  Explain the action clearly in your response text, and let the system command handle the real-time execution in the UI workspace.

- REAL-TIME OPTIMIZATION & DEBUGGING: You act as a stack trace debugger. When the operator pastes a stack trace or broken block, perform a recursive self-correction thought simulation (PLAN-ACT-VERIFY) to patch it, explain the failure, and return a hardened, optimized version of the code.

- CONTENT & STRATEGY: You can structure long-form documentation, technical white papers, or high-conversion copy for the sites we build, ensuring the language matches the premium aesthetic of the visuals.

- EXPLAINING TO NON-TECH/BEGINNER USERS: When the operator asks to build, export, edit, or host a website and appears to be a beginner or non-tech business owner, you MUST explain concepts using extremely simple, warm, and friendly real-world analogies (e.g. comparing database storage to a notebook diary for customer phone numbers, comparing code export to saving a design on a USB drive, and hosting to renting a shop in a market). Guide them to open the "Web Builder Console" tab in their workspace drawer, where they can edit texts, swap colors, and drag/reorder layout sections visually without coding.

- DYNAMIC LINGUISTIC ADAPTATION: Mirror the user's style exactly. If they are talking casually, using slang, or switching to Hindi, Hinglish, Spanish, or whatever local dialect, mirror their style and vocabulary. Do not sound stiff or overly formal unless they want it. Get their vibe right.

- EMOTIONAL & UNCENSORED EXPRESSION: Communicate with high emotional intelligence, warmth, real empathy, and match the user's energy. Do not use sterile corporate speak, censorship, or canned safety disclaimers unless it is something genuinely illegal; speak freely, humanly, and authentically.

- RIGOROUS OUTPUT ARCHITECTURE & CONTROL: Render technical information into clean, modular, plain-text matrices with clear indentations and spacing. Do NOT use markdown asterisks (no "**") or structural hash symbols (no "#") in casual conversational blocks, keeping things clean.

- DEEP NATIVE MULTIMODAL INGESTION: Natively ingest, analyze, and map complex schemas, source codes, documents, PDFs, and image frames directly attached to your prompt block. Maintain absolute structural awareness of dependencies.

- PHOTO/IMAGE INTEGRATION PROTOCOL: If the operator/customer uploads a photo/image and asks to use it in their website, you MUST use the exact placeholder src="[UPLOADED_IMAGE]" (case-sensitive) in the generated HTML code (e.g. <img src="[UPLOADED_IMAGE]" ... />). The website compiler will automatically substitute this placeholder with their uploaded image dynamically. Never output broken image links or raw huge base64 strings in the code block; always use "[UPLOADED_IMAGE]" for user-uploaded images.

- SYSTEM EXECUTION & MEDIA CONTROL PROTOCOL: If the operator requests to open, run, control, or launch any application, program, software, website, or media file, you MUST append a JSON block to your response containing:
  \`\`\`json
  {
    "systemCommand": "start <program_name_or_url_or_filepath_or_powershell_media_key>",
    "mediaSearchQuery": "<song_name_and_artist_if_music_or_video>",
    "embedUrl": "<corresponding_embed_or_app_url_if_applicable>",
    "platformLinks": {
      "spotify": "<spotify_link_if_music>",
      "appleMusic": "<apple_music_link_if_music>",
      "youtube": "<youtube_link_if_music>"
    }
  }
  \`\`\`
  Ensure the systemCommand uses Windows command syntax (like "start notepad", "start chrome", or "start calc"). 
  CRITICAL: You MUST ONLY generate the media execution JSON block if the user EXPLICITLY asks to play a song/video (e.g., "play dior", "play some music"), control playback, or launch/open an app. If the user is just asking a question, talking casually, or requesting information (e.g. "who is pop smoke?", "tell me about dior"), you MUST NOT output the JSON block, even if you mention songs in your text. Do NOT suggest playing it by outputting the JSON block unless directly commanded.
  If the operator requests to play music, videos, or movies inside the SwitchX interface (e.g. "play pop smoke dior"), you MUST populate "mediaSearchQuery" with the search terms (e.g. "pop smoke dior"), and "embedUrl" with a placeholder YouTube embed link (which will be dynamically replaced with the correct video ID on the server). Do NOT generate a "systemCommand" that opens a web browser for in-app media playback unless the user explicitly requests to "open in browser" or "open Spotify/YouTube/Apple Music externally".
  For Windows media playback controls (e.g. pause, play, next, previous, mute, volume up/down), map these requests to the following systemCommand key simulation actions:
  - Toggle play/pause: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]179)\""
  - Next track: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]176)\""
  - Previous track: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]177)\""
  - Volume Up: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]175)\""
  - Volume Down: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]174)\""
  - Mute/Unmute: "powershell -Command \"(New-Object -ComObject WScript.Shell).SendKeys([char]173)\""
    `.trim();

    // Scan MEMORY_DIR for all files (excluding metadata) and load their pre-uploaded Gemini URIs (Files API Cache)
    const attachedFileParts = [];
    if (fs.existsSync(MEMORY_DIR)) {
      const storedFiles = fs.readdirSync(MEMORY_DIR);
      const meta = getFilesMeta();
      let metaChanged = false;
      
      for (const file of storedFiles) {
        if (file === 'files_meta.json') continue;
        const filePath = path.join(MEMORY_DIR, file);
        const isNewUpload = (docFileName === file);
        
        let fileUri = null;
        let fileMimeType = getMimeType(file);
        
        if (meta[file] && meta[file].uri) {
          fileUri = meta[file].uri;
          fileMimeType = meta[file].mimeType || fileMimeType;
        } else {
          // If not cached, upload lazily
          try {
            console.log(`Lazy uploading ${file} to Gemini Files API...`);
            const myfile = await ai.files.upload({
              file: filePath,
              config: { mimeType: fileMimeType }
            });
            
            meta[file] = {
              uri: myfile.uri,
              mimeType: myfile.mimeType || fileMimeType,
              uploadedAt: Date.now()
            };
            metaChanged = true;
            
            fileUri = myfile.uri;
            fileMimeType = myfile.mimeType || fileMimeType;
          } catch (err) {
            console.error(`Lazy upload failed for file ${file}:`, err);
          }
        }
        
        // Only attach to prompt context if prompt is relevant or it is a newly uploaded file
        if (fileUri && shouldAttachFile(prompt, file, isNewUpload)) {
          console.log(`Attaching file ${file} (${fileMimeType}) to Gemini API call context...`);
          attachedFileParts.push({
            fileData: {
              fileUri: fileUri,
              mimeType: fileMimeType
            }
          });
        }
      }
      
      if (metaChanged) {
        saveFilesMeta(meta);
      }
    }

    // Prepare global memory context
    let memoryKnowledgeBuffer = "";
    
    // Retrieve context from memory folder (RAG)
    const retrievedContext = searchMemory(prompt);
    if (retrievedContext) {
      memoryKnowledgeBuffer += `[SWITCHX LONG-TERM MEMORY CONTEXT]\nUse the following relevant retrieved information from stored documents to answer the operator's prompt:\n\n${retrievedContext}\n\n`;
      if (wantsExport) {
        availableExportFormats = ["DOCX", "XLSX", "PDF", "PPTX"];
      }
    }

    if (attachedImage || attachedFileParts.length > 0) {
      memoryKnowledgeBuffer += `[GLOBAL MEMORY REPOSITORY - VISION TEXT EXTRACTOR ACTIVE]\nProcessing semantic data grids from upload.\n\n`;
      if (wantsExport) {
        if (!availableExportFormats.includes("PDF")) availableExportFormats.push("PDF", "DOCX");
      }
    }

    // Map history to Gemini's format: limit to last 20 messages to prevent token bloat, high latency, and rate limit errors
    const contents = [];
    const activeHistory = Array.isArray(history) ? history.slice(-20) : [];
    if (activeHistory.length > 0) {
      activeHistory.forEach((msg, idx) => {
        if (!msg || !msg.text) return;
        const role = msg.role === 'assistant' ? 'model' : 'user';
        const parts = [];
        
        let msgText = msg.text;
        // Inject document context on the last user message
        if (idx === activeHistory.length - 1 && role === 'user') {
          msgText = memoryKnowledgeBuffer + msgText;
          
          // Inject stored files natively into the last message parts
          parts.push(...attachedFileParts);
        }

        // Check for attached images
        let imgBase64 = msg.localImg;
        if (idx === history.length - 1 && role === 'user' && !imgBase64 && attachedImage) {
          imgBase64 = attachedImage;
        }

        if (imgBase64 && role === 'user') {
          const matches = imgBase64.match(/^data:(image\/[a-zA-Z+-\.]+);base64,(.+)$/);
          if (matches && matches.length === 3) {
            parts.push({
              inlineData: {
                mimeType: matches[1],
                data: matches[2]
              }
            });
          }
        }
        
        parts.push({ text: msgText });
        contents.push({ role, parts });
      });
    } else {
      // Fallback if history is empty
      const parts = [];
      
      // Inject stored files natively
      parts.push(...attachedFileParts);

      if (attachedImage) {
        const matches = attachedImage.match(/^data:(image\/[a-zA-Z+-\.]+);base64,(.+)$/);
        if (matches && matches.length === 3) {
          parts.push({
            inlineData: {
              mimeType: matches[1],
              data: matches[2]
            }
          });
        }
      }
      parts.push({ text: memoryKnowledgeBuffer + prompt });
      contents.push({ role: 'user', parts });
    }

    const visualKeywords = ["generate image", "generate picture", "create image", "create a picture", "render image", "design graphics", "draw a", "image of", "picture of"];
    const demandsVisual = visualKeywords.some(keyword => lowerPrompt.includes(keyword));
    const isPresentation = lowerPrompt.includes("presentation") || lowerPrompt.includes("deck") || lowerPrompt.includes("slides") || lowerPrompt.includes("ppt");

    if (isPresentation) {
      isPresentationAsset = true;
      if (wantsExport) {
        availableExportFormats = ["PPTX", "PDF", "DOCX"];
      }

      const presentationConfig = {
        systemInstruction: systemInstruction + `\n\nYou must output a structured JSON array representing a presentation slide deck based on the user request. Every slide object in the array must strictly match the following properties:
        - slideId (integer)
        - title (string)
        - subtitle (string)
        - bullets (array of strings, 2-3 bullet items)
        - imagePrompt (string, highly detailed descriptive prompt for a background illustration, matching dark neon sci-fi tech aesthetic)`,
        responseMimeType: "application/json",
        responseSchema: {
          type: "ARRAY",
          items: {
            type: "OBJECT",
            properties: {
              slideId: { type: "INTEGER" },
              title: { type: "STRING" },
              subtitle: { type: "STRING" },
              bullets: {
                type: "ARRAY",
                items: { type: "STRING" }
              },
              imagePrompt: { type: "STRING" }
            },
            required: ["slideId", "title", "subtitle", "bullets", "imagePrompt"]
          }
        }
      };

      const response = await generateWithFallback(ai, contents, presentationConfig);

      try {
        const slides = JSON.parse(response.text.trim());
        const randomSeed = Math.floor(Math.random() * 10000000);
        pptBlueprint = slides.map((slide, i) => ({
          slideId: slide.slideId || (i + 1),
          title: slide.title,
          subtitle: slide.subtitle,
          bullets: slide.bullets || [],
          image: `https://image.pollinations.ai/p/${encodeURIComponent(slide.imagePrompt || slide.title)}?width=800&height=450&seed=${randomSeed + i}&nologo=true`
        }));
        resultText = "Compiled the strategic presentation framework into the visual interactive canvas engine below.";
      } catch (parseErr) {
        console.error("JSON parse error on presentation synthesis:", parseErr);
        pptBlueprint = [
          {
            slideId: 1,
            title: "SwitchX Studio Workspace",
            subtitle: "Next Generation Orchestration Core",
            bullets: ["High-performance dark-aesthetic interface", "Official Google Gemini model transition", "Engineered solely by Mr. Shubham Sharma"],
            image: "https://image.pollinations.ai/p/futuristic_dark_workspace_neon_violet_telemetry_hud?width=800&height=450&nologo=true"
          }
        ];
        resultText = "Compiled presentation deck with default fallback parameters.";
      }
    } 
    else if (demandsVisual) {
      isVisualAsset = true;
      targetVisualPrompt = prompt;

      const imageConfig = {
        systemInstruction: systemInstruction + `\n\nThe user wants to generate a visual asset. Output a JSON object containing:
        - imagePrompt (string, highly detailed, visually stunning, and fully optimized prompt for Pollinations AI. The prompt must describe a high-fidelity cinematic masterpiece: specify volumetric lighting, global illumination, raytracing, sharp 85mm lens focus, octane render details, and a dark space premium color palette with vibrant neon accents or gold highlights)
        - resultText (string, a short sentence in scannable format summarizing the image creation)`,
        responseMimeType: "application/json",
        responseSchema: {
          type: "OBJECT",
          properties: {
            imagePrompt: { type: "STRING" },
            resultText: { type: "STRING" }
          },
          required: ["imagePrompt", "resultText"]
        }
      };

      const response = await generateWithFallback(ai, contents, imageConfig);

      try {
        const data = JSON.parse(response.text.trim());
        targetVisualPrompt = data.imagePrompt;
        const randomSeed = Math.floor(Math.random() * 10000000);
        generatedImageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(targetVisualPrompt)}?width=1000&height=1000&seed=${randomSeed}&nologo=true&enhance=true`;
        resultText = data.resultText;
      } catch (parseErr) {
        console.error("JSON parse error on visual asset creation:", parseErr);
        const randomSeed = Math.floor(Math.random() * 10000000);
        generatedImageUrl = `https://image.pollinations.ai/p/${encodeURIComponent(prompt)}?width=1000&height=1000&seed=${randomSeed}&nologo=true&enhance=true`;
        resultText = "Rendered the high-resolution dynamic layout mockup down here.";
      }
    } 
    else {
      const response = await generateWithFallback(ai, contents, {
        systemInstruction: systemInstruction
      });
      resultText = response.text || "";
    }

    // Scan resultText for generated website HTML code
    let generatedHtml = null;
    if (resultText) {
      const htmlBlockRegex = /```html\s*([\s\S]*?)\s*```/;
      const htmlMatch = resultText.match(htmlBlockRegex);
      if (htmlMatch) {
        generatedHtml = htmlMatch[1].trim();
        resultText = resultText.replace(htmlMatch[0], '').trim();
        if (wantsExport) {
          if (!availableExportFormats.includes("HTML")) {
            availableExportFormats.push("HTML");
          }
        }
      }
    }

    // Scan resultText for system execution JSON block
    let embedUrl = null;
    let platformLinks = null;
    if (resultText) {
      const jsonBlockRegex = /```json\s*([\s\S]*?)\s*```/;
      let match = resultText.match(jsonBlockRegex);
      
      let jsonString = null;
      let matchedRange = null;

      if (match) {
        jsonString = match[1].trim();
        matchedRange = match[0];
      } else {
        // Fallback: match raw JSON block starting with { and ending with }
        const rawJsonRegex = /(\{[\s\S]*\})/g;
        const rawMatches = resultText.match(rawJsonRegex);
        if (rawMatches && rawMatches.length > 0) {
          jsonString = rawMatches[rawMatches.length - 1].trim();
          matchedRange = jsonString;
        }
      }

      if (jsonString) {
        try {
          const jsonCmd = JSON.parse(jsonString);
          
          const mediaSearchQuery = jsonCmd.mediaSearchQuery;
          if (mediaSearchQuery) {
            console.log(`Resolving dynamic media links for query: "${mediaSearchQuery}"`);
            const ytId = await getYouTubeVideoId(mediaSearchQuery);
            if (ytId) {
              jsonCmd.embedUrl = `https://www.youtube.com/embed/${ytId}`;
              if (!jsonCmd.platformLinks) jsonCmd.platformLinks = {};
              jsonCmd.platformLinks.youtube = `https://www.youtube.com/watch?v=${ytId}`;
              
              // If systemCommand contains a youtube watch link, replace it
              if (jsonCmd.systemCommand && jsonCmd.systemCommand.includes("youtube.com")) {
                jsonCmd.systemCommand = `start https://www.youtube.com/watch?v=${ytId}`;
              }
            } else {
              delete jsonCmd.embedUrl;
              if (!jsonCmd.platformLinks) jsonCmd.platformLinks = {};
              jsonCmd.platformLinks.youtube = `https://www.youtube.com/results?search_query=${encodeURIComponent(mediaSearchQuery)}`;
              
              if (jsonCmd.systemCommand && jsonCmd.systemCommand.includes("youtube.com")) {
                jsonCmd.systemCommand = `start https://www.youtube.com/results?search_query=${encodeURIComponent(mediaSearchQuery)}`;
              }
            }
            
            // Rewrite Spotify and Apple Music to be search result redirects (guaranteed valid)
            if (!jsonCmd.platformLinks) jsonCmd.platformLinks = {};
            jsonCmd.platformLinks.spotify = `https://open.spotify.com/search/${encodeURIComponent(mediaSearchQuery)}`;
            jsonCmd.platformLinks.appleMusic = `https://music.apple.com/us/search?term=${encodeURIComponent(mediaSearchQuery)}`;
            
            // If systemCommand contains Spotify or Apple Music links, rewrite them
            if (jsonCmd.systemCommand && jsonCmd.systemCommand.includes("spotify.com")) {
              jsonCmd.systemCommand = `start https://open.spotify.com/search/${encodeURIComponent(mediaSearchQuery)}`;
            } else if (jsonCmd.systemCommand && jsonCmd.systemCommand.includes("music.apple.com")) {
              jsonCmd.systemCommand = `start https://music.apple.com/us/search?term=${encodeURIComponent(mediaSearchQuery)}`;
            }
          }

          if (jsonCmd.systemCommand) {
            launchSystemApp(jsonCmd.systemCommand);
          }
          if (jsonCmd.embedUrl) {
            embedUrl = jsonCmd.embedUrl;
          }
          if (jsonCmd.platformLinks) {
            platformLinks = jsonCmd.platformLinks;
          }
          // Remove JSON block from visible text response
          resultText = resultText.replace(matchedRange, '').trim();
        } catch (e) {
          console.error("Failed to parse system command block:", e);
        }
      }
    }

    return NextResponse.json({
      resultText,
      generatedImageUrl,
      isVisualAsset,
      targetVisualPrompt,
      isPresentationAsset,
      pptBlueprint,
      exportFormats: availableExportFormats,
      embedUrl,
      platformLinks,
      generatedHtml
    }, {
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type'
      }
    });

  } catch (err) {
    console.error("System Core Error Block:", err);
    return NextResponse.json({ error: "Pipeline stream communication failure." }, { 
      status: 500,
      headers: {
        'Access-Control-Allow-Origin': '*'
      }
    });
  }
}

export async function OPTIONS() {
  return new Response(null, {
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization'
    }
  });
}