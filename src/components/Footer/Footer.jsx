import React, { useState } from 'react';
import { Leaf, Send, Phone, Mail, MapPin, ShieldCheck, Heart, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Footer() {
  const [email, setEmail] = useState('');
  const { showToast } = useShop();

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) return;
    showToast('Subscribed! Check your inbox for your 15% welcome code.');
    setEmail('');
  };

  return (
    <footer id="footer" className="bg-[#042f24] text-emerald-100/90 pt-16 pb-8 border-t border-emerald-900">
      <div className="max-w-7xl mx-auto px-4">
        
        {/* Top Newsletter Bar */}
        <div className="bg-emerald-950/80 rounded-3xl p-8 sm:p-10 border border-emerald-800/80 mb-14 shadow-2xl relative overflow-hidden">
          <div className="absolute -right-20 -top-20 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            <div className="lg:col-span-6 space-y-2">
              <span className="text-emerald-400 text-xs font-extrabold uppercase tracking-widest block">
                Stay Ahead Of The Curve
              </span>
              <h3 className="text-2xl sm:text-3xl font-black text-white font-heading">
                Subscribe &amp; Get 15% Off First Order
              </h3>
              <p className="text-emerald-200/70 text-xs sm:text-sm">
                Receive private sale access, secret discounts, and new collection drops weekly.
              </p>
            </div>

            <div className="lg:col-span-6">
              <form onSubmit={handleSubscribe} className="flex flex-col sm:flex-row gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full bg-emerald-900/60 border border-emerald-700/60 rounded-2xl px-4 py-3 text-sm text-white placeholder-emerald-300/40 focus:outline-hidden focus:border-emerald-400 transition-colors"
                />
                <button
                  type="submit"
                  className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-black text-sm px-6 py-3 rounded-2xl transition-all shadow-lg shadow-emerald-500/20 shrink-0 flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>Subscribe</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
              <p className="text-[11px] text-emerald-300/50 mt-2">
                By subscribing, you agree to our Privacy Policy. Unsubscribe anytime.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Main Footer Columns */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-emerald-900/80">
          
          {/* Brand & Mission (Col 1 & 2) */}
          <div className="lg:col-span-2 space-y-4">
            <a href="#" className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center text-emerald-950 shadow-md">
                <Leaf className="w-5 h-5 fill-emerald-950" />
              </div>
              <span className="text-2xl font-black tracking-tight text-white font-heading">
                ELITE<span className="text-emerald-400">COMMERCE</span>
              </span>
            </a>

            <p className="text-xs sm:text-sm text-emerald-200/70 leading-relaxed max-w-sm">
              Elite Commerce is your premier destination for curated lifestyle luxury, next-generation electronics, high fashion, and winter essentials with guaranteed authenticity and worldwide express shipping.
            </p>

            <div className="pt-2 space-y-2 text-xs text-emerald-200/90 font-medium">
              <div className="flex items-center gap-2.5">
                <MapPin className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>742 Evergreen Promenade, Suite 400, New York, NY</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>+1 (800) 843-3548 (Toll Free 24/7)</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>concierge@elitecommerce.com</span>
              </div>
            </div>
          </div>

          {/* Column 1: Navigation */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading">
              Navigation
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><a href="#hero" className="hover:text-white transition-colors">Home Highlights</a></li>
              <li><a href="#categories" className="hover:text-white transition-colors">Best Categories</a></li>
              <li><a href="#for-you-section" className="hover:text-white transition-colors">For You Products</a></li>
              <li><a href="#trending" className="hover:text-white transition-colors">Trending Now</a></li>
              <li><a href="#deals-section" className="hover:text-white transition-colors">Deals of the Day</a></li>
              <li><a href="#blogs-section" className="hover:text-white transition-colors">Castle Chronicles</a></li>
            </ul>
          </div>

          {/* Column 2: My Account */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading">
              My Account
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><a href="#about" className="hover:text-white transition-colors">Member Sign In</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Order Tracking</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Saved Wishlist</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Reward Points Balance</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">VIP Membership Tier</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Returns &amp; Exchanges</a></li>
            </ul>
          </div>

          {/* Column 3: Customer Care */}
          <div className="space-y-3">
            <h4 className="text-sm font-extrabold uppercase tracking-wider text-white font-heading">
              Customer Care
            </h4>
            <ul className="space-y-2 text-xs text-emerald-200/80">
              <li><a href="#faq-section" className="hover:text-white transition-colors">Help Center &amp; FAQ</a></li>
              <li><a href="#privacy" className="hover:text-white transition-colors">Privacy &amp; Cookie Policy</a></li>
              <li><a href="#terms" className="hover:text-white transition-colors">Terms of Service</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Warranty Registration</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Shipping Rates &amp; Policies</a></li>
              <li><a href="#faq-section" className="hover:text-white transition-colors">Authenticity Guarantee</a></li>
            </ul>
          </div>

        </div>

        {/* Bottom Bar: Copyright & Payment badges */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-emerald-300/60">
          <p>© 2026 Elite Commerce Inc. All rights reserved. Crafted with precision.</p>

          <div className="flex items-center gap-3">
            <span className="bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 text-[10px] font-bold text-emerald-200">
              VISA
            </span>
            <span className="bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 text-[10px] font-bold text-emerald-200">
              MasterCard
            </span>
            <span className="bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 text-[10px] font-bold text-emerald-200">
              Apple Pay
            </span>
            <span className="bg-emerald-950 px-2.5 py-1 rounded-md border border-emerald-800 text-[10px] font-bold text-emerald-200">
              PayPal
            </span>
          </div>
        </div>

      </div>
    </footer>
  );
}
