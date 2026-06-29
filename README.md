# 🚀 SwitchX Studio

**Live Site:** [https://switch-x-rho.vercel.app/](https://switch-x-rho.vercel.app/)

SwitchX Studio is an autonomous, agentic AI website-builder workspace and code playground. Designed as a code-first development workspace, it enables developers and startups to transform natural language instructions directly into functional website templates, compile them instantly, and run them inside a sandboxed live preview emulator.

---

## 🌟 Key Features

*   **Vibe-to-Code AI Generation:** Seamlessly converts plain text prompts into premium, production-grade responsive Tailwind CSS layouts using Google Gemini.
*   **Live Sandbox Emulator:** Runs generated components inside an isolated browser `<iframe>` sandbox featuring viewport switching (Mobile, Tablet, Desktop) and real-time telemetry fluctuations.
*   **Dual Authentication & Persistence:** Support for logging in using either a username or a registered email. Remembers user sessions automatically across page reloads via local storage sync.
*   **Dynamic Visual Image Engine:** Auto-detects visual layout demands (widescreen wallpapers, portrait cards, hero banners), requests correct dimensions from the LLM, and fetches them on-the-fly from Pollinations AI.
*   **Integrated Monaco Editor:** Leverages the core VS Code editor engine directly in the browser, featuring outline search navigators, file hierarchies, and custom high-contrast themes.
*   **Developer Terminal & Logs:** View real-time compile reports, mock database grids, and cron task executors directly in the terminal interface.

---

## 📧 Critical Note: OTP Delivery & Spam Folders

SwitchX Studio uses a secure **Gmail SMTP Relay** to deliver verification codes for signups and account recovery without requiring a custom domain.

> [!WARNING]  
> **Check your Spam Folder!**  
> Because the sender address is a new automated account, verification codes may occasionally land in your **Spam or Junk folder** during your first tests.  
>   
> **How to fix this permanently:**  
> 1. Open your email client (like Gmail, Outlook, or Yahoo).  
> 2. Search your **Spam Folder** for emails from `switchxteam@gmail.com`.  
> 3. Open the verification email and click **"Report not spam"** or **"Move to Inbox"**.  
>  
> Once a few users do this, email filters will recognize the address as a safe sender, and future verification codes will arrive directly in your **Primary Inbox**.

---

## 🛠️ Installation & Local Setup

### 1. Clone & Install Dependencies
```bash
git clone https://github.com/wassupshubham/SwitchX.git
cd launchpad-studio
npm install
```

### 2. Environment Variables Configuration
Create a `.env.local` file in your root directory and add the following keys:
```env
# AI Models Keys
NEXT_PUBLIC_GEMINI_API_KEY=your_gemini_api_key
GROQ_API_KEY=your_groq_api_key

# Outbound SMTP Gateway (Gmail App Passwords)
GMAIL_USER=switchxteam@gmail.com
GMAIL_PASS=your_16_character_app_password
```
*(Note: Refer to Google Security settings to generate a 16-character App Password after turning on 2-Step Verification).*

### 3. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3001](http://localhost:3001) in your browser to see your local studio.

---

## 🧪 Tech Stack

*   **Frontend UI:** Next.js 14 (App Router), Tailwind CSS, Framer Motion
*   **IDE Engine:** Monaco Editor, Lucide React
*   **Backend Relays:** Node.js, Nodemailer SMTP, SQLite File Database
*   **Cognitive Layer:** Google Gemini API SDK

---
*Created and Engineered Solely by **Mr. Shubham Sharma**.*
