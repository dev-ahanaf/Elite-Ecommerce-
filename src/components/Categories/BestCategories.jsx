import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { CATEGORIES } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function BestCategories() {
  const scrollContainerRef = useRef(null);
  const { setActiveNavCategory, showToast } = useShop();

  const scroll = (direction) => {
    if (scrollContainerRef.current) {
      const scrollAmount = direction === 'left' ? -280 : 280;
      scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  const handleCategoryClick = (categoryName) => {
    setActiveNavCategory(categoryName);
    showToast(`Browsing category: ${categoryName}`, 'info');
    const target = document.getElementById('for-you-section');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="categories" className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
      {/* Section Header with Heading and Arrows */}
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-500" />
            <span>Curated Collections</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
            Best Categories
          </h2>
        </div>

        {/* Carousel Arrow Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => scroll('left')}
            aria-label="Scroll categories left"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            aria-label="Scroll categories right"
            className="w-10 h-10 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Horizontal Scrollable Row of Pastel Cards */}
      <div
        ref={scrollContainerRef}
        className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 scroll-smooth"
      >
        {CATEGORIES.map((cat) => (
          <div
            key={cat.id}
            onClick={() => handleCategoryClick(cat.name)}
            className={`min-w-[180px] sm:min-w-[200px] flex-1 ${cat.bgColor} border ${cat.borderColor} rounded-2xl p-5 flex flex-col items-center justify-between text-center transition-all duration-300 hover:-translate-y-1.5 hover:shadow-lg hover:shadow-gray-200/60 cursor-pointer group select-none`}
          >
            {/* Centered Category Image with Icon Backdrop */}
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden mb-4 relative shadow-sm group-hover:scale-105 transition-transform duration-300">
              <img
                src={cat.image}
                alt={cat.name}
                className="w-full h-full object-cover rounded-2xl group-hover:rotate-1 transition-transform"
              />
              <div className="absolute inset-0 bg-black/5 group-hover:bg-transparent transition-colors" />
            </div>

            {/* Category Name Label & Item Count */}
            <div>
              <h3 className={`font-bold text-sm sm:text-base ${cat.textColor} group-hover:text-emerald-700 transition-colors font-heading`}>
                {cat.name}
              </h3>
              <p className="text-xs text-gray-500 font-medium mt-0.5">
                {cat.count}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
