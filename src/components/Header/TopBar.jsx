import React from 'react';
import { PhoneCall, Sparkles, ShieldCheck } from 'lucide-react';

export default function TopBar() {
  return (
    <div className="bg-[#064e3b] text-emerald-100 text-xs py-2 px-4 border-b border-emerald-800/60 tracking-tight">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2">
        {/* Left Links */}
        <div className="flex items-center gap-3 font-medium text-emerald-200/90 text-center sm:text-left">
          <a href="#about" className="hover:text-white transition-colors duration-150">About</a>
          <span className="text-emerald-700">|</span>
          <a href="#privacy" className="hover:text-white transition-colors duration-150">Privacy Policy</a>
          <span className="text-emerald-700">|</span>
          <a href="#terms" className="hover:text-white transition-colors duration-150">Terms &amp; Condition</a>
        </div>

        {/* Center Banner */}
        <div className="flex items-center gap-2 font-semibold text-emerald-100 bg-emerald-900/60 px-3 py-0.5 rounded-full border border-emerald-700/50 shadow-inner">
          <Sparkles className="w-3.5 h-3.5 text-amber-300 animate-pulse" />
          <span>Get 50% off on Member Exclusive Month</span>
          <span className="bg-emerald-500 text-white text-[10px] uppercase font-bold px-1.5 py-0.2 rounded-xs">Code: ELITE50</span>
        </div>

        {/* Right Phone & Support */}
        <div className="flex items-center gap-4 text-emerald-200/90 font-medium">
          <div className="flex items-center gap-1.5 hover:text-white cursor-pointer transition-colors">
            <PhoneCall className="w-3.5 h-3.5 text-emerald-400" />
            <span>24/7 Support: +1 (800) 843-3548</span>
          </div>
          <span className="hidden sm:inline text-emerald-700">|</span>
          <div className="hidden sm:flex items-center gap-1 text-emerald-300">
            <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
            <span>Buyer Protection</span>
          </div>
        </div>
      </div>
    </div>
  );
}
