import React from 'react';
import { X, Heart, Trash2, ShoppingBag, ArrowRight } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import { FOR_YOU_PRODUCTS, TRENDING_PRODUCTS, DEALS_OF_THE_DAY, VIDEO_GAMES } from '../../data/mockData';

export default function WishlistDrawer() {
  const { wishlist, isWishlistOpen, setIsWishlistOpen, toggleWishlist, addToCart } = useShop();

  if (!isWishlistOpen) return null;

  // Gather all potential products that might be wishlisted
  const allCatalog = [
    ...FOR_YOU_PRODUCTS,
    ...TRENDING_PRODUCTS,
    ...DEALS_OF_THE_DAY,
    ...VIDEO_GAMES,
    {
      id: 'iphone-17-pro',
      title: 'Apple iPhone 17 Pro Titanium Edition',
      price: 1199.0,
      originalPrice: 1399.0,
      image: 'https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600&auto=format&fit=crop&q=80',
      category: 'Electronics',
    },
  ];

  const wishlistedItems = allCatalog.filter((item) => wishlist.has(item.id));

  const handleMoveToCart = (item) => {
    addToCart(item, 1);
    toggleWishlist(item.id, item.title);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsWishlistOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
            <div className="flex items-center gap-2.5">
              <Heart className="w-5 h-5 text-red-400 fill-red-400" />
              <h2 className="text-lg font-bold tracking-tight font-heading">
                My Wishlist ({wishlist.size})
              </h2>
            </div>
            <button
              onClick={() => setIsWishlistOpen(false)}
              aria-label="Close wishlist"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Items */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {wishlistedItems.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-red-50 text-red-500 flex items-center justify-center mx-auto">
                  <Heart className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Your wishlist is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Tap the heart icon on any product to save it to your personal wishlist.
                </p>
                <button
                  onClick={() => setIsWishlistOpen(false)}
                  className="mt-2 bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  Browse Deals
                </button>
              </div>
            ) : (
              wishlistedItems.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all"
                >
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                  />

                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => toggleWishlist(item.id, item.title)}
                          aria-label="Remove from wishlist"
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        {item.category || 'Curated'}
                      </span>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <span className="text-sm font-extrabold text-emerald-600">
                        ${typeof item.price === 'number' ? item.price.toFixed(2) : item.price}
                      </span>

                      <button
                        onClick={() => handleMoveToCart(item)}
                        className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-700 active:scale-95 text-white text-xs font-bold px-3 py-1.5 rounded-lg shadow-xs transition-all"
                      >
                        <ShoppingBag className="w-3.5 h-3.5" />
                        <span>Move to Cart</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {wishlistedItems.length > 0 && (
            <div className="p-4 sm:p-6 border-t border-gray-100 bg-gray-50/50">
              <button
                onClick={() => {
                  wishlistedItems.forEach((it) => addToCart(it, 1));
                  setIsWishlistOpen(false);
                }}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Add All Items to Cart</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
