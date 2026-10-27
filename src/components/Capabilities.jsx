import React, { useEffect, useRef } from 'react';
import { Brain, Activity, Bell, BarChart3, Radio, ArrowUpRight } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import gsap from 'gsap';

export default function Capabilities({ onNavigateNeervana }) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.capability-card', 
        { opacity: 0, y: 30 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: 'power2.out',
          delay: 0.1
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getIcon = (id) => {
    switch (id) {
      case 'ai-prediction':
        return <Brain className="w-6 h-6 text-blue-400" />;
      case 'sensor-network':
        return <Activity className="w-6 h-6 text-sky-400" />;
      case 'configurable-alerts':
        return <Bell className="w-6 h-6 text-amber-400" />;
      case 'interactive-analytics':
        return <BarChart3 className="w-6 h-6 text-emerald-400" />;
      default:
        return <Radio className="w-6 h-6 text-blue-400" />;
    }
  };

  return (
    <section id="features" ref={sectionRef} className="relative py-16 md:py-24 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Section Header matching Screenshot 2 */}
      <div className="text-center mb-16">
        <div className="inline-block font-mono-code text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          CAPABILITIES
        </div>
        <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight">
          Built for operational reliability
        </h2>
      </div>

      {/* 2x2 Capabilities Grid matching Screenshots 2 & 3 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
        {APP_CONFIG.capabilities.map((cap) => (
          <div
            key={cap.id}
            onClick={onNavigateNeervana}
            className="capability-card atmos-glass-card rounded-2xl p-7 sm:p-8 flex flex-col justify-between group cursor-pointer border border-slate-800/80 hover:border-blue-500/50"
          >
            <div>
              <div className="flex items-start gap-4 mb-5">
                <div className="w-12 h-12 rounded-xl bg-[#0B1530] border border-blue-900/60 flex items-center justify-center group-hover:scale-105 transition-transform duration-300">
                  {getIcon(cap.id)}
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white group-hover:text-blue-300 transition-colors">
                    {cap.title}
                  </h3>
                  <span className="font-mono-code text-xs text-blue-400 tracking-wider">
                    {cap.category}
                  </span>
                </div>
              </div>

              <p className="text-slate-400 text-sm sm:text-base leading-relaxed">
                {cap.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-800/60 flex items-center justify-between text-xs font-mono-code text-slate-500 group-hover:text-blue-400 transition-colors">
              <span>EXPLORE IN NEERVANA AI</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}
