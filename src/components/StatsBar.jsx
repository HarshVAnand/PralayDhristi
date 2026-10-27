import React, { useEffect, useRef } from 'react';
import { APP_CONFIG } from '../data/config';
import gsap from 'gsap';

export default function StatsBar() {
  const barRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.stat-item', 
        { opacity: 0, y: 25 }, 
        { 
          opacity: 1, 
          y: 0, 
          duration: 0.8, 
          stagger: 0.12, 
          ease: 'power2.out',
          delay: 0.2
        }
      );
    }, barRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={barRef} className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-4 mb-24">
      <div className="atmos-glass-card rounded-2xl p-6 sm:p-8 md:p-10 border border-blue-900/40">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 divide-y sm:divide-y-0 sm:divide-x divide-slate-800/80">
          {APP_CONFIG.stats.map((stat, idx) => (
            <div key={idx} className={`stat-item text-center ${idx > 0 ? 'pt-4 sm:pt-0 sm:pl-4' : ''}`}>
              <div className="font-mono-code text-3xl sm:text-4xl md:text-5xl font-bold text-blue-400 tracking-tight mb-2 drop-shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                {stat.value}
              </div>
              <div className="text-xs sm:text-sm font-medium text-slate-400 tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
