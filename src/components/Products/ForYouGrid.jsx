import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ArrowRight, Sparkles, Filter } from 'lucide-react';
import ProductCard from './ProductCard';
import { FOR_YOU_PRODUCTS } from '../../data/mockData';
import { useShop } from '../../context/ShopContext';

export default function ForYouGrid() {
  const { searchQuery, selectedSearchCategory } = useShop();
  const [currentPage, setCurrentPage] = useState(0);

  // Filter products based on search query or search category if user searched
  const filteredProducts = FOR_YOU_PRODUCTS.filter((item) => {
    const matchesSearch = searchQuery
      ? item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory =
      selectedSearchCategory && selectedSearchCategory !== 'All Categories'
        ? item.category.toLowerCase() === selectedSearchCategory.toLowerCase()
        : true;

    return matchesSearch && matchesCategory;
  });

  // Display grid (8 items per view)
  const itemsPerPage = 8;
  const totalPages = Math.ceil(Math.max(filteredProducts.length, 1) / itemsPerPage);

  const prevPage = () => {
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : totalPages - 1));
  };

  const nextPage = () => {
    setCurrentPage((prev) => (prev < totalPages - 1 ? prev + 1 : 0));
  };

  return (
    <section id="for-you-section" className="max-w-7xl mx-auto px-4 py-8 sm:py-10 relative">
      
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-6">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Recommended Especially</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
            For You
          </h2>
        </div>

        {/* Right Action: Carousel arrows & See All link */}
        <div className="flex items-center gap-4">
          <a
            href="#trending"
            className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors"
          >
            <span>See All Product</span>
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>

          {/* Left/Right Carousel Arrow Controls */}
          <div className="flex items-center gap-2">
            <button
              onClick={prevPage}
              aria-label="Previous products"
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>
            <button
              onClick={nextPage}
              aria-label="Next products"
              className="w-9 h-9 rounded-full border border-gray-200 bg-white hover:bg-emerald-50 hover:border-emerald-300 text-gray-700 hover:text-emerald-700 flex items-center justify-center transition-all shadow-xs hover:scale-105 active:scale-95"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Product Grid: 4 columns responsive (1 col mobile, 2 col tablet, 4 col desktop) */}
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.slice(currentPage * itemsPerPage, (currentPage + 1) * itemsPerPage).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 p-12 text-center">
          <Filter className="w-12 h-12 text-gray-300 mx-auto mb-3" />
          <p className="text-gray-600 font-semibold text-base">No products match your search criteria</p>
          <p className="text-gray-400 text-xs mt-1">Try resetting the search bar or choosing "All Categories"</p>
        </div>
      )}

    </section>
  );
}
