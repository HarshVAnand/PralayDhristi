import React from 'react';
import { APP_CONFIG } from '../data/config';
import projectLogo from '../assets/logo.jpg';

export default function Footer({ onNavigatePage }) {
  return (
    <footer className="relative border-t border-slate-800/80 bg-[#040711] py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6 text-xs text-slate-500">
        
        {/* Left side brand & copyright with Logo */}
        <div className="flex items-center gap-3 text-center md:text-left">
          <img 
            src={projectLogo} 
            alt="Pralaya Drishti Logo" 
            className="w-8 h-8 rounded-lg object-cover border border-blue-900/60 shadow-sm"
          />
          <div>
            <div className="text-slate-300 font-medium font-mono-code">
              {APP_CONFIG.footer.copyright}
            </div>
            <div className="text-[11px] text-slate-500 font-mono-code">
              Hydrodynamic AI Ensemble · Real-Time Basin Monitoring Network
            </div>
          </div>
        </div>

        {/* Right side links matching Screenshot 5 */}
        <div className="flex flex-wrap items-center justify-center gap-6">
          <button onClick={() => onNavigatePage('home')} className="hover:text-slate-300 transition-colors cursor-pointer">Privacy</button>
          <button onClick={() => onNavigatePage('home')} className="hover:text-slate-300 transition-colors cursor-pointer">Terms</button>
          <button onClick={() => onNavigatePage('neervana')} className="hover:text-slate-300 transition-colors cursor-pointer">Documentation</button>
          <button onClick={() => onNavigatePage('neervana')} className="hover:text-slate-300 transition-colors cursor-pointer">API</button>
          <button onClick={() => onNavigatePage('contact')} className="hover:text-slate-300 transition-colors cursor-pointer">Contact</button>
        </div>

      </div>
    </footer>
  );
}
