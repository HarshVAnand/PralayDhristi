import React from 'react';
import { LayoutGrid, HelpCircle } from 'lucide-react';

export default function FloatingAdminBadge({ onOpenAdminDashboard, onOpenHelp }) {
  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      
      {/* Floating Admin Dashboard button matching screenshots */}
      <button
        onClick={onOpenAdminDashboard}
        className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg bg-[#071026]/90 hover:bg-[#0C1B40] text-blue-400 hover:text-blue-300 border border-blue-700/60 hover:border-blue-500 shadow-xl backdrop-blur-md transition-all duration-200 cursor-pointer group"
      >
        <LayoutGrid className="w-4 h-4 text-blue-400 group-hover:rotate-45 transition-transform" />
        <span className="font-mono-code text-xs font-bold tracking-wider uppercase">
          ADMIN DASHBOARD
        </span>
      </button>

      {/* Floating Help Circle '?' matching screenshots */}
      <button
        onClick={onOpenHelp}
        className="w-9 h-9 rounded-full bg-[#08122A] hover:bg-slate-800 text-slate-400 hover:text-white border border-slate-700/80 flex items-center justify-center shadow-lg transition-all cursor-pointer font-bold text-sm"
        title="Quick Help & AI Model Architecture"
      >
        ?
      </button>

    </div>
  );
}
