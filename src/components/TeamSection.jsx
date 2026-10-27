import React, { useEffect, useRef } from 'react';
import { TEAM_MEMBERS } from '../data/teamData';
import gsap from 'gsap';

export default function TeamSection() {
  const teamRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.team-card', 
        { opacity: 0, scale: 0.85, y: 30 }, 
        { 
          opacity: 1, 
          scale: 1, 
          y: 0, 
          duration: 0.7, 
          stagger: 0.15, 
          ease: 'power3.out',
          delay: 0.1
        }
      );
    }, teamRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="team" ref={teamRef} className="relative py-20 md:py-32 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-slate-800/60">
      
      {/* Section Header matching Screenshot 4 */}
      <div className="text-center mb-20">
        <div className="inline-block font-mono-code text-xs font-semibold tracking-widest text-amber-400 uppercase mb-3">
          THE TEAM
        </div>
        <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight">
          The researchers behind PralaayDhristi
        </h2>
      </div>

      {/* 4 Team Member Glowing Circular Badges matching Screenshot 4 */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 sm:gap-10">
        {TEAM_MEMBERS.map((member) => (
          <div key={member.id} className="team-card flex flex-col items-center text-center group">
            
            {/* Glowing Circular Avatar with Initials */}
            <div className="relative mb-5">
              <div 
                className={`w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-br ${member.colorGradient} flex items-center justify-center text-white font-mono-code text-2xl sm:text-3xl font-bold shadow-xl transition-all duration-300 group-hover:scale-105`}
                style={{
                  boxShadow: `0 0 35px ${member.glowColor}`
                }}
              >
                {member.initials}
              </div>
            </div>

            {/* Name */}
            <h3 className="text-base sm:text-lg font-bold text-white mb-1 group-hover:text-blue-300 transition-colors">
              {member.name}
            </h3>

            {/* Role */}
            <div className="text-xs sm:text-sm font-medium text-slate-400 mb-2">
              {member.role}
            </div>

            {/* Sub-specialty */}
            <p className="text-xs text-slate-500 line-clamp-2 max-w-[200px]">
              {member.specialty}
            </p>

          </div>
        ))}
      </div>

    </section>
  );
}
