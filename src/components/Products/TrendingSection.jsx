import React, { useState } from 'react';
import { Flame, ArrowRight } from 'lucide-react';
import ProductCard from './ProductCard';
import { TRENDING_TABS, TRENDING_PRODUCTS } from '../../data/mockData';

export default function TrendingSection() {
  const [activeTab, setActiveTab] = useState('All');

  const filteredProducts =
    activeTab === 'All'
      ? TRENDING_PRODUCTS
      : TRENDING_PRODUCTS.filter((item) => item.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <section id="trending" className="max-w-7xl mx-auto px-4 py-8 sm:py-10">
      
      {/* Header and Filter Tabs */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Flame className="w-3.5 h-3.5 text-rose-500 fill-rose-500 animate-bounce" />
            <span>High Demand Right Now</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
            Trending Products
          </h2>
        </div>

        {/* Pill-Style Filter Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto no-scrollbar pb-1">
          {TRENDING_TABS.map((tab) => {
            const isActive = activeTab === tab;
            return (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                  isActive
                    ? 'bg-emerald-600 text-white shadow-md shadow-emerald-600/30 scale-102'
                    : 'bg-white text-gray-600 border border-gray-200 hover:border-emerald-300 hover:text-emerald-700 hover:bg-emerald-50/50'
                }`}
              >
                {tab}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of Trending Products */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {filteredProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Footer Banner */}
      <div className="mt-8 text-center">
        <a
          href="#deals-section"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-6 py-3 rounded-full border border-emerald-200 transition-colors"
        >
          <span>Looking for steeper clearance discounts? Check Deals of the Day</span>
          <ArrowRight className="w-4 h-4" />
        </a>
      </div>

    </section>
  );
}
