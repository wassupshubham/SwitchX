(function() {
  // Prevent multiple injections
  if (window.SwitchXSupportWidget) return;
  window.SwitchXSupportWidget = true;

  // Injected CSS Styles
  const style = document.createElement('style');
  style.textContent = `
    .switchx-widget-btn {
      position: fixed;
      bottom: 24px;
      right: 24px;
      width: 52px;
      height: 52px;
      border-radius: 50%;
      background: #09090b;
      border: 1px solid #27272a;
      box-shadow: 0 8px 32px rgba(0, 0, 0, 0.4), 0 0 15px rgba(99, 102, 241, 0.25);
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      z-index: 999999;
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .switchx-widget-btn:hover {
      transform: scale(1.08) rotate(5deg);
      border-color: #4f46e5;
    }
    .switchx-widget-btn svg {
      width: 20px;
      height: 20px;
      fill: none;
      stroke: #e4e4e7;
      stroke-width: 2;
    }
    
    .switchx-widget-window {
      position: fixed;
      bottom: 92px;
      right: 24px;
      width: 360px;
      height: 500px;
      border-radius: 20px;
      background: rgba(9, 9, 11, 0.85);
      backdrop-filter: blur(20px);
      border: 1px solid rgba(255, 255, 255, 0.08);
      box-shadow: 0 16px 48px rgba(0, 0, 0, 0.8), 0 0 40px rgba(99, 102, 241, 0.05);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      opacity: 0;
      transform: translateY(20px) scale(0.95);
      pointer-events: none;
      z-index: 999998;
      transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
      font-family: 'Outfit', sans-serif;
    }
    .switchx-widget-window.active {
      opacity: 1;
      transform: translateY(0) scale(1);
      pointer-events: auto;
    }
    
    .switchx-widget-header {
      padding: 16px;
      background: rgba(15, 15, 20, 0.6);
      border-b: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .switchx-widget-title {
      font-size: 11px;
      font-weight: 700;
      color: #fafafa;
      text-transform: uppercase;
      letter-spacing: 0.15em;
    }
    .switchx-widget-status {
      display: flex;
      align-items: center;
      gap: 6px;
      font-size: 8px;
      color: #a1a1aa;
      text-transform: uppercase;
      letter-spacing: 0.1em;
    }
    .switchx-widget-dot {
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: #10b981;
      animation: switchx-pulse 2s infinite;
    }
    
    .switchx-widget-chat {
      flex: 1;
      padding: 16px;
      overflow-y: auto;
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .switchx-msg {
      max-width: 80%;
      padding: 10px 14px;
      font-size: 12px;
      line-height: 1.5;
      border-radius: 12px;
    }
    .switchx-msg.user {
      background: rgba(255, 255, 255, 0.05);
      border: 1px solid rgba(255, 255, 255, 0.05);
      color: #f4f4f5;
      align-self: flex-end;
      border-bottom-right-radius: 2px;
    }
    .switchx-msg.bot {
      background: rgba(79, 70, 229, 0.1);
      border: 1px solid rgba(79, 70, 229, 0.2);
      color: #e4e4e7;
      align-self: flex-start;
      border-bottom-left-radius: 2px;
    }
    
    .switchx-widget-form {
      padding: 12px;
      background: rgba(0, 0, 0, 0.2);
      border-top: 1px solid rgba(255, 255, 255, 0.05);
      display: flex;
      gap: 8px;
    }
    .switchx-widget-input {
      flex: 1;
      background: #030303;
      border: 1px solid #1f1f23;
      border-radius: 10px;
      padding: 10px 14px;
      font-size: 12px;
      color: #fafafa;
      outline: none;
      transition: border-color 0.2s;
    }
    .switchx-widget-input:focus {
      border-color: #4f46e5;
    }
    .switchx-widget-submit {
      background: #fafafa;
      color: #09090b;
      border: none;
      border-radius: 10px;
      padding: 0 16px;
      font-size: 11px;
      font-weight: 700;
      text-transform: uppercase;
      letter-spacing: 0.1em;
      cursor: pointer;
      transition: background-color 0.2s;
    }
    .switchx-widget-submit:hover {
      background: #e4e4e7;
    }
    
    @keyframes switchx-pulse {
      0%, 100% { opacity: 0.6; transform: scale(1); }
      50% { opacity: 1; transform: scale(1.1); }
    }
  `;
  document.head.appendChild(style);

  // Injected HTML elements
  const btn = document.createElement('button');
  btn.className = 'switchx-widget-btn';
  btn.innerHTML = `<svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>`;

  const win = document.createElement('div');
  win.className = 'switchx-widget-window';
  win.innerHTML = `
    <div class="switchx-widget-header">
      <span class="switchx-widget-title">SwitchX Concierge</span>
      <div class="switchx-widget-status">
        <div class="switchx-widget-dot"></div>
        <span>Core Live</span>
      </div>
    </div>
    <div class="switchx-widget-chat" id="switchx-chat-viewport">
      <div class="switchx-msg bot">Hi there! How can I assist you with your project today?</div>
    </div>
    <form class="switchx-widget-form" id="switchx-chat-form">
      <input type="text" class="switchx-widget-input" placeholder="Type a message..." required autocomplete="off" />
      <button type="submit" class="switchx-widget-submit">Send</button>
    </form>
  `;

  document.body.appendChild(btn);
  document.body.appendChild(win);

  // Interaction handlers
  btn.addEventListener('click', () => {
    win.classList.toggle('active');
  });

  const chatForm = win.querySelector('#switchx-chat-form');
  const chatInput = win.querySelector('.switchx-widget-input');
  const viewport = win.querySelector('#switchx-chat-viewport');

  chatForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const query = chatInput.value.trim();
    if (!query) return;

    chatInput.value = '';

    // Append user message
    const userMsg = document.createElement('div');
    userMsg.className = 'switchx-msg user';
    userMsg.textContent = query;
    viewport.appendChild(userMsg);
    viewport.scrollTop = viewport.scrollHeight;

    // Append thinking bubble
    const thinkingMsg = document.createElement('div');
    thinkingMsg.className = 'switchx-msg bot thinking';
    thinkingMsg.textContent = 'Thinking...';
    viewport.appendChild(thinkingMsg);
    viewport.scrollTop = viewport.scrollHeight;

    try {
      // Resolve host url fallback (works offline or remote)
      const host = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
        ? ''
        : 'http://localhost:3001';
      
      const res = await fetch(`${host}/api/builder`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          prompt: query,
          history: [] // Stateless widget queries
        })
      });

      thinkingMsg.remove();

      if (res.ok) {
        const data = await res.json();
        const responseText = data.resultText || "I couldn't process that query.";
        
        const botMsg = document.createElement('div');
        botMsg.className = 'switchx-msg bot';
        botMsg.textContent = responseText;
        viewport.appendChild(botMsg);
      } else {
        const errMsg = document.createElement('div');
        errMsg.className = 'switchx-msg bot';
        errMsg.textContent = 'Failed to connect to SwitchX Core Server.';
        viewport.appendChild(errMsg);
      }
    } catch (err) {
      thinkingMsg.remove();
      const errMsg = document.createElement('div');
      errMsg.className = 'switchx-msg bot';
      errMsg.textContent = 'Error: SwitchX Core Server offline.';
      viewport.appendChild(errMsg);
      console.error(err);
    }
    viewport.scrollTop = viewport.scrollHeight;
  });
})();
