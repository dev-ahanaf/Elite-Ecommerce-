import React, { useState, useEffect } from 'react';
import { Gamepad2, ShoppingBag, Sparkles, ChevronLeft, ChevronRight, Star, Clock, ArrowRight } from 'lucide-react';
import { VIDEO_GAMES, MOST_POPULAR_PRODUCTS } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function RightSidebar() {
  const { addToCart, setQuickViewProduct } = useShop();

  // Featured Deal Countdown Timer (Days, Hours, Minutes, Seconds)
  const [countdown, setCountdown] = useState({
    days: 4,
    hours: 18,
    minutes: 42,
    seconds: 15,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        return { days: 0, hours: 0, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Video Games Carousel state
  const [gameIndex, setGameIndex] = useState(0);

  const prevGame = () => {
    setGameIndex((prev) => (prev > 0 ? prev - 1 : VIDEO_GAMES.length - 1));
  };
  const nextGame = () => {
    setGameIndex((prev) => (prev < VIDEO_GAMES.length - 1 ? prev + 1 : 0));
  };

  // Most Popular Tabs
  const [popularTab, setPopularTab] = useState('All');
  const popularTabs = ['All', 'Electronics', 'Fashion', 'Health'];

  const filteredPopular =
    popularTab === 'All'
      ? MOST_POPULAR_PRODUCTS
      : MOST_POPULAR_PRODUCTS.filter((item) => item.category.toLowerCase().includes(popularTab.toLowerCase()));

  return (
    <div id="sidebar-deals" className="space-y-8">
      
      {/* 1. FEATURED DEAL BANNER: APPLE IPHONE 17 PRO */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#033729] to-[#022118] text-white p-6 sm:p-8 shadow-xl border border-emerald-800/80">
        
        {/* Glow ambient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-400/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-10 -left-10 w-48 h-48 bg-emerald-600/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 space-y-4">
          <div className="inline-flex items-center gap-2 bg-emerald-500/25 border border-emerald-400/30 text-emerald-300 text-[11px] font-extrabold uppercase px-3 py-1 rounded-full">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Limited Flagship Edition</span>
          </div>

          <div>
            <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-white font-heading">
              APPLE IPHONE 17 PRO
            </h3>
            <p className="text-xs sm:text-sm text-emerald-100/80 mt-1">
              Aerospace Titanium, Quantum Neural Chip &amp; 10x Periscope Optics.
            </p>
          </div>

          {/* Countdown Boxes */}
          <div className="grid grid-cols-4 gap-2 pt-1 text-center">
            <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-xl">
              <span className="block text-lg sm:text-xl font-black text-emerald-300 font-mono">
                {String(countdown.days).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400/80">Days</span>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-xl">
              <span className="block text-lg sm:text-xl font-black text-emerald-300 font-mono">
                {String(countdown.hours).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400/80">Hours</span>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-xl">
              <span className="block text-lg sm:text-xl font-black text-emerald-300 font-mono">
                {String(countdown.minutes).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400/80">Mins</span>
            </div>
            <div className="bg-emerald-950/80 border border-emerald-700/60 p-2 rounded-xl">
              <span className="block text-lg sm:text-xl font-black text-amber-400 font-mono animate-pulse">
                {String(countdown.seconds).padStart(2, '0')}
              </span>
              <span className="text-[10px] uppercase font-bold text-emerald-400/80">Secs</span>
            </div>
          </div>

          {/* Price and CTA button */}
          <div className="flex items-center justify-between pt-3 border-t border-emerald-800/80">
            <div>
              <span className="text-xs text-emerald-300/70 block">Special Launch Price</span>
              <span className="text-2xl font-black text-emerald-300 font-heading">$1,199.00</span>
            </div>
            <button
              onClick={() =>
                addToCart({
                  id: 'iphone-17-pro',
                  title: 'Apple iPhone 17 Pro Titanium Edition',
                  price: 1199.0,
                  originalPrice: 1399.0,
                  image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
                  category: 'Electronics',
                })
              }
              className="bg-emerald-500 hover:bg-emerald-400 active:scale-95 text-emerald-950 font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg shadow-emerald-500/30 transition-all cursor-pointer flex items-center gap-1.5"
            >
              <span>Shop Now</span>
              <ArrowRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>

      </div>

      {/* 2. POPULAR VIDEO GAME CAROUSEL */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
              <Gamepad2 className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-extrabold text-gray-900 text-base font-heading">Popular Video Game</h3>
              <p className="text-xs text-gray-400">Top rated console &amp; PC blockbusters</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              onClick={prevGame}
              aria-label="Previous game"
              className="w-8 h-8 rounded-full border border-gray-200 hover:bg-emerald-50 text-gray-600 flex items-center justify-center text-xs transition-colors"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextGame}
              aria-label="Next game"
              className="w-8 h-8 rounded-full border border-gray-200 hover:bg-emerald-50 text-gray-600 flex items-center justify-center text-xs transition-colors"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Game Card Carousel Display */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {VIDEO_GAMES.slice(gameIndex % 3, (gameIndex % 3) + 2).map((game) => (
            <div
              key={game.id}
              className="bg-gray-50 rounded-2xl p-3 border border-gray-100 hover:border-emerald-300 transition-all group flex flex-col justify-between"
            >
              <div className="relative aspect-4/3 rounded-xl overflow-hidden mb-3">
                <img
                  src={game.image}
                  alt={game.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
                <span className="absolute top-2 left-2 bg-black/70 backdrop-blur-xs text-[10px] font-bold text-white px-2 py-0.5 rounded-md">
                  {game.platform}
                </span>
                <span className="absolute top-2 right-2 bg-amber-400 text-black text-[10px] font-extrabold px-1.5 py-0.5 rounded-md flex items-center gap-0.5">
                  <Star className="w-3 h-3 fill-black" />
                  {game.rating}
                </span>
              </div>

              <div>
                <h4
                  onClick={() => setQuickViewProduct(game)}
                  className="text-xs font-bold text-gray-900 group-hover:text-emerald-700 line-clamp-1 cursor-pointer"
                >
                  {game.title}
                </h4>
                <div className="flex items-center justify-between mt-2 pt-2 border-t border-gray-200/60">
                  <div className="flex items-baseline gap-1">
                    <span className="text-sm font-extrabold text-emerald-600">${game.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 line-through">${game.originalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(game, 1)}
                    aria-label={`Add ${game.title} to cart`}
                    className="w-7 h-7 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-all shadow-xs"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 3. MOST POPULAR: 2x4 PRODUCT GRID WITH TABS */}
      <div className="bg-white rounded-3xl p-6 border border-gray-100 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
          <div>
            <h3 className="font-extrabold text-gray-900 text-base font-heading">Most Popular</h3>
            <p className="text-xs text-gray-400">Best-selling everyday essentials</p>
          </div>

          <div className="flex items-center gap-1 bg-gray-100 p-1 rounded-xl">
            {popularTabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setPopularTab(tab)}
                className={`px-3 py-1 text-[11px] font-bold rounded-lg transition-all ${
                  popularTab === tab
                    ? 'bg-white text-emerald-700 shadow-xs'
                    : 'text-gray-500 hover:text-gray-900'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {/* 2x4 Grid of compact product cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {filteredPopular.slice(0, 8).map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 p-2.5 rounded-2xl border border-gray-100 hover:border-emerald-200 hover:bg-emerald-50/30 transition-all group"
            >
              <div className="w-16 h-16 rounded-xl overflow-hidden bg-gray-100 shrink-0">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                />
              </div>

              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-gray-400 block truncate">{item.category}</span>
                <h4
                  onClick={() => setQuickViewProduct(item)}
                  className="text-xs font-bold text-gray-900 truncate group-hover:text-emerald-700 cursor-pointer"
                >
                  {item.title}
                </h4>
                <div className="flex items-center justify-between mt-1">
                  <div className="flex items-baseline gap-1">
                    <span className="text-xs font-bold text-emerald-600">${item.price.toFixed(2)}</span>
                    <span className="text-[10px] text-gray-400 line-through">${item.originalPrice.toFixed(2)}</span>
                  </div>
                  <button
                    onClick={() => addToCart(item, 1)}
                    className="p-1 rounded-md text-emerald-700 hover:bg-emerald-600 hover:text-white transition-colors"
                  >
                    <ShoppingBag className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
