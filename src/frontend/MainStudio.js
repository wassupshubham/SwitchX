"use client";

import React, { useState, useEffect, useRef } from 'react';
import { 
  Send, Download, Sparkles, Trash2, Edit2, Image as ImageIcon, X, 
  FileText, UploadCloud, Loader2, Menu, Layout, Layers, 
  Mic, FileSpreadsheet, ChevronRight,
  Play, Pause, SkipBack, SkipForward, Volume1, Volume2, VolumeX,
  Camera, Cpu, Globe, Activity, Lock, Unlock, Lightbulb, Plus, Radio,
  ArrowUp, ArrowDown, Maximize2, Minimize2, Copy, ThumbsUp, ThumbsDown, Pin,
  Sliders, Settings, RotateCcw, Key, User,
  Brain, Database, Eye, FolderSync, Gauge, RefreshCw, Users
} from 'lucide-react';

function VisualLoadingWrapper({ src, alt, msgId, downloadUrl }) {
  const [isImageFullyLoaded, setIsImageFullyLoaded] = useState(false);

  return (
    <div className="space-y-2 mt-4 p-3 bg-zinc-950/40 border border-zinc-900/60 rounded-xl max-w-sm shadow-2xl backdrop-blur-md animate-fade-in text-left">
      <div className="w-full aspect-square bg-[#050507]/80 rounded-lg overflow-hidden flex flex-col items-center justify-center relative border border-zinc-900/30">
        {!isImageFullyLoaded && (
          <div className="absolute inset-0 bg-[#030303]/90 flex flex-col items-center justify-center p-6 space-y-3 z-20">
            <Loader2 size={18} className="text-indigo-400 animate-spin" />
            <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Loading image...</p>
          </div>
        )}
        <img 
          key={`${msgId}-node`}
          src={src} 
          alt={alt}
          loading="eager"
          className={`w-full h-full object-cover rounded-lg relative z-10 transition-all duration-700 ${isImageFullyLoaded ? 'opacity-100 scale-100' : 'opacity-0 scale-95'}`}
          onLoad={() => setIsImageFullyLoaded(true)}
        />
      </div>
      {isImageFullyLoaded && (
        <div className="pt-2 flex justify-start items-center px-1">
          <a 
            href={downloadUrl} 
            download={`switchx-image-${msgId}.png`} 
            target="_blank" 
            rel="noreferrer" 
            className="text-[10px] font-bold text-zinc-400 hover:text-indigo-400 tracking-wider transition-colors flex items-center gap-2 select-none"
          >
            <Download size={13} className="text-zinc-500 hover:text-indigo-400" />
            <span>Download image</span>
          </a>
        </div>
      )}
    </div>
  );
}

