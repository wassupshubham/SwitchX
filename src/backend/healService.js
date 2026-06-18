import { NextResponse } from 'next/server';
import { GoogleGenAI } from '@google/genai';
import fs from 'fs';
import path from 'path';

// Helper: Lazy initialize the client
let aiInstance = null;
function getAiClient() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY || process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    aiInstance = new GoogleGenAI({ apiKey: apiKey });
  }
  return aiInstance;
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { filePath, errorDetails } = body;

    if (!filePath || !errorDetails) {
      return NextResponse.json({ error: "Missing filePath or errorDetails parameters." }, { status: 400 });
    }

    const workspaceRoot = process.cwd();
    const resolvedPath = path.resolve(workspaceRoot, filePath);

    // Security check: ensure path is within workspace root
    if (!resolvedPath.startsWith(workspaceRoot)) {
      return NextResponse.json({ error: "Unauthorized access: Path is outside workspace root." }, { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      return NextResponse.json({ error: `File not found: ${filePath}` }, { status: 404 });
    }

    console.log(`Auto-Healer: Attempting to repair file "${filePath}" due to error: ${errorDetails}`);

    const fileContent = fs.readFileSync(resolvedPath, 'utf-8');
    const ai = getAiClient();

    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: [
        {
          role: 'user',
          parts: [{
            text: `You are an automated code repair agent. We have detected a runtime or compile error in our Next.js/React project.

Target File: ${filePath}

Error details:
${errorDetails}

Below is the current source code of the file:
\`\`\`
${fileContent}
\`\`\`

Analyze the error and the source code. Fix the bug, resolve all syntax and runtime issues, and return ONLY the complete corrected source code of the file.

CRITICAL RULES:
- Do NOT wrap the code in markdown code blocks like \`\`\`javascript or \`\`\`.
- Output ONLY the clean, ready-to-write code of the file.
- Do NOT include any explanations, commentary, or warnings.
`
          }]
        }
      ],
      config: {
        temperature: 0.1
      }
    });

    let correctedCode = response.text ? response.text.trim() : "";

    // Clean up fallback if Gemini wrapped it in markdown code blocks despite rules
    if (correctedCode.startsWith("```")) {
      correctedCode = correctedCode.replace(/^```[a-zA-Z]*\n/, "").replace(/\n```$/, "");
    }

    if (!correctedCode) {
      throw new Error("Gemini returned empty code response.");
    }

    // Write repaired code back to the file system
    fs.writeFileSync(resolvedPath, correctedCode, 'utf-8');
    console.log(`Auto-Healer: Successfully repaired and wrote file "${filePath}".`);

    return NextResponse.json({ success: true, message: "Code repaired successfully." });
  } catch (err) {
    console.error("Auto-Healer API error:", err);
    return NextResponse.json({ error: `Self-healing failed: ${err.message}` }, { status: 500 });
  }
}
