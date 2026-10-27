import React, { useState } from 'react';
import { X, Lock, ShieldCheck, Key, UserCheck, AlertCircle } from 'lucide-react';
import projectLogo from '../assets/logo.jpg';

export default function AdminLoginModal({ isOpen, onClose, onLoginSuccess }) {
  const [email, setEmail] = useState('admin@pralaaydhristi.org');
  const [password, setPassword] = useState('••••••••••••');
  const [role, setRole] = useState('Chief Hydrologist');
  const [loading, setLoading] = useState(false);

  if (!isOpen) return null;

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      onLoginSuccess({ email, role });
      onClose();
    }, 600);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm">
      <div className="relative w-full max-w-md bg-[#070D22] border border-blue-900/80 rounded-2xl p-6 sm:p-8 shadow-2xl">
        
        {/* Close Button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header with Project Logo */}
        <div className="flex items-center gap-3.5 mb-6">
          <div className="w-12 h-12 rounded-xl overflow-hidden p-0.5 bg-gradient-to-tr from-cyan-500 via-blue-600 to-indigo-600 shadow-lg shadow-blue-500/30 flex items-center justify-center">
            <img 
              src={projectLogo} 
              alt="Pralaya Drishti" 
              className="w-full h-full object-cover rounded-[10px]"
            />
          </div>
          <div>
            <h3 className="text-xl font-bold text-white">Admin Authentication</h3>
            <p className="text-xs font-mono-code text-cyan-300">PralaayDhristi (प्रलय दृष्टि)</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          
          <div>
            <label className="block text-xs font-mono-code text-slate-300 mb-1.5">
              Operator Role
            </label>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono-code"
            >
              <option value="Chief Hydrologist">Chief Hydrologist (Full Control)</option>
              <option value="ML Research Scientist">ML Research Scientist (Model Inference)</option>
              <option value="Field Telemetry Engineer">Field Telemetry Engineer (Sensors)</option>
              <option value="Disaster Response Operator">Disaster Response Operator (Alerts)</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-300 mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div>
            <label className="block text-xs font-mono-code text-slate-300 mb-1.5">
              Security Token / Passkey
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono-code"
            />
          </div>

          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl font-bold text-sm text-white glow-btn-primary flex items-center justify-center gap-2 cursor-pointer"
            >
              {loading ? (
                <span>Authenticating Node...</span>
              ) : (
                <>
                  <ShieldCheck className="w-4 h-4" />
                  <span>Authenticate & Enter Dashboard</span>
                </>
              )}
            </button>
          </div>

          <p className="text-[11px] text-center text-slate-500 pt-2 font-mono-code">
            Demo credentials configured. Click Authenticate to continue.
          </p>

        </form>

      </div>
    </div>
  );
}
