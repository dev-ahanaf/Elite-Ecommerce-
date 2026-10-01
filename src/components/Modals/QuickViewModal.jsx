import React, { useState } from 'react';
import { X, Star, Heart, ShoppingBag, Plus, Minus, ShieldCheck, Truck, RotateCcw } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function QuickViewModal() {
  const { quickViewProduct, setQuickViewProduct, addToCart, toggleWishlist, isWishlisted } = useShop();
  const [quantity, setQuantity] = useState(1);

  if (!quickViewProduct) return null;

  const wishlisted = isWishlisted(quickViewProduct.id);

  const handleAddToCart = () => {
    addToCart(quickViewProduct, quantity);
    setQuickViewProduct(null);
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto flex items-center justify-center p-4 sm:p-6 animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setQuickViewProduct(null)}
        className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
      />

      {/* Modal Dialog Card */}
      <div className="relative bg-white rounded-3xl max-w-3xl w-full shadow-2xl border border-gray-100 overflow-hidden z-10 animate-in zoom-in-95 duration-200">
        
        {/* Close button */}
        <button
          onClick={() => setQuickViewProduct(null)}
          aria-label="Close dialog"
          className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-gray-100 hover:bg-gray-200 text-gray-700 flex items-center justify-center transition-colors shadow-xs"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          
          {/* Left Column: Product Image & Badges */}
          <div className="relative bg-gray-50 flex items-center justify-center p-8 border-b md:border-b-0 md:border-r border-gray-100">
            {quickViewProduct.discount && (
              <span className="absolute top-4 left-4 bg-red-500 text-white font-extrabold text-xs px-3 py-1 rounded-full shadow-sm">
                {quickViewProduct.discount}
              </span>
            )}

            <img
              src={quickViewProduct.image}
              alt={quickViewProduct.title}
              className="w-full max-h-80 object-cover rounded-2xl shadow-md hover:scale-105 transition-transform duration-300"
            />
          </div>

          {/* Right Column: Product Details & Purchase Actions */}
          <div className="p-6 sm:p-8 flex flex-col justify-between space-y-5">
            
            <div className="space-y-2">
              <span className="text-xs font-bold text-emerald-600 uppercase tracking-wider">
                {quickViewProduct.category || 'Special Edition'}
              </span>

              <h2 className="text-xl sm:text-2xl font-black text-gray-900 leading-snug font-heading">
                {quickViewProduct.title}
              </h2>

              {/* Rating */}
              <div className="flex items-center gap-2 pt-1">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <span className="text-xs font-bold text-gray-700">
                  {quickViewProduct.rating || 4.9}
                </span>
                <span className="text-xs text-gray-400">
                  ({quickViewProduct.reviews || 128} verified reviews)
                </span>
              </div>

              {/* Price */}
              <div className="flex items-baseline gap-3 pt-2">
                <span className="text-2xl sm:text-3xl font-black text-emerald-600 font-heading">
                  ${typeof quickViewProduct.price === 'number' ? quickViewProduct.price.toFixed(2) : quickViewProduct.price}
                </span>
                {quickViewProduct.originalPrice && (
                  <span className="text-sm text-gray-400 line-through">
                    ${typeof quickViewProduct.originalPrice === 'number' ? quickViewProduct.originalPrice.toFixed(2) : quickViewProduct.originalPrice}
                  </span>
                )}
                <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-md">
                  In Stock &amp; Ready to Ship
                </span>
              </div>

              <p className="text-xs sm:text-sm text-gray-600 leading-relaxed pt-2">
                Engineered with premium sustainable materials, precision ergonomics, and manufacturer backed warranty. Experience the hallmark craftsmanship of Elite Commerce.
              </p>
            </div>

            {/* Quantity & CTAs */}
            <div className="space-y-4 pt-4 border-t border-gray-100">
              
              <div className="flex items-center gap-4">
                <span className="text-xs font-bold text-gray-700">Quantity:</span>
                <div className="flex items-center border border-gray-200 rounded-xl bg-gray-50 p-1">
                  <button
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-lg"
                  >
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <span className="text-sm font-bold text-gray-900 px-3">
                    {quantity}
                  </span>
                  <button
                    onClick={() => setQuantity((q) => q + 1)}
                    className="w-7 h-7 flex items-center justify-center text-gray-600 hover:text-gray-900 rounded-lg"
                  >
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm py-3.5 px-6 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <ShoppingBag className="w-4 h-4" />
                  <span>Add to Cart</span>
                </button>

                <button
                  onClick={() => toggleWishlist(quickViewProduct.id, quickViewProduct.title)}
                  aria-label="Save to Wishlist"
                  className={`p-3.5 rounded-2xl border transition-all ${
                    wishlisted
                      ? 'bg-red-50 border-red-200 text-red-500'
                      : 'border-gray-200 text-gray-600 hover:text-red-500 hover:bg-red-50/50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${wishlisted ? 'fill-red-500' : ''}`} />
                </button>
              </div>

              {/* Guarantees */}
              <div className="grid grid-cols-3 gap-2 pt-2 text-center text-[10px] text-gray-500 font-medium">
                <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
                  <Truck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Free Shipping</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>100% Genuine</span>
                </div>
                <div className="flex flex-col items-center gap-1 p-2 bg-gray-50 rounded-xl">
                  <RotateCcw className="w-3.5 h-3.5 text-emerald-600" />
                  <span>30-Day Returns</span>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
