import React from 'react';
import { ArrowRight, Clock, Gift, Sparkles } from 'lucide-react';

export default function PromoBanner() {
  const handleScrollToDeals = () => {
    const target = document.getElementById('deals-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div className="relative rounded-3xl overflow-hidden shadow-xl min-h-[300px] sm:min-h-[340px] flex items-center bg-gray-900 border border-emerald-800/40">
        
        {/* Lifestyle Background Image */}
        <img
          src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=1600&auto=format&fit=crop&q=80"
          alt="Happy shoppers with bags"
          className="absolute inset-0 w-full h-full object-cover object-center opacity-45 mix-blend-luminosity transform scale-105 hover:scale-100 transition-transform duration-700"
        />

        {/* Gradient Overlay for high text readability and rich emerald mood */}
        <div className="absolute inset-0 bg-gradient-to-r from-emerald-950/95 via-emerald-900/85 to-transparent" />
        <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Content */}
        <div className="relative z-10 p-6 sm:p-12 md:p-14 max-w-2xl text-white">
          
          <div className="inline-flex items-center gap-2 bg-emerald-500/25 border border-emerald-400/40 text-emerald-300 px-3.5 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider mb-4">
            <Gift className="w-3.5 h-3.5 text-amber-300" />
            <span>Holiday Season Special</span>
          </div>

          <h2 className="text-3xl sm:text-4xl md:text-5xl font-black text-white tracking-tight leading-tight mb-3 font-heading">
            Up to 50% OFF on your favorite items 🎁
          </h2>

          <div className="flex items-center gap-2 text-emerald-200/90 text-sm sm:text-base font-medium mb-6">
            <Clock className="w-4 h-4 text-amber-300 animate-pulse" />
            <span className="font-semibold text-amber-200">Limited time only!</span>
            <span>Ends Sunday at midnight. Don't miss out on premium member discounts.</span>
          </div>

          <div className="flex flex-wrap items-center gap-4">
            <button
              onClick={handleScrollToDeals}
              className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 transition-all cursor-pointer"
            >
              <span>Shop Now &amp; Save Big</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>

            <div className="flex items-center gap-2 bg-black/40 backdrop-blur-md px-4 py-3 rounded-2xl border border-white/10 text-xs font-semibold text-emerald-300">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Use code <strong>ELITE50</strong> at checkout</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
