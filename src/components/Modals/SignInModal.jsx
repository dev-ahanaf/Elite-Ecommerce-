import React, { useState } from 'react';
import { X, Sparkles, Check, Lock, Mail, User } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function SignInModal() {
  const { isSignInOpen, setIsSignInOpen, showToast } = useShop();
  const [tab, setTab] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isSignInOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    showToast(tab === 'signin' ? 'Welcome back! Signed in successfully.' : 'Welcome to Elite VIP Membership!');
    setIsSignInOpen(false);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsSignInOpen(false)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Card */}
      <div className="relative bg-white rounded-3xl max-w-md w-full shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close Button */}
        <button
          onClick={() => setIsSignInOpen(false)}
          aria-label="Close modal"
          className="absolute top-4 right-4 z-20 w-8 h-8 rounded-full bg-white/20 hover:bg-white/40 text-white flex items-center justify-center transition-colors"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Top Header with emerald gradient */}
        <div className="bg-gradient-to-br from-emerald-800 to-emerald-950 p-6 text-white text-center">
          <div className="inline-flex items-center gap-1.5 bg-emerald-700/60 border border-emerald-500/40 text-emerald-200 text-xs font-bold px-3 py-1 rounded-full mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Member Exclusive Portal</span>
          </div>
          <h2 className="text-2xl font-black font-heading">
            {tab === 'signin' ? 'Welcome to Elite' : 'Join Elite Membership'}
          </h2>
          <p className="text-xs text-emerald-200/80 mt-1">
            Access up to 50% member discounts &amp; priority express delivery.
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex border-b border-gray-100 bg-gray-50/70 p-1">
          <button
            onClick={() => setTab('signin')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === 'signin'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Sign In
          </button>
          <button
            onClick={() => setTab('signup')}
            className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${
              tab === 'signup'
                ? 'bg-white text-emerald-700 shadow-xs'
                : 'text-gray-500 hover:text-gray-900'
            }`}
          >
            Create Account
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          
          {tab === 'signup' && (
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  required
                  placeholder="Alexander Vance"
                  className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">Email Address</label>
            <div className="relative">
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="name@example.com"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-xs font-bold text-gray-700">Password</label>
              {tab === 'signin' && (
                <a href="#" className="text-[11px] font-semibold text-emerald-600 hover:underline">
                  Forgot?
                </a>
              )}
            </div>
            <div className="relative">
              <Lock className="w-4 h-4 text-gray-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                placeholder="••••••••"
                className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-gray-50 border border-gray-200 rounded-xl focus:outline-hidden focus:border-emerald-600 focus:bg-white transition-all"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm py-3 rounded-xl shadow-md shadow-emerald-600/30 transition-all cursor-pointer"
          >
            {tab === 'signin' ? 'Sign In to Account' : 'Create Free VIP Account'}
          </button>

          {/* Member perks preview */}
          <div className="pt-2 border-t border-gray-100 space-y-1.5 text-[11px] text-gray-500">
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Earn 5% cashback points on all orders</span>
            </div>
            <div className="flex items-center gap-2">
              <Check className="w-3.5 h-3.5 text-emerald-600" />
              <span>Free returns &amp; priority 24/7 concierge</span>
            </div>
          </div>

        </form>

      </div>
    </div>
  );
}
