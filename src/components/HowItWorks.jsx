import React, { useEffect, useRef } from 'react';
import { APP_CONFIG } from '../data/config';
import gsap from 'gsap';

export default function HowItWorks() {
  const methodRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.methodology-step', 
        { opacity: 0, scale: 0.9, y: 20 }, 
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.6, 
          stagger: 0.18, 
          ease: 'back.out(1.4)',
          delay: 0.1
        }
      );
    }, methodRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="how-it-works" ref={methodRef} className="relative py-20 md:py-28 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
      
      {/* Section Header matching Screenshot 3 */}
      <div className="text-center mb-20">
        <div className="inline-block font-mono-code text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          METHODOLOGY
        </div>
        <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight">
          How it works
        </h2>
      </div>

      {/* 4-Step Process Flow matching Screenshot 3 */}
      <div className="relative">
        {/* Desktop connecting horizontal line */}
        <div className="hidden lg:block absolute top-6 left-[10%] right-[10%] h-[2px] bg-gradient-to-r from-blue-900 via-blue-600 to-blue-900 z-0 opacity-60" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
          {APP_CONFIG.methodologySteps.map((step, idx) => (
            <div key={idx} className="methodology-step flex flex-col items-center text-center group">
              
              {/* Number Circle matching Screenshot 3 */}
              <div className="w-12 h-12 rounded-full bg-[#081228] border-2 border-blue-500 text-blue-400 font-mono-code font-bold text-base flex items-center justify-center mb-6 shadow-[0_0_20px_rgba(59,130,246,0.35)] group-hover:scale-110 group-hover:border-blue-400 group-hover:text-white transition-all duration-300">
                {step.number}
              </div>

              {/* Step Title */}
              <h3 className="text-base sm:text-lg font-bold text-white mb-2.5">
                {step.title}
              </h3>

              {/* Step Description */}
              <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-xs">
                {step.description}
              </p>

            </div>
          ))}
        </div>

      </div>

    </section>
  );
}
