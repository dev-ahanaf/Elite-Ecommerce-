import React, { useState } from 'react';
import { LayoutGrid, ChevronDown, Flame, Sparkles, Tag, ChevronRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { CATEGORIES } from '../../data/mockData';

export default function CategoryNav() {
  const { activeNavCategory, setActiveNavCategory } = useShop();
  const [isAllCategoriesOpen, setIsAllCategoriesOpen] = useState(false);

  const navLinks = [
    { name: 'Home', href: '#hero', badge: null },
    { name: 'Movies & TV', href: '#categories', badge: null },
    { name: 'Toys & Collection', href: '#categories', badge: null },
    { name: 'Books', href: '#trending', badge: null },
    { name: 'Fashion', href: '#for-you-section', badge: 'Hot' },
    { name: 'Electronics', href: '#for-you-section', badge: null },
    { name: 'Winter', href: '#deals-section', badge: 'Sale' },
    { name: 'Health & Beauty', href: '#trending', badge: null },
    { name: 'Luxury Item', href: '#sidebar-deals', badge: 'New' },
    { name: 'Blogs', href: '#blogs-section', badge: null },
  ];

  return (
    <nav className="sticky top-0 z-20 bg-white/95 backdrop-blur-md border-b border-gray-200/80 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 flex items-center justify-between gap-4">
        
        {/* All Category Dropdown Trigger */}
        <div className="relative shrink-0 py-2.5">
          <button
            onClick={() => setIsAllCategoriesOpen(!isAllCategoriesOpen)}
            className="flex items-center gap-2.5 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-wider shadow-sm transition-all"
          >
            <LayoutGrid className="w-4 h-4" />
            <span>All Category</span>
            <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${isAllCategoriesOpen ? 'rotate-180' : ''}`} />
          </button>

          {/* All Category Mega Menu Popover */}
          {isAllCategoriesOpen && (
            <div className="absolute top-full left-0 mt-2 w-72 bg-white rounded-2xl shadow-2xl border border-gray-100 p-3 z-50 animate-in fade-in zoom-in-95 duration-150">
              <div className="text-[11px] font-bold uppercase tracking-wider text-gray-400 px-3 py-1.5 border-b border-gray-100">
                Department Directory
              </div>
              <div className="py-1">
                {CATEGORIES.map((cat) => (
                  <a
                    key={cat.id}
                    href="#categories"
                    onClick={() => {
                      setActiveNavCategory(cat.name);
                      setIsAllCategoriesOpen(false);
                    }}
                    className="flex items-center justify-between px-3 py-2 rounded-xl text-xs font-semibold text-gray-700 hover:text-emerald-700 hover:bg-emerald-50/80 transition-all group"
                  >
                    <div className="flex items-center gap-2.5">
                      <span className={`w-2 h-2 rounded-full ${cat.bgColor} border ${cat.borderColor}`} />
                      <span>{cat.name}</span>
                    </div>
                    <span className="text-[11px] text-gray-400 group-hover:text-emerald-600">
                      {cat.count}
                    </span>
                  </a>
                ))}
              </div>

              <div className="mt-2 pt-2 border-t border-gray-100 bg-emerald-50/60 rounded-xl p-3 flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-800 text-xs font-bold">
                  <Tag className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Exclusive Flash Offers</span>
                </div>
                <a
                  href="#deals-section"
                  onClick={() => setIsAllCategoriesOpen(false)}
                  className="text-[11px] font-extrabold text-emerald-700 hover:underline flex items-center"
                >
                  Explore <ChevronRight className="w-3 h-3 ml-0.5" />
                </a>
              </div>
            </div>
          )}
        </div>

        {/* Horizontal Navigation Menu Links */}
        <div className="flex-1 overflow-x-auto no-scrollbar flex items-center gap-1 sm:gap-2 py-2">
          {navLinks.map((link) => {
            const isActive = activeNavCategory === link.name;
            return (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setActiveNavCategory(link.name)}
                className={`relative px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all flex items-center gap-1.5 ${
                  isActive
                    ? 'text-emerald-700 bg-emerald-50/90 font-bold'
                    : 'text-gray-600 hover:text-emerald-600 hover:bg-gray-50'
                }`}
              >
                <span>{link.name}</span>
                {link.badge && (
                  <span
                    className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-full uppercase leading-none ${
                      link.badge === 'Hot'
                        ? 'bg-rose-500 text-white'
                        : link.badge === 'Sale'
                        ? 'bg-amber-500 text-white'
                        : 'bg-emerald-600 text-white'
                    }`}
                  >
                    {link.badge}
                  </span>
                )}
                {isActive && (
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-emerald-600 rounded-full" />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Quick Deal Callout */}
        <a
          href="#deals-section"
          className="hidden xl:flex items-center gap-2 text-xs font-bold text-emerald-800 bg-emerald-50 hover:bg-emerald-100/90 px-3.5 py-2 rounded-xl border border-emerald-200/60 transition-colors shrink-0"
        >
          <Flame className="w-4 h-4 text-emerald-600 animate-pulse" />
          <span>Daily Flash Deals</span>
          <span className="bg-red-500 text-white text-[10px] px-1.5 py-0.5 rounded-full font-extrabold ml-1">
            -40%
          </span>
        </a>

      </div>
    </nav>
  );
}
