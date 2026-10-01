import React, { useState } from 'react';
import { Search, Heart, ShoppingBag, Leaf, ChevronDown, UserCheck } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function Navbar() {
  const {
    cartTotalCount,
    cartSubtotal,
    setIsCartOpen,
    wishlistCount,
    setIsWishlistOpen,
    setIsSignInOpen,
    searchQuery,
    setSearchQuery,
    selectedSearchCategory,
    setSelectedSearchCategory,
  } = useShop();

  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);

  const categories = [
    'All Categories',
    'Electronics',
    'Fashion',
    'Winter',
    'Shoes',
    'Movies & TV',
    'Toys & Collection',
    'Health & Beauty',
    'Books',
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const productSection = document.getElementById('for-you-section');
    if (productSection) {
      productSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="bg-white border-b border-gray-100 py-3.5 px-4 sticky top-0 md:static z-30 transition-all">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-3 md:gap-6">
        
        {/* Top row on mobile / Left Logo on desktop */}
        <div className="w-full md:w-auto flex items-center justify-between">
          <a href="#" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-emerald-600 to-emerald-400 flex items-center justify-center text-white shadow-md shadow-emerald-500/20 group-hover:scale-105 transition-transform duration-200">
              <Leaf className="w-5 h-5 fill-emerald-100/40" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-black tracking-tight text-gray-900 flex items-center gap-1 font-heading">
                ELITE<span className="text-emerald-600">COMMERCE</span>
              </span>
              <span className="text-[10px] uppercase tracking-widest text-emerald-700 font-semibold -mt-1">
                Premium Store
              </span>
            </div>
          </a>

          {/* Mobile Right Action Icons */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              onClick={() => setIsWishlistOpen(true)}
              aria-label="Wishlist"
              className="relative p-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <Heart className="w-5 h-5" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                  {wishlistCount}
                </span>
              )}
            </button>
            <button
              onClick={() => setIsCartOpen(true)}
              aria-label="Shopping Cart"
              className="relative p-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50 transition-colors"
            >
              <ShoppingBag className="w-5 h-5" />
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                  {cartTotalCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Center Search Bar with Category Dropdown */}
        <div className="w-full md:flex-1 max-w-2xl relative">
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center w-full bg-gray-50 border border-gray-200 rounded-2xl p-1 focus-within:ring-2 focus-within:ring-emerald-500/30 focus-within:border-emerald-600 transition-all shadow-inner"
          >
            {/* Category Dropdown */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setIsCategoryMenuOpen(!isCategoryMenuOpen)}
                className="hidden sm:flex items-center gap-1.5 px-3 py-2 text-xs font-semibold text-gray-700 hover:text-emerald-700 border-r border-gray-200 bg-white/60 rounded-l-xl transition-colors whitespace-nowrap"
              >
                <span>{selectedSearchCategory}</span>
                <ChevronDown className={`w-3.5 h-3.5 text-gray-500 transition-transform ${isCategoryMenuOpen ? 'rotate-180' : ''}`} />
              </button>

              {isCategoryMenuOpen && (
                <div className="absolute left-0 mt-2 w-48 bg-white border border-gray-100 rounded-xl shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150">
                  {categories.map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => {
                        setSelectedSearchCategory(cat);
                        setIsCategoryMenuOpen(false);
                      }}
                      className={`w-full text-left px-3.5 py-2 text-xs hover:bg-emerald-50 hover:text-emerald-700 transition-colors ${
                        selectedSearchCategory === cat ? 'bg-emerald-50/70 text-emerald-600 font-semibold' : 'text-gray-600'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search 10,000+ premium products, brands, deals..."
              className="w-full bg-transparent px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus:outline-hidden"
            />

            {/* Submit Button */}
            <button
              type="submit"
              aria-label="Submit Search"
              className="bg-emerald-600 hover:bg-emerald-700 text-white p-2.5 rounded-xl transition-all shadow-sm hover:shadow-emerald-600/30 flex items-center justify-center shrink-0"
            >
              <Search className="w-4 h-4" />
            </button>
          </form>
        </div>

        {/* Desktop Right Side: Wishlist, Cart, Sign In */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          {/* Wishlist Button */}
          <button
            onClick={() => setIsWishlistOpen(true)}
            className="flex items-center gap-2 p-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/70 transition-all group"
          >
            <div className="relative">
              <Heart className="w-6 h-6 group-hover:scale-110 transition-transform" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center shadow-xs">
                  {wishlistCount}
                </span>
              )}
            </div>
            <div className="hidden xl:flex flex-col text-left">
              <span className="text-[11px] text-gray-400 font-medium">Favorite</span>
              <span className="text-xs font-semibold text-gray-800">My Wishlist</span>
            </div>
          </button>

          {/* Cart Button */}
          <button
            onClick={() => setIsCartOpen(true)}
            className="flex items-center gap-2.5 p-2 rounded-xl text-gray-700 hover:text-emerald-600 hover:bg-emerald-50/70 transition-all group"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 flex items-center justify-center text-emerald-700 group-hover:bg-emerald-600 group-hover:text-white transition-colors shadow-xs">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {cartTotalCount > 0 && (
                <span className="absolute -top-1 -right-1.5 bg-emerald-600 group-hover:bg-emerald-700 text-white text-[11px] font-extrabold w-5 h-5 rounded-full flex items-center justify-center border-2 border-white shadow-xs">
                  {cartTotalCount}
                </span>
              )}
            </div>
            <div className="flex flex-col text-left">
              <span className="text-[11px] text-gray-400 font-medium">Your Cart</span>
              <span className="text-xs font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
            </div>
          </button>

          {/* Sign In Button */}
          <button
            onClick={() => setIsSignInOpen(true)}
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-5 py-2.5 rounded-full shadow-md shadow-emerald-600/20 hover:shadow-emerald-600/40 transition-all"
          >
            <UserCheck className="w-4 h-4" />
            <span>Sign In</span>
          </button>
        </div>

      </div>
    </header>
  );
}
