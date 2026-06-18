"use client";

import React from 'react';
import { AlertTriangle, Loader2, RefreshCw } from 'lucide-react';

export default class ErrorHealer extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      hasError: false, 
      error: null, 
      healing: false, 
      healed: false,
      logs: [] 
    };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorHealer caught crash:", error, errorInfo);
    this.startAutoHealing(error);
  }

  addLog(message) {
    this.setState(prev => ({ logs: [...prev.logs, `> ${message}`] }));
  }

  startAutoHealing = async (error) => {
    this.setState({ healing: true, logs: [] });
    this.addLog("SwitchX Engine Fault Detected.");
    this.addLog(`Error Message: ${error.message || "Unknown Runtime Error"}`);

    let filePath = 'app/page.js'; // Default fallback

    if (error && error.stack) {
      // Parse webpack internal reference (e.g. webpack-internal:///./app/page.js)
      const webpackMatch = error.stack.match(/webpack-internal:\/\/\/\.\/([a-zA-Z0-9_\-\/]+\.js)/);
      // Parse direct paths (e.g. app/page.js)
      const relativeMatch = error.stack.match(/\b(app|components)\/[a-zA-Z0-9_\-\/]+\.js/);

      if (webpackMatch) {
        filePath = webpackMatch[1];
      } else if (relativeMatch) {
        filePath = relativeMatch[0];
      }
    }

    this.addLog(`Diagnostic scan localized source fault: "${filePath}"`);
    this.addLog("Packing context and error stack trace...");
    this.addLog("Contacting SwitchX Auto-Healing Engine (Gemini)...");

    try {
      const response = await fetch('/api/heal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          filePath,
          errorDetails: `${error.message}\n${error.stack}`
        })
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Server responded with error.");
      }

      this.addLog("Gemini successfully identified and corrected the code anomaly.");
      this.addLog("Overwriting file with repaired source code...");
      this.addLog("Rebuilding Next.js development server cache...");
      this.setState({ healed: true });

      // Wait 3 seconds for Hot Module Replacement / Next Dev compiler to rebuild the file
      setTimeout(() => {
        this.addLog("Rebuild complete. Restarting SwitchX workspace container...");
        window.location.reload();
      }, 3000);

    } catch (err) {
      this.addLog(`Auto-Healing aborted: ${err.message}`);
      this.addLog("Please review codebase logs or repair manually.");
      this.setState({ healing: false });
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen w-full bg-[#030303] text-zinc-300 flex flex-col items-center justify-center p-6 font-sans select-none relative overflow-hidden">
          {/* Animated Glowing backdrops */}
          <div className="absolute w-[500px] h-[500px] rounded-full bg-red-600/5 blur-[120px] top-1/4 left-1/4 animate-pulse z-0" />
          <div className="absolute w-[400px] h-[400px] rounded-full bg-orange-600/5 blur-[100px] bottom-1/4 right-1/4 animate-pulse z-0" />

          <div className="w-full max-w-lg bg-zinc-950/40 border border-zinc-900 rounded-2xl p-8 shadow-2xl backdrop-blur-xl z-10 space-y-6 text-center animate-fade-in">
            {/* Pulsating Warning Indicator */}
            <div className="flex justify-center">
              <div className="w-20 h-20 rounded-full border border-red-900/60 bg-red-950/10 flex items-center justify-center relative shadow-lg">
                <div className="absolute inset-0 rounded-full border border-red-800 scale-110 opacity-30 animate-ping" />
                <AlertTriangle size={32} className="text-red-500 animate-pulse" />
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-sm font-light uppercase tracking-[0.4em] text-red-500">Engine Fault</h2>
              <p className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">SwitchX Diagnostics Layer</p>
            </div>

            {/* Terminal Logs */}
            <div className="bg-[#050508]/80 border border-zinc-900 rounded-xl p-4 text-left font-mono text-[11px] leading-relaxed text-zinc-400 space-y-2 h-48 overflow-y-auto unique-scrollbar-matrix relative">
              <div className="absolute top-3 right-3 flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                <span className="text-[8px] font-mono text-red-400 uppercase tracking-wider">Diagnostic Mode</span>
              </div>
              <div className="space-y-1.5">
                {this.state.logs.map((log, idx) => (
                  <p key={idx} className={log.includes("anomaly") || log.includes("corrected") ? "text-emerald-400" : log.includes("aborted") ? "text-red-400" : ""}>
                    {log}
                  </p>
                ))}
                {this.state.healing && !this.state.healed && (
                  <div className="flex items-center gap-1.5 text-zinc-500 pt-1">
                    <Loader2 size={11} className="animate-spin text-zinc-650" />
                    <span>Executing code repair cycles...</span>
                  </div>
                )}
              </div>
            </div>

            {/* Manual Controls */}
            <div className="flex justify-center gap-3 pt-2">
              <button 
                onClick={() => this.setState({ hasError: false, error: null, healing: false, logs: [] }, () => window.location.reload())}
                className="px-4 py-2 bg-zinc-900 hover:bg-zinc-850 text-zinc-400 hover:text-zinc-200 text-[9px] font-bold tracking-widest uppercase rounded-lg border border-zinc-800 transition-colors flex items-center gap-1.5"
              >
                <RefreshCw size={11} /> Manual Reload
              </button>
            </div>
          </div>
          
          <style jsx>{`
            .unique-scrollbar-matrix::-webkit-scrollbar {
              width: 3px;
            }
            .unique-scrollbar-matrix::-webkit-scrollbar-track {
              background: transparent;
            }
            .unique-scrollbar-matrix::-webkit-scrollbar-thumb {
              background: rgba(255, 68, 68, 0.1);
              border-radius: 10px;
            }
          `}</style>
        </div>
      );
    }

    return this.props.children;
  }
}
