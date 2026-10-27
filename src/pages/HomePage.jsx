import React from 'react';
import Hero from '../components/Hero';
import StatsBar from '../components/StatsBar';
import Capabilities from '../components/Capabilities';
import HowItWorks from '../components/HowItWorks';
import TeamSection from '../components/TeamSection';
import NewsletterCTA from '../components/NewsletterCTA';

export default function HomePage({ onNavigateNeervana }) {
  const handleScrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen">
      <Hero 
        onNavigateNeervana={onNavigateNeervana} 
        onNavigateHowItWorks={() => handleScrollToSection('how-it-works')} 
      />
      <StatsBar />
      <Capabilities onNavigateNeervana={onNavigateNeervana} />
      <HowItWorks />
      <TeamSection />
      <NewsletterCTA />
    </div>
  );
}
