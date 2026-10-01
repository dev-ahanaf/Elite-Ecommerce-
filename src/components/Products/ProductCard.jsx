import React from 'react';
import { Heart, Eye, Plus, Star, Check } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ProductCard({ product }) {
  const { addToCart, toggleWishlist, isWishlisted, setQuickViewProduct, cart } = useShop();

  const wishlisted = isWishlisted(product.id);
  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <div className="group relative bg-white border border-gray-100/90 rounded-2xl p-4 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all duration-300 flex flex-col justify-between">
      
      {/* Card Top: Badges & Action Buttons */}
      <div className="relative w-full aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 flex items-center justify-center">
        
        {/* Discount Badge (Top-Left Red Pill) */}
        {product.discount && (
          <div className="absolute top-2.5 left-2.5 z-10 bg-red-500 text-white font-extrabold text-[11px] px-2.5 py-1 rounded-full shadow-sm tracking-tight">
            {product.discount}
          </div>
        )}

        {/* Top-Right Action Buttons: Wishlist Heart & Quick View Eye */}
        <div className="absolute top-2.5 right-2.5 z-10 flex flex-col gap-1.5 opacity-90 group-hover:opacity-100 transition-opacity">
          {/* Wishlist Heart */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              toggleWishlist(product.id, product.title);
            }}
            aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
            className={`w-8 h-8 rounded-full flex items-center justify-center shadow-md transition-all ${
              wishlisted
                ? 'bg-red-50 text-red-500 hover:bg-red-100'
                : 'bg-white/95 text-gray-500 hover:text-red-500 hover:bg-white hover:scale-110'
            }`}
          >
            <Heart className={`w-4 h-4 ${wishlisted ? 'fill-red-500 stroke-red-500' : ''}`} />
          </button>

          {/* Quick-View Eye */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            aria-label="Quick view product"
            className="w-8 h-8 rounded-full bg-white/95 hover:bg-emerald-50 text-gray-500 hover:text-emerald-700 flex items-center justify-center shadow-md hover:scale-110 transition-all"
          >
            <Eye className="w-4 h-4" />
          </button>
        </div>

        {/* Product Image */}
        <img
          src={product.image}
          alt={product.title}
          className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-500"
          loading="lazy"
        />

        {/* Quick View overlay on hover for desktop */}
        <div
          onClick={() => setQuickViewProduct(product)}
          className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent p-2 text-center text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200 cursor-pointer"
        >
          Click for Quick View
        </div>
      </div>

      {/* Card Body Details */}
      <div className="flex-1 flex flex-col justify-between">
        <div>
          {/* Category subtext */}
          <div className="flex items-center justify-between text-xs text-gray-400 font-medium mb-1">
            <span>{product.category}</span>
            {product.rating && (
              <div className="flex items-center gap-1 text-amber-500 font-semibold text-[11px]">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{product.rating}</span>
                {product.reviews && <span className="text-gray-400">({product.reviews})</span>}
              </div>
            )}
          </div>

          {/* Product Title (2 lines clamp) */}
          <h3
            onClick={() => setQuickViewProduct(product)}
            className="text-sm font-bold text-gray-900 line-clamp-2 hover:text-emerald-600 transition-colors cursor-pointer min-h-[40px]"
          >
            {product.title}
          </h3>
        </div>

        {/* Price Row & Add to Cart Button */}
        <div className="flex items-center justify-between mt-3 pt-2 border-t border-gray-100">
          <div className="flex items-baseline gap-1.5">
            <span className="text-base sm:text-lg font-extrabold text-emerald-600">
              ${typeof product.price === 'number' ? product.price.toFixed(2) : product.price}
            </span>
            {product.originalPrice && (
              <span className="text-xs text-gray-400 line-through">
                ${typeof product.originalPrice === 'number' ? product.originalPrice.toFixed(2) : product.originalPrice}
              </span>
            )}
          </div>

          {/* Small Green Circular "Add to Cart" Button */}
          <button
            onClick={() => addToCart(product, 1)}
            aria-label={`Add ${product.title} to cart`}
            className={`w-9 h-9 rounded-full flex items-center justify-center shadow-md transition-all active:scale-90 ${
              isInCart
                ? 'bg-emerald-700 text-white hover:bg-emerald-800'
                : 'bg-emerald-600 hover:bg-emerald-500 text-white hover:scale-110 shadow-emerald-600/30'
            }`}
          >
            {isInCart ? <Check className="w-4 h-4 stroke-[3]" /> : <Plus className="w-4 h-4 stroke-[3]" />}
          </button>
        </div>
      </div>

    </div>
  );
}
