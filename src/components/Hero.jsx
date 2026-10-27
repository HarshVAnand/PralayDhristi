import React, { useEffect, useRef } from 'react';
import { ArrowRight, Sparkles, ChevronRight, Compass } from 'lucide-react';
import { APP_CONFIG } from '../data/config';
import gsap from 'gsap';

export default function Hero({ onNavigateNeervana, onNavigateHowItWorks }) {
  const heroRef = useRef(null);
  const badgeRef = useRef(null);
  const headingRef = useRef(null);
  const subtextRef = useRef(null);
  const ctaRef = useRef(null);

  useEffect(() => {
    // Lightweight GPU-accelerated GSAP animation
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      tl.fromTo(badgeRef.current, 
        { opacity: 0, y: -20, scale: 0.95 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.7 }
      )
      .fromTo(headingRef.current, 
        { opacity: 0, y: 30 }, 
        { opacity: 1, y: 0, duration: 0.9 }, 
        '-=0.4'
      )
      .fromTo(subtextRef.current, 
        { opacity: 0, y: 20 }, 
        { opacity: 1, y: 0, duration: 0.7 }, 
        '-=0.5'
      )
      .fromTo(ctaRef.current, 
        { opacity: 0, y: 20, scale: 0.98 }, 
        { opacity: 1, y: 0, scale: 1, duration: 0.6 }, 
        '-=0.4'
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="hero" ref={heroRef} className="relative pt-16 pb-20 md:pt-24 md:pb-32 overflow-hidden">
      {/* Background Gradients & Grid */}
      <div className="absolute inset-0 radial-glow-hero pointer-events-none" />
      <div className="absolute inset-0 subtle-grid-bg opacity-30 pointer-events-none" />

      <div className="relative max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Status Pill matching Screenshot 1 */}
        <div ref={badgeRef} className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-[#0A1633]/80 border border-blue-500/30 backdrop-blur-md mb-8 animate-pulse-subtle shadow-[0_0_20px_rgba(59,130,246,0.15)]">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_#34d399]" />
          <span className="font-mono-code text-xs font-semibold text-blue-300 tracking-wider">
            {APP_CONFIG.systemStatus.label}
          </span>
          <span className="text-slate-600">·</span>
          <span className="font-mono-code text-xs text-slate-400">
            {APP_CONFIG.systemStatus.region}
          </span>
        </div>

        {/* Big Serif Heading matching Screenshot 1 */}
        <h1 ref={headingRef} className="font-serif-title text-5xl sm:text-6xl md:text-7xl lg:text-[80px] leading-[1.08] tracking-tight font-normal text-white mb-8 will-change-transform">
          Precision Weather
          <br />
          Intelligence{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-sky-300 to-blue-500 drop-shadow-[0_0_35px_rgba(56,189,248,0.35)]">
            Powered by AI
          </span>
        </h1>

        {/* Subtitle matching Screenshot 1 */}
        <p ref={subtextRef} className="max-w-3xl mx-auto text-base sm:text-lg md:text-xl text-slate-400 font-normal leading-relaxed mb-10">
          Real-time weather monitoring and AI-driven flood prediction for vulnerable river basins.
          Protect communities with 24-hour advance warning and 91.3% model accuracy.
        </p>

        {/* CTA Action Buttons matching Screenshot 1 */}
        <div ref={ctaRef} className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5">
          <button
            onClick={onNavigateNeervana}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-semibold text-white glow-btn-primary flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>View Live Dashboard</span>
          </button>

          <button
            onClick={onNavigateHowItWorks}
            className="w-full sm:w-auto px-8 py-3.5 rounded-xl text-base font-medium text-amber-300 hover:text-amber-200 bg-[#0B1224] hover:bg-[#0f1b38] border border-amber-500/40 hover:border-amber-400/80 transition-all duration-200 flex items-center justify-center gap-2 cursor-pointer shadow-sm"
          >
            <span>Learn More</span>
          </button>
        </div>

      </div>
    </section>
  );
}
