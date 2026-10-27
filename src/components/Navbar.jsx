import React, { useState } from 'react';
import { Menu, X, Cpu, ShieldAlert } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import projectLogo from '../assets/logo.jpg';
import { smoothScrollTo } from '../hooks/useLenis';

export default function Navbar({ activePage, setActivePage, onOpenAdminLogin }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (pageId, hash) => {
    setActivePage(pageId);
    setMobileMenuOpen(false);
    if (hash && pageId === 'home') {
      setTimeout(() => {
        smoothScrollTo(hash);
      }, 100);
    } else {
      smoothScrollTo(0);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#050814]/90 backdrop-blur-md border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Project Logo & Brand - Using Uploaded PralayDhristi Logo */}
          <div 
            onClick={() => handleNavClick('home', '#hero')} 
            className="flex items-center gap-3.5 cursor-pointer group"
          >
            <div className="relative w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-[0_0_20px_rgba(56,189,248,0.35)] group-hover:shadow-[0_0_28px_rgba(56,189,248,0.6)] transition-all duration-300 flex items-center justify-center">
              <img 
                src={projectLogo} 
                alt="Pralaya Drishti Logo" 
                className="w-full h-full object-cover rounded-[10px] transform group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="font-mono-code font-extrabold tracking-wider text-xl text-white group-hover:text-blue-300 transition-colors">
                  PRALAAYDHRISTI
                </span>
                <span className="text-[10px] font-mono-code px-1.5 py-0.5 rounded bg-blue-950/90 text-cyan-300 border border-cyan-800/60 tracking-tight font-semibold">
                  प्रलय दृष्टि
                </span>
              </div>
              <span className="text-[10px] font-mono-code text-slate-400 tracking-wide">
                AI FLOOD INTELLIGENCE
              </span>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center space-x-8">
            <button
              onClick={() => handleNavClick('home', '#features')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'home' ? 'text-slate-300 hover:text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Features
            </button>

            <button
              onClick={() => handleNavClick('home', '#how-it-works')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              How it works
            </button>

            <button
              onClick={() => handleNavClick('home', '#team')}
              className="text-sm font-medium text-slate-300 hover:text-white transition-colors cursor-pointer"
            >
              Team
            </button>

            <button
              onClick={() => handleNavClick('contact')}
              className={`text-sm font-medium transition-colors cursor-pointer ${
                activePage === 'contact' ? 'text-blue-400 font-semibold' : 'text-slate-300 hover:text-white'
              }`}
            >
              Contact
            </button>

            {/* Neervana AI Model Link - Prominently highlighted */}
            <button
              onClick={() => handleNavClick('neervana')}
              className={`relative flex items-center gap-2 px-3.5 py-1.5 rounded-full text-sm font-medium transition-all duration-300 cursor-pointer ${
                activePage === 'neervana'
                  ? 'bg-blue-600/20 text-blue-300 border border-blue-500/60 shadow-[0_0_15px_rgba(59,130,246,0.3)]'
                  : 'text-slate-300 hover:text-blue-300 bg-slate-900/60 border border-slate-800 hover:border-blue-500/40'
              }`}
            >
              <Cpu className="w-4 h-4 text-blue-400 animate-pulse" />
              <span>Neervana</span>
              <span className="text-[9px] uppercase font-mono-code font-bold tracking-widest px-1.5 py-0.5 rounded bg-gradient-to-r from-blue-500 to-indigo-500 text-white shadow-sm">
                AI Model
              </span>
            </button>
          </nav>

          {/* Right Action: Admin Login */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={onOpenAdminLogin}
              className="px-5 py-2 rounded-lg text-sm font-medium text-blue-300 hover:text-white bg-[#0A1633] hover:bg-blue-900/40 border border-blue-800/80 hover:border-blue-500 transition-all duration-200 shadow-sm cursor-pointer"
            >
              Admin Login
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-slate-900 text-slate-400 hover:text-white border border-slate-800"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#070D22] border-b border-slate-800 px-4 pt-2 pb-6 space-y-3">
          <button
            onClick={() => handleNavClick('home', '#features')}
            className="block w-full text-left py-2 px-3 text-slate-300 hover:bg-slate-800/50 rounded-lg"
          >
            Features
          </button>
          <button
            onClick={() => handleNavClick('home', '#how-it-works')}
            className="block w-full text-left py-2 px-3 text-slate-300 hover:bg-slate-800/50 rounded-lg"
          >
            How it works
          </button>
          <button
            onClick={() => handleNavClick('home', '#team')}
            className="block w-full text-left py-2 px-3 text-slate-300 hover:bg-slate-800/50 rounded-lg"
          >
            Team
          </button>
          <button
            onClick={() => handleNavClick('contact')}
            className="block w-full text-left py-2 px-3 text-slate-300 hover:bg-slate-800/50 rounded-lg"
          >
            Contact
          </button>
          <button
            onClick={() => handleNavClick('neervana')}
            className="flex items-center justify-between w-full py-2.5 px-3 text-blue-300 bg-blue-950/40 border border-blue-800/60 rounded-lg font-semibold"
          >
            <span className="flex items-center gap-2">
              <Cpu className="w-4 h-4 text-blue-400" />
              Neervana AI Prediction
            </span>
            <span className="text-[10px] bg-blue-600 text-white px-2 py-0.5 rounded">AI MODEL</span>
          </button>
          <div className="pt-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenAdminLogin();
              }}
              className="w-full py-2.5 rounded-lg text-sm font-medium text-center text-blue-300 bg-blue-900/30 border border-blue-700"
            >
              Admin Login
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
