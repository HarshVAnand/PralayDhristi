import React, { useState } from 'react';
import { Mail, CheckCircle2 } from 'lucide-react';

export default function NewsletterCTA() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email && email.includes('@')) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  return (
    <section className="relative py-20 md:py-28 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center border-t border-slate-800/60">
      
      {/* Heading matching Screenshot 5 */}
      <h2 className="font-serif-title text-4xl sm:text-5xl md:text-6xl font-normal text-white tracking-tight mb-4">
        Stay ahead of severe weather
      </h2>

      {/* Subtitle matching Screenshot 5 */}
      <p className="text-sm sm:text-base text-slate-400 max-w-xl mx-auto mb-10">
        Subscribe for real-time flood advisories and weekly hydrological summaries.
      </p>

      {/* Input Box with Yellow Subscribe Button matching Screenshot 5 */}
      <form onSubmit={handleSubmit} className="max-w-xl mx-auto">
        <div className="flex flex-col sm:flex-row items-stretch rounded-xl sm:rounded-2xl bg-[#070D22] border border-blue-900/60 p-1.5 shadow-2xl focus-within:border-blue-500 transition-all">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="flex-1 bg-transparent px-5 py-3.5 text-sm sm:text-base text-white placeholder-slate-500 focus:outline-none"
          />
          <button
            type="submit"
            className="mt-2 sm:mt-0 px-8 py-3.5 rounded-lg sm:rounded-xl text-sm sm:text-base font-bold text-slate-950 bg-[#F5A623] hover:bg-[#ffb43b] transition-all duration-200 shadow-md cursor-pointer flex items-center justify-center gap-2"
          >
            <span>Subscribe</span>
          </button>
        </div>

        {subscribed && (
          <div className="mt-4 inline-flex items-center gap-2 text-xs sm:text-sm text-emerald-400 font-mono-code bg-emerald-950/40 border border-emerald-800/60 px-4 py-1.5 rounded-full">
            <CheckCircle2 className="w-4 h-4" />
            <span>Subscribed successfully to PralaayDhristi flood advisories!</span>
          </div>
        )}
      </form>

    </section>
  );
}
