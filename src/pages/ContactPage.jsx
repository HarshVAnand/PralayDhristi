import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, AlertTriangle, ShieldCheck, CheckCircle2, Radio } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    basinInterest: 'Tutong River Basin',
    messageType: 'Emergency Advisory Inquiry',
    message: ''
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({
        name: '',
        organization: '',
        email: '',
        basinInterest: 'Tutong River Basin',
        messageType: 'Emergency Advisory Inquiry',
        message: ''
      });
    }, 4000);
  };

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 max-w-6xl mx-auto">
      
      {/* Header */}
      <div className="text-center mb-16">
        <div className="inline-block font-mono-code text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          COMMUNICATION NODE
        </div>
        <h1 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-white mb-4">
          Contact & Flood Hotline
        </h1>
        <p className="text-slate-400 max-w-2xl mx-auto text-sm sm:text-base">
          Direct dispatch with the PralaayDhristi Meteorological Team and National Disaster Coordination Center.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
        
        {/* Contact Info Cards */}
        <div className="space-y-4">
          
          <div className="atmos-glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-red-950/60 border border-red-800/80 flex items-center justify-center text-red-400 mb-4">
              <AlertTriangle className="w-5 h-5 animate-pulse" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">24/7 Flood Warning Hotline</h3>
            <p className="text-xs text-slate-400 mb-3">Instant escalation for community hazard alerts</p>
            <div className="font-mono-code text-lg font-bold text-red-400">+91 97711077372</div>
            <div className="font-mono-code text-xs text-slate-500 mt-1">Direct to Emergency Ops Center</div>
          </div>

          <div className="atmos-glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-blue-950/60 border border-blue-800/80 flex items-center justify-center text-blue-400 mb-4">
              <Mail className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Research & Data Access</h3>
            <p className="text-xs text-slate-400 mb-3">Hydrological telemetry feeds & AI integration</p>
            <div className="font-mono-code text-sm font-semibold text-blue-400">telemetry@pralaaydhristi.org</div>
            <div className="font-mono-code text-xs text-slate-500 mt-1">PGP encrypted channel available</div>
          </div>

          <div className="atmos-glass-card rounded-2xl p-6 border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-center justify-center text-emerald-400 mb-4">
              <Radio className="w-5 h-5" />
            </div>
            <h3 className="text-base font-bold text-white mb-1">Sensor Field HQ</h3>
            <p className="text-xs text-slate-400 mb-3">National Meteorological Station</p>
            <div className="text-xs text-slate-300">
              Department of Meteorology & Hydrology<br />
              Bandar Seri Begawan, BB3510
            </div>
          </div>

        </div>

        {/* Interactive Contact Form */}
        <div className="lg:col-span-2 atmos-glass-card rounded-2xl p-8 border border-blue-900/50">
          <h2 className="text-xl font-bold text-white mb-2">Send Operational Dispatch</h2>
          <p className="text-xs text-slate-400 mb-6 font-mono-code">Submit an inquiry, sensor reading report, or API access request.</p>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1.5">Full Name</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Dr. H. Rahman"
                  className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1.5">Agency / Organization</label>
                <input
                  type="text"
                  required
                  value={formData.organization}
                  onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                  placeholder="e.g. Disaster Management Authority"
                  className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1.5">Email Address</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="officer@agency.gov"
                  className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-mono-code text-slate-300 mb-1.5">Target Catchment Basin</label>
                <select
                  value={formData.basinInterest}
                  onChange={(e) => setFormData({ ...formData, basinInterest: e.target.value })}
                  className="w-full bg-[#050814] border border-slate-700 rounded-lg px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-blue-500 font-mono-code"
                >
                  <option value="Tutong River Basin">Tutong River Basin (High Priority)</option>
                  <option value="Belait Catchment Area">Belait Catchment Area</option>
                  <option value="Temburong Headwaters">Temburong Headwaters</option>
                  <option value="Brunei-Muara Coastal Confluence">Brunei-Muara Coastal Confluence</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-xs font-mono-code text-slate-300 mb-1.5">Message / Field Report Details</label>
              <textarea
                rows={4}
                required
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                placeholder="Specify your field telemetry observations, flood alert parameters, or AI model integration questions..."
                className="w-full bg-[#050814] border border-slate-700 rounded-lg p-3.5 text-sm text-white focus:outline-none focus:border-blue-500"
              />
            </div>

            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3 rounded-xl font-bold text-sm text-white glow-btn-primary flex items-center justify-center gap-2 cursor-pointer"
            >
              <Send className="w-4 h-4" />
              <span>Transmit Dispatch Message</span>
            </button>

            {submitted && (
              <div className="mt-4 p-3.5 rounded-xl bg-emerald-950/60 border border-emerald-700 text-emerald-300 text-xs font-mono-code flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span>Message registered. Incident dispatch ID: #DSP-8942-OK.</span>
              </div>
            )}

          </form>
        </div>

      </div>

    </div>
  );
}
