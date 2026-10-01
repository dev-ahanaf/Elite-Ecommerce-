import React, { useState, useEffect } from 'react';
import { ArrowRight, ChevronLeft, ChevronRight, ShieldCheck, Truck, RefreshCw } from 'lucide-react';
import { HERO_SLIDES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { addToCart } = useShop();

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? HERO_SLIDES.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === HERO_SLIDES.length - 1 ? 0 : prev + 1));
  };

  // Autoplay hero slides every 7 seconds
  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 7000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const slide = HERO_SLIDES[currentSlide];

  const handleHeroCTA = () => {
    const target = document.getElementById('for-you-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="max-w-7xl mx-auto px-4 pt-4 sm:pt-6 pb-2 relative">
      {/* Outer Banner Wrapper */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-br from-[#064e3b] via-[#043d2e] to-[#022c22] text-white shadow-2xl border border-emerald-900/60 transition-all min-h-[460px] md:min-h-[500px] flex items-center">
        
        {/* Subtle decorative mesh / glowing ambient discs */}
        <div className="absolute -top-32 -left-32 w-96 h-96 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 right-10 w-96 h-96 bg-emerald-400/20 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute inset-0 bg-[radial-gradient(#22c55e_1px,transparent_1px)] [background-size:24px_24px] opacity-10 pointer-events-none" />

        {/* Slide Content */}
        <div className="relative z-10 w-full py-10 px-6 sm:px-12 md:px-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Left Column: Text & CTA */}
          <div className="lg:col-span-7 flex flex-col items-start space-y-4 md:space-y-6">
            
            {/* Small Label Pill */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/20 border border-emerald-400/30 text-emerald-300 text-xs font-bold uppercase tracking-wider backdrop-blur-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>{slide.tag}</span>
              <span className="bg-red-500/90 text-white font-extrabold text-[10px] px-2 py-0.5 rounded-full ml-1">
                {slide.discount}
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-black tracking-tight leading-[1.08] text-white font-heading">
              {slide.title}
            </h1>

            {/* Paragraph Description */}
            <p className="text-sm sm:text-base text-emerald-100/80 max-w-xl font-normal leading-relaxed">
              {slide.description}
            </p>

            {/* Price Highlight & Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <div className="flex items-baseline gap-2.5 bg-emerald-950/60 px-4 py-2 rounded-2xl border border-emerald-800/80">
                <span className="text-2xl sm:text-3xl font-extrabold text-emerald-400">{slide.price}</span>
                <span className="text-sm text-emerald-300/60 line-through">{slide.originalPrice}</span>
              </div>

              <button
                onClick={handleHeroCTA}
                className="inline-flex items-center gap-2.5 bg-emerald-500 hover:bg-emerald-400 text-emerald-950 font-black text-sm sm:text-base px-7 py-3.5 rounded-2xl shadow-lg shadow-emerald-500/30 hover:shadow-emerald-400/50 hover:scale-102 active:scale-98 transition-all cursor-pointer"
              >
                <span>{slide.buttonText}</span>
                <ArrowRight className="w-5 h-5 stroke-[2.5]" />
              </button>

              <button
                onClick={() =>
                  addToCart({
                    id: `hero-${slide.id}`,
                    title: slide.title,
                    price: parseFloat(slide.price.replace('$', '')),
                    originalPrice: parseFloat(slide.originalPrice.replace('$', '')),
                    image: slide.image,
                    category: 'Winter Deal',
                  })
                }
                className="hidden sm:inline-flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-semibold text-sm px-5 py-3.5 rounded-2xl border border-white/20 backdrop-blur-xs transition-all cursor-pointer"
              >
                <span>Quick Add</span>
              </button>
            </div>

            {/* Micro value props */}
            <div className="flex flex-wrap items-center gap-4 pt-3 text-xs text-emerald-200/80 font-medium">
              <div className="flex items-center gap-1.5">
                <Truck className="w-4 h-4 text-emerald-400" />
                <span>Free Express Shipping</span>
              </div>
              <span className="text-emerald-700">•</span>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-400" />
                <span>2 Year Official Warranty</span>
              </div>
              <span className="text-emerald-700">•</span>
              <div className="flex items-center gap-1.5">
                <RefreshCw className="w-4 h-4 text-emerald-400" />
                <span>30-Day Money Back</span>
              </div>
            </div>

          </div>

          {/* Right Column: Floating Product Image on Pedestal */}
          <div className="lg:col-span-5 flex justify-center items-center relative py-6">
            
            {/* Glowing pedestal / platform under product */}
            <div className="relative group">
              {/* Pedestal ellipse */}
              <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-72 sm:w-80 h-16 bg-radial from-emerald-400/40 via-emerald-600/20 to-transparent rounded-full blur-md" />
              <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-64 sm:w-72 h-8 bg-emerald-950/80 border border-emerald-500/40 rounded-[50%] shadow-2xl backdrop-blur-sm" />

              {/* Product floating image */}
              <div className="relative z-10 w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 rounded-3xl overflow-hidden p-2 bg-gradient-to-t from-emerald-900/40 to-transparent border border-emerald-500/20 shadow-2xl backdrop-blur-xs flex items-center justify-center transition-transform duration-500 hover:scale-105">
                <img
                  src={slide.image}
                  alt={slide.title}
                  className="w-full h-full object-cover rounded-2xl shadow-xl filter drop-shadow-2xl animate-in fade-in zoom-in duration-500"
                />

                {/* Floating pill badge */}
                <div className="absolute top-4 right-4 bg-emerald-950/90 border border-emerald-400/50 text-emerald-300 font-extrabold text-xs px-3 py-1.5 rounded-full shadow-lg backdrop-blur-md">
                  ✨ {slide.badge}
                </div>
              </div>
            </div>

          </div>

        </div>

        {/* Carousel Dots Navigation at Bottom Center */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex items-center gap-2.5 bg-black/30 backdrop-blur-md px-3.5 py-1.5 rounded-full border border-white/10">
          {HERO_SLIDES.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              className={`transition-all duration-300 rounded-full ${
                currentSlide === idx
                  ? 'w-7 h-2 bg-emerald-400'
                  : 'w-2 h-2 bg-emerald-200/40 hover:bg-emerald-200/70'
              }`}
            />
          ))}
        </div>

        {/* Outside Left / Right Arrow Navigation */}
        <button
          onClick={prevSlide}
          aria-label="Previous slide"
          className="absolute left-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-emerald-950/70 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>
        <button
          onClick={nextSlide}
          aria-label="Next slide"
          className="absolute right-3 top-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-emerald-950/70 hover:bg-emerald-800 text-emerald-200 border border-emerald-700/60 flex items-center justify-center shadow-lg hover:scale-105 active:scale-95 transition-all"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

      </div>
    </section>
  );
}