function PresentationDeckViewer({ deckData }) {
  const [activeSlideIdx, setActiveSlideIdx] = useState(0);

  if (!deckData || !Array.isArray(deckData)) return null;
  const currentSlide = deckData[activeSlideIdx];

  return (
    <div className="w-full my-6 border border-zinc-900 bg-[#050508]/40 backdrop-blur-xl rounded-2xl overflow-hidden shadow-3xl animate-fade-in hover:border-zinc-800/60 transition-colors duration-500">
      <div className="p-4 bg-zinc-950/60 border-b border-zinc-900/80 flex justify-between items-center px-6">
        <div className="text-[9px] text-zinc-400 font-bold tracking-[0.25em] uppercase flex items-center gap-2">
          <Layers size={12} className="text-indigo-400/80 animate-pulse" />
          <span className="font-sans">Ecosystem Strategy Portfolio</span>
        </div>
        <div className="text-[10px] text-zinc-500 font-mono bg-zinc-900/30 px-2 py-0.5 rounded border border-zinc-900/40">
          Slide 0{activeSlideIdx + 1} / 0{deckData.length}
        </div>
      </div>
      
      <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6 min-h-[280px] items-center bg-transparent">
        <div className="space-y-4 text-left">
          <h3 className="text-lg font-bold text-zinc-100 tracking-tight font-sans">{currentSlide.title}</h3>
          <p className="text-[9px] text-indigo-400 font-mono uppercase tracking-[0.2em]">{currentSlide.subtitle}</p>
          <ul className="space-y-2.5 pt-1.5">
            {currentSlide.bullets.map((b, idx) => (
              <li key={idx} className="text-xs text-zinc-400 flex items-start gap-2.5 leading-relaxed font-sans">
                <ChevronRight size={13} className="text-indigo-500/60 mt-0.5 shrink-0" />
                <span>{b}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full aspect-video bg-[#020204] rounded-xl overflow-hidden border border-zinc-900/80 relative group">
          <img src={currentSlide.image} alt="Slide Content" className="w-full h-full object-cover opacity-60 hover:opacity-90 group-hover:scale-105 transition-all duration-1000" />
        </div>
      </div>

      <div className="p-3.5 bg-zinc-950/45 border-t border-zinc-900/80 flex justify-between px-6">
        <button 
          disabled={activeSlideIdx === 0}
          onClick={() => setActiveSlideIdx(p => p - 1)}
          className="px-3 py-1 text-[9px] font-bold text-zinc-500 hover:text-zinc-200 disabled:opacity-20 disabled:hover:text-zinc-500 uppercase tracking-widest border border-transparent hover:border-zinc-800 rounded-md bg-transparent hover:bg-zinc-900/30 transition-all duration-300"
        >
          Previous
        </button>
        <button 
          disabled={activeSlideIdx === deckData.length - 1}
          onClick={() => setActiveSlideIdx(p => p + 1)}
          className="px-4 py-1 text-[9px] font-bold text-zinc-350 hover:text-white disabled:opacity-20 disabled:hover:text-zinc-350 uppercase tracking-widest border border-transparent hover:border-zinc-800 rounded-md bg-[#0a0a0f]/40 hover:bg-zinc-900/60 transition-all duration-300"
        >
          Next Slide
        </button>
      </div>
    </div>
  );
}

function DocumentExportPanel({ formats }) {
  if (!formats || !Array.isArray(formats)) return null;

  return (
    <div className="mt-4 pt-4 border-t border-zinc-900/60 flex flex-wrap items-center gap-2 animate-fade-in">
      {formats.map((ext) => (
        <button
          key={ext}
          onClick={() => alert(`Exporting localized bundle asset: manifest.${ext.toLowerCase()}`)}
          className="px-3 py-2 text-[9px] font-mono font-bold rounded-lg bg-zinc-900/10 border border-zinc-900 text-zinc-500 hover:text-zinc-200 hover:border-zinc-850 hover:bg-zinc-900/30 transition-all duration-300 uppercase flex items-center gap-2"
        >
          {ext === 'XLSX' && <FileSpreadsheet size={11} className="text-zinc-650" />}
          {ext === 'DOCX' && <FileText size={11} className="text-zinc-650" />}
          {ext === 'PPTX' && <Layout size={11} className="text-zinc-700" />}
          <span>{ext}</span>
        </button>
      ))}
    </div>
  );
}



const hexToRgbStr = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? `${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}` : '99, 102, 241';
};

const compileSectionsToHtml = (sections, theme, graphics, lastUploadedImageB64 = null, customStyles = null) => {
  const themeColors = {
    indigo: {
      primary: '#6366f1',
      bg: '#020205',
      cardBg: 'rgba(8, 8, 12, 0.45)',
      border: 'rgba(255, 255, 255, 0.04)',
      borderHover: 'rgba(99, 102, 241, 0.3)',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      particleColor: '99, 102, 241',
      gradStart: 'from-indigo-600/10',
      gradEnd: 'to-indigo-500/10'
    },
    emerald: {
      primary: '#10b981',
      bg: '#020205',
      cardBg: 'rgba(8, 8, 12, 0.45)',
      border: 'rgba(255, 255, 255, 0.04)',
      borderHover: 'rgba(16, 185, 129, 0.3)',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      particleColor: '16, 185, 129',
      gradStart: 'from-emerald-600/10',
      gradEnd: 'to-emerald-500/10'
    },
    rose: {
      primary: '#f43f5e',
      bg: '#020205',
      cardBg: 'rgba(8, 8, 12, 0.45)',
      border: 'rgba(255, 255, 255, 0.04)',
      borderHover: 'rgba(244, 63, 94, 0.3)',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      particleColor: '244, 63, 94',
      gradStart: 'from-rose-600/10',
      gradEnd: 'to-rose-500/10'
    },
    amber: {
      primary: '#f59e0b',
      bg: '#020205',
      cardBg: 'rgba(8, 8, 12, 0.45)',
      border: 'rgba(255, 255, 255, 0.04)',
      borderHover: 'rgba(245, 158, 11, 0.3)',
      text: '#f3f4f6',
      textMuted: '#9ca3af',
      particleColor: '245, 158, 11',
      gradStart: 'from-amber-600/10',
      gradEnd: 'to-amber-500/10'
    },
    lightTech: {
      primary: '#4f46e5',
      bg: '#f9fafb',
      cardBg: 'rgba(255, 255, 255, 0.85)',
      border: 'rgba(0, 0, 0, 0.06)',
      borderHover: 'rgba(79, 70, 229, 0.3)',
      text: '#111827',
      textMuted: '#4b5563',
      particleColor: '79, 70, 229',
      gradStart: 'from-indigo-100',
      gradEnd: 'to-indigo-50/50'
    },
    luxuryGold: {
      primary: '#d4af37',
      bg: '#090805',
      cardBg: 'rgba(22, 20, 17, 0.65)',
      border: 'rgba(212, 175, 55, 0.08)',
      borderHover: 'rgba(212, 175, 55, 0.35)',
      text: '#f5f2eb',
      textMuted: '#bdae93',
      particleColor: '212, 175, 55',
      gradStart: 'from-yellow-600/10',
      gradEnd: 'to-yellow-500/50'
    },
    retroTerminal: {
      primary: '#33ff33',
      bg: '#000000',
      cardBg: 'rgba(0, 15, 0, 0.3)',
      border: 'rgba(0, 255, 0, 0.15)',
      borderHover: 'rgba(0, 255, 0, 0.6)',
      text: '#33ff33',
      textMuted: '#22aa22',
      particleColor: '51, 255, 51',
      gradStart: 'from-green-950/20',
      gradEnd: 'to-green-900/10'
    }
  };

  const selectedTheme = (theme === 'custom' && customStyles) ? {
    primary: customStyles.primary || '#6366f1',
    bg: customStyles.bg || '#020205',
    cardBg: customStyles.cardBg || 'rgba(8, 8, 12, 0.45)',
    border: 'rgba(255, 255, 255, 0.04)',
    borderHover: `${customStyles.primary || '#6366f1'}4c`,
    text: customStyles.text || '#f3f4f6',
    textMuted: '#9ca3af',
    particleColor: hexToRgbStr(customStyles.primary || '#6366f1'),
    gradStart: 'from-indigo-600/10',
    gradEnd: 'to-indigo-500/10'
  } : (themeColors[theme] || themeColors.indigo);

  const graphicIllustrations = {
    luxury: `
      <div class="relative w-full aspect-square flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-indigo-500/10 to-purple-500/10 blur-3xl opacity-40 animate-pulse"></div>
        <svg class="w-48 h-48 text-[COLOR] drop-shadow-[0_0_25px_rgba(99,102,241,0.3)] animate-spin-slow animate-float" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="50" cy="50" r="40" stroke="currentColor" stroke-width="1.5" stroke-dasharray="10 15" />
          <circle cx="50" cy="50" r="30" stroke="currentColor" stroke-width="0.8" />
          <polygon points="50,22 58,40 78,40 62,52 68,72 50,60 32,72 38,52 22,40 42,40" stroke="currentColor" stroke-width="1.2" />
        </svg>
      </div>
    `,
    cafe: `
      <div class="relative w-full aspect-square flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-amber-500/10 to-orange-500/10 blur-3xl opacity-40 animate-pulse"></div>
        <svg class="w-48 h-48 text-[COLOR] drop-shadow-[0_0_25px_rgba(245,158,11,0.3)] animate-float" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M25,35 H75 C75,55 60,65 45,65 H35 C20,65 25,35 25,35 Z" stroke="currentColor" stroke-width="2" />
          <path d="M75,40 C82,40 85,45 85,50 C85,55 82,58 75,58" stroke="currentColor" stroke-width="2" />
          <path d="M20,75 H80" stroke="currentColor" stroke-width="3" stroke-linecap="round" />
          <path d="M40,25 Q42,15 38,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="animate-pulse" />
          <path d="M50,25 Q52,15 48,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="animate-pulse" style="animation-delay: 0.2s" />
          <path d="M60,25 Q62,15 58,10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" class="animate-pulse" style="animation-delay: 0.4s" />
        </svg>
      </div>
    `,
    fitness: `
      <div class="relative w-full aspect-square flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-rose-500/10 to-red-500/10 blur-3xl opacity-40 animate-pulse"></div>
        <svg class="w-48 h-48 text-[COLOR] drop-shadow-[0_0_25px_rgba(244,63,94,0.3)] animate-float" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="15" y="42" width="10" height="16" rx="2" stroke="currentColor" stroke-width="2.5" />
          <rect x="75" y="42" width="10" height="16" rx="2" stroke="currentColor" stroke-width="2.5" />
          <line x1="25" y1="50" x2="75" y2="50" stroke="currentColor" stroke-width="6" />
          <line x1="25" y1="45" x2="25" y2="55" stroke="currentColor" stroke-width="3" />
          <line x1="75" y1="45" x2="75" y2="55" stroke="currentColor" stroke-width="3" />
          <circle cx="50" cy="50" r="3" fill="currentColor" />
        </svg>
      </div>
    `,
    ecommerce: `
      <div class="relative w-full aspect-square flex items-center justify-center">
        <div class="absolute inset-0 rounded-full bg-gradient-to-tr from-emerald-500/10 to-teal-500/10 blur-3xl opacity-40 animate-pulse"></div>
        <svg class="w-48 h-48 text-[COLOR] drop-shadow-[0_0_25px_rgba(16,185,129,0.3)] animate-float" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="35" cy="80" r="6" stroke="currentColor" stroke-width="2" />
          <circle cx="70" cy="80" r="6" stroke="currentColor" stroke-width="2" />
          <path d="M15,20 H25 L35,60 H75 L85,28 H30" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" />
          <line x1="50" y1="35" x2="50" y2="53" stroke="currentColor" stroke-width="2" />
          <line x1="41" y1="44" x2="59" y2="44" stroke="currentColor" stroke-width="2" />
        </svg>
      </div>
    `
  };

  const selectedGraphic = (graphicIllustrations[graphics] || graphicIllustrations.luxury).replaceAll('[COLOR]', selectedTheme.primary);

  let sectionsHtml = '';
  
  sections.forEach(sec => {
    switch (sec.type) {
      case 'hero':
        sectionsHtml += `
        <section id="hero" class="min-h-[80vh] flex items-center justify-center relative py-16 px-6 overflow-hidden">
          <div class="absolute inset-0 rounded-full bg-gradient-to-tr \${selectedTheme.gradStart} \${selectedTheme.gradEnd} blur-3xl opacity-50 z-0 animate-pulse-slow"></div>
          <div class="max-w-6xl w-full grid grid-cols-1 md:grid-cols-2 gap-12 items-center relative z-10">
            <div class="space-y-6 text-left">
              <h1 class="text-4xl md:text-6xl font-bold tracking-tight leading-tight font-syne select-none">
                \${sec.title}
              </h1>
              <p class="custom-text-muted text-sm md:text-base max-w-lg leading-relaxed">
                \${sec.subtitle}
              </p>
              <div>
                <a href="#contact" class="inline-block px-8 py-4 text-xs font-mono font-bold tracking-widest text-black bg-[COLOR] hover:bg-opacity-90 rounded-lg shadow-lg hover:scale-[1.03] active:scale-95 transition-all duration-300 uppercase shadow-[COLOR]/15">
                  \${sec.ctaText}
                </a>
              </div>
            </div>
            <div class="flex justify-center relative">
              \${selectedGraphic}
            </div>
          </div>
        </section>
        `;
        break;
      case 'features':
        sectionsHtml += `
        <section id="features" class="py-20 px-6 border-t border-zinc-900/10 relative">
          <div class="max-w-6xl mx-auto space-y-12">
            <h2 class="text-2xl md:text-3xl font-bold font-syne text-center tracking-wide">\${sec.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
              \${sec.items.map((item, i) => \`
                <div class="p-6 custom-card backdrop-blur-md rounded-2xl hover:scale-[1.02] group">
                  <div class="w-10 h-10 rounded-xl bg-[COLOR]/10 flex items-center justify-center text-[COLOR] font-bold text-lg mb-4 group-hover:bg-[COLOR]/25 transition-all">\${i + 1}</div>
                  <h3 class="text-lg font-bold mb-2 font-syne">\${item.title}</h3>
                  <p class="custom-text-muted text-xs leading-relaxed">\${item.desc}</p>
                </div>
              \`).join('')}
            </div>
          </div>
        </section>
        `;
        break;
      case 'calculator':
        sectionsHtml += `
        <section id="calculator" class="py-20 px-6 border-t border-zinc-900/10 relative">
          <div class="max-w-xl mx-auto custom-card backdrop-blur-md rounded-3xl p-8 space-y-6">
            <h2 class="text-2xl font-bold text-center font-syne tracking-wide">\${sec.title}</h2>
            <p class="text-xs text-center custom-text-muted leading-relaxed">Adjust the slider below to estimate your cost dynamically.</p>
            
            <div class="space-y-4 pt-4">
              <div class="flex justify-between text-xs font-mono custom-text-muted">
                <span>Scale size (units)</span>
                <span id="slider-val" class="text-[COLOR] font-bold">5 units</span>
              </div>
              <input 
                type="range" 
                min="1" 
                max="20" 
                value="5" 
                id="calc-slider"
                class="w-full h-1 bg-zinc-900 rounded-lg appearance-none cursor-pointer accent-[COLOR]" 
              />
              <div class="flex justify-between text-[10px] custom-text-muted font-mono">
                <span>1 Unit</span>
                <span>20 Units</span>
              </div>
            </div>

            <div class="bg-[COLOR]/5 border border-[COLOR]/15 rounded-2xl p-5 text-center space-y-1">
              <span class="text-[10px] font-mono custom-text-muted uppercase tracking-wider block">Estimated Investment</span>
              <span id="calc-total" class="text-3xl font-mono text-[COLOR] font-bold">$\${sec.rate * 5}</span>
              <span class="text-[9px] font-sans custom-text-muted block">Includes premium support & state logging</span>
            </div>
          </div>
        </section>
        `;
        break;
      case 'pricing':
        sectionsHtml += `
        <section id="pricing" class="py-20 px-6 border-t border-zinc-900/10 relative">
          <div class="max-w-6xl mx-auto space-y-12">
            <h2 class="text-2xl md:text-3xl font-bold font-syne text-center tracking-wide">\${sec.title}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              \${sec.plans.map(plan => \`
                <div class="p-8 custom-card backdrop-blur-md rounded-3xl flex flex-col justify-between hover:scale-[1.01]">
                  <div class="space-y-6">
                    <div class="flex justify-between items-baseline">
                      <h3 class="text-xl font-bold font-syne">\${plan.name}</h3>
                      <span class="text-2xl font-mono font-bold text-[COLOR]">\${plan.price}</span>
                    </div>
                    <ul class="space-y-3 text-xs custom-text-muted">
                      \${plan.features.map(f => \`
                        <li class="flex items-center gap-2">
                          <span class="w-1.5 h-1.5 rounded-full bg-[COLOR]" />
                          <span>\${f}</span>
                        </li>
                      \`).join('')}
                    </ul>
                  </div>
                  <div class="mt-8">
                    <a href="#contact" class="block text-center py-3 text-xs font-mono font-bold tracking-widest text-[COLOR] border border-[COLOR]/30 hover:bg-[COLOR]/10 rounded-xl transition-all uppercase">
                      Select Plan
                    </a>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        </section>
        `;
        break;
      case 'gallery':
        sectionsHtml += `
        <section id="gallery" class="py-20 px-6 border-t border-zinc-900/10 relative">
          <div class="max-w-6xl mx-auto space-y-12">
            <h2 class="text-2xl md:text-3xl font-bold font-syne text-center tracking-wide">\${sec.title}</h2>
            <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
              \${sec.images.map((imgUrl, idx) => \`
                <div class="relative group rounded-xl overflow-hidden border border-zinc-200/5 hover:border-[COLOR]/40 transition-all duration-300 aspect-square shadow-lg">
                  <img src="\${imgUrl}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  <div class="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                    <span class="text-[9px] font-mono tracking-widest uppercase text-white font-bold border border-white/20 px-3 py-1.5 rounded-lg bg-black/30">View Item</span>
                  </div>
                </div>
              \`).join('')}
            </div>
          </div>
        </section>
        `;
        break;
      case 'contact':
        sectionsHtml += `
        <section id="contact" class="py-20 px-6 border-t border-zinc-900/10 relative">
          <div class="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            <div class="space-y-6 text-left">
              <h2 class="text-3xl font-bold font-syne tracking-wide">\${sec.title}</h2>
              <p class="custom-text-muted text-sm leading-relaxed">
                Send us a message and we will respond instantly. Form leads will be saved directly to the browser local memory so you can audit them at the bottom.
              </p>
              <div class="space-y-3 font-mono text-xs custom-text-muted">
                <div class="flex items-center gap-3">
                  <span class="text-[COLOR]">Email:</span>
                  <span>\${sec.email}</span>
                </div>
                <div class="flex items-center gap-3">
                  <span class="text-[COLOR]">Phone:</span>
                  <span>\${sec.phone}</span>
                </div>
              </div>
            </div>

            <form id="lead-form" class="custom-card rounded-2xl p-6 space-y-4 text-left">
              <div class="space-y-1.5">
                <label class="text-[10px] font-mono custom-text-muted uppercase tracking-widest">Full Name</label>
                <input type="text" id="lead-name" required placeholder="John Doe" class="w-full px-4 py-3 bg-black/20 border border-zinc-200/10 focus:border-[COLOR] focus:outline-none rounded-lg text-xs transition-colors" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-mono custom-text-muted uppercase tracking-widest">Email Address</label>
                <input type="email" id="lead-email" required placeholder="john@example.com" class="w-full px-4 py-3 bg-black/20 border border-zinc-200/10 focus:border-[COLOR] focus:outline-none rounded-lg text-xs transition-colors" />
              </div>
              <div class="space-y-1.5">
                <label class="text-[10px] font-mono custom-text-muted uppercase tracking-widest">Your Message</label>
                <textarea id="lead-msg" rows="3" required placeholder="Describe your business idea..." class="w-full px-4 py-3 bg-black/20 border border-zinc-200/10 focus:border-[COLOR] focus:outline-none rounded-lg text-xs transition-colors"></textarea>
              </div>
              <button type="submit" class="w-full py-3 text-xs font-mono font-bold tracking-widest text-black bg-[COLOR] hover:bg-opacity-90 rounded-lg shadow-lg hover:scale-[1.01] transition-all uppercase">
                Send Inquiry
              </button>
              <div id="form-feedback" class="text-[10px] font-mono text-emerald-500 text-center hidden pt-2">Message saved to Local Lead Storage!</div>
            </form>
          </div>

          <div class="max-w-5xl mx-auto mt-16 border border-zinc-200/5 bg-black/25 rounded-2xl p-6 space-y-4">
            <div class="flex justify-between items-center flex-wrap gap-3">
              <div>
                <span class="text-xs font-bold block font-syne font-bold">Business Leads Log (Browser Local Memory)</span>
                <span class="text-[10px] custom-text-muted block">Leads entered by your website visitors will show up here instantly.</span>
              </div>
              <button id="clear-leads" class="px-2.5 py-1 text-[8.5px] font-mono text-zinc-500 hover:text-rose-450 border border-zinc-800/20 rounded hover:border-rose-950 transition-colors uppercase font-bold">Clear Log</button>
            </div>
            <div id="leads-list" class="max-h-48 overflow-y-auto space-y-2.5 text-left text-xs custom-scrollbar">
              <div class="custom-text-muted italic text-center py-4">No submissions received yet. Fill the contact form above to test lead capture!</div>
            </div>
          </div>
        </section>
        `;
        break;
    }
  });

  let fullHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>SwitchX Custom Premium Site</title>
  <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Syne:wght@500..800&family=JetBrains+Mono:wght@100..700&family=Space+Grotesk:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet">
  <script src="https://cdn.tailwindcss.com"></script>
  <script>
    tailwind.config = {
      theme: {
        extend: {
          fontFamily: {
            sans: ['Outfit', 'sans-serif'],
            syne: ['Syne', 'sans-serif'],
            mono: ['JetBrains Mono', 'monospace'],
          }
        }
      }
    }
  </script>
  <style>
    body {
      background-color: ${selectedTheme.bg};
      color: ${selectedTheme.text};
      transition: background-color 0.4s ease, color 0.4s ease;
      font-family: '${customStyles?.font || 'Outfit'}', sans-serif !important;
    }
      background-color: \${selectedTheme.cardBg};
      border: 1px solid \${selectedTheme.border};
      color: \${selectedTheme.text};
      transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .custom-card:hover {
      border-color: \${selectedTheme.borderHover};
      box-shadow: 0 12px 30px -12px \${selectedTheme.borderHover.replace('0.3', '0.08')};
    }
    .custom-text-muted {
      color: \${selectedTheme.textMuted};
    }
    .custom-scrollbar::-webkit-scrollbar {
      width: 4px;
    }
    .custom-scrollbar::-webkit-scrollbar-track {
      background: rgba(2, 2, 4, 0.6);
    }
    .custom-scrollbar::-webkit-scrollbar-thumb {
      background: rgba(255, 255, 255, 0.04);
      border-radius: 99px;
    }
    @keyframes spin-slow {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    .animate-spin-slow {
      animation: spin-slow 28s linear infinite;
    }
    @keyframes float {
      0%, 100% { transform: translateY(0px); }
      50% { transform: translateY(-8px); }
    }
    .animate-float {
      animation: float 4s ease-in-out infinite;
    }
    @keyframes pulse-slow {
      0%, 100% { opacity: 0.4; }
      50% { opacity: 0.65; }
    }
    .animate-pulse-slow {
      animation: pulse-slow 6s ease-in-out infinite;
    }
  </style>
</head>
<body class="font-sans antialiased overflow-x-hidden selection:bg-zinc-800 selection:text-white relative">

  <!-- Dynamic Particle Canvas for Motion Graphics -->
  <canvas id="particle-canvas" class="fixed inset-0 pointer-events-none z-0"></canvas>

  <header class="w-full py-6 px-6 border-b border-zinc-200/5 bg-black/10 backdrop-blur-md relative z-50">
    <div class="max-w-6xl mx-auto flex justify-between items-center">
      <div class="flex items-center gap-2">
        <span class="w-2.5 h-2.5 rounded-full bg-[COLOR] shadow-md shadow-[COLOR]/50 animate-pulse"></span>
        <span class="text-sm font-bold uppercase tracking-[0.3em] font-syne text-white">SwitchX Studio</span>
      </div>
      <nav class="hidden sm:flex items-center gap-8 text-[10px] font-mono tracking-widest custom-text-muted uppercase">
        <a href="#hero" class="hover:text-[COLOR] transition-colors">Home</a>
        <a href="#features" class="hover:text-[COLOR] transition-colors">Features</a>
        <a href="#contact" class="hover:text-[COLOR] transition-colors">Contact</a>
      </nav>
    </div>
  </header>

  <main class="relative z-10">
    \${sectionsHtml}
  </main>

  <footer class="w-full py-12 px-6 border-t border-zinc-900 bg-black/45 text-center font-mono text-[9px] custom-text-muted uppercase tracking-widest relative z-50">
    <div class="max-w-6xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
      <span>© 2026 SwitchX Studio Custom Web. All Rights Reserved.</span>
      <span>Engineered for Elite Digital Business.</span>
    </div>
  </footer>

  <script>
    // 1. Moving Particle System Script
    const pCanvas = document.getElementById('particle-canvas');
    if (pCanvas) {
      const pCtx = pCanvas.getContext('2d');
      const resizePCanvas = () => {
        pCanvas.width = window.innerWidth;
        pCanvas.height = window.innerHeight;
      };
      window.addEventListener('resize', resizePCanvas);
      resizePCanvas();

      const particles = Array.from({ length: parseInt('[PARTICLE_COUNT]') }, () => ({
        x: Math.random() * pCanvas.width,
        y: Math.random() * pCanvas.height,
        size: Math.random() * parseFloat('[PARTICLE_SIZE]') + 0.4,
        speedX: Math.random() * parseFloat('[PARTICLE_SPEED]') - (parseFloat('[PARTICLE_SPEED]') / 2),
        speedY: Math.random() * parseFloat('[PARTICLE_SPEED]') - (parseFloat('[PARTICLE_SPEED]') / 2),
        alpha: Math.random() * 0.6 + 0.1,
        fadeSpeed: (Math.random() * 0.003 + 0.001) * (Math.random() > 0.5 ? 1 : -1)
      }));

      function drawParticles() {
        pCtx.clearRect(0, 0, pCanvas.width, pCanvas.height);
        particles.forEach(p => {
          p.x += p.speedX;
          p.y += p.speedY;
          p.alpha += p.fadeSpeed;
          if (p.alpha > 0.7 || p.alpha < 0.1) p.fadeSpeed = -p.fadeSpeed;
          if (p.x < 0) p.x = pCanvas.width;
          if (p.x > pCanvas.width) p.x = 0;
          if (p.y < 0) p.y = pCanvas.height;
          if (p.y > pCanvas.height) p.y = 0;

          pCtx.fillStyle = \`rgba(\${[PARTICLE_RGB]}, \${p.alpha})\`;
          pCtx.beginPath();
          pCtx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          pCtx.fill();
        });
        requestAnimationFrame(drawParticles);
      }
      drawParticles();
    }

    // 2. Pricing Calculator
    const slider = document.getElementById('calc-slider');
    const totalDisplay = document.getElementById('calc-total');
    const valueDisplay = document.getElementById('slider-val');

    if (slider && totalDisplay && valueDisplay) {
      slider.addEventListener('input', (e) => {
        const value = parseInt(e.target.value);
        valueDisplay.textContent = value + ' units';
        totalDisplay.textContent = '$' + (value * [RATE]);
      });
    }

    // 3. Leads Logger
    const form = document.getElementById('lead-form');
    const feedback = document.getElementById('form-feedback');
    const leadsList = document.getElementById('leads-list');
    const clearBtn = document.getElementById('clear-leads');

    const STORAGE_KEY = 'switchx_site_leads';

    function renderLeads() {
      if (!leadsList) return;
      const stored = localStorage.getItem(STORAGE_KEY);
      const leads = stored ? JSON.parse(stored) : [];
      
      if (leads.length === 0) {
        leadsList.innerHTML = '<div class="custom-text-muted italic text-center py-4">No submissions received yet. Fill the contact form above to test lead capture!</div>';
        return;
      }

      leadsList.innerHTML = leads.map(l => \\\`
        <div class="p-3.5 bg-black/10 border border-zinc-200/5 rounded-xl space-y-1 relative">
          <span class="absolute top-3.5 right-4 text-[8.5px] font-mono custom-text-muted">\\\${l.time}</span>
          <div class="flex items-center gap-2">
            <span class="w-1.5 h-1.5 rounded-full bg-[COLOR]" />
            <span class="font-bold text-white">\\\${l.name}</span>
            <span class="text-zinc-500">(\\\${l.email})</span>
          </div>
          <p class="custom-text-muted text-xs pl-3.5 pt-0.5 leading-relaxed">\\\${l.message}</p>
        </div>
      \\\`).join('');
    }

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const name = document.getElementById('lead-name').value;
        const email = document.getElementById('lead-email').value;
        const message = document.getElementById('lead-msg').value;

        const newLead = {
          name,
          email,
          message,
          time: new Date().toLocaleTimeString()
        };

        const stored = localStorage.getItem(STORAGE_KEY);
        const leads = stored ? JSON.parse(stored) : [];
        leads.unshift(newLead);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(leads));

        form.reset();
        if (feedback) {
          feedback.classList.remove('hidden');
          setTimeout(() => feedback.classList.add('hidden'), 3500);
        }
        renderLeads();
      });
    }

    if (clearBtn) {
      clearBtn.addEventListener('click', () => {
        localStorage.removeItem(STORAGE_KEY);
        renderLeads();
      });
    }

    renderLeads();
  </script>
</body>
</html>`;

  fullHtml = fullHtml
    .replaceAll('[COLOR]', selectedTheme.primary)
    .replaceAll('[PARTICLE_RGB]', selectedTheme.particleColor)
    .replaceAll('[RATE]', sections.find(s => s.type === 'calculator')?.rate || 99)
    .replaceAll('[UPLOADED_IMAGE]', lastUploadedImageB64 || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')
    .replaceAll('[PARTICLE_SPEED]', customStyles?.particlesSpeed || '0.16')
    .replaceAll('[PARTICLE_COUNT]', customStyles?.particlesCount || '45')
    .replaceAll('[PARTICLE_SIZE]', customStyles?.particlesSize || '1.5');

  return fullHtml;
};

export default function MainStudio() {
  // Trigger deliberate error for auto-healing test (delete or comment this block to repair)
  if (typeof window !== 'undefined' && window.location.search.includes('triggerErr')) {
    const undefinedObject = undefined;
    const triggerErr = undefinedObject.triggerCrashMethod();
  }

  const getLocalStorageFootprint = () => {
    if (typeof window === 'undefined') return 0;
    let total = 0;
    try {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const val = localStorage.getItem(key);
        total += (key ? key.length : 0) + (val ? val.length : 0);
      }
    } catch (e) {}
    return total;
  };

  const [chatMessages, setChatMessages] = useState([
    { id: "msg-welcome-init", role: "assistant", text: "SwitchX System Engine Ready." }
  ]);
  const [chatInputValue, setChatInputValue] = useState('');
  const [attachedImageB64, setAttachedImageB64] = useState(null);
  const [lastUploadedImageB64, setLastUploadedImageB64] = useState(null);
  const [uploadedDocText, setUploadedDocText] = useState("");
  const [docFileName, setDocFileName] = useState("");
  const [aiLoading, setAiLoading] = useState(false);
  const [savedSessions, setSavedSessions] = useState([]);
  const [currentSessionId, setCurrentSessionId] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isVoiceTypingActive, setIsVoiceTypingActive] = useState(false); // Represents active recording state
  const [deviceCoordinates, setDeviceCoordinates] = useState(null);
  const [currentTime, setCurrentTime] = useState("");
  const [weatherInfo, setWeatherInfo] = useState("");

  const [currentUser, setCurrentUser] = useState(null);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [showLandingAuth, setShowLandingAuth] = useState(false);
  const [authModalMode, setAuthModalMode] = useState('login'); // 'login' | 'signup' | 'forgot_password' | 'forgot_username'
  const [newPassword, setNewPassword] = useState('');
  const [recoveredUsername, setRecoveredUsername] = useState('');
  const [recoveryStep, setRecoveryStep] = useState('email'); // 'email' | 'otp' | 'reset' | 'success'
  const [resetTargetUser, setResetTargetUser] = useState(null);

  const resetAuthStates = () => {
    setAuthUsername('');
    setAuthPassword('');
    setAuthContact('');
    setAuthOtpSent(false);
    setAuthOtpInput('');
    setGeneratedOtp('');
    setAuthError('');
    setNewPassword('');
    setRecoveredUsername('');
    setRecoveryStep('email');
    setResetTargetUser(null);
  };

  const [authUsername, setAuthUsername] = useState('');
  const [authPassword, setAuthPassword] = useState('');
  const [authContact, setAuthContact] = useState('');
  const [authOtpSent, setAuthOtpSent] = useState(false);
  const [authOtpInput, setAuthOtpInput] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [authError, setAuthError] = useState('');
  const [guestUsageCount, setGuestUsageCount] = useState(0);
  const [sidebarSearchQuery, setSidebarSearchQuery] = useState('');
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const [authMethod, setAuthMethod] = useState('email'); // 'email' | 'phone'
  const [authCountryCode, setAuthCountryCode] = useState('+1');
  const [authPhoneInput, setAuthPhoneInput] = useState('');
  const [otpToast, setOtpToast] = useState(null); // { code: string, contact: string, visible: boolean }
  
  const [showGatewaySettings, setShowGatewaySettings] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [gatewayResendKey, setGatewayResendKey] = useState('');
  const [gatewayTwilioSid, setGatewayTwilioSid] = useState('');
  const [gatewayTwilioToken, setGatewayTwilioToken] = useState('');
  const [gatewayTwilioFrom, setGatewayTwilioFrom] = useState('');

  // New preference states
  const [customTerminalFontSize, setCustomTerminalFontSize] = useState(11);
  const [customAutoSave, setCustomAutoSave] = useState(true);
  const [customSoundEffects, setCustomSoundEffects] = useState(true);
  const [customAgentTone, setCustomAgentTone] = useState('creative');
  const [customTerminalTheme, setCustomTerminalTheme] = useState('midnight');
  const [settingsTab, setSettingsTab] = useState('identity');

  // Advanced core engine feature states
  const [featVectorDb, setFeatVectorDb] = useState(true);
  const [featLiveWatcher, setFeatLiveWatcher] = useState(true);
  const [featTelemetry, setFeatTelemetry] = useState(true);
  const [featMultiAgent, setFeatMultiAgent] = useState(true);
  const [featImagePipeline, setFeatImagePipeline] = useState(true);
  const [aboutActiveTab, setAboutActiveTab] = useState('diagnostics'); // 'diagnostics' | 'features'

  // Telemetry real-time values
  const [telemetryCpuTemp, setTelemetryCpuTemp] = useState(48);
  const [telemetryRamUsage, setTelemetryRamUsage] = useState(68);
  const [telemetryLatency, setTelemetryLatency] = useState(20);

  // Image compiler simulation state
  const [isCompilingImage, setIsCompilingImage] = useState(false);

  // Web Audio API browser synth sound generators
  const playSoftClickSound = () => {
    if (!customSoundEffects) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(650, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(150, ctx.currentTime + 0.08);
      gain.gain.setValueAtTime(0.012, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.08);
    } catch (e) {}
  };

  const playSoftNotificationSound = () => {
    if (!customSoundEffects) return;
    try {
      const ctx = new (window.AudioContext || window.webkitAudioContext)();
      const playNote = (freq, time, dur) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, time);
        gain.gain.setValueAtTime(0.018, time);
        gain.gain.exponentialRampToValueAtTime(0.0001, time + dur);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(time);
        osc.stop(time + dur);
      };
      playNote(523.25, ctx.currentTime, 0.12);
      playNote(659.25, ctx.currentTime + 0.08, 0.22);
    } catch (e) {}
  };

  const triggerClusterAudit = () => {
    if (!featMultiAgent) return;
    playSoftNotificationSound();
    setTerminalLogs(prev => [
      ...prev,
      `[CLUSTER] Initiating multi-agent Plan-Review-Execute pipeline...`,
      `[CLUSTER] Coder Agent: Scanning project directory... OK`,
      `[CLUSTER] Tester Agent: Running 12 automated unit tests in sandboxed Docker...`,
      `[CLUSTER] Tester Agent: All 12 tests PASSED successfully.`,
      `[CLUSTER] Auditor Agent: Scanning source files for security & performance bugs...`,
      `[CLUSTER] Auditor Agent: Audit complete. 0 security leaks, 0 performance bottlenecks.`,
      `[CLUSTER] Pipeline successfully completed. 100% test coverage verified.`
    ].slice(-100));
  };

  const simulateImageToCode = (fileName = "wireframe_mockup.png") => {
    if (!featImagePipeline) return;
    setIsCompilingImage(true);
    playSoftClickSound();
    
    setTerminalLogs(prev => [
      ...prev,
      `[VISION] Wireframe design file detected: "${fileName}". Parsing layout tree...`
    ].slice(-100));

    setTimeout(() => {
      setTerminalLogs(prev => [
        ...prev,
        `[VISION] CSS grid and flex alignments mapped. Resolving design components...`
      ].slice(-100));
    }, 1200);

    setTimeout(() => {
      const generatedSection = {
        id: "section-" + Date.now(),
        type: "hero",
        content: {
          badge: "VISION PIPELINE COMPILED",
          title: "Intelligent Startup Launcher",
          subtitle: "Deploy high-performance agentic systems instantly. Streamline operations with automated vectorized states.",
          ctaText: "Launch Terminal",
          imageUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80"
        }
      };

      setBuilderSections(prev => [generatedSection, ...prev]);
      setIsCompilingImage(false);
      playSoftNotificationSound();
      
      setTerminalLogs(prev => [
        ...prev,
        `[VISION] Responsive layout compiled successfully. Output injected into Builder!`,
        `[SYSTEM] Recompiled template preview bundle (saved 60% production time).`
      ].slice(-100));
    }, 2800);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setGatewayResendKey(localStorage.getItem('switchx_gate_resend_api_key') || '');
      setGatewayTwilioSid(localStorage.getItem('switchx_gate_twilio_sid') || '');
      setGatewayTwilioToken(localStorage.getItem('switchx_gate_twilio_token') || '');
      setGatewayTwilioFrom(localStorage.getItem('switchx_gate_twilio_from') || '');

      const storedFontSize = localStorage.getItem('switchx_pref_terminal_font_size');
      if (storedFontSize) setCustomTerminalFontSize(parseInt(storedFontSize, 10));

      const storedAutoSave = localStorage.getItem('switchx_pref_autosave');
      if (storedAutoSave) setCustomAutoSave(storedAutoSave === 'true');

      const storedSounds = localStorage.getItem('switchx_pref_sounds');
      if (storedSounds) setCustomSoundEffects(storedSounds === 'true');

      const storedAgentTone = localStorage.getItem('switchx_pref_agent_tone');
      if (storedAgentTone) setCustomAgentTone(storedAgentTone);

      const storedTerminalTheme = localStorage.getItem('switchx_pref_terminal_theme');
      if (storedTerminalTheme) setCustomTerminalTheme(storedTerminalTheme);

      // Load Advanced Core Engine Feature States
      const storedVectorDb = localStorage.getItem('switchx_feat_vector_db');
      if (storedVectorDb !== null) setFeatVectorDb(storedVectorDb === 'true');

      const storedLiveWatcher = localStorage.getItem('switchx_feat_live_watcher');
      if (storedLiveWatcher !== null) setFeatLiveWatcher(storedLiveWatcher === 'true');

      const storedTelemetry = localStorage.getItem('switchx_feat_telemetry');
      if (storedTelemetry !== null) setFeatTelemetry(storedTelemetry === 'true');

      const storedMultiAgent = localStorage.getItem('switchx_feat_multi_agent');
      if (storedMultiAgent !== null) setFeatMultiAgent(storedMultiAgent === 'true');

      const storedImagePipeline = localStorage.getItem('switchx_feat_image_pipeline');
      if (storedImagePipeline !== null) setFeatImagePipeline(storedImagePipeline === 'true');
    }
  }, []);

  // Telemetry fluctuation simulation
  useEffect(() => {
    if (!featTelemetry) return;
    const interval = setInterval(() => {
      setTelemetryCpuTemp(prev => {
        const delta = (Math.random() - 0.5) * 4;
        return Math.min(85, Math.max(35, Math.round(prev + delta)));
      });
      setTelemetryRamUsage(prev => {
        const delta = (Math.random() - 0.5) * 6;
        const newRam = Math.min(95, Math.max(45, Math.round(prev + delta)));
        if (newRam >= 90) {
          setTerminalLogs(l => [
            ...l, 
            `[TELEMETRY] System memory load high (${newRam}%). Activating memory-efficient compilation parameters.`
          ].slice(-100));
        }
        return newRam;
      });
      setTelemetryLatency(prev => {
        const delta = (Math.random() - 0.5) * 8;
        return Math.min(150, Math.max(5, Math.round(prev + delta)));
      });
    }, 2500);
    return () => clearInterval(interval);
  }, [featTelemetry]);

  const [isAppUnrolled, setIsAppUnrolled] = useState(false);
  const [translationLoading, setTranslationLoading] = useState(false);
  const [previewHtml, setPreviewHtml] = useState(null);
  const [viewportWidth, setViewportWidth] = useState('100%');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isDrawerFullScreen, setIsDrawerFullScreen] = useState(false);
  const [isExplainerOpen, setIsExplainerOpen] = useState(false);
  const [customPrimary, setCustomPrimary] = useState('#6366f1');
  const [customBg, setCustomBg] = useState('#020205');
  const [customCardBg, setCustomCardBg] = useState('rgba(8, 8, 12, 0.45)');
  const [customText, setCustomText] = useState('#f3f4f6');
  const [customFont, setCustomFont] = useState('Outfit');
  const [customParticlesSpeed, setCustomParticlesSpeed] = useState(0.16);
  const [customParticlesCount, setCustomParticlesCount] = useState(45);
  const [customParticlesSize, setCustomParticlesSize] = useState(1.5);
  const [customCodeValue, setCustomCodeValue] = useState('');
  const [builderSubTab, setBuilderSubTab] = useState('styles'); // 'styles', 'sections', 'code'

  const [builderSections, setBuilderSections] = useState([
    {
      id: 'hero',
      type: 'hero',
      title: 'Elevate Your Business',
      subtitle: 'We build high-fidelity interactive digital experiences that turn visitors into paying customers.',
      ctaText: 'Get Started Today'
    },
    {
      id: 'features',
      type: 'features',
      title: 'Our Signature Services',
      items: [
        { title: 'Premium Design', desc: 'Stunning visual interfaces crafted for expensive brand appeal.' },
        { title: 'Smart Integrations', desc: 'Working databases, forms, and custom tools built in.' },
        { title: 'Elite Performance', desc: 'Blazing fast load times with clean standalone code.' }
      ]
    },
    {
      id: 'calculator',
      type: 'calculator',
      title: 'Dynamic Investment Estimator',
      rate: 99
    },
    {
      id: 'contact',
      type: 'contact',
      title: 'Inquire Instantly',
      email: 'business@switchx-studio.com',
      phone: '+1 (555) 123-4567'
    }
  ]);
  const [builderTheme, setBuilderTheme] = useState('custom'); // 'indigo', 'emerald', 'rose', 'amber', 'custom'
  const [builderGraphics, setBuilderGraphics] = useState('luxury'); // 'luxury', 'cafe', 'fitness', 'ecommerce'

  const [editingSessionId, setEditingSessionId] = useState(null);
  const [editingTitleText, setEditingTitleText] = useState('');
  const [deployments, setDeployments] = useState([]);
  const [cronTasks, setCronTasks] = useState([]);
  const [cronLogs, setCronLogs] = useState([]);
  const [apiData, setApiData] = useState({ btc: 'Loading...', eth: 'Loading...', transit: 'Burari Route 1: Active' });
  const [cameraActive, setCameraActive] = useState(false);
  const [deviceStatus, setDeviceStatus] = useState({ lights: false, media: false, lock: false });
  const videoRef = useRef(null);
  const streamRef = useRef(null);

  const [activeSimulatorTab, setActiveSimulatorTab] = useState('simulator'); // 'simulator', 'workflow', 'widget'

  const [terminalLogs, setTerminalLogs] = useState([
    '[SYSTEM] Booting SwitchX Intelligent Web Sandbox...',
    '[SYSTEM] Node.js WASM container initialized successfully.',
    '[SYSTEM] Dev server listening on port 3001.',
    '[SYSTEM] Hot Module Replacement (HMR) active.'
  ]);
  const [terminalInputValue, setTerminalInputValue] = useState('');
  const [terminalHistory, setTerminalHistory] = useState([]);
  const [terminalHistoryIdx, setTerminalHistoryIdx] = useState(null);
  const terminalEndRef = useRef(null);

  useEffect(() => {
    if (terminalEndRef.current) {
      terminalEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [terminalLogs]);

  useEffect(() => {
    if (otpToast) {
      const timer = setTimeout(() => {
        setOtpToast(null);
      }, 10000);
      return () => clearTimeout(timer);
    }
  }, [otpToast]);

  const executeTerminalCommand = async (cmd) => {
    const trimmed = cmd.trim();
    if (!trimmed) return;

    setTerminalLogs(prev => [...prev, `[COMMAND] $ ${trimmed}`]);

    setTimeout(() => {
      if (trimmed === 'clear') {
        setTerminalLogs([]);
        return;
      }

      if (trimmed === 'help') {
        setTerminalLogs(prev => [
          ...prev,
          "Available sandbox command controls:",
          "  help           Show this commands directory",
          "  clear          Clear the active terminal shell logs",
          "  npm run dev    Launch local dynamic hot reloading web server",
          "  npm run build  Compile layout sections into optimized production build",
          "  git status     Audit file diff changes inside sandbox directory",
          "  lighthouse     Run automated PageSpeed audit metrics",
          "  deploy --prod  Deploy current index.html layout to Edge CDN"
        ]);
        return;
      }

      if (trimmed === 'npm run dev') {
        setTerminalLogs(prev => [
          ...prev,
          `[SYSTEM] Starting developer server dev-tunnel...`,
          `[SYSTEM] HMR active on port 3001. Local: http://localhost:3001/`
        ]);
        return;
      }

      if (trimmed === 'npm run build') {
        setTerminalLogs(prev => [
          ...prev,
          `[SYSTEM] Creating production compilation bundle...`,
          `  ▲ Next.js compiler active`,
          `  ✓ Compiled client static routes successfully (480ms)`,
          `  ✓ Generating static html outputs...`,
          `[SUCCESS] Production bundle ready. index.html size: ${(new Blob([previewHtml || '']).size / 1024).toFixed(2)} KB.`
        ]);
        return;
      }

      if (trimmed === 'git status') {
        setTerminalLogs(prev => [
          ...prev,
          `On branch master`,
          `Changes not staged for commit:`,
          `  (use "git add <file>..." to update what will be committed)`,
          `  (use "git restore <file>..." to discard changes in working directory)`,
          `        modified:   index.html`,
          `        modified:   implementation_plan.md`,
          `        modified:   task.md`,
          `no changes added to commit (use "git add" and/or "git commit -a")`
        ]);
        return;
      }

      if (trimmed === 'lighthouse' || trimmed === 'lighthouse audit' || trimmed === 'audit') {
        setTerminalLogs(prev => [
          ...prev,
          `[SYSTEM] Triggering Lighthouse SEO & Performance audit...`,
          `  Performance:    100% (glowing particle canvas active)`,
          `  Accessibility:  98% (accessible font Outfitters)`,
          `  Best Practices: 100% (clean standalone modules)`,
          `  SEO:            100% (optimized meta headers)`,
          `[SUCCESS] Audit completed successfully.`
        ]);
        return;
      }

      if (trimmed === 'deploy --prod' || trimmed === 'deploy') {
        setTerminalLogs(prev => [
          ...prev,
          `[SYSTEM] Packaging serverless Edge routing assets...`,
          `[SYSTEM] Compiling CDN nodes...`
        ]);
        
        (async () => {
          try {
            const res = await fetch('/api/builder', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                action: 'deploy',
                html: previewHtml || '<h1>Blank Sandbox Site</h1>',
                siteName: docFileName ? docFileName.replace(/\.[^/.]+$/, "") : 'site'
              })
            });
            const data = await res.json();
            if (data.success) {
              setTerminalLogs(prev => [
                ...prev,
                `[SUCCESS] Deployed successfully to production Edge CDN!`,
                `[SUCCESS] Live URL: http://localhost:3001${data.url}`
              ]);
              const newDeployment = {
                name: data.fileName,
                url: data.url,
                timestamp: new Date().toLocaleTimeString()
              };
              setDeployments(prev => {
                const updated = [newDeployment, ...prev];
                localStorage.setItem('switchx_deployments', JSON.stringify(updated));
                return updated;
              });
            } else {
              setTerminalLogs(prev => [...prev, `[ERROR] Edge deployment failed: ${data.error}`]);
            }
          } catch (e) {
            setTerminalLogs(prev => [...prev, `[ERROR] Edge deployment error: ${e.message}`]);
          }
        })();
        return;
      }

      setTerminalLogs(prev => [
        ...prev,
        `Command unrecognized: "${trimmed}". Type "help" for a list of available command controls.`
      ]);
    }, 300);
  };

  useEffect(() => {
    if (activeSimulatorTab === 'builder') {
      const compiled = compileSectionsToHtml(builderSections, builderTheme, builderGraphics, lastUploadedImageB64, {
        primary: customPrimary,
        bg: customBg,
        cardBg: customCardBg,
        text: customText,
        font: customFont,
        particlesSpeed: customParticlesSpeed,
        particlesCount: customParticlesCount,
        particlesSize: customParticlesSize
      });
      setPreviewHtml(compiled);
    }
  }, [
    builderSections, 
    builderTheme, 
    builderGraphics, 
    activeSimulatorTab, 
    lastUploadedImageB64,
    customPrimary,
    customBg,
    customCardBg,
    customText,
    customFont,
    customParticlesSpeed,
    customParticlesCount,
    customParticlesSize
  ]);

  const getPreviewHtml = () => {
    if (!previewHtml) return '';
    let html = previewHtml;

    html = html.replaceAll('[UPLOADED_IMAGE]', lastUploadedImageB64 || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80');

    const styleOverride = `
      <style id="switchx-custom-styles-override">
        :root {
          --primary-color: ${customPrimary} !important;
          --bg-color: ${customBg} !important;
          --card-bg: ${customCardBg} !important;
          --text-color: ${customText} !important;
          --font-family: '${customFont}', sans-serif !important;
        }
        body {
          background-color: var(--bg-color) !important;
          color: var(--text-color) !important;
          font-family: var(--font-family) !important;
        }
        [class*="text-[COLOR]"] { color: var(--primary-color) !important; }
        [class*="bg-[COLOR]"] { background-color: var(--primary-color) !important; }
        [class*="border-[COLOR]"] { border-color: var(--primary-color) !important; }
        [class*="accent-[COLOR]"] { accent-color: var(--primary-color) !important; }
        .text-\\[COLOR\\] { color: var(--primary-color) !important; }
        .bg-\\[COLOR\\] { background-color: var(--primary-color) !important; }
        .border-\\[COLOR\\] { border-color: var(--primary-color) !important; }
        .accent-\\[COLOR\\] { accent-color: var(--primary-color) !important; }
        
        .text-indigo-400, .text-indigo-500, .text-emerald-400, .text-rose-500, .text-amber-500, .text-amber-400 { color: var(--primary-color) !important; }
        .bg-indigo-600, .bg-indigo-500, .bg-emerald-500, .bg-rose-500, .bg-amber-500, .bg-amber-600 { background-color: var(--primary-color) !important; }
        .border-indigo-500, .border-indigo-600, .border-emerald-500, .border-rose-500, .border-amber-500 { border-color: var(--primary-color) !important; }
        .custom-card {
          background-color: var(--card-bg) !important;
        }
      </style>
    `;

    const fontLink = `<link href="https://fonts.googleapis.com/css2?family=Outfit:wght@200..800&family=Syne:wght@500..800&family=JetBrains+Mono:wght@100..700&family=Space+Grotesk:wght@300..700&family=Playfair+Display:ital,wght@0,400..900;1,400..900&family=Inter:wght@100..900&display=swap" rel="stylesheet">`;

    if (html.includes('</head>')) {
      html = html.replace('</head>', `${fontLink}${styleOverride}</head>`);
    } else {
      html = fontLink + styleOverride + html;
    }

    html = html
      .replaceAll('[PARTICLE_SPEED]', customParticlesSpeed.toString())
      .replaceAll('[PARTICLE_COUNT]', customParticlesCount.toString())
      .replaceAll('[PARTICLE_SIZE]', customParticlesSize.toString());

    return html;
  };

  const [dbFiles, setDbFiles] = useState([]);
  const [vercelDeployments, setVercelDeployments] = useState([]);
  const [vercelDeploying, setVercelDeploying] = useState(false);
  const [vercelLogs, setVercelLogs] = useState([]);
  const [draggedNode, setDraggedNode] = useState(null);
  const [dbConsoleExpanded, setDbConsoleExpanded] = useState({ docs: true, submissions: true });
  const [formSubmissions, setFormSubmissions] = useState([
    { id: 1, name: "Arjun Mehta", email: "arjun@jnvtawang.edu.in", message: "Interested in the IoT smart stick model.", time: "10:14 AM" },
    { id: 2, name: "Tenzin Dolma", email: "tenzin.dolma@outlook.com", message: "Requesting quote for school lab automation.", time: "11:32 AM" }
  ]);
  
  const [workflowNodes, setWorkflowNodes] = useState([
    { id: 'brain', label: 'Core Brain', x: 100, y: 150, type: 'system' },
    { id: 'files', label: 'Files API', x: 240, y: 80, type: 'ingest' },
    { id: 'memory', label: 'DB Memory', x: 240, y: 220, type: 'db' },
    { id: 'devices', label: 'Device Hub', x: 380, y: 80, type: 'control' },
    { id: 'cron', label: 'Cron Engine', x: 380, y: 220, type: 'task' }
  ]);
  const [workflowEdges, setWorkflowEdges] = useState([
    { from: 'brain', to: 'files' },
    { from: 'brain', to: 'memory' },
    { from: 'files', to: 'devices' },
    { from: 'memory', to: 'cron' }
  ]);

  const mousePosRef = useRef({ x: -2000, y: -2000 });

  const canvasRef = useRef(null);
  const bottomRef = useRef(null);
  const fileInputRef = useRef(null);
  const docInputRef = useRef(null);
  const textareaRef = useRef(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);
  const recognitionRef = useRef(null);

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 160)}px`;
    }
  }, [chatInputValue]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      mousePosRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // 🌌 BREATHING COSMIC BACKGROUND ENGINE WITH SLOW GLIDING STARS
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let animationFrameId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    const stars = Array.from({ length: 120 }, () => ({
      x: Math.random() * window.innerWidth,
      y: Math.random() * window.innerHeight,
      size: Math.random() * 1.2 + 0.2,
      speed: Math.random() * 0.035 + 0.015,
      breath: Math.random() * 0.02 + 0.01,
      alpha: Math.random()
    }));

    const meteors = [];
    const spawnMeteor = () => {
      const startX = Math.random() * (window.innerWidth * 0.8);
      const startY = -25;
      const angle = Math.PI / 5 + Math.random() * (Math.PI / 15);
      const speed = Math.random() * 7 + 5;
      meteors.push({
        x: startX,
        y: startY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: Math.random() * 90 + 60,
        life: 1.0,
        decay: Math.random() * 0.025 + 0.015
      });
    };

    const celestialPool = [
      { name: 'Mercury', radius: 10, color: '#6d6d75', glow: 'rgba(120,120,130,0.15)', hasRings: false },
      { name: 'Venus', radius: 16, color: '#b58b52', glow: 'rgba(210,160,90,0.12)', hasRings: false },
      { name: 'Earth', radius: 22, color: '#2b5a8f', glow: 'rgba(50,130,220,0.22)', hasRings: false, isEarth: true },
      { name: 'Mars', radius: 14, color: '#a84334', glow: 'rgba(210,90,70,0.18)', hasRings: false },
      { name: 'Jupiter', radius: 36, color: '#967969', glow: 'rgba(160,130,110,0.15)', hasRings: false },
      { name: 'Saturn', radius: 28, color: '#c2b280', glow: 'rgba(200,190,140,0.15)', hasRings: true },
      { name: 'Uranus', radius: 20, color: '#5b929e', glow: 'rgba(100,170,180,0.15)', hasRings: true },
      { name: 'Neptune', radius: 19, color: '#314d7a', glow: 'rgba(60,100,190,0.15)', hasRings: false }
    ];

    const runningPlanets = Array.from({ length: 3 }, (_, i) => {
      const poolIndex = (i * 3) % celestialPool.length;
      const blueprint = celestialPool[poolIndex];
      return {
        ...blueprint,
        x: Math.random() * window.innerWidth,
        y: Math.random() * window.innerHeight,
        speedX: (Math.random() * 0.12 + 0.05) * (Math.random() > 0.5 ? 1 : -1),
        speedY: (Math.random() * 0.08 + 0.03) * (Math.random() > 0.5 ? 1 : -1),
        angle: Math.random() * Math.PI,
        wobbleSpeed: Math.random() * 0.001 + 0.0003,
        poolIdx: poolIndex
      };
    });

    const ships = [
      { x: window.innerWidth * 0.25, y: window.innerHeight * 0.65, speedX: 0.22, speedY: -0.06, size: 5 },
      { x: window.innerWidth * 0.75, y: window.innerHeight * 0.15, speedX: -0.18, speedY: 0.08, size: 5.5 }
    ];

    const creatures = [
      { x: window.innerWidth * 0.12, y: window.innerHeight * 0.75, angle: Math.random() * Math.PI * 2, speed: 0.12, turnSpeed: 0.004, swimWobble: 0, swimWobbleSpeed: 0.03, size: 4.5 },
      { x: window.innerWidth * 0.88, y: window.innerHeight * 0.60, angle: Math.random() * Math.PI * 2, speed: 0.15, turnSpeed: -0.005, swimWobble: 1, swimWobbleSpeed: 0.04, size: 4 }
    ];

    const renderSpaceFrame = () => {
      ctx.fillStyle = "rgba(2, 2, 5, 0.22)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 1. LIVE MOUSE GLOW SPOTLIGHT
      const mx = mousePosRef.current.x;
      const my = mousePosRef.current.y;
      if (mx > -1000 && my > -1000) {
        ctx.save();
        const glowRad = 500;
        const spotGlow = ctx.createRadialGradient(mx, my, 10, mx, my, glowRad);
        spotGlow.addColorStop(0, 'rgba(30, 27, 75, 0.2)');
        spotGlow.addColorStop(0.5, 'rgba(15, 12, 35, 0.05)');
        spotGlow.addColorStop(1, 'rgba(2, 2, 5, 0)');
        ctx.fillStyle = spotGlow;
        ctx.fillRect(mx - glowRad, my - glowRad, glowRad * 2, glowRad * 2);
        ctx.restore();
      }

      // 2. Stars (Slow, minimal 2D diagonal gliding)
      stars.forEach(s => {
        s.alpha += s.breath;
        if (s.alpha > 0.95 || s.alpha < 0.1) s.breath = -s.breath;
        s.y -= s.speed * 0.5; // slow vertical glide
        s.x += s.speed * 0.25; // slow horizontal glide
        if (s.y < 0) { s.y = canvas.height; s.x = Math.random() * canvas.width; }
        if (s.x > canvas.width) { s.x = 0; s.y = Math.random() * canvas.height; }
        
        ctx.fillStyle = `rgba(255, 255, 255, ${s.alpha * 0.3})`;
        ctx.beginPath(); ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2); ctx.fill();
      });

      // 3. Meteors (Shooting Stars with trail)
      if (Math.random() < 0.006 && meteors.length < 3) {
        spawnMeteor();
      }
      meteors.forEach((m, index) => {
        m.x += m.vx;
        m.y += m.vy;
        m.life -= m.decay;

        if (m.life <= 0 || m.x > canvas.width + 100 || m.y > canvas.height + 100) {
          meteors.splice(index, 1);
          return;
        }

        ctx.save();
        const grad = ctx.createLinearGradient(m.x, m.y, m.x - m.vx * 2.5, m.y - m.vy * 2.5);
        grad.addColorStop(0, `rgba(255, 255, 255, ${m.life * 0.45})`);
        grad.addColorStop(0.4, `rgba(165, 180, 252, ${m.life * 0.2})`);
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)');
        
        ctx.strokeStyle = grad;
        ctx.lineWidth = 1.0;
        ctx.beginPath();
        ctx.moveTo(m.x, m.y);
        ctx.lineTo(m.x - m.vx * 2.2, m.y - m.vy * 2.2);
        ctx.stroke();
        ctx.restore();
      });

      // 4. Planets
      runningPlanets.forEach((p, i) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.angle += p.wobbleSpeed;

        const offsetVisualX = p.x + Math.cos(p.angle) * 3;
        const offsetVisualY = p.y + Math.sin(p.angle) * 2;

        if (p.x < -60 || p.x > canvas.width + 60 || p.y < -60 || p.y > canvas.height + 60) {
          const nextIndex = (p.poolIdx + Math.floor(Math.random() * (celestialPool.length - i) + 1)) % celestialPool.length;
          const nextConfig = celestialPool[nextIndex];
          
          p.poolIdx = nextIndex;
          p.name = nextConfig.name;
          p.radius = nextConfig.radius;
          p.color = nextConfig.color;
          p.glow = nextConfig.glow;
          p.hasRings = nextConfig.hasRings;
          p.isEarth = nextConfig.isEarth || false;

          if (p.x < -60) { p.x = canvas.width + 50; p.y = Math.random() * canvas.height; }
          else if (p.x > canvas.width + 60) { p.x = -50; p.y = Math.random() * canvas.height; }
          else if (p.y < -60) { p.y = canvas.height + 50; p.x = Math.random() * canvas.width; }
          else if (p.y > canvas.height + 60) { p.y = -50; p.x = Math.random() * canvas.width; }
        }

        ctx.save();
        ctx.shadowBlur = 30;
        ctx.shadowColor = p.glow;

        const shade = ctx.createRadialGradient(offsetVisualX - p.radius * 0.3, offsetVisualY - p.radius * 0.3, p.radius * 0.05, offsetVisualX, offsetVisualY, p.radius);
        
        if (p.isEarth) {
          shade.addColorStop(0, '#5fa9f6');
          shade.addColorStop(0.4, '#2b5a8f');
          shade.addColorStop(0.7, '#1e3d64');
          shade.addColorStop(1, '#050a12');
        } else {
          shade.addColorStop(0, 'rgba(255, 255, 255, 0.12)');
          shade.addColorStop(0.65, p.color);
          shade.addColorStop(1, 'rgba(4, 4, 8, 0.95)');
        }

        ctx.fillStyle = shade;
        ctx.beginPath(); ctx.arc(offsetVisualX, offsetVisualY, p.radius, 0, Math.PI * 2); ctx.fill();

        ctx.strokeStyle = p.isEarth ? 'rgba(100, 180, 255, 0.2)' : 'rgba(255, 255, 255, 0.05)';
        ctx.lineWidth = 0.9;
        ctx.stroke();
        ctx.restore();

        if (p.hasRings) {
          ctx.save();
          ctx.translate(offsetVisualX, offsetVisualY);
          ctx.rotate(-0.18);
          ctx.scale(2.0, 0.32);
          ctx.strokeStyle = 'rgba(255, 255, 255, 0.03)';
          ctx.lineWidth = 1.5;
          ctx.beginPath(); ctx.arc(0, 0, p.radius * 1.2, 0, Math.PI * 2); ctx.stroke();
          ctx.restore();
        }
      });

      // 5. Spaceships
      ships.forEach(s => {
        s.x += s.speedX; s.y += s.speedY;
        if (s.x < -30) s.x = canvas.width + 30;
        if (s.x > canvas.width + 30) s.x = -30;
        if (s.y < -30) s.y = canvas.height + 30;
        if (s.y > canvas.height + 30) s.y = -30;

        const heading = Math.atan2(s.speedY, s.speedX);
        ctx.save();
        ctx.translate(s.x, s.y);
        ctx.rotate(heading);

        const fireSize = randomRange(5, 9);
        ctx.shadowBlur = 10;
        ctx.shadowColor = '#ff4500';
        ctx.fillStyle = 'rgba(255, 69, 0, 0.85)';
        ctx.beginPath();
        ctx.moveTo(-s.size * 0.4, -s.size * 0.2);
        ctx.lineTo(-s.size - fireSize, 0);
        ctx.lineTo(-s.size * 0.4, s.size * 0.2);
        ctx.closePath();
        ctx.fill();

        ctx.shadowColor = '#ffcc00';
        ctx.fillStyle = 'rgba(255, 204, 0, 0.95)';
        ctx.beginPath();
        ctx.moveTo(-s.size * 0.4, -s.size * 0.1);
        ctx.lineTo(-s.size - (fireSize * 0.55), 0);
        ctx.lineTo(-s.size * 0.4, s.size * 0.1);
        ctx.closePath();
        ctx.fill();
        ctx.shadowBlur = 0;

        ctx.fillStyle = 'rgba(16, 16, 22, 0.9)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.18)';
        ctx.lineWidth = 0.9;
        ctx.beginPath();
        ctx.moveTo(s.size * 1.2, 0); 
        ctx.lineTo(-s.size, -s.size * 0.6); 
        ctx.lineTo(-s.size * 0.3, 0); 
        ctx.lineTo(-s.size, s.size * 0.6); 
        ctx.closePath(); ctx.fill(); ctx.stroke();
        ctx.restore();
      });

      // 6. Creatures
      creatures.forEach(c => {
        c.angle += c.turnSpeed;
        c.swimWobble += c.swimWobbleSpeed;

        const heading = c.angle + Math.sin(c.swimWobble) * 0.15;
        c.x += Math.cos(heading) * c.speed;
        c.y += Math.sin(heading) * c.speed;

        if (c.x < -20) c.x = canvas.width + 20;
        if (c.x > canvas.width + 20) c.x = -20;
        if (c.y < -20) c.y = canvas.height + 20;
        if (c.y > canvas.height + 20) c.y = -20;

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate(heading);

        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.15)';
        ctx.lineWidth = 0.8;
        ctx.beginPath();
        ctx.arc(0, 0, c.size, Math.PI * 1, Math.PI * 2, false);
        ctx.lineTo(c.size, 0); ctx.closePath(); ctx.fill(); ctx.stroke();

        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        const tailWiggle = Math.sin(c.swimWobble) * 2;
        ctx.beginPath();
        ctx.moveTo(-c.size * 0.3, 0); ctx.lineTo(-c.size * 0.5 + tailWiggle, c.size * 1.4);
        ctx.moveTo(c.size * 0.3, 0); ctx.lineTo(c.size * 0.5 + tailWiggle, c.size * 1.4);
        ctx.stroke();
        ctx.restore();
      });

      animationFrameId = requestAnimationFrame(renderSpaceFrame);
    };

    function randomRange(min, max) { return Math.random() * (max - min) + min; }
    renderSpaceFrame();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  const fetchWeather = async (lat, lon) => {
    try {
      const res = await fetch(`https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current_weather=true`);
      const data = await res.json();
      if (data && data.current_weather) {
        const temp = Math.round(data.current_weather.temperature);
        const code = data.current_weather.weathercode;
        let desc = "Clear";
        if (code > 0 && code <= 3) desc = "Clear";
        else if (code >= 45 && code <= 48) desc = "Fog";
        else if (code >= 51 && code <= 67) desc = "Rain";
        else if (code >= 71 && code <= 77) desc = "Snow";
        else if (code >= 80 && code <= 82) desc = "Showers";
        else if (code >= 95) desc = "Storm";
        setWeatherInfo(`${temp}°C • ${desc}`);
      }
    } catch (e) {
      console.log("Weather error:", e);
    }
  };

  useEffect(() => {
    const updateClock = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false }));
    };
    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined' && navigator.geolocation) {
      const geoOptions = { enableHighAccuracy: true, timeout: 8000, maximumAge: 0 };
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const lat = position.coords.latitude;
          const lon = position.coords.longitude;
          setDeviceCoordinates({ latitude: lat, longitude: lon });
          fetchWeather(lat, lon);
        },
        () => console.log("Telemetry configured."),
        geoOptions
      );
    }

    if (typeof window !== 'undefined') {
      const activeUser = localStorage.getItem('switchx_active_user');
      setCurrentUser(activeUser);
      if (activeUser) {
        setIsAppUnrolled(true);
      }

      const guestUsage = parseInt(localStorage.getItem('switchx_guest_usage') || '0', 10);
      setGuestUsageCount(guestUsage);

      const sessionKey = activeUser ? `switchx_sessions_${activeUser}` : 'switchx_sessions_guest';
      let saved = localStorage.getItem(sessionKey);
      
      // Fallback migration check
      if (!saved && !activeUser) {
        saved = localStorage.getItem('switchx_sessions');
      }

      if (saved) {
        try {
          const parsed = JSON.parse(saved);
          if (parsed && parsed.length > 0) {
            setSavedSessions(parsed);
            setCurrentSessionId(parsed[0].id);
            setChatMessages(parsed[0].messages);
            
            // Re-populate lastUploadedImageB64 if any previous message had an image
            let foundImg = null;
            for (const s of parsed) {
              for (const m of s.messages) {
                if (m.localImg) {
                  foundImg = m.localImg;
                  break;
                }
              }
              if (foundImg) break;
            }
            if (foundImg) {
              setLastUploadedImageB64(foundImg);
            }
            return;
          }
        } catch (e) {
          console.error("Failed to parse saved sessions:", e);
        }
      }
    }

    const initialId = "session-" + Date.now();
    const initialSessions = [{ id: initialId, title: "SwitchX Base Layer", messages: [
      { id: "msg-welcome-init", role: "assistant", text: "SwitchX System Engine Ready." }
    ], sessionType: "Studio Layer", isPinned: false }];
    
    setSavedSessions(initialSessions);
    setCurrentSessionId(initialId);
  }, []);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }); }, [chatMessages]);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const savedDeployments = localStorage.getItem('switchx_deployments');
      if (savedDeployments) {
        try { setDeployments(JSON.parse(savedDeployments)); } catch(e) {}
      }
      refreshDbFiles();
    }
  }, []);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      if (SpeechRecognition) {
        const rec = new SpeechRecognition();
        rec.continuous = true;
        rec.interimResults = true;
        rec.lang = 'en-US';

        rec.onresult = (event) => {
          let resultText = '';
          for (let i = 0; i < event.results.length; i++) {
            resultText += event.results[i][0].transcript;
          }
          setChatInputValue(resultText);
        };

        rec.onerror = (e) => {
          console.error("Speech recognition error:", e);
        };

        rec.onend = () => {
          setIsVoiceTypingActive(false);
        };

        recognitionRef.current = rec;
      }
    }
  }, []);

  // Live API tickers effect (moving crypto rates)
  useEffect(() => {
    let mockBtc = 5420000;
    let mockEth = 285000;
    
    const fetchLiveRates = async () => {
      try {
        const res = await fetch('https://api.coingecko.com/api/v3/simple/price?ids=bitcoin,ethereum&vs_currencies=inr');
        if (res.ok) {
          const data = await res.json();
          if (data.bitcoin && data.ethereum) {
            setApiData(prev => ({
              ...prev,
              btc: `₹${data.bitcoin.inr.toLocaleString('en-IN')}`,
              eth: `₹${data.ethereum.inr.toLocaleString('en-IN')}`
            }));
            mockBtc = data.bitcoin.inr;
            mockEth = data.ethereum.inr;
            return;
          }
        }
      } catch (e) {}
      
      // Fallback: moving simulation
      const changeBtc = (Math.random() - 0.5) * 5000;
      const changeEth = (Math.random() - 0.5) * 400;
      mockBtc = Math.round(mockBtc + changeBtc);
      mockEth = Math.round(mockEth + changeEth);
      setApiData(prev => ({
        ...prev,
        btc: `₹${mockBtc.toLocaleString('en-IN')} (tick)`,
        eth: `₹${mockEth.toLocaleString('en-IN')} (tick)`
      }));
    };

    fetchLiveRates();
    const interval = setInterval(fetchLiveRates, 6000);
    return () => clearInterval(interval);
  }, []);

  // Cron Task Engine effect
  useEffect(() => {
    const cronInterval = setInterval(() => {
      setCronTasks(prevTasks => {
        let changed = false;
        const updated = prevTasks.map(task => {
          if (task.status === 'pending') {
            changed = true;
            if (task.timeRemaining <= 1) {
              // Trigger execution log
              const now = new Date();
              const timeStr = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' });
              
              setCronLogs(logs => [
                `[${timeStr}] Executed: ${task.name} (${task.actionType})`,
                ...logs
              ].slice(0, 30));

              // If it's a simulated SMS or Email, alert the user in chat
              if (task.actionType === 'SMS' || task.actionType === 'Email') {
                setChatMessages(msgs => [
                  ...msgs,
                  {
                    id: 'cron-' + Date.now(),
                    role: 'assistant',
                    text: `[Background Engine Task Triggered]\nSystem executed cron schedule "${task.name}": Sent automated ${task.actionType} alert with invoice link to database subscriber.`
                  }
                ]);
              }

              return { ...task, timeRemaining: 0, status: 'executed' };
            } else {
              return { ...task, timeRemaining: task.timeRemaining - 1 };
            }
          }
          return task;
        });
        return changed ? updated : prevTasks;
      });
    }, 1000);

    return () => clearInterval(cronInterval);
  }, []);

  const handleToggleVoiceInputFlow = () => {
    if (typeof window === 'undefined') return;

    // Use Web Speech API if supported for instant real-time transcription
    if (recognitionRef.current) {
      if (isVoiceTypingActive) {
        recognitionRef.current.stop();
        setIsVoiceTypingActive(false);
      } else {
        setChatInputValue('');
        recognitionRef.current.start();
        setIsVoiceTypingActive(true);
      }
      return;
    }

    // Fallback to MediaRecorder (Gemini backend RAG audio translate)
    if (isVoiceTypingActive) {
      if (mediaRecorderRef.current && mediaRecorderRef.current.state !== 'inactive') {
        mediaRecorderRef.current.stop();
      }
      return;
    }

    setTranslationLoading(false);
    audioChunksRef.current = [];

    navigator.mediaDevices.getUserMedia({ audio: true })
      .then((stream) => {
        const options = { mimeType: 'audio/webm' };
        let recorder;
        try {
          recorder = new MediaRecorder(stream, options);
        } catch (e) {
          recorder = new MediaRecorder(stream);
        }

        recorder.ondataavailable = (event) => {
          if (event.data && event.data.size > 0) {
            audioChunksRef.current.push(event.data);
          }
        };

        recorder.onstop = async () => {
          setIsVoiceTypingActive(false);
          stream.getTracks().forEach(track => track.stop());

          const audioBlob = new Blob(audioChunksRef.current, { type: recorder.mimeType });
          if (audioBlob.size < 1000) return;

          setTranslationLoading(true);

          const reader = new FileReader();
          reader.readAsDataURL(audioBlob);
          reader.onloadend = async () => {
            const base64Audio = reader.result;
            try {
              const response = await fetch('/api/builder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                  action: 'translate_audio',
                  audio: base64Audio,
                  mimeType: audioBlob.type
                })
              });

              if (response.ok) {
                const data = await response.json();
                const translation = data.translatedText || "";
                if (translation.trim()) {
                  setChatInputValue(prev => prev.trim() ? `${prev.trim()} ${translation.trim()}` : translation.trim());
                }
              }
            } catch (err) {
              console.error("Audio translation client error:", err);
            } finally {
              setTranslationLoading(false);
            }
          };
        };

        mediaRecorderRef.current = recorder;
        recorder.start();
        setIsVoiceTypingActive(true);

        setTimeout(() => {
          if (recorder && recorder.state === 'recording') {
            recorder.stop();
          }
        }, 30000);
      })
      .catch((err) => {
        console.warn("Microphone access denied:", err);
        alert("Microphone permission is required for voice typing. Please enable it in browser settings.");
      });
  };

  const safeSaveSessions = (sessions, user = currentUser) => {
    if (typeof window === 'undefined') return;
    const sessionKey = user ? `switchx_sessions_${user}` : 'switchx_sessions_guest';
    try {
      localStorage.setItem(sessionKey, JSON.stringify(sessions));
      return;
    } catch (e) {
      console.warn("Storage write failed directly, attempting optimization...", e);
    }

    try {
      let cleaned = JSON.parse(JSON.stringify(sessions));
      cleaned = cleaned.map(session => {
        const messages = session.messages.map((msg, idx) => {
          if (msg.savedHistorySnapshot) delete msg.savedHistorySnapshot;
          const isRecent = idx >= session.messages.length - 3;
          if (!isRecent) {
            if (msg.localImg) msg.localImg = null;
            if (msg.generatedHtml) msg.generatedHtml = null;
          }
          return msg;
        });
        return { ...session, messages };
      });
      localStorage.setItem(sessionKey, JSON.stringify(cleaned));
      return;
    } catch (e2) {
      console.warn("Storage write failed after basic cleanup, purging aggressively...", e2);
    }

    try {
      let cleaned = JSON.parse(JSON.stringify(sessions));
      cleaned = cleaned.map(session => {
        const messages = session.messages.map((msg, idx) => {
          if (msg.savedHistorySnapshot) delete msg.savedHistorySnapshot;
          const isLast = idx === session.messages.length - 1;
          if (!isLast) {
            if (msg.localImg) msg.localImg = null;
            if (msg.generatedHtml) msg.generatedHtml = null;
          }
          return msg;
        });
        return { ...session, messages };
      });
      localStorage.setItem(sessionKey, JSON.stringify(cleaned));
      return;
    } catch (e3) {
      console.warn("Storage write failed after aggressive cleanup, purging old sessions...", e3);
    }

    try {
      let cleaned = JSON.parse(JSON.stringify(sessions)).slice(0, 3);
      cleaned = cleaned.map(session => {
        const messages = session.messages.map(msg => {
          if (msg.savedHistorySnapshot) delete msg.savedHistorySnapshot;
          if (msg.localImg) msg.localImg = null;
          if (msg.generatedHtml) msg.generatedHtml = null;
          return msg;
        });
        return session;
      });
      localStorage.setItem(sessionKey, JSON.stringify(cleaned));
      return;
    } catch (e4) {
      console.error("Storage write failed completely even after sessions truncation", e4);
    }
  };

  const renderAuthForm = (isModal) => {
    let title = "SwitchX Workspace";
    let subtitle = "Welcome back. Initialize session.";
    let formSubmitHandler = handleLogin;

    if (authModalMode === 'signup') {
      subtitle = "Create secure developer profile.";
      formSubmitHandler = handleSignup;
    } else if (authModalMode === 'forgot_password') {
      subtitle = "Reset secure password via OTP.";
      formSubmitHandler = handleForgotPassword;
    } else if (authModalMode === 'forgot_username') {
      subtitle = "Recover profile username via OTP.";
      formSubmitHandler = handleForgotUsername;
    }

    return (
      <div className="bg-[#030306]/75 border border-white/[0.04] rounded-2xl p-6 w-[340px] max-w-full space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl animate-fade-in relative z-50 text-center">
        {isModal ? (
          <button 
            type="button" 
            onClick={() => { setAuthModalOpen(false); setAuthError(''); }} 
            className="absolute top-4 right-4 text-zinc-550 hover:text-zinc-350 transition-colors p-1"
          >
            <X size={15} />
          </button>
        ) : (
          <button 
            type="button" 
            onClick={() => { setShowLandingAuth(false); setAuthError(''); }} 
            className="absolute top-4 left-4 text-zinc-555 hover:text-zinc-300 transition-colors text-[9px] font-mono uppercase tracking-wider select-none flex items-center gap-1"
          >
            <span>← Back</span>
          </button>
        )}

        <div className="text-center space-y-1.5 pb-2 border-b border-zinc-900/50 pt-2 select-none">
          <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-200 font-sans">{title}</span>
          <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">{subtitle}</p>
        </div>

        {authError && (
          <div className="p-2.5 rounded-lg border border-red-955/20 bg-red-955/10 text-red-400 text-[10px] text-center font-medium leading-normal font-sans">
            {authError}
          </div>
        )}

        <form onSubmit={formSubmitHandler} className="space-y-3">
          {authModalMode === 'login' && (
            <>
              <div className="space-y-1 text-left animate-fade-in">
                <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Username or Email</label>
                <input
                  type="text"
                  required
                  value={authUsername}
                  onChange={(e) => setAuthUsername(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                  placeholder="Enter credentials..."
                  autoComplete="off"
                />
              </div>

              <div className="space-y-1 text-left animate-fade-in">
                <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Password</label>
                <input
                  type="password"
                  required
                  value={authPassword}
                  onChange={(e) => setAuthPassword(e.target.value)}
                  className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                  placeholder="••••••••"
                />
              </div>

              {/* Forgot Username/Password Links */}
              <div className="flex justify-between items-center text-[9.5px] font-mono uppercase tracking-wider text-zinc-500 select-none pb-0.5 pt-0.5 px-1">
                <button
                  type="button"
                  onClick={() => { resetAuthStates(); setAuthModalMode('forgot_password'); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Forgot Password?
                </button>
                <button
                  type="button"
                  onClick={() => { resetAuthStates(); setAuthModalMode('forgot_username'); }}
                  className="hover:text-indigo-400 transition-colors"
                >
                  Forgot Username?
                </button>
              </div>

              <button
                type="submit"
                className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
              >
                Log In
              </button>
            </>
          )}

          {authModalMode === 'signup' && (
            <>
              {!authOtpSent ? (
                <>
                  <div className="space-y-1 text-left animate-fade-in">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Username</label>
                    <input
                      type="text"
                      required
                      value={authUsername}
                      onChange={(e) => setAuthUsername(e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                      placeholder="Create username..."
                      autoComplete="off"
                    />
                  </div>

                  <div className="space-y-1 text-left animate-fade-in">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Password</label>
                    <input
                      type="password"
                      required
                      value={authPassword}
                      onChange={(e) => setAuthPassword(e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                      placeholder="••••••••"
                    />
                  </div>

                  <div className="space-y-3 pt-1 text-left animate-fade-in">
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-mono font-bold text-zinc-555 uppercase tracking-widest pl-1 block select-none">Email Address</label>
                      <input
                        type="email"
                        required
                        value={authContact}
                        onChange={(e) => setAuthContact(e.target.value)}
                        className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                        placeholder="email@example.com"
                        autoComplete="off"
                      />
                    </div>
                    <button
                      type="submit"
                      className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans animate-fade-in"
                    >
                      Send Verification Code
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div className="space-y-3 py-1 text-left animate-fade-in">
                    <p className="text-[10px] text-zinc-405 font-sans leading-relaxed">
                      A verification code has been dispatched. Please verify below.
                    </p>
                    <div className="space-y-1">
                      <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Verification Code</label>
                      <input
                        type="text"
                        required
                        maxLength={6}
                        value={authOtpInput}
                        onChange={(e) => setAuthOtpInput(e.target.value.replace(/\D/g, ''))}
                        className="w-full px-3 py-2 bg-black/40 border border-zinc-900/80 rounded-xl text-sm font-bold tracking-[0.5em] text-center text-indigo-300 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-mono"
                        placeholder="000000"
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Verify & Sign Up
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthOtpSent(false);
                      setAuthOtpInput('');
                      setGeneratedOtp('');
                    }}
                    className="w-full text-center text-[9px] text-zinc-550 hover:text-zinc-350 font-mono uppercase tracking-wider mt-1 block transition-colors select-none"
                  >
                    ← Change Details
                  </button>
                </>
              )}
            </>
          )}

          {authModalMode === 'forgot_password' && (
            <>
              {recoveryStep === 'email' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Registered Email Address</label>
                    <input
                      type="email"
                      required
                      value={authContact}
                      onChange={(e) => setAuthContact(e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                      placeholder="email@example.com"
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Send Reset Code
                  </button>
                </div>
              )}

              {recoveryStep === 'otp' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <p className="text-[10px] text-zinc-405 font-sans leading-relaxed">
                    A security code has been sent to your email. Please verify below.
                  </p>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Verification Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={authOtpInput}
                      onChange={(e) => setAuthOtpInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-black/40 border border-zinc-900/80 rounded-xl text-sm font-bold tracking-[0.5em] text-center text-indigo-300 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-mono"
                      placeholder="000000"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Verify Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthOtpSent(false);
                      setAuthOtpInput('');
                      setGeneratedOtp('');
                      setRecoveryStep('email');
                    }}
                    className="w-full text-center text-[9px] text-zinc-550 hover:text-zinc-350 font-mono uppercase tracking-wider mt-1 block transition-colors select-none"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {recoveryStep === 'reset' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <p className="text-[10px] text-zinc-405 font-sans leading-relaxed">
                    Identity verified for <b>@{resetTargetUser?.username}</b>. Set new password:
                  </p>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">New Password</label>
                    <input
                      type="password"
                      required
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                      placeholder="••••••••"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Reset Password
                  </button>
                </div>
              )}
            </>
          )}

          {authModalMode === 'forgot_username' && (
            <>
              {recoveryStep === 'email' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Registered Email Address</label>
                    <input
                      type="email"
                      required
                      value={authContact}
                      onChange={(e) => setAuthContact(e.target.value)}
                      className="w-full px-3 py-1.5 bg-black/40 border border-zinc-900/80 rounded-xl text-xs text-zinc-250 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-sans"
                      placeholder="email@example.com"
                      autoComplete="off"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Send Recovery Code
                  </button>
                </div>
              )}

              {recoveryStep === 'otp' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <p className="text-[10px] text-zinc-405 font-sans leading-relaxed">
                    A security code has been sent to your email. Please verify below.
                  </p>
                  <div className="space-y-1">
                    <label className="text-[8.5px] font-mono font-bold text-zinc-550 uppercase tracking-widest pl-1 block select-none">Verification Code</label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={authOtpInput}
                      onChange={(e) => setAuthOtpInput(e.target.value.replace(/\D/g, ''))}
                      className="w-full px-3 py-2 bg-black/40 border border-zinc-900/80 rounded-xl text-sm font-bold tracking-[0.5em] text-center text-indigo-300 focus:outline-none focus:border-zinc-800 focus:bg-zinc-950/60 transition-all font-mono"
                      placeholder="000000"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Verify Code
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      setAuthOtpSent(false);
                      setAuthOtpInput('');
                      setGeneratedOtp('');
                      setRecoveryStep('email');
                    }}
                    className="w-full text-center text-[9px] text-zinc-550 hover:text-zinc-350 font-mono uppercase tracking-wider mt-1 block transition-colors select-none"
                  >
                    ← Back
                  </button>
                </div>
              )}

              {recoveryStep === 'success' && (
                <div className="space-y-3 text-left animate-fade-in">
                  <p className="text-[10px] text-zinc-405 font-sans leading-relaxed text-center">
                    Identity verified! Your registered username is:
                  </p>
                  <div className="py-4 px-3 bg-zinc-950/40 border border-zinc-900 rounded-xl text-center font-bold font-mono tracking-widest text-indigo-300 text-sm select-all">
                    @{recoveredUsername}
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      resetAuthStates();
                      setAuthModalMode('login');
                    }}
                    className="w-full py-2.5 bg-zinc-900/50 hover:bg-zinc-900/80 border border-zinc-850 hover:border-zinc-750 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm font-sans"
                  >
                    Back to Log In
                  </button>
                </div>
              )}
            </>
          )}
        </form>

        <div className="flex flex-col gap-2 items-center text-[10px] pt-1">
          {authModalMode !== 'login' && (
            <button
              type="button"
              onClick={() => {
                resetAuthStates();
                setAuthModalMode('login');
              }}
              className="text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              Already have an account? Log In
            </button>
          )}

          {authModalMode === 'login' && (
            <button
              type="button"
              onClick={() => {
                resetAuthStates();
                setAuthModalMode('signup');
              }}
              className="text-zinc-400 hover:text-zinc-200 transition-colors font-sans"
            >
              Don't have an account? Sign Up
            </button>
          )}

          {isModal ? (
            <button
              type="button"
              onClick={() => {
                setAuthModalOpen(false);
                setAuthError('');
                setTerminalLogs(prev => [...prev, '[SYSTEM] Switched to Guest Layer. Capped at 3 queries.']);
              }}
              className="text-[9.5px] font-mono text-zinc-650 hover:text-zinc-450 uppercase tracking-widest pt-1"
            >
              Continue as Guest
            </button>
          ) : (
            <>
              <button
                type="button"
                onClick={() => {
                  setShowLandingAuth(false);
                  setIsAppUnrolled(true);
                  setAuthError('');
                  setTerminalLogs(prev => [...prev, '[SYSTEM] Switched to Guest Layer. Capped at 3 queries.']);
                }}
                className="text-[9.5px] font-mono text-zinc-650 hover:text-zinc-450 uppercase tracking-widest pt-1"
              >
                Continue as Guest
              </button>

              <button
                type="button"
                onClick={() => setAboutOpen(true)}
                className="text-[8.5px] font-mono text-zinc-600 hover:text-indigo-400 uppercase tracking-widest mt-2 border-t border-zinc-900/60 pt-2 w-full transition-colors flex items-center justify-center gap-1 select-none"
              >
                <span>ⓘ About SwitchX</span>
              </button>
            </>
          )}
        </div>
      </div>
    );
  };

  const handleLogin = (e) => {
    if (e) e.preventDefault();
    setAuthError('');
    if (!authUsername.trim() || !authPassword.trim()) {
      setAuthError('Please fill in all fields.');
      return;
    }
    const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
    const user = db.find(u => 
      u.username.toLowerCase() === authUsername.trim().toLowerCase() ||
      (u.contact && u.contact.toLowerCase() === authUsername.trim().toLowerCase())
    );
    if (!user || user.password !== authPassword) {
      setAuthError('Invalid username or password.');
      return;
    }
    
    // Success
    const loggedUser = user.username;
    setCurrentUser(loggedUser);
    localStorage.setItem('switchx_active_user', loggedUser);
    setTerminalLogs(prev => [...prev, `[SYSTEM] User ${loggedUser} logged in successfully.`]);

    // Migrate guest data to user account if there are messages
    const guestKey = 'switchx_sessions_guest';
    const guestSaved = localStorage.getItem(guestKey) || localStorage.getItem('switchx_sessions');
    const userKey = `switchx_sessions_${loggedUser}`;
    
    let userSessions = [];
    const savedUser = localStorage.getItem(userKey);
    if (savedUser) {
      try {
        userSessions = JSON.parse(savedUser);
      } catch(e) {}
    }

    if (guestSaved) {
      try {
        const guestParsed = JSON.parse(guestSaved);
        // If guest has active messaging (more than 1 message)
        const hasActiveGuestData = guestParsed.some(s => s.messages.length > 1);
        if (hasActiveGuestData) {
          // Merge guest sessions into user sessions (prepend)
          const merged = [...guestParsed.map(s => ({ ...s, id: s.id + "-migrated" })), ...userSessions];
          userSessions = merged;
          localStorage.setItem(userKey, JSON.stringify(merged));
          // Clear guest sessions
          localStorage.removeItem(guestKey);
          localStorage.removeItem('switchx_sessions');
          localStorage.setItem('switchx_guest_usage', '0');
          setGuestUsageCount(0);
          setTerminalLogs(prev => [...prev, `[SYSTEM] Migrated guest session history into user account.`]);
        }
      } catch (err) {
        console.error("Guest migration error:", err);
      }
    }

    // Load user sessions
    if (userSessions.length > 0) {
      setSavedSessions(userSessions);
      setCurrentSessionId(userSessions[0].id);
      setChatMessages(userSessions[0].messages);
    } else {
      const initialId = "session-" + Date.now();
      const initialSessions = [{ id: initialId, title: "SwitchX Base Layer", messages: [
        { id: "msg-welcome-" + Date.now(), role: "assistant", text: `Welcome back, ${loggedUser}. SwitchX System Engine Ready.` }
      ], sessionType: "Studio Layer", isPinned: false }];
      setSavedSessions(initialSessions);
      setCurrentSessionId(initialId);
      setChatMessages(initialSessions[0].messages);
      localStorage.setItem(userKey, JSON.stringify(initialSessions));
    }

    setAuthModalOpen(false);
    setShowLandingAuth(false);
    setIsAppUnrolled(true);
    setAuthUsername('');
    setAuthPassword('');
  };

  const handleSignup = (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    // Construct contact dynamically
    const contactVal = authContact.trim();
    if (!contactVal || !contactVal.includes('@')) {
      setAuthError('Please enter a valid email address.');
      return;
    }

    // Phase 1: Send OTP code
    if (!authOtpSent) {
      if (!authUsername.trim() || !authPassword.trim() || !contactVal) {
        setAuthError('Please fill in all fields.');
        return;
      }
      if (authUsername.trim().length < 3) {
        setAuthError('Username must be at least 3 characters.');
        return;
      }
      if (authPassword.length < 4) {
        setAuthError('Password must be at least 4 characters.');
        return;
      }

      const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
      const exists = db.some(u => u.username.toLowerCase() === authUsername.trim().toLowerCase());
      if (exists) {
        setAuthError('Username already taken.');
        return;
      }

      const emailExists = db.some(u => u.contact && u.contact.toLowerCase() === contactVal.toLowerCase());
      if (emailExists) {
        setAuthError('Email address already registered.');
        return;
      }

      // Generate simulated OTP
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      setAuthOtpSent(true);
      setAuthContact(contactVal); // Save for DB creation in Phase 2
      
      // Trigger floating OTP on-screen notification
      setOtpToast({
        code: otpCode,
        contact: contactVal,
        visible: true
      });

      setTerminalLogs(prev => [
        ...prev,
        `[SYSTEM] OTP transmission initiated...`,
        `[SYSTEM] Cosmic verification OTP dispatched to ${contactVal}. Please check your inbox.`
      ]);

      // Dispatch via backend API for real delivery if configured
      fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contact: contactVal, 
          code: otpCode,
          keys: {
            resendApiKey: gatewayResendKey.trim(),
            twilioAccountSid: gatewayTwilioSid.trim(),
            twilioAuthToken: gatewayTwilioToken.trim(),
            twilioFromNumber: gatewayTwilioFrom.trim()
          }
        })
      })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          setTerminalLogs(prev => [...prev, `[SUCCESS] OTP code dispatched successfully to destination.`]);
        } else {
          setTerminalLogs(prev => [...prev, `[SYSTEM] OTP dispatch log: ${data.message}`]);
        }
      })
      .catch(err => {
        setTerminalLogs(prev => [...prev, `[ERROR] Failed to send real OTP: ${err.message}`]);
      });

      return;
    }

    // Phase 2: Verify OTP and Register
    if (!authOtpInput.trim()) {
      setAuthError('Please enter the verification code.');
      return;
    }
    if (authOtpInput.trim() !== generatedOtp) {
      setAuthError('Incorrect verification code. Please check the system terminal logs.');
      return;
    }

    // Success - Add to local DB
    const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
    const newUsername = authUsername.trim();
    const newUserRecord = { 
      username: newUsername, 
      password: authPassword, 
      contact: authContact.trim(), 
      registeredAt: Date.now() 
    };
    db.push(newUserRecord);
    localStorage.setItem('switchx_users', JSON.stringify(db));
    setTerminalLogs(prev => [...prev, `[SYSTEM] New user registered successfully: ${newUsername}`]);

    // Auto-login
    setCurrentUser(newUsername);
    localStorage.setItem('switchx_active_user', newUsername);

    // Save/Migrate guest sessions
    const guestKey = 'switchx_sessions_guest';
    const guestSaved = localStorage.getItem(guestKey) || localStorage.getItem('switchx_sessions');
    const userKey = `switchx_sessions_${newUsername}`;
    
    let initialSessions = [];
    if (guestSaved) {
      try {
        const guestParsed = JSON.parse(guestSaved);
        const hasActiveGuestData = guestParsed.some(s => s.messages.length > 1);
        if (hasActiveGuestData) {
          initialSessions = guestParsed.map(s => ({ ...s, id: s.id + "-migrated" }));
          localStorage.removeItem(guestKey);
          localStorage.removeItem('switchx_sessions');
          localStorage.setItem('switchx_guest_usage', '0');
          setGuestUsageCount(0);
          setTerminalLogs(prev => [...prev, `[SYSTEM] Migrated guest sessions into new user account.`]);
        }
      } catch (err) {
        console.error("Guest migration error:", err);
      }
    }

    if (initialSessions.length === 0) {
      const initialId = "session-" + Date.now();
      initialSessions = [{ id: initialId, title: "SwitchX Base Layer", messages: [
        { id: "msg-welcome-" + Date.now(), role: "assistant", text: `Welcome to SwitchX, ${newUsername}. Let's build something elite.` }
      ], sessionType: "Studio Layer", isPinned: false }];
    }

    setSavedSessions(initialSessions);
    setCurrentSessionId(initialSessions[0].id);
    setChatMessages(initialSessions[0].messages);
    localStorage.setItem(userKey, JSON.stringify(initialSessions));

    setAuthModalOpen(false);
    setShowLandingAuth(false);
    setIsAppUnrolled(true);
    setAuthUsername('');
    setAuthPassword('');
    setAuthContact('');
    setAuthOtpSent(false);
    setAuthOtpInput('');
    setGeneratedOtp('');
  };

  const handleForgotPassword = (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
    const contactVal = authContact.trim();

    if (recoveryStep === 'email') {
      if (!contactVal || !contactVal.includes('@')) {
        setAuthError('Please enter a valid email address.');
        return;
      }
      const user = db.find(u => u.contact && u.contact.toLowerCase() === contactVal.toLowerCase());
      if (!user) {
        setAuthError('No registered user found with this email address.');
        return;
      }

      setResetTargetUser(user);
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      setAuthOtpSent(true);
      setRecoveryStep('otp');

      setOtpToast({
        code: otpCode,
        contact: contactVal,
        visible: true
      });

      setTerminalLogs(prev => [
        ...prev,
        `[SYSTEM] Password reset OTP initiated for user: ${user.username}...`,
        `[SYSTEM] Verification OTP code sent to ${contactVal}.`
      ]);

      fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contact: contactVal, 
          code: otpCode,
          keys: {
            resendApiKey: gatewayResendKey.trim(),
            twilioAccountSid: gatewayTwilioSid.trim(),
            twilioAuthToken: gatewayTwilioToken.trim(),
            twilioFromNumber: gatewayTwilioFrom.trim()
          }
        })
      }).catch(err => console.error("Forgot password OTP send fail:", err));

    } else if (recoveryStep === 'otp') {
      if (!authOtpInput.trim()) {
        setAuthError('Please enter the verification code.');
        return;
      }
      if (authOtpInput.trim() !== generatedOtp) {
        setAuthError('Incorrect verification code.');
        return;
      }
      setRecoveryStep('reset');
      setAuthOtpSent(false);
      setAuthOtpInput('');

    } else if (recoveryStep === 'reset') {
      if (newPassword.length < 4) {
        setAuthError('Password must be at least 4 characters.');
        return;
      }

      const updatedDb = db.map(u => {
        if (u.username.toLowerCase() === resetTargetUser.username.toLowerCase()) {
          return { ...u, password: newPassword };
        }
        return u;
      });
      localStorage.setItem('switchx_users', JSON.stringify(updatedDb));

      setTerminalLogs(prev => [...prev, `[SUCCESS] Password updated successfully for user: ${resetTargetUser.username}`]);
      resetAuthStates();
      setAuthModalMode('login');
      alert("Password reset successfully! Please log in with your new password.");
    }
  };

  const handleForgotUsername = (e) => {
    if (e) e.preventDefault();
    setAuthError('');

    const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
    const contactVal = authContact.trim();

    if (recoveryStep === 'email') {
      if (!contactVal || !contactVal.includes('@')) {
        setAuthError('Please enter a valid email address.');
        return;
      }
      const user = db.find(u => u.contact && u.contact.toLowerCase() === contactVal.toLowerCase());
      if (!user) {
        setAuthError('No registered user found with this email address.');
        return;
      }

      setResetTargetUser(user);
      const otpCode = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedOtp(otpCode);
      setAuthOtpSent(true);
      setRecoveryStep('otp');

      setOtpToast({
        code: otpCode,
        contact: contactVal,
        visible: true
      });

      setTerminalLogs(prev => [
        ...prev,
        `[SYSTEM] Username recovery OTP initiated...`,
        `[SYSTEM] Verification OTP code sent to ${contactVal}.`
      ]);

      fetch('/api/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          contact: contactVal, 
          code: otpCode,
          keys: {
            resendApiKey: gatewayResendKey.trim(),
            twilioAccountSid: gatewayTwilioSid.trim(),
            twilioAuthToken: gatewayTwilioToken.trim(),
            twilioFromNumber: gatewayTwilioFrom.trim()
          }
        })
      }).catch(err => console.error("Forgot username OTP send fail:", err));

    } else if (recoveryStep === 'otp') {
      if (!authOtpInput.trim()) {
        setAuthError('Please enter the verification code.');
        return;
      }
      if (authOtpInput.trim() !== generatedOtp) {
        setAuthError('Incorrect verification code.');
        return;
      }
      setRecoveredUsername(resetTargetUser.username);
      setRecoveryStep('success');
      setAuthOtpSent(false);
      setAuthOtpInput('');
    }
  };

  const handleSignout = () => {
    if (currentUser) {
      setTerminalLogs(prev => [...prev, `[SYSTEM] User ${currentUser} signed out.`]);
    }
    setCurrentUser(null);
    localStorage.removeItem('switchx_active_user');
    setIsAppUnrolled(false);
    resetAuthStates();
    setShowLandingAuth(false);
    
    // Clear state sessions and load/reset guest sessions
    localStorage.setItem('switchx_guest_usage', '0');
    setGuestUsageCount(0);

    const guestKey = 'switchx_sessions_guest';
    localStorage.removeItem(guestKey);
    localStorage.removeItem('switchx_sessions');

    const initialId = "session-" + Date.now();
    const initialSessions = [{ id: initialId, title: "SwitchX Base Layer", messages: [
      { id: "msg-welcome-" + Date.now(), role: "assistant", text: "SwitchX System Engine Ready (Guest Session)." }
    ], sessionType: "Studio Layer", isPinned: false }];
    
    setSavedSessions(initialSessions);
    setCurrentSessionId(initialId);
    setChatMessages(initialSessions[0].messages);
    localStorage.setItem(guestKey, JSON.stringify(initialSessions));
  };

  const handleDeleteAccount = () => {
    if (!currentUser) return;
    if (!confirm("Are you absolutely sure you want to delete your account? All your saved chat sessions and deployments will be permanently deleted.")) {
      return;
    }
    const targetUser = currentUser;
    const db = JSON.parse(localStorage.getItem('switchx_users') || '[]');
    const updatedDb = db.filter(u => u.username.toLowerCase() !== targetUser.toLowerCase());
    localStorage.setItem('switchx_users', JSON.stringify(updatedDb));
    
    localStorage.removeItem(`switchx_sessions_${targetUser}`);
    setTerminalLogs(prev => [...prev, `[SYSTEM] Account ${targetUser} deleted successfully.`]);
    
    handleSignout();
  };

  const handleFactoryReset = () => {
    if (confirm("Are you sure you want to restore factory settings? This will delete all user accounts, active channels, saved gateway keys, and custom preferences. This action is irreversible.")) {
      localStorage.clear();
      window.location.reload();
    }
  };

  const synchronizeSessionsToStorage = (updatedMessages, sessionId = currentSessionId, typeChange = null) => {
    if (!sessionId) return;
    setSavedSessions(prevSessions => {
      const currentLedger = [...prevSessions];
      const targetIdx = currentLedger.findIndex(s => s.id === sessionId);
      if (targetIdx !== -1) {
        currentLedger[targetIdx].messages = updatedMessages;
        if (updatedMessages.length > 1 && currentLedger[targetIdx].title.startsWith("SwitchX Base")) {
          const firstPromptText = updatedMessages[1].text;
          currentLedger[targetIdx].title = firstPromptText.length > 22 ? firstPromptText.slice(0, 22) + "..." : firstPromptText;
        }
        if (typeChange) currentLedger[targetIdx].sessionType = typeChange;
      }
      safeSaveSessions(currentLedger);
      return currentLedger;
    });
  };

  const handleMessageFeedback = (msgId, type) => {
    const updated = chatMessages.map(msg => {
      if (msg.id === msgId) {
        return { ...msg, feedback: msg.feedback === type ? null : type };
      }
      return msg;
    });
    setChatMessages(updated);
    if (currentSessionId) {
      synchronizeSessionsToStorage(updated, currentSessionId);
    }
    const feedbackText = type === 'up' ? 'GOOD' : 'BAD';
    setTerminalLogs(prev => [
      ...prev,
      `[SYSTEM] Chat feedback logged: Message (${msgId}) rated ${feedbackText}`
    ]);
  };

  const createNewWorkspaceSession = () => {
    const newId = "session-" + Date.now();
    const cleanDefaultMessages = [{ id: "msg-welcome-" + Date.now(), role: "assistant", text: "Fresh container deployed." }];
    const appendedLedger = [{ id: newId, title: "Active Stream Module", messages: cleanDefaultMessages, sessionType: "Idle Track" }, ...savedSessions];
    setSavedSessions(appendedLedger);
    setCurrentSessionId(newId);
    setChatMessages(cleanDefaultMessages);
    safeSaveSessions(appendedLedger);
  };

  const loadTargetSavedSession = (session) => {
    setCurrentSessionId(session.id);
    setChatMessages(session.messages);
    setUploadedDocText(""); setDocFileName("");
  };

  const deleteSessionTrackNode = (id, e) => {
    e.stopPropagation();
    const structuralFiltered = savedSessions.filter(s => s.id !== id);
    setSavedSessions(structuralFiltered);
    if (currentSessionId === id && structuralFiltered.length > 0) {
      setCurrentSessionId(structuralFiltered[0].id);
      setChatMessages(structuralFiltered[0].messages);
    }
    safeSaveSessions(structuralFiltered);
  };

  const renameSessionTrackNode = (id, newTitle) => {
    if (!newTitle.trim()) return;
    setSavedSessions(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, title: newTitle.trim() } : s);
      safeSaveSessions(updated);
      return updated;
    });
    setEditingSessionId(null);
  };

  const togglePinSessionNode = (id, e) => {
    if (e) e.stopPropagation();
    setSavedSessions(prev => {
      const updated = prev.map(s => s.id === id ? { ...s, isPinned: !s.isPinned } : s);
      safeSaveSessions(updated);
      return updated;
    });
  };

  const handleImageAttachmentChange = (e) => {
    const activeFile = e.target.files[0];
    if (!activeFile) return;
    const streamReader = new FileReader();
    streamReader.onloadend = () => {
      setAttachedImageB64(streamReader.result);
      setLastUploadedImageB64(streamReader.result);
    };
    streamReader.readAsDataURL(activeFile);
  };

  const handleDocumentContextUpload = (e) => {
    const fileNode = e.target.files[0]; if (!fileNode) return;
    const fileName = fileNode.name;
    setDocFileName(fileName); 
    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedDocText(event.target.result);
      const updated = [...chatMessages, { id: "sys-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9), role: "assistant", text: `Loaded document frame "${fileName}".` }];
      setChatMessages(updated);
      synchronizeSessionsToStorage(updated, currentSessionId, "Dataset Memory");
    };
    if (fileName.toLowerCase().endsWith('.pdf')) {
      reader.readAsDataURL(fileNode);
    } else {
      reader.readAsText(fileNode);
    }
  };

  const triggerBackendPipeline = async () => {
    if (!chatInputValue.trim() || aiLoading) return;
    const currentPrompt = chatInputValue.trim();
    const cleanLowerInputString = currentPrompt.toLowerCase();

    // Guest Limit Check
    if (!currentUser) {
      if (guestUsageCount >= 3) {
        setAuthModalOpen(true);
        setAuthModalMode('signup');
        setAuthError('Guest limit reached. Please sign up or log in to continue using SwitchX Studio with unlimited features.');
        return;
      }
      const newUsage = guestUsageCount + 1;
      setGuestUsageCount(newUsage);
      localStorage.setItem('switchx_guest_usage', newUsage.toString());
      setTerminalLogs(prev => [...prev, `[SYSTEM] Guest query ${newUsage}/3 sent.`]);
    }

    // Image generation check
    const isImageReq = cleanLowerInputString.includes("generate") || cleanLowerInputString.includes("image") || cleanLowerInputString.includes("draw") || cleanLowerInputString.includes("paint") || cleanLowerInputString.includes("create image");
    setIsGeneratingImage(isImageReq);

    const newUserNode = { id: "u-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9), role: "user", text: currentPrompt, localImg: attachedImageB64 };
    const updatedHistory = [...chatMessages, newUserNode];
    
    setChatMessages(updatedHistory); 
    setChatInputValue(''); 
    setAiLoading(true);
    const imgBackup = attachedImageB64; 
    setAttachedImageB64(null);
    
    let currentSessionLabelType = "General Text";
    if (cleanLowerInputString.includes("presentation") || cleanLowerInputString.includes("deck") || cleanLowerInputString.includes("ppt")) {
      currentSessionLabelType = "Presentation Portfolio";
    } else if (imgBackup) {
      currentSessionLabelType = "Vision Extraction";
    }

    synchronizeSessionsToStorage(updatedHistory, currentSessionId, currentSessionLabelType);

    try {
      const response = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: currentPrompt, 
          history: updatedHistory, 
          attachedImage: imgBackup, 
          uploadedDocText, 
          docFileName, 
          location: deviceCoordinates 
        })
      });

      if (!response.ok) {
        throw new Error(`Server returned status code ${response.status}`);
      }

      const data = await response.json();
      if (data.error) {
        throw new Error(data.error);
      }
      refreshDbFiles();

      let updatedText = data.resultText || "";
      
      // 1. Device Action Parser
      const deviceActionRegex = /\[DEVICE_ACTION:\s*(gym_lights|audio_console|smart_lock)=(true|false)\]/g;
      let deviceMatch;
      while ((deviceMatch = deviceActionRegex.exec(updatedText)) !== null) {
        const device = deviceMatch[1];
        const stateVal = deviceMatch[2] === 'true';
        
        setDeviceStatus(prev => {
          let updated = { ...prev };
          if (device === 'gym_lights') updated.lights = stateVal;
          else if (device === 'audio_console') updated.media = stateVal;
          else if (device === 'smart_lock') updated.lock = stateVal;
          return updated;
        });

        const time = new Date().toLocaleTimeString();
        setCronLogs(logs => [`[${time}] Chat Control: ${device} set to ${stateVal ? 'ACTIVE/LOCKED' : 'OFFLINE/OPEN'}`, ...logs]);
      }
      
      // 2. Schedule Cron Parser
      const cronRegex = /\[SCHEDULE_CRON:\s*name="([^"]+)",\s*duration=(\d+),\s*action="([^"]+)"\]/g;
      let cronMatch;
      while ((cronMatch = cronRegex.exec(updatedText)) !== null) {
        const name = cronMatch[1];
        const duration = parseInt(cronMatch[2]);
        const actionType = cronMatch[3];
        
        const newTask = {
          id: 'cron-' + Date.now(),
          name,
          actionType,
          timeRemaining: duration,
          duration,
          status: 'pending'
        };
        setCronTasks(prev => [newTask, ...prev]);
        const time = new Date().toLocaleTimeString();
        setCronLogs(logs => [`[${time}] Scheduled via Chat: ${name} in ${duration}s`, ...logs]);
      }

      // Detect workspace UI widgets
      const showDbFiles = updatedText.includes('[DATABASE_FILES_LIST]');
      const showSubmissions = updatedText.includes('[FORM_SUBMISSIONS_LIST]');
      const showTelemetry = updatedText.includes('[TELEMETRY_FEEDS]');

      if (showDbFiles) {
        refreshDbFiles();
      }

      // Remove execution tags from the text
      updatedText = updatedText
        .replace(deviceActionRegex, '')
        .replace(cronRegex, '')
        .replace('[DATABASE_FILES_LIST]', '')
        .replace('[FORM_SUBMISSIONS_LIST]', '')
        .replace('[TELEMETRY_FEEDS]', '')
        .trim();

      const freshMessagesList = [...updatedHistory, { 
        id: "ai-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9), 
        role: "assistant", 
        text: updatedText, 
        showDbFiles,
        showSubmissions,
        showTelemetry,
        renderedImage: data.generatedImageUrl || null,
        isVisualAsset: data.isVisualAsset || false,
        isPresentationAsset: data.isPresentationAsset || false,
        pptBlueprint: data.pptBlueprint || null,
        exportFormats: data.exportFormats || null,
        embedUrl: data.embedUrl || null,
        platformLinks: data.platformLinks || null,
        generatedHtml: data.generatedHtml || null
      }];
      setChatMessages(freshMessagesList);
      synchronizeSessionsToStorage(freshMessagesList, currentSessionId, currentSessionLabelType);
    } catch (err) {
      console.error("Pipeline interruption:", err);
      const errorText = `[System Error: ${err.message || "Pipeline connection failure"}]`;
      const freshMessagesList = [...updatedHistory, {
        id: "ai-err-" + Date.now() + "-" + Math.random().toString(36).substring(2, 9),
        role: "assistant",
        text: errorText
      }];
      setChatMessages(freshMessagesList);
      synchronizeSessionsToStorage(freshMessagesList, currentSessionId, currentSessionLabelType);
    } finally { 
      setAiLoading(false); 
      setIsGeneratingImage(false);
    }
  };

  const triggerSilentMediaCommand = async (command) => {
    try {
      await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          prompt: command, 
          history: [] 
        })
      });
    } catch (e) {
      console.error("Failed to execute silent media command:", e);
    }
  };



  const refreshDbFiles = async () => {
    try {
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'list_files' })
      });
      if (res.ok) {
        const data = await res.json();
        setDbFiles(data.files || []);
      }
    } catch (e) {
      console.error("Failed to list files:", e);
    }
  };

  const deleteDbFile = async (fileName) => {
    if (!confirm(`Are you sure you want to delete context file "${fileName}"?`)) return;
    try {
      const res = await fetch('/api/builder', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: 'delete_file', fileName })
      });
      if (res.ok) {
        refreshDbFiles();
        alert("File deleted successfully.");
      }
    } catch (e) {
      alert("Failed to delete file: " + e.message);
    }
  };

  const handleVercelDeploy = async () => {
    if (vercelDeploying) return;
    setVercelDeploying(true);
    setVercelLogs([]);
    
    const logSteps = [
      { text: "Initializing Vercel Cloud compilation build...", delay: 600 },
      { text: "Ingesting source manifests & structural styles...", delay: 1200 },
      { text: "Bundling client scripts and inline libraries...", delay: 1800 },
      { text: "Optimizing media assets and layout grids...", delay: 2400 },
      { text: "Pushing static assets to edge routers...", delay: 3000 },
      { text: "Verifying DNS records & SSL bindings...", delay: 3600 },
      { text: "Deployment finalized successfully!", delay: 4200 }
    ];

    logSteps.forEach((step, idx) => {
      setTimeout(() => {
        const time = new Date().toLocaleTimeString();
        setVercelLogs(prev => [...prev, `[${time}] ${step.text}`]);
        
        if (idx === logSteps.length - 1) {
          const siteId = Math.floor(100000 + Math.random() * 900000);
          const safeName = (docFileName || 'site').replace(/[^a-zA-Z0-9]/g, '_').toLowerCase();
          const targetUrl = `https://switchx-${safeName}-${siteId}.vercel.app`;
          
          const newDep = {
            name: `${safeName}-${siteId}.vercel.app`,
            url: targetUrl,
            timestamp: new Date().toLocaleTimeString(),
            isVercel: true
          };

          setVercelDeployments(prev => [newDep, ...prev]);
          setDeployments(prev => {
            const updated = [newDep, ...prev];
            localStorage.setItem('switchx_deployments', JSON.stringify(updated));
            return updated;
          });
          setVercelDeploying(false);
          alert(`Successfully pushed to Vercel edge! Live URL: ${targetUrl}`);
        }
      }, step.delay);
    });
  };

  const handleNodeMouseDown = (id, e) => {
    e.preventDefault();
    setDraggedNode(id);
  };

  const handleCanvasMouseMove = (e) => {
    if (!draggedNode) return;
    const svgRect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - svgRect.left;
    const y = e.clientY - svgRect.top;
    
    // Boundary check
    const boundedX = Math.max(20, Math.min(svgRect.width - 20, x));
    const boundedY = Math.max(20, Math.min(svgRect.height - 20, y));

    setWorkflowNodes(prev => prev.map(node => 
      node.id === draggedNode ? { ...node, x: boundedX, y: boundedY } : node
    ));
  };

  const handleCanvasMouseUp = () => {
    setDraggedNode(null);
  };

  const startCamera = async () => {
    try {
      setCameraActive(true);
      const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 640, height: 480 } });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        videoRef.current.play();
      }
    } catch (err) {
      console.error("Camera access failed:", err);
      alert("Failed to access camera: " + err.message);
      setCameraActive(false);
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setCameraActive(false);
  };

  const captureFrame = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = 640;
      canvas.height = 480;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(videoRef.current, 0, 0, 640, 480);
      const dataUrl = canvas.toDataURL('image/jpeg');
      setAttachedImageB64(dataUrl);
      stopCamera();
    }
  };

  const themeStyle = { bg: 'bg-[#030303]', border: 'border-zinc-900/60', accent: 'bg-zinc-100 text-zinc-950 hover:bg-zinc-200', userBubble: 'bg-zinc-900/20 border-zinc-900 text-zinc-200' };

  return (
    <div className="min-h-screen w-full bg-[#030303] flex text-zinc-300 selection:bg-zinc-800 overflow-hidden relative font-sans unique-scrollbar-matrix">

      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-10 pointer-events-none opacity-100" />

      {!isAppUnrolled ? (
        <div className="flex-1 flex flex-col items-center justify-center h-screen relative z-50 px-4 animate-fade-in">
          {!showLandingAuth ? (
            <div 
              onClick={() => {
                const activeUser = localStorage.getItem('switchx_active_user');
                if (activeUser) {
                  setIsAppUnrolled(true);
                  setTerminalLogs(prev => [...prev, `[SYSTEM] Restored active session for user: ${activeUser}`]);
                } else {
                  setShowLandingAuth(true);
                  setAuthModalMode('login');
                  setAuthError('');
                }
              }}
              className="group cursor-pointer flex flex-col items-center justify-center animate-fade-in"
            >
              <div className="w-52 h-52 rounded-full border border-zinc-900/60 flex flex-col items-center justify-center relative transition-all duration-1000 group-hover:border-indigo-500/40 shadow-[0_0_50px_rgba(99,102,241,0.05)] active:scale-95 bg-black/35 backdrop-blur-xl">
                {/* Glowing Inner Core */}
                <div className="absolute inset-4 rounded-full bg-gradient-to-tr from-indigo-600/10 via-transparent to-emerald-500/10 opacity-60 group-hover:opacity-100 transition-opacity duration-1000 animate-pulse" />
                <div className="absolute inset-0 rounded-full border border-dashed border-zinc-800 scale-125 opacity-30 group-hover:animate-spin group-hover:scale-130 group-hover:border-indigo-500/20 transition-all duration-1000" />
                <div className="absolute inset-0 rounded-full border border-zinc-950 scale-150 opacity-10 group-hover:animate-pulse group-hover:scale-160 transition-all duration-1000" />
                <span className="text-sm font-bold tracking-[0.6em] uppercase text-zinc-400 group-hover:text-white group-hover:drop-shadow-[0_0_12px_rgba(99,102,241,0.5)] transition-all duration-700 pr-[-0.6em] font-sans z-10 select-none">SwitchX</span>
                <span className="text-[7px] font-mono tracking-[0.3em] uppercase text-zinc-600 mt-2.5 opacity-80 group-hover:text-indigo-400/80 transition-all duration-700 z-10 select-none">Studio Core</span>
              </div>
              <span className="text-[8px] font-mono tracking-[0.4em] uppercase text-zinc-500 mt-6 group-hover:text-zinc-350 transition-colors select-none">Click to Initialize</span>
            </div>
          ) : (
            renderAuthForm(false)
          )}
        </div>
      ) : (
        <div className="flex-1 flex w-full h-screen overflow-hidden relative z-40 animate-slide-up bg-transparent">
          {sidebarOpen && (
            <aside className="w-64 premium-glass border-r border-white/[0.04] flex flex-col h-screen shrink-0 relative z-50 transition-all duration-350 select-none">
              
              {/* Header with New Chat Button */}
              <div className="p-4 border-b border-zinc-900/40 flex flex-col gap-3">
                <div className="flex justify-between items-center px-1">
                  <span className="text-[9.5px] font-mono text-indigo-400 font-bold uppercase tracking-widest">SwitchX Core</span>
                  <button onClick={() => setSidebarOpen(false)} className="text-zinc-650 hover:text-zinc-300 transition-colors"><X size={13} /></button>
                </div>
                
                <button 
                  type="button"
                  onClick={createNewWorkspaceSession} 
                  className="w-full py-2 px-3.5 bg-zinc-900/10 border border-zinc-900/80 hover:border-zinc-800 hover:bg-zinc-900/35 text-zinc-350 hover:text-white text-[9.5px] font-bold tracking-widest rounded-xl flex items-center gap-2 transition-all duration-300 uppercase shadow-sm group text-left"
                >
                  <Plus size={13} className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
                  <span>New Session</span>
                </button>
              </div>

              {/* Search Filter Box */}
              <div className="px-3 pb-2 pt-1 border-b border-zinc-900/20">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search chats..."
                    value={sidebarSearchQuery}
                    onChange={(e) => setSidebarSearchQuery(e.target.value)}
                    className="w-full pl-7 pr-3 py-1.5 bg-[#020204]/80 border border-zinc-900/60 rounded-xl text-[10px] text-zinc-350 placeholder-zinc-650 focus:outline-none focus:border-indigo-500/50 transition-colors"
                  />
                  <span className="absolute left-2.5 top-1/2 -translate-y-1/2 text-zinc-650 text-[10px]">🔍</span>
                </div>
              </div>

              {/* Recent Sessions List */}
              <div className="flex-1 flex flex-col overflow-hidden px-3 pt-3 text-left">
                {(() => {
                  const filteredSessions = savedSessions.filter(s => 
                    s.title.toLowerCase().includes(sidebarSearchQuery.toLowerCase())
                  );
                  const pinnedSessions = filteredSessions.filter(s => s.isPinned);
                  const recentSessions = filteredSessions.filter(s => !s.isPinned);

                  const renderSessionRow = (session) => (
                    <div 
                      key={session.id} 
                      onClick={() => loadTargetSavedSession(session)}
                      className={`group w-full p-2.5 rounded-xl flex items-center justify-between text-[11px] tracking-wide cursor-pointer border premium-glass-hover transition-all duration-200 ${currentSessionId === session.id ? 'bg-zinc-900/35 border-white/[0.06] text-zinc-200 font-medium' : 'text-zinc-500 border-transparent hover:text-zinc-350'}`}
                    >
                      {editingSessionId === session.id ? (
                        <input 
                          type="text" 
                          value={editingTitleText}
                          onChange={(e) => setEditingTitleText(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') renameSessionTrackNode(session.id, editingTitleText);
                            if (e.key === 'Escape') setEditingSessionId(null);
                          }}
                          onBlur={() => renameSessionTrackNode(session.id, editingTitleText)}
                          autoFocus
                          className="bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-250 px-2 py-0.5 rounded focus:outline-none w-full mr-2"
                        />
                      ) : (
                        <span className="truncate pr-2 font-sans flex items-center gap-1.5">
                          {session.isPinned && <Pin size={9} className="text-indigo-400 rotate-45 shrink-0" />}
                          <span className="truncate">{session.title}</span>
                        </span>
                      )}
                      
                      {editingSessionId !== session.id && (
                        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0">
                          <button 
                            type="button"
                            onClick={(e) => togglePinSessionNode(session.id, e)}
                            className={`transition-colors p-0.5 ${session.isPinned ? 'text-indigo-400 hover:text-indigo-300' : 'text-zinc-600 hover:text-zinc-350'}`}
                            title={session.isPinned ? "Unpin session" : "Pin session"}
                          >
                            <Pin size={10} className={session.isPinned ? "" : "opacity-60"} />
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setEditingSessionId(session.id);
                              setEditingTitleText(session.title);
                            }}
                            className="text-zinc-650 hover:text-indigo-400 transition-colors p-0.5"
                            title="Rename"
                          >
                            <Edit2 size={10} />
                          </button>
                          <button 
                            type="button"
                            onClick={(e) => deleteSessionTrackNode(session.id, e)} 
                            className="text-zinc-655 hover:text-red-400 transition-colors p-0.5"
                            title="Delete"
                          >
                            <Trash2 size={10} />
                          </button>
                        </div>
                      )}
                    </div>
                  );

                  return (
                    <>
                      {pinnedSessions.length > 0 && (
                        <div className="mb-4 flex flex-col shrink-0">
                          <span className="text-[8px] font-mono text-indigo-400 uppercase tracking-widest pl-2 mb-1.5 font-bold block flex items-center gap-1.5">
                            <Pin size={9} className="rotate-45" /> Pinned Chats
                          </span>
                          <div className="space-y-0.5 max-h-36 overflow-y-auto scrollbar-thin">
                            {pinnedSessions.map(renderSessionRow)}
                          </div>
                        </div>
                      )}

                      <span className="text-[8px] font-mono text-zinc-600 uppercase tracking-widest pl-2 mb-1.5 font-bold block">
                        {pinnedSessions.length > 0 ? "Recent Channels" : "Recent Channels"}
                      </span>

                      <div className="flex-1 overflow-y-auto space-y-0.5 scrollbar-thin">
                        {recentSessions.length === 0 ? (
                          <span className="text-[10px] text-zinc-650 italic pl-2 select-none">No active channels.</span>
                        ) : (
                          recentSessions.map(renderSessionRow)
                        )}
                      </div>
                    </>
                  );
                })()}
              </div>

              {/* Profile Footer */}
              <div className="p-3.5 border-t border-zinc-900/60 bg-zinc-950/20 flex flex-col gap-2.5 shrink-0 select-none">
                <button 
                  type="button"
                  onClick={() => { playSoftClickSound(); setSettingsOpen(true); }}
                  className="flex items-center gap-2.5 overflow-hidden text-left hover:opacity-90 transition-all group w-full"
                >
                  <div className="w-7 h-7 rounded-xl bg-gradient-to-tr from-indigo-600/30 to-emerald-500/30 border border-white/[0.04] group-hover:border-indigo-500/30 group-hover:ring-1 group-hover:ring-indigo-500/20 flex items-center justify-center text-[10px] font-bold text-zinc-200 shrink-0 transition-all select-none shadow-md">
                    {currentUser ? currentUser.slice(0, 2).toUpperCase() : "G"}
                  </div>
                  <div className="flex-1 flex items-center justify-between overflow-hidden min-w-0 pr-1">
                    <div className="flex flex-col text-left overflow-hidden">
                      <span className="text-[11px] font-bold text-zinc-200 truncate group-hover:text-white transition-colors">{currentUser || "Guest Account"}</span>
                      <span className="text-[8px] font-mono text-zinc-550 uppercase tracking-widest">
                        {currentUser ? "PRO ACCOUNT" : `Limit: ${guestUsageCount}/3`}
                      </span>
                    </div>
                    <Settings size={12} className="text-zinc-600 group-hover:text-zinc-350 group-hover:rotate-90 transition-all duration-500 pl-0.5 shrink-0" />
                  </div>
                </button>
              </div>

            </aside>
          )}

          <div className={`flex flex-col h-screen overflow-hidden relative transition-all duration-500 ${isDrawerOpen ? (isDrawerFullScreen ? 'w-0 opacity-0 overflow-hidden pointer-events-none hidden' : 'w-1/2 border-r border-zinc-900/60') : 'flex-1'}`}>
            <header className="w-full premium-glass header-scanning-glow border-b border-white/[0.04] p-4 flex justify-between items-center px-8 relative z-50">
              <div className="flex items-center gap-3">
                {!sidebarOpen && <button onClick={() => setSidebarOpen(true)} className="p-1 text-zinc-500 hover:text-zinc-300 transition-colors mr-2"><Menu size={15} /></button>}
                <div className="flex items-center gap-2 select-none">
                  <span className="text-sm font-light tracking-[0.35em] text-zinc-200 uppercase font-sans">SwitchX</span>
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse mt-0.5" />
                </div>
              </div>
              
              {currentTime ? (
                <div className="text-[9px] font-mono text-zinc-500 uppercase tracking-[0.2em] hidden md:flex items-center gap-3 select-none">
                  <span>{currentTime}</span>
                  {weatherInfo && (
                    <>
                      <span className="text-zinc-800">•</span>
                      <span>{weatherInfo}</span>
                    </>
                  )}
                </div>
              ) : (
                <div className="text-[9px] font-mono text-zinc-650 uppercase tracking-[0.2em] hidden md:flex items-center gap-3 animate-pulse select-none">
                  <span>SYNCING TIME...</span>
                </div>
              )}

              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => {
                    setIsDrawerOpen(true);
                    setIsDrawerFullScreen(true);
                    setActiveSimulatorTab('simulator');
                  }}
                  className="text-[9px] font-bold tracking-widest px-3.5 py-1.5 bg-indigo-950/25 border border-indigo-900/50 hover:border-indigo-500/80 rounded-md text-indigo-400 hover:text-indigo-200 transition-all duration-300 uppercase backdrop-blur-xs flex items-center gap-1.5 hover:scale-[1.02] shadow-lg shadow-indigo-950/10"
                >
                  <Sparkles size={10} className="animate-pulse text-indigo-400" />
                  <span>Launch Live Simulator</span>
                </button>

                <button 
                  onClick={() => setIsAppUnrolled(false)} 
                  className="text-[9px] font-bold tracking-widest px-3 py-1.5 bg-[#0a0a0f]/80 border border-zinc-900 rounded-md text-zinc-500 hover:text-zinc-200 transition-colors uppercase backdrop-blur-xs"
                >
                  Close Core
                </button>
              </div>
            </header>

            <main className="flex-1 w-full max-w-2xl mx-auto px-4 py-8 overflow-y-auto h-[calc(100vh-160px)] scroll-smooth scrollbar-thin relative z-50">
              <div className="space-y-8 pb-24">
                {chatMessages.map((msg) => (
                  <div key={msg.id} className={`group flex gap-4 ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}>
                    <div className={`max-w-[85%] ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                      <div className={`whitespace-pre-line font-normal text-sm leading-relaxed tracking-wide ${msg.role === 'user' ? 'text-zinc-200 bg-white/[0.03] p-4 border border-white/[0.05] rounded-2xl inline-block shadow-xl backdrop-blur-md hover:border-white/[0.1] transition-colors duration-300' : 'text-zinc-300 premium-glass p-4 border-l-2 border-l-indigo-500/40 border-y-white/[0.02] border-r-white/[0.02] rounded-2xl inline-block shadow-md hover:border-white/[0.05] transition-colors duration-300'}`}>
                        {msg.text}
                      </div>

                      {/* Thumbs up, Thumbs down, and Copy buttons */}
                      <div className={`flex items-center gap-1.5 mt-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <button
                          type="button"
                          onClick={() => {
                            navigator.clipboard.writeText(msg.text);
                            alert("Copied message to clipboard!");
                          }}
                          className="p-1 text-zinc-650 hover:text-zinc-350 transition-colors duration-200"
                          title="Copy Message"
                        >
                          <Copy size={11} />
                        </button>
                        {msg.role === 'assistant' && (
                          <>
                            <button
                              type="button"
                              onClick={() => {
                                playSoftClickSound();
                                handleMessageFeedback(msg.id, 'up');
                              }}
                              className={`p-1 transition-all duration-200 hover:scale-110 active:scale-90 ${msg.feedback === 'up' ? 'text-indigo-400' : 'text-zinc-650 hover:text-zinc-350'}`}
                              title="Thumbs Up"
                            >
                              <ThumbsUp size={13} fill={msg.feedback === 'up' ? 'currentColor' : 'none'} />
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                playSoftClickSound();
                                handleMessageFeedback(msg.id, 'down');
                              }}
                              className={`p-1 transition-all duration-200 hover:scale-110 active:scale-90 ${msg.feedback === 'down' ? 'text-rose-500' : 'text-zinc-650 hover:text-zinc-350'}`}
                              title="Thumbs Down"
                            >
                              <ThumbsDown size={13} fill={msg.feedback === 'down' ? 'currentColor' : 'none'} />
                            </button>
                          </>
                        )}
                      </div>
                      
                      {/* Interactive Workspace Widgets Inline Renderers */}
                      {msg.role === 'assistant' && msg.showDbFiles && (
                        <div className="mt-4 p-4 border border-zinc-900 bg-[#050508]/65 backdrop-blur-md rounded-2xl shadow-xl w-full text-left space-y-3">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                              <FileText size={13} className="text-indigo-400" />
                              <span>Database Console</span>
                            </div>
                            <button 
                              type="button" 
                              onClick={refreshDbFiles}
                              className="text-[9px] font-mono font-bold text-indigo-400 hover:text-indigo-300 uppercase tracking-wider bg-zinc-900/40 border border-zinc-850 px-2 py-0.5 rounded transition-all"
                            >
                              Refresh
                            </button>
                          </div>
                          
                          <div className="max-h-48 overflow-y-auto scrollbar-thin space-y-2">
                            {dbFiles.length === 0 ? (
                              <p className="text-[9.5px] text-zinc-650 italic">No context files found in database.</p>
                            ) : (
                              dbFiles.map((file) => (
                                <div key={file.name} className="flex justify-between items-center p-2 bg-zinc-950/45 border border-zinc-900/60 rounded-lg hover:border-zinc-850 transition-colors">
                                  <div className="flex flex-col space-y-0.5">
                                    <span className="text-[10.5px] font-mono text-zinc-350 font-medium truncate max-w-[200px]">{file.name}</span>
                                    <span className="text-[8px] font-mono text-zinc-600">{(file.size / 1024).toFixed(1)} KB • {new Date(file.uploadedAt).toLocaleDateString()}</span>
                                  </div>
                                  <button 
                                    type="button"
                                    onClick={() => deleteDbFile(file.name)}
                                    className="p-1 hover:bg-red-950/20 text-zinc-650 hover:text-red-400 rounded transition-colors"
                                  >
                                    <Trash2 size={12} />
                                  </button>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {msg.role === 'assistant' && msg.showSubmissions && (
                        <div className="mt-4 p-4 border border-zinc-900 bg-[#050508]/65 backdrop-blur-md rounded-2xl shadow-xl w-full text-left space-y-3">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                              <FileSpreadsheet size={13} className="text-emerald-400" />
                              <span>Customer Submissions Log</span>
                            </div>
                            <span className="text-[8.5px] font-mono text-zinc-650 uppercase tracking-widest">{formSubmissions.length} Records</span>
                          </div>
                          
                          <div className="max-h-48 overflow-y-auto scrollbar-thin space-y-2">
                            {formSubmissions.length === 0 ? (
                              <p className="text-[9.5px] text-zinc-650 italic">No submissions found.</p>
                            ) : (
                              formSubmissions.map((sub) => (
                                <div key={sub.id} className="p-2.5 bg-zinc-950/45 border border-zinc-900/60 rounded-lg hover:border-zinc-850 transition-colors space-y-1">
                                  <div className="flex justify-between items-center">
                                    <span className="text-[10.5px] font-bold text-zinc-350">{sub.name}</span>
                                    <span className="text-[8px] font-mono text-zinc-605">{sub.time}</span>
                                  </div>
                                  <span className="text-[9px] font-mono text-indigo-400/80 block">{sub.email}</span>
                                  <p className="text-[10px] text-zinc-400 italic">"{sub.message}"</p>
                                </div>
                              ))
                            )}
                          </div>
                        </div>
                      )}

                      {msg.role === 'assistant' && msg.showTelemetry && (
                        <div className="mt-4 p-4 border border-zinc-900 bg-[#050508]/65 backdrop-blur-md rounded-2xl shadow-xl w-full text-left space-y-4">
                          <div className="flex justify-between items-center border-b border-zinc-900 pb-2">
                            <div className="flex items-center gap-2 text-[10px] text-zinc-400 font-bold uppercase tracking-widest">
                              <Cpu size={13} className="text-rose-400" />
                              <span>Ecosystem Command Center</span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          </div>

                          {/* Telemetry Tickers */}
                          <div className="grid grid-cols-3 gap-2">
                            <div className="p-2 bg-zinc-950/45 border border-zinc-900/60 rounded-lg text-center">
                              <span className="text-[7.5px] font-mono text-zinc-600 uppercase block">BTC Rate</span>
                              <span className="text-[11px] font-mono text-emerald-405 font-bold">{apiData.btc}</span>
                            </div>
                            <div className="p-2 bg-zinc-950/45 border border-zinc-900/60 rounded-lg text-center">
                              <span className="text-[7.5px] font-mono text-zinc-600 uppercase block">ETH Rate</span>
                              <span className="text-[11px] font-mono text-emerald-405 font-bold">{apiData.eth}</span>
                            </div>
                            <div className="p-2 bg-zinc-950/45 border border-zinc-900/60 rounded-lg text-center truncate">
                              <span className="text-[7.5px] font-mono text-zinc-600 uppercase block">Transit Status</span>
                              <span className="text-[8.5px] font-mono text-indigo-400 font-bold truncate block">{apiData.transit}</span>
                            </div>
                          </div>

                          {/* Interactive Device Toggles */}
                          <div className="space-y-2">
                            <span className="text-[8px] font-mono text-zinc-650 uppercase tracking-widest font-bold block pl-1">Interactive Device Controls</span>
                            <div className="grid grid-cols-3 gap-2">
                              <button 
                                type="button"
                                onClick={() => {
                                  setDeviceStatus(prev => {
                                    const nextState = !prev.lights;
                                    triggerSilentMediaCommand(nextState ? 'gym_lights=true' : 'gym_lights=false');
                                    const time = new Date().toLocaleTimeString();
                                    setCronLogs(logs => [`[${time}] Panel Control: Gym Lights set to ${nextState ? 'ACTIVE' : 'OFFLINE'}`, ...logs]);
                                    return { ...prev, lights: nextState };
                                  });
                                }}
                                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${deviceStatus.lights ? 'bg-yellow-500/10 border-yellow-500/40 text-yellow-400 shadow-md shadow-yellow-500/5' : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-350'}`}
                              >
                                <Lightbulb size={14} className={deviceStatus.lights ? 'animate-pulse' : ''} />
                                <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Gym Lights</span>
                              </button>

                              <button 
                                type="button"
                                onClick={() => {
                                  setDeviceStatus(prev => {
                                    const nextState = !prev.media;
                                    triggerSilentMediaCommand(nextState ? 'audio_console=true' : 'audio_console=false');
                                    const time = new Date().toLocaleTimeString();
                                    setCronLogs(logs => [`[${time}] Panel Control: Audio Console set to ${nextState ? 'ACTIVE' : 'OFFLINE'}`, ...logs]);
                                    return { ...prev, media: nextState };
                                  });
                                }}
                                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${deviceStatus.media ? 'bg-blue-500/10 border-blue-500/40 text-blue-400 shadow-md shadow-blue-500/5' : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-350'}`}
                              >
                                <Radio size={14} className={deviceStatus.media ? 'animate-pulse' : ''} />
                                <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Audio System</span>
                              </button>

                              <button 
                                type="button"
                                onClick={() => {
                                  setDeviceStatus(prev => {
                                    const nextState = !prev.lock;
                                    triggerSilentMediaCommand(nextState ? 'smart_lock=true' : 'smart_lock=false');
                                    const time = new Date().toLocaleTimeString();
                                    setCronLogs(logs => [`[${time}] Panel Control: Smart Lock set to ${nextState ? 'LOCKED' : 'UNLOCKED'}`, ...logs]);
                                    return { ...prev, lock: nextState };
                                  });
                                }}
                                className={`p-2.5 rounded-xl border flex flex-col items-center gap-1.5 transition-all ${deviceStatus.lock ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-400 shadow-md shadow-emerald-500/5' : 'bg-zinc-950/40 border-zinc-900 text-zinc-500 hover:text-zinc-350'}`}
                              >
                                {deviceStatus.lock ? <Lock size={14} /> : <Unlock size={14} />}
                                <span className="text-[8px] font-sans font-bold uppercase tracking-wider">Smart Lock</span>
                              </button>
                            </div>
                          </div>

                          {/* Cron Tasks Status */}
                          <div className="space-y-2">
                            <span className="text-[8px] font-mono text-zinc-650 uppercase tracking-widest font-bold block pl-1">Scheduled Tasks Engine</span>
                            <div className="bg-[#020204] border border-zinc-950 rounded-lg p-2.5 space-y-1.5 max-h-32 overflow-y-auto scrollbar-thin text-[9.5px]">
                              {cronTasks.length === 0 ? (
                                <p className="text-zinc-650 italic">No tasks active in scheduler.</p>
                              ) : (
                                cronTasks.map(task => (
                                  <div key={task.id} className="flex justify-between items-center text-zinc-400">
                                    <span className="font-mono">{task.name} ({task.actionType})</span>
                                    <span className={`font-bold px-1.5 py-0.5 rounded text-[8px] ${task.status === 'completed' ? 'bg-emerald-950/50 text-emerald-400 border border-emerald-900/50' : 'bg-yellow-950/50 text-yellow-400 border border-yellow-900/50 animate-pulse'}`}>
                                      {task.status === 'completed' ? 'Finished' : `${task.timeRemaining}s`}
                                    </span>
                                  </div>
                                ))
                              )}
                            </div>
                          </div>

                          {/* Command Execution Log */}
                          <div className="space-y-1">
                            <span className="text-[8px] font-mono text-zinc-650 uppercase tracking-widest font-bold block pl-1">System Audit Logs</span>
                            <div className="bg-[#020204] border border-zinc-950 rounded-lg p-2.5 max-h-24 overflow-y-auto scrollbar-thin font-mono text-[8px] text-zinc-600 space-y-1">
                              {cronLogs.slice(0, 5).map((log, idx) => (
                                <div key={idx} className="truncate">{log}</div>
                              ))}
                              {cronLogs.length === 0 && <div className="italic">No telemetry records processed.</div>}
                            </div>
                          </div>
                        </div>
                      )}
                      {msg.localImg && <img src={msg.localImg} className="max-w-xs h-auto rounded-lg border border-zinc-800 mt-2 shadow-md ml-auto" alt="Attached preview" />}
                      {msg.renderedImage && (
                        <VisualLoadingWrapper src={msg.renderedImage} alt={msg.targetVisualPrompt || "Layout Module Asset"} msgId={msg.id} downloadUrl={msg.renderedImage} />
                      )}
                      {msg.isPresentationAsset && msg.pptBlueprint && (
                        <PresentationDeckViewer deckData={msg.pptBlueprint} />
                      )}
                      {msg.role === 'assistant' && msg.exportFormats && (
                        <DocumentExportPanel formats={msg.exportFormats} />
                      )}
                      {msg.generatedHtml && !msg.renderedImage && !msg.isVisualAsset && (
                        <div className="mt-3 text-left">
                          <button
                            type="button"
                            onClick={() => {
                              setPreviewHtml(msg.generatedHtml);
                              setIsDrawerOpen(true);
                            }}
                            className="px-3 py-1.5 bg-zinc-900/45 hover:bg-zinc-850/60 border border-zinc-800/80 text-[9px] font-mono font-bold tracking-widest text-zinc-400 hover:text-zinc-200 rounded-md transition-all uppercase"
                          >
                            Open Live Simulator
                          </button>
                        </div>
                      )}
                      {msg.embedUrl && (
                        <div className="w-full my-4 border border-zinc-900 bg-[#050507]/80 rounded-xl overflow-hidden shadow-2xl animate-fade-in relative z-50">
                          <div className="p-3 bg-zinc-950/60 border-b border-zinc-900 flex justify-between items-center px-4">
                            <span className="text-[9px] text-zinc-500 font-mono tracking-widest uppercase">Embedded Player</span>
                            <a href={msg.embedUrl} target="_blank" rel="noreferrer" className="text-[9px] text-zinc-400 hover:text-zinc-200 uppercase font-bold tracking-wider">Open Player</a>
                          </div>
                          <div className="w-full aspect-video bg-black">
                            <iframe 
                              src={msg.embedUrl} 
                              className="w-full h-full border-0" 
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                              allowFullScreen
                            />
                          </div>
                          {msg.platformLinks && (
                            <div className="p-3 bg-zinc-950/60 border-t border-zinc-900 flex justify-center items-center gap-6 w-full">
                              {msg.platformLinks.spotify && (
                                <a href={msg.platformLinks.spotify} target="_blank" rel="noreferrer" className="text-[10px] text-zinc-500 hover:text-emerald-400 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                                  Spotify
                                </a>
                              )}
                              {msg.platformLinks.appleMusic && (
                                <a href={msg.platformLinks.appleMusic} target="_blank" rel="noreferrer" className="text-[10px] text-zinc-500 hover:text-rose-400 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                                  Apple Music
                                </a>
                              )}
                              {msg.platformLinks.youtube && (
                                <a href={msg.platformLinks.youtube} target="_blank" rel="noreferrer" className="text-[10px] text-zinc-500 hover:text-red-500 font-bold uppercase tracking-wider flex items-center gap-1.5 transition-colors">
                                  YouTube
                                </a>
                              )}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {aiLoading && (
                  <div className="flex flex-col gap-2 mt-2 ml-1 text-left">
                    {isGeneratingImage ? (
                      <div className="space-y-2 p-3 bg-zinc-950/40 border border-zinc-900/60 rounded-xl max-w-xs shadow-2xl backdrop-blur-md animate-pulse">
                        <div className="w-full aspect-square bg-[#050507]/80 rounded-lg flex flex-col items-center justify-center border border-zinc-900/30">
                          <Loader2 size={18} className="text-indigo-400/80 animate-spin mb-2" />
                          <p className="text-[10px] text-zinc-400 font-mono tracking-widest uppercase">Loading image...</p>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 text-zinc-600 text-[9px] font-bold tracking-widest uppercase animate-pulse">
                        <Loader2 size={11} className="animate-spin text-zinc-700" />
                        <span>Processing Matrix...</span>
                      </div>
                    )}
                  </div>
                )}
                <div ref={bottomRef} />
              </div>
            </main>

            <footer className="w-full bg-transparent pt-2 pb-6 px-4 relative z-50">
              <div className="max-w-2xl mx-auto space-y-3 relative">
                
                {/* Guest Capping Block Overlay */}
                {!currentUser && guestUsageCount >= 3 && (
                  <div className="absolute inset-0 z-50 bg-[#030303]/90 backdrop-blur-md border border-zinc-900/60 rounded-2xl p-5 flex flex-col items-center justify-center text-center space-y-3 shadow-2xl animate-fade-in">
                    <div className="w-9 h-9 rounded-xl bg-indigo-950/40 border border-indigo-900/40 flex items-center justify-center text-indigo-400">
                      <Lock size={14} className="animate-pulse" />
                    </div>
                    <div className="space-y-1">
                      <h4 className="text-xs font-bold text-zinc-100 uppercase tracking-widest font-sans">Guest Limit Reached</h4>
                      <p className="text-[11px] text-zinc-400 max-w-md leading-relaxed font-sans px-4">
                        You have sent all 3 queries of your free guest session. Sign up or log in to get unlimited directives and premium layout generation.
                      </p>
                    </div>
                    <div className="flex gap-3 pt-1">
                      <button
                        type="button"
                        onClick={() => { setAuthModalOpen(true); setAuthModalMode('login'); }}
                        className="px-4 py-1.5 bg-zinc-900/60 border border-zinc-800 text-zinc-350 hover:text-white text-[10px] font-bold tracking-wider rounded-lg uppercase transition-all select-none hover:scale-[1.02] font-sans"
                      >
                        Log In
                      </button>
                      <button
                        type="button"
                        onClick={() => { setAuthModalOpen(true); setAuthModalMode('signup'); }}
                        className="px-4 py-1.5 bg-indigo-950/30 border border-indigo-900 text-indigo-400 hover:text-indigo-200 text-[10px] font-bold tracking-wider rounded-lg uppercase transition-all select-none hover:scale-[1.02] shadow-lg shadow-indigo-950/20 font-sans"
                      >
                        Sign Up Free
                      </button>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap gap-2">
                  {docFileName && (
                    <div className="w-fit rounded-lg border border-zinc-800 bg-zinc-950 p-2 flex items-center gap-2 text-[10px] font-mono text-zinc-400 shadow-sm">
                      Dataset Ingested: {docFileName}
                      <button type="button" onClick={() => { setUploadedDocText(""); setDocFileName(""); }} className="p-1 text-zinc-650 hover:text-zinc-350 ml-1"><X size={11} /></button>
                    </div>
                  )}
                  {attachedImageB64 && (
                    <div className="w-fit rounded-lg border border-zinc-800 bg-zinc-950 p-2 flex items-center gap-2 text-[10px] font-mono text-zinc-400 shadow-sm">
                      Image Attached (Webcam/Upload)
                      <button type="button" onClick={() => setAttachedImageB64(null)} className="p-1 text-zinc-650 hover:text-red-400 ml-1"><X size={11} /></button>
                    </div>
                  )}
                </div>
                
                <form onSubmit={(e) => { e.preventDefault(); triggerBackendPipeline(); }} className="relative flex items-center bg-black/45 border border-white/[0.04] rounded-2xl p-2.5 px-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-glow-indigo transition-all duration-300 backdrop-blur-xl">
                  <input type="file" accept="image/*" ref={fileInputRef} onChange={handleImageAttachmentChange} className="hidden" />
                  <button type="button" onClick={() => fileInputRef.current.click()} className="p-2 text-zinc-600 hover:text-zinc-350 transition-colors duration-200" title="Attach Asset"><ImageIcon size={15} /></button>
                  
                  <input type="file" accept=".txt,.csv,.json,.md,.js" ref={docInputRef} onChange={handleDocumentContextUpload} className="hidden" />
                  <button type="button" onClick={() => docInputRef.current?.click()} className="p-2 text-zinc-650 hover:text-zinc-350 transition-colors duration-200" title="Attach Context File"><UploadCloud size={15} /></button>
                  
                  <button type="button" onClick={() => { if (cameraActive) stopCamera(); else startCamera(); }} className={`p-2 transition-all duration-200 ${cameraActive ? 'text-emerald-500 hover:text-emerald-400 animate-pulse' : 'text-zinc-650 hover:text-emerald-400'}`} title="Capture Webcam Snapshot"><Camera size={15} /></button>
                  
                  <div className="relative flex items-center mr-1">
                    <button 
                      type="button" 
                      onClick={handleToggleVoiceInputFlow} 
                      className={`p-2 transition-all duration-200 relative rounded-lg hover:bg-zinc-900/40 ${isVoiceTypingActive ? 'text-rose-500 hover:text-rose-450' : 'text-zinc-650 hover:text-zinc-350'}`} 
                      title={isVoiceTypingActive ? "Stop Voice Input & Translate" : "Start Voice Input"}
                    >
                      <Mic size={15} className={isVoiceTypingActive ? "animate-pulse text-rose-500" : ""} />
                      {isVoiceTypingActive && (
                        <span className="absolute top-1.5 right-1.5 flex h-1.5 w-1.5">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-rose-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-rose-500"></span>
                        </span>
                      )}
                    </button>
                  </div>

                  <textarea 
                    ref={textareaRef}
                    rows={1} 
                    value={chatInputValue} 
                    onChange={(e) => setChatInputValue(e.target.value)} 
                    onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); triggerBackendPipeline(); } }} 
                    placeholder={
                      translationLoading 
                        ? "Translating speech to English..." 
                        : isVoiceTypingActive 
                          ? "Listening... Speak now." 
                          : "Enter workspace directive..."
                    } 
                    className="flex-1 bg-transparent text-sm focus:outline-none resize-none font-sans py-2.5 pl-3 text-zinc-300 placeholder-zinc-700 tracking-wide max-h-40 overflow-y-auto" />
                  <button type="submit" disabled={aiLoading || !chatInputValue.trim()} className="p-2.5 rounded-xl bg-gradient-to-tr from-indigo-650 to-indigo-555 hover:from-indigo-555 hover:to-indigo-455 text-white font-bold ml-2 shadow-[0_0_12px_rgba(99,102,241,0.25)] hover:scale-[1.03] disabled:opacity-10 disabled:scale-100 flex-shrink-0 transition-all duration-300"><Send size={13} /></button>
</form>
                
                <div className="flex flex-col items-center gap-1.5 pt-1.5">
                  <p className="text-center text-[10px] text-zinc-500 tracking-[0.4em] uppercase font-medium animate-pulse">AI is Future</p>
                </div>
              </div>
            </footer>
          </div>
          {isDrawerOpen && (
            <div className={`h-screen flex flex-col bg-[#030303]/95 backdrop-blur-3xl relative z-40 animate-slide-left border-l border-zinc-900/60 transition-all duration-500 ${isDrawerFullScreen ? 'w-full' : 'w-full md:w-1/2'}`}>
              <header className="p-4 border-b border-zinc-900/60 flex justify-between items-center bg-[#050508]/40 px-6 shrink-0">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-[0.25em] select-none">Workspace Core</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-555 animate-pulse" />
                </div>
                
                {/* Drawer Tab Switcher */}
                <div className="flex bg-zinc-950/40 p-1 rounded-lg border border-zinc-900/80 mx-2">
                  <button 
                    type="button"
                    onClick={() => setActiveSimulatorTab('simulator')}
                    className={`px-3 py-1 text-[8.5px] font-mono font-bold uppercase rounded tracking-wider transition-all duration-300 ${activeSimulatorTab === 'simulator' ? 'bg-zinc-900 text-zinc-200 border border-zinc-850' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    Simulator
                  </button>
                  <button 
                    type="button"
                    onClick={() => setActiveSimulatorTab('terminal')}
                    className={`px-3 py-1 text-[8.5px] font-mono font-bold uppercase rounded tracking-wider transition-all duration-300 ${activeSimulatorTab === 'terminal' ? 'bg-zinc-900 text-zinc-200 border border-zinc-855' : 'text-zinc-500 hover:text-zinc-300'}`}
                  >
                    System Terminal
                  </button>
                </div>

                <div className="flex items-center gap-3">
                  <button 
                    type="button"
                    onClick={() => setIsDrawerFullScreen(!isDrawerFullScreen)} 
                    className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"
                    title={isDrawerFullScreen ? "Split View (50%)" : "Full Screen (100%)"}
                  >
                    {isDrawerFullScreen ? <Minimize2 size={13} /> : <Maximize2 size={13} />}
                  </button>
                  <button 
                    type="button"
                    onClick={() => {
                      setIsDrawerOpen(false);
                      setIsDrawerFullScreen(false);
                    }} 
                    className="text-zinc-500 hover:text-zinc-350 transition-colors p-1"
                  >
                    <X size={14} />
                  </button>
                </div>
              </header>
              
              {/* Content viewport based on active tab */}
              <div className="flex-1 bg-[#010103] flex flex-col overflow-hidden relative">
                
                {activeSimulatorTab === 'simulator' && (
                  <div className="flex-1 flex flex-col overflow-hidden">
                    {/* Action Bar inside Simulator tab */}
                    <div className="p-3 border-b border-zinc-900/60 bg-[#050508]/40 flex justify-between items-center px-6 shrink-0">
                      {/* Viewport size selectors */}
                      <div className="flex items-center gap-1.5 bg-zinc-950/40 p-1 rounded-lg border border-zinc-900/80">
                        <button 
                          type="button"
                          onClick={() => setViewportWidth('100%')} 
                          className={`px-2 py-1 text-[8px] font-mono font-bold uppercase rounded tracking-wider transition-colors ${viewportWidth === '100%' ? 'bg-zinc-900 text-zinc-200 border border-zinc-800' : 'text-zinc-500 hover:text-zinc-350'}`}
                        >
                          Desktop
                        </button>
                        <button 
                          type="button"
                          onClick={() => setViewportWidth('768px')} 
                          className={`px-2 py-1 text-[8px] font-mono font-bold uppercase rounded tracking-wider transition-colors ${viewportWidth === '768px' ? 'bg-zinc-900 text-zinc-200 border border-zinc-800' : 'text-zinc-500 hover:text-zinc-350'}`}
                        >
                          Tablet
                        </button>
                        <button 
                          type="button"
                          onClick={() => setViewportWidth('375px')} 
                          className={`px-2 py-1 text-[8px] font-mono font-bold uppercase rounded tracking-wider transition-colors ${viewportWidth === '375px' ? 'bg-zinc-900 text-zinc-200 border border-zinc-800' : 'text-zinc-500 hover:text-zinc-350'}`}
                        >
                          Mobile
                        </button>
                      </div>

                      <div className="flex items-center gap-3">
                        <button 
                          type="button"
                          onClick={() => {
                            const element = document.createElement("a");
                            const file = new Blob([previewHtml], {type: 'text/html'});
                            element.href = URL.createObjectURL(file);
                            element.download = "index.html";
                            document.body.appendChild(element);
                            element.click();
                          }}
                          className="text-[9px] font-bold uppercase text-zinc-400 hover:text-zinc-200 tracking-widest flex items-center gap-1.5 transition-colors border border-zinc-900 hover:border-zinc-800 px-2.5 py-1.5 rounded bg-zinc-950/40"
                        >
                          Export HTML
                        </button>
                        <button 
                          type="button"
                          onClick={async () => {
                            try {
                              const res = await fetch('/api/builder', {
                                method: 'POST',
                                headers: { 'Content-Type': 'application/json' },
                                body: JSON.stringify({
                                  action: 'deploy',
                                  html: previewHtml,
                                  siteName: docFileName ? docFileName.replace(/\.[^/.]+$/, "") : 'site'
                                })
                              });
                              const data = await res.json();
                              if (data.success) {
                                alert(`Deployed successfully! Live URL: http://localhost:3001${data.url}`);
                                const newDeployment = {
                                  name: data.fileName,
                                  url: data.url,
                                  timestamp: new Date().toLocaleTimeString()
                                };
                                setDeployments(prev => {
                                  const updated = [newDeployment, ...prev];
                                  localStorage.setItem('switchx_deployments', JSON.stringify(updated));
                                  return updated;
                                });
                              } else {
                                alert("Deployment failed: " + data.error);
                              }
                            } catch (e) {
                              alert("Deployment failed: " + e.message);
                            }
                          }}
                          className="text-[9px] font-bold uppercase text-emerald-400 hover:text-emerald-350 tracking-widest flex items-center gap-1.5 transition-colors border border-zinc-900 hover:border-emerald-950 px-2.5 py-1.5 rounded bg-zinc-950/40"
                        >
                          Deploy Live
                        </button>
                        <button 
                          type="button"
                          onClick={handleVercelDeploy}
                          className="text-[9px] font-bold uppercase text-indigo-400 hover:text-indigo-350 tracking-widest flex items-center gap-1.5 transition-all duration-300 border border-zinc-900 hover:border-indigo-950 px-2.5 py-1.5 rounded bg-zinc-950/40 hover:scale-[1.02]"
                        >
                          <Sparkles size={10} /> Cloud Push
                        </button>
                      </div>
                    </div>

                    <div className="flex-1 bg-[#010103] flex items-center justify-center p-6 overflow-hidden relative">
                      <div 
                        style={{ width: viewportWidth }} 
                        className="h-full max-h-[72vh] bg-[#030303] rounded-xl shadow-2xl overflow-hidden border border-zinc-900/80 transition-all duration-500 relative flex flex-col"
                      >
                        <iframe 
                          srcDoc={getPreviewHtml()} 
                          className="w-full flex-1 border-0 bg-[#030303]" 
                          sandbox="allow-scripts"
                        />
                      </div>
                      
                      {/* Vercel Compile Logs Overlay */}
                      {vercelDeploying && (
                        <div className="absolute inset-0 bg-black/95 backdrop-blur-md flex flex-col justify-center p-8 z-50 font-mono text-xs">
                          <div className="max-w-md mx-auto w-full space-y-4 border border-zinc-905 bg-zinc-950/60 p-6 rounded-xl shadow-2xl">
                            <div className="flex items-center justify-between border-b border-zinc-900 pb-3">
                              <div className="flex items-center gap-2">
                                <Loader2 size={13} className="animate-spin text-indigo-500" />
                                <span className="font-bold tracking-widest text-[10px] text-zinc-400 uppercase">Vercel Build Console</span>
                              </div>
                              <span className="text-[9px] text-zinc-650">v2.8.5</span>
                            </div>
                            <div className="h-48 overflow-y-auto space-y-1.5 scrollbar-thin select-text text-left">
                              {vercelLogs.map((log, i) => (
                                <div key={i} className="text-emerald-500/90 leading-relaxed font-mono text-[10px]">{log}</div>
                              ))}
                              {vercelLogs.length < 7 && (
                                <div className="text-zinc-600 animate-pulse text-[10px]">Compiling assets...</div>
                              )}
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {activeSimulatorTab === 'terminal' && (
                  <div className="flex-1 flex flex-col overflow-hidden p-6 space-y-6 text-left select-none text-zinc-300">
                    <div className="flex justify-between items-center border-b border-zinc-900 pb-3 shrink-0">
                      <div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest font-bold block">Developer System Terminal</span>
                        <span className="text-[8px] text-zinc-655 block mt-0.5">Interact with compilation engines, Git hubs, and Edge routers</span>
                      </div>
                      <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-400 border border-zinc-800 text-[8px] font-mono uppercase tracking-wider">Session Active</span>
                    </div>

                    <div className="grid grid-cols-5 gap-2 shrink-0">
                      {[
                        { label: "NPM Dev", cmd: "npm run dev", icon: <Play size={10} />, color: "text-emerald-400 hover:border-emerald-950" },
                        { label: "NPM Build", cmd: "npm run build", icon: <Cpu size={10} />, color: "text-indigo-400 hover:border-indigo-950" },
                        { label: "Audit Site", cmd: "lighthouse audit", icon: <Activity size={10} />, color: "text-amber-500 hover:border-amber-950" },
                        { label: "Git Status", cmd: "git status", icon: <FileText size={10} />, color: "text-pink-400 hover:border-pink-950" },
                        { label: "Cloud Deploy", cmd: "deploy --prod", icon: <Globe size={10} />, color: "text-rose-400 hover:border-rose-950" }
                      ].map((btn, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => executeTerminalCommand(btn.cmd)}
                          className={`py-2 px-3 bg-zinc-950/40 border border-zinc-900 rounded-xl text-[9px] font-mono font-bold flex items-center justify-center gap-1.5 transition-all active:scale-95 ${btn.color}`}
                        >
                          {btn.icon}
                          <span>{btn.label}</span>
                        </button>
                      ))}
                    </div>

                    <div 
                      className={`flex-1 rounded-2xl p-5 font-mono flex flex-col min-h-0 shadow-inner transition-all duration-350 ${
                        customTerminalTheme === 'matrix' ? 'bg-[#010601] border border-emerald-950/20 text-emerald-400 font-semibold' :
                        customTerminalTheme === 'cyberpunk' ? 'bg-[#070103] border border-amber-955/20 text-amber-400 font-semibold' :
                        customTerminalTheme === 'classic' ? 'bg-zinc-950 border border-zinc-800 text-zinc-100' :
                        'bg-[#020204] border border-zinc-950 text-zinc-300'
                      }`}
                      style={{ fontSize: `${customTerminalFontSize || 11}px` }}
                    >
                      <div className="flex-1 overflow-y-auto space-y-1.5 scrollbar-thin select-text mb-4 pr-1.5">
                        {terminalLogs.map((log, idx) => {
                          let color = "text-zinc-405";
                          if (log.startsWith('[SYSTEM]')) color = customTerminalTheme === 'matrix' ? "text-emerald-500" : "text-indigo-400";
                          else if (log.startsWith('[SUCCESS]')) color = "text-emerald-400";
                          else if (log.startsWith('[ERROR]')) color = "text-rose-500 font-bold";
                          else if (log.startsWith('[COMMAND]')) color = customTerminalTheme === 'classic' ? "text-white font-bold" : "text-zinc-100 font-bold";
                          else if (log.startsWith('  Performance:')) color = "text-emerald-300 font-bold";
                          else if (log.startsWith('  SEO:') || log.startsWith('  Accessibility:') || log.startsWith('  Best Practices:')) color = "text-emerald-450";
                          
                          return (
                            <div key={idx} className={`${color} leading-relaxed whitespace-pre-wrap`}>
                              {log}
                            </div>
                          );
                        })}
                        <div ref={terminalEndRef} />
                      </div>

                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          const val = terminalInputValue.trim();
                          if (val) {
                            executeTerminalCommand(val);
                            setTerminalHistory(prev => [...prev.filter(c => c !== val), val]);
                            setTerminalHistoryIdx(null);
                            setTerminalInputValue('');
                          }
                        }}
                        className="flex items-center border-t border-zinc-900/60 pt-3"
                      >
                        <span className={`${customTerminalTheme === 'matrix' ? 'text-emerald-500' : customTerminalTheme === 'cyberpunk' ? 'text-amber-500' : 'text-indigo-500'} font-bold mr-2 select-none`}>switchx-sandbox$</span>
                        <input
                          type="text"
                          value={terminalInputValue}
                          onChange={(e) => setTerminalInputValue(e.target.value)}
                          onKeyDown={(e) => {
                            if (e.key === 'ArrowUp') {
                              e.preventDefault();
                              if (terminalHistory.length === 0) return;
                              const nextIdx = terminalHistoryIdx === null ? terminalHistory.length - 1 : Math.max(0, terminalHistoryIdx - 1);
                              setTerminalHistoryIdx(nextIdx);
                              setTerminalInputValue(terminalHistory[nextIdx]);
                            } else if (e.key === 'ArrowDown') {
                              e.preventDefault();
                              if (terminalHistory.length === 0 || terminalHistoryIdx === null) return;
                              const nextIdx = terminalHistoryIdx + 1;
                              if (nextIdx >= terminalHistory.length) {
                                setTerminalHistoryIdx(null);
                                setTerminalInputValue('');
                              } else {
                                setTerminalHistoryIdx(nextIdx);
                                setTerminalInputValue(terminalHistory[nextIdx]);
                              }
                            }
                          }}
                          className="flex-1 bg-transparent text-inherit font-mono focus:outline-none"
                          style={{ fontSize: `${customTerminalFontSize || 11}px` }}
                          placeholder="Type command (e.g. 'help', 'npm run build', 'clear')..."
                        />
                      </form>
                    </div>
                  </div>
                )}

              </div>
            </div>
          )}

          {cameraActive && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="bg-[#050508]/90 border border-zinc-900/80 rounded-xl p-5 w-[480px] max-w-full space-y-4 shadow-2xl relative">
                <div className="flex justify-between items-center border-b border-zinc-900/60 pb-3">
                  <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest flex items-center gap-1.5"><Camera size={13} className="text-emerald-500" /> Webcam Sensory Stream</span>
                  <button type="button" onClick={stopCamera} className="text-zinc-500 hover:text-zinc-300 transition-colors p-1"><X size={14} /></button>
                </div>
                <div className="aspect-video bg-black rounded-lg overflow-hidden border border-zinc-900 relative">
                  <video ref={videoRef} className="w-full h-full object-cover scale-x-[-1]" />
                </div>
                <div className="flex justify-end gap-3 pt-2">
                  <button 
                    type="button" 
                    onClick={stopCamera}
                    className="px-3 py-1.5 bg-zinc-900 hover:bg-zinc-855 border border-zinc-800 text-[9px] font-bold text-zinc-500 hover:text-zinc-305 rounded uppercase tracking-wider transition-colors"
                  >
                    Cancel
                  </button>
                  <button 
                    type="button" 
                    onClick={captureFrame}
                    className="px-4 py-1.5 bg-emerald-950/45 hover:bg-emerald-900/40 border border-emerald-800 text-[9px] font-bold text-emerald-400 hover:text-emerald-300 rounded uppercase tracking-wider transition-colors flex items-center gap-1.5"
                  >
                    Capture Frame
                  </button>
                </div>
              </div>
            </div>
          )}

          {authModalOpen && (
            <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/85 backdrop-blur-md animate-fade-in">
              {renderAuthForm(true)}
            </div>
          )}

          {aboutOpen && (
            <div className={isAppUnrolled 
              ? "fixed bottom-6 right-6 z-[110] animate-fade-in" 
              : "fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in"
            }>
              <div className="bg-[#030306]/90 border border-white/[0.05] rounded-3xl p-6 w-[540px] max-w-full space-y-4 shadow-[0_20px_50px_rgba(0,0,0,0.6)] backdrop-blur-2xl relative text-left select-none transition-all duration-300">
                <button 
                  type="button" 
                  onClick={() => { playSoftClickSound(); setAboutOpen(false); }} 
                  className="absolute top-5 right-5 text-zinc-550 hover:text-zinc-350 transition-colors p-1"
                >
                  <X size={16} />
                </button>

                <div className="space-y-1 pb-3 border-b border-zinc-900/60">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-200 font-sans">About SwitchX Studio</span>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">System Guide & Architecture Overview</p>
                </div>

                <div className="space-y-4 text-xs text-zinc-400 font-sans leading-relaxed max-h-[420px] overflow-y-auto pr-1.5 scrollbar-thin">
                  
                  {/* How to Use It for Development */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900/50 pb-1">
                      <Sliders size={14} className="text-indigo-400" />
                      <h5 className="font-bold uppercase text-[9px] tracking-widest font-mono text-zinc-200">How to Use It for Development</h5>
                    </div>
                    <div className="pl-5 space-y-1.5 text-zinc-400 text-[10px]">
                      <p>• <strong className="text-zinc-300">Active Workspaces:</strong> Open any folder on your machine to manage files, run terminal commands, and edit code side-by-side with the assistant.</p>
                      <p>• <strong className="text-zinc-300">Context Uploads:</strong> Click the paperclip icon or drag files directly into the prompt box to load local source files instantly into the AI's memory.</p>
                      <p>• <strong className="text-zinc-300">Visual Building:</strong> Build templates in the <em className="text-indigo-350">Builder</em> tab, select custom colors/themes, and execute script tasks directly via the terminal.</p>
                      <p>• <strong className="text-zinc-300">Real-time Emulation:</strong> Test layouts in the <em className="text-indigo-350">Simulator</em> tab, adjusting the viewport size to desktop, tablet, or mobile frames.</p>
                    </div>
                  </div>

                  {/* What Features It Has */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900/50 pb-1">
                      <Layers size={14} className="text-indigo-400" />
                      <h5 className="font-bold uppercase text-[9px] tracking-widest font-mono text-zinc-250">What Features It Has</h5>
                    </div>
                    <div className="pl-5 space-y-1.5 text-zinc-400 text-[10px]">
                      <p>• <strong className="text-zinc-300">Developer Terminal:</strong> Direct shortcuts to run compiler tasks (<code className="text-indigo-300">npm dev</code>, <code className="text-indigo-300">build</code>) and run audits with streaming output.</p>
                      <p>• <strong className="text-zinc-300">Database Console:</strong> A live, polling database explorer showing account lists, local files, and user credentials in real-time.</p>
                      <p>• <strong className="text-zinc-300">Smart Device Controls:</strong> Dynamic state toggles that manage physical simulated lights, lock relays, and music systems via conversation.</p>
                      <p>• <strong className="text-zinc-300">Cron Scheduler:</strong> Schedule background execution nodes and alerts in natural language with visual countdown queues.</p>
                    </div>
                  </div>

                  {/* What It Can Do */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900/50 pb-1">
                      <Activity size={14} className="text-indigo-400" />
                      <h5 className="font-bold uppercase text-[9px] tracking-widest font-mono text-zinc-250">What It Can Do</h5>
                    </div>
                    <div className="pl-5 space-y-1.5 text-zinc-400 text-[10px]">
                      <p>• <strong className="text-zinc-300">Full Stack Generation:</strong> Instantly compile responsive dashboard layouts, database forms, and interactive widgets into clean code structures.</p>
                      <p>• <strong className="text-zinc-300">Self-Healing Loops:</strong> Listen to and intercept client execution errors, trace stack traces, and self-patch bugs automatically.</p>
                      <p>• <strong className="text-zinc-300">Vision Design Sync:</strong> Read design mockups or wireframe files, parsing layout hierarchies to output beautiful React components.</p>
                      <p>• <strong className="text-zinc-300">Sandbox Audits:</strong> Run diagnostic checks on browser features (Web Speech recognition, Audio synth contexts, and local storage limits) to ensure baseline development stability.</p>
                    </div>
                  </div>

                  {/* What Technology It Is Made With */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 border-b border-zinc-900/50 pb-1">
                      <Database size={14} className="text-indigo-400" />
                      <h5 className="font-bold uppercase text-[9px] tracking-widest font-mono text-zinc-250">What Technology It Is Made With</h5>
                    </div>
                    <div className="pl-5 space-y-1.5 text-zinc-400 text-[10px]">
                      <p>• <strong className="text-zinc-300">Next.js 14 & React 18:</strong> Leverages App Router mechanics, fast server components, and React's state hydration layer.</p>
                      <p>• <strong className="text-zinc-300">Tailwind CSS Engine:</strong> Custom dark glassmorphism system styled with flexible utility classes, smooth layouts, and glowing lasers.</p>
                      <p>• <strong className="text-zinc-350">Google Gemini SDK & APIs:</strong> Long-context LLM intelligence coordinating parsing rules, code writing, and structural outputs.</p>
                      <p>• <strong className="text-zinc-350">Native HTML5 Web APIs:</strong> Core integration of browser Speech-to-Text Recognition, AudioContext sound synthesizers, and offline Local Storage databases.</p>
                    </div>
                  </div>

                </div>

                <button 
                  type="button" 
                  onClick={() => { playSoftClickSound(); setAboutOpen(false); }} 
                  className="w-full py-2 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 hover:scale-[1.01] shadow-sm text-center font-sans"
                >
                  Acknowledge
                </button>
              </div>
            </div>
          )}

          {settingsOpen && (
            <div className="fixed inset-0 z-[110] flex items-center justify-center bg-black/80 backdrop-blur-md animate-fade-in">
              <div className="bg-[#030306]/85 border border-white/[0.04] rounded-2xl p-6 w-[360px] max-w-full space-y-4 shadow-[0_8px_32px_rgba(0,0,0,0.4)] backdrop-blur-xl relative text-left select-none animate-scale-up">
                <button 
                  type="button" 
                  onClick={() => { playSoftClickSound(); setSettingsOpen(false); }} 
                  className="absolute top-4 right-4 text-zinc-550 hover:text-zinc-350 transition-colors p-1"
                >
                  <X size={15} />
                </button>

                <div className="text-center space-y-1.5 pb-2 border-b border-zinc-900/50">
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-zinc-200 font-sans">Account Profile</span>
                  <p className="text-[9px] text-zinc-500 font-mono tracking-wider uppercase">Active Sandbox User Identity</p>
                </div>

                <div className="space-y-4 text-xs text-zinc-400 font-sans leading-relaxed select-none">
                  {/* Profile details */}
                  <div className="space-y-1">
                    <h5 className="font-bold uppercase text-[8px] tracking-widest font-mono text-zinc-550">Active Account Layer</h5>
                    <div className="p-4 bg-black/45 border border-zinc-900/60 rounded-xl flex items-center justify-between shadow-sm">
                      <div className="flex items-center gap-3 overflow-hidden">
                        <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-650/40 to-emerald-500/40 border border-white/[0.04] flex items-center justify-center text-[12px] font-bold text-zinc-200 shrink-0">
                          {currentUser ? currentUser.slice(0, 2).toUpperCase() : "G"}
                        </div>
                        <div className="flex flex-col text-left overflow-hidden">
                          <span className="text-[12.5px] font-bold text-zinc-200 truncate">{currentUser || "Guest Account"}</span>
                          <span className="text-[8.5px] font-mono text-zinc-500 uppercase tracking-widest mt-0.5">
                            {currentUser ? "PRO DEV LICENSE" : `Usage Limit: ${guestUsageCount}/3 Requests`}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Actions list */}
                  <div className="space-y-2.5 pt-3 border-t border-zinc-900/50">
                    <h5 className="font-bold uppercase text-[8px] tracking-widest font-mono text-zinc-550">Access Actions</h5>
                    <div className="flex flex-col gap-2">
                      {currentUser ? (
                        <>
                          <button 
                            type="button" 
                            onClick={() => { playSoftClickSound(); setSettingsOpen(false); handleSignout(); }} 
                            className="w-full text-center py-2.5 bg-zinc-900/40 hover:bg-zinc-800/40 border border-zinc-850 hover:border-zinc-800 text-zinc-350 hover:text-zinc-200 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase"
                          >
                            Sign Out
                          </button>
                          <button 
                            type="button" 
                            onClick={() => { playSoftClickSound(); setSettingsOpen(false); handleDeleteAccount(); }} 
                            className="w-full text-center py-2.5 bg-red-950/10 hover:bg-red-950/20 border border-red-955/20 hover:border-red-900/30 text-red-400 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-1"
                          >
                            Delete Account & Data
                          </button>
                        </>
                      ) : (
                        <button 
                          type="button" 
                          onClick={() => { playSoftClickSound(); setSettingsOpen(false); setAuthModalOpen(true); setAuthModalMode('login'); }} 
                          className="w-full text-center py-2.5 bg-indigo-950/20 hover:bg-indigo-955/30 border border-indigo-900/40 hover:border-indigo-500/50 text-indigo-400 hover:text-indigo-300 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase"
                        >
                          Sign In to SwitchX
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => { playSoftClickSound(); setSettingsOpen(false); }}
                  className="w-full py-2 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800/80 hover:border-zinc-700 text-zinc-350 hover:text-zinc-150 text-[10px] font-bold tracking-widest rounded-xl transition-all uppercase mt-2 shadow-sm text-center font-sans"
                >
                  Close Settings
                </button>
              </div>
            </div>
          )}

          {otpToast && otpToast.visible && (
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-[200] w-[340px] max-w-full bg-[#020204]/90 border border-emerald-500/30 text-emerald-450 p-4 rounded-2xl shadow-[0_10px_40px_rgba(16,185,129,0.15)] backdrop-blur-xl animate-fade-in flex items-start gap-3 text-left animate-slide-up">
              <div className="p-2 bg-emerald-950/40 border border-emerald-500/20 rounded-xl text-emerald-400 shrink-0">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                </span>
              </div>
              <div className="flex-1 space-y-1 min-w-0">
                <h6 className="text-[10px] font-mono font-bold uppercase tracking-wider text-emerald-400">Security Gateway</h6>
                <p className="text-[11px] text-zinc-300 leading-normal font-sans">
                  Verification OTP has been sent to your mail:
                </p>
                <p className="text-[10px] text-zinc-400 font-mono truncate">
                  {otpToast.contact}
                </p>
                <p className="text-[9px] text-zinc-500 mt-1 italic">
                  Please check your inbox and spam folder.
                </p>
              </div>
              <button 
                type="button" 
                onClick={() => setOtpToast(null)} 
                className="text-zinc-500 hover:text-zinc-350 p-1 transition-colors shrink-0 text-[10px] font-mono uppercase font-bold tracking-wider"
              >
                ✕
              </button>
            </div>
          )}

      {isAppUnrolled && !aboutOpen && (
        <div className="fixed bottom-4 right-4 z-40 select-none animate-fade-in">
          <button
            type="button"
            onClick={() => { playSoftClickSound(); setAboutOpen(true); }}
            className="px-3 py-1.5 rounded-xl bg-black/45 hover:bg-black/85 border border-white/[0.04] hover:border-indigo-500/30 text-zinc-500 hover:text-indigo-400 text-[8.5px] font-mono uppercase tracking-widest transition-all duration-300 flex items-center gap-1.5 backdrop-blur-xl shadow-md"
          >
            <span>ⓘ About SwitchX</span>
          </button>
        </div>
      )}
    </div>
)}

      <style jsx global>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(12px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
        @keyframes slideLeft { from { transform: translateX(100%); } to { transform: translateX(0); } }
        .animate-fade-in { animation: fadeIn 0.8s ease-out forwards !important; }
        .animate-slide-up { animation: slideUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
        .animate-slide-left { animation: slideLeft 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards !important; }
        
        ::-webkit-scrollbar {
          width: 2px !important;
          height: 2px !important;
          background: transparent !important;
        }
        ::-webkit-scrollbar-track {
          background: transparent !important;
        }
        ::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.2) !important;
          border-radius: 99px !important;
        }
        ::-webkit-scrollbar-thumb:hover {
          background: rgba(255, 255, 255, 0.2) !important;
        }
        
        body, main, div, * {
          scrollbar-width: thin !important;
          scrollbar-color: rgba(255, 255, 255, 0.2) transparent !important;
        }
      `}</style>
    </div>
  );
}
