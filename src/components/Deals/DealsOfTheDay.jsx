import React, { useState, useEffect } from 'react';
import { Clock, Flame, ShoppingBag, ArrowRight } from 'lucide-react';
import { DEALS_OF_THE_DAY } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function DealsOfTheDay() {
  const { addToCart, setQuickViewProduct } = useShop();

  // Real-time decrementing countdown timer for the deals
  const [timeLeft, setTimeLeft] = useState({
    hours: 14,
    minutes: 36,
    seconds: 42,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 23, minutes: 59, seconds: 59 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section id="deals-section" className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-rose-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-4 h-4 fill-rose-500 animate-pulse" />
            <span>Expires Tonight</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
            Deals of the Day
          </h2>
        </div>

        {/* Global Deals Countdown Banner */}
        <div className="flex items-center gap-2 bg-rose-50 border border-rose-200/80 px-4 py-2 rounded-2xl text-xs font-bold text-rose-800">
          <Clock className="w-4 h-4 text-rose-600 animate-spin" style={{ animationDuration: '6s' }} />
          <span>Ends In:</span>
          <div className="flex items-center gap-1 font-mono text-sm font-extrabold text-rose-700">
            <span className="bg-white px-2 py-0.5 rounded-lg border border-rose-200 shadow-xs">
              {String(timeLeft.hours).padStart(2, '0')}h
            </span>
            <span>:</span>
            <span className="bg-white px-2 py-0.5 rounded-lg border border-rose-200 shadow-xs">
              {String(timeLeft.minutes).padStart(2, '0')}m
            </span>
            <span>:</span>
            <span className="bg-white px-2 py-0.5 rounded-lg border border-rose-200 shadow-xs">
              {String(timeLeft.seconds).padStart(2, '0')}s
            </span>
          </div>
        </div>
      </div>

      {/* 3 Large Deal Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {DEALS_OF_THE_DAY.map((deal) => {
          const percentSold = Math.round((deal.itemsSold / deal.totalStock) * 100);

          return (
            <div
              key={deal.id}
              className="bg-white rounded-3xl border border-gray-100 overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between group hover:border-emerald-200"
            >
              {/* Product Image & Badges */}
              <div className="relative aspect-4/3 w-full bg-gray-50 overflow-hidden">
                <img
                  src={deal.image}
                  alt={deal.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />

                {/* Red Discount Pill (Top-Left) */}
                <div className="absolute top-3 left-3 bg-red-500 text-white font-black text-xs px-3 py-1 rounded-full shadow-md">
                  {deal.discountBadge}
                </div>

                {/* Stock Left Alert (Top-Right) */}
                <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md text-emerald-300 font-bold text-[11px] px-2.5 py-1 rounded-full border border-white/10">
                  {deal.totalStock - deal.itemsSold} left
                </div>
              </div>

              {/* Deal Card Body */}
              <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                <div>
                  <h3
                    onClick={() => setQuickViewProduct(deal)}
                    className="text-base sm:text-lg font-bold text-gray-900 group-hover:text-emerald-600 transition-colors line-clamp-1 cursor-pointer font-heading"
                  >
                    {deal.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">
                    {deal.description}
                  </p>
                </div>

                {/* Progress bar of stock sold */}
                <div className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-500">Sold: <strong className="text-gray-800">{deal.itemsSold}</strong> / {deal.totalStock}</span>
                    <span className="text-rose-600">{percentSold}% claimed</span>
                  </div>
                  <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-emerald-500 to-rose-500 rounded-full transition-all duration-500"
                      style={{ width: `${percentSold}%` }}
                    />
                  </div>
                </div>

                {/* Price and CTA */}
                <div className="pt-3 border-t border-gray-100 flex items-center justify-between gap-3">
                  <div>
                    <span className="text-xl sm:text-2xl font-black text-emerald-600 font-heading">
                      ${deal.price.toFixed(2)}
                    </span>
                    <span className="text-xs text-gray-400 line-through ml-2">
                      ${deal.originalPrice.toFixed(2)}
                    </span>
                  </div>

                  <button
                    onClick={() => addToCart(deal, 1)}
                    className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/30 transition-all cursor-pointer"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                    <span>Grab Deal</span>
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

    </section>
  );
}
