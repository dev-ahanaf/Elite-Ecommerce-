import React from 'react';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Truck, CheckCircle2 } from 'lucide-react';
import { useShop } from '../../context/ShopContext';
import confetti from 'canvas-confetti';

export default function CartDrawer() {
  const {
    cart,
    isCartOpen,
    setIsCartOpen,
    removeFromCart,
    updateQuantity,
    cartSubtotal,
    cartTotalCount,
    freeShippingThreshold,
    progressToFreeShipping,
    showToast,
  } = useShop();

  if (!isCartOpen) return null;

  const handleCheckout = () => {
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
      });
    } catch {}
    showToast('Order placed successfully! Thank you for choosing Elite Commerce.');
    setIsCartOpen(false);
  };

  const isFreeShipping = cartSubtotal >= freeShippingThreshold;
  const shippingCost = isFreeShipping || cart.length === 0 ? 0 : 9.99;
  const finalTotal = cartSubtotal + shippingCost;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden animate-in fade-in duration-200">
      {/* Backdrop */}
      <div
        onClick={() => setIsCartOpen(false)}
        className="absolute inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
      />

      {/* Slide-over panel */}
      <div className="absolute inset-y-0 right-0 max-w-full flex pl-10">
        <div className="w-screen max-w-md bg-white shadow-2xl flex flex-col justify-between">
          
          {/* Drawer Header */}
          <div className="p-5 sm:p-6 border-b border-gray-100 flex items-center justify-between bg-emerald-950 text-white">
            <div className="flex items-center gap-2.5">
              <ShoppingBag className="w-5 h-5 text-emerald-400" />
              <h2 className="text-lg font-bold tracking-tight font-heading">
                Shopping Cart ({cartTotalCount})
              </h2>
            </div>
            <button
              onClick={() => setIsCartOpen(false)}
              aria-label="Close cart"
              className="p-1.5 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Free Shipping Progress Indicator */}
          <div className="p-4 bg-emerald-50/80 border-b border-emerald-100">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 mb-1.5">
              <Truck className="w-4 h-4 text-emerald-600 shrink-0" />
              {isFreeShipping ? (
                <span className="text-emerald-700 flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Unlocked <strong>FREE Express Shipping</strong>!
                </span>
              ) : (
                <span>
                  Add <strong className="text-emerald-700">${(freeShippingThreshold - cartSubtotal).toFixed(2)}</strong> more for <strong>FREE Shipping</strong>!
                </span>
              )}
            </div>
            <div className="w-full h-2 bg-emerald-200/60 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 rounded-full transition-all duration-300"
                style={{ width: `${progressToFreeShipping}%` }}
              />
            </div>
          </div>

          {/* Cart Item List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4">
            {cart.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                  <ShoppingBag className="w-8 h-8" />
                </div>
                <h3 className="text-base font-bold text-gray-900">Your cart is empty</h3>
                <p className="text-xs text-gray-500 max-w-xs mx-auto">
                  Explore our winter arrivals and daily deals to add items to your cart.
                </p>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="mt-2 bg-emerald-600 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-sm hover:bg-emerald-700 transition-colors"
                >
                  Start Shopping
                </button>
              </div>
            ) : (
              cart.map((item) => (
                <div
                  key={item.id}
                  className="flex gap-4 p-3 bg-gray-50/80 rounded-2xl border border-gray-100 hover:border-emerald-200 transition-all"
                >
                  {/* Thumbnail */}
                  <img
                    src={item.image}
                    alt={item.title}
                    className="w-20 h-20 rounded-xl object-cover bg-white shrink-0"
                  />

                  {/* Info */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-xs sm:text-sm font-bold text-gray-900 line-clamp-1">
                          {item.title}
                        </h4>
                        <button
                          onClick={() => removeFromCart(item.id)}
                          aria-label={`Remove ${item.title}`}
                          className="text-gray-400 hover:text-red-500 p-1 transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                      <span className="text-[11px] text-gray-400 font-medium block">
                        {item.category}
                      </span>
                    </div>

                    {/* Quantity Selector & Price */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-0.5">
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="text-xs font-bold text-gray-800 px-1">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-900"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>

                      <span className="text-sm font-extrabold text-emerald-600">
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Totals & Checkout */}
          {cart.length > 0 && (
            <div className="p-5 sm:p-6 border-t border-gray-100 bg-gray-50/50 space-y-3">
              <div className="space-y-1.5 text-xs text-gray-600">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span className="font-bold text-gray-900">${cartSubtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Estimated Shipping</span>
                  <span className="font-bold text-gray-900">
                    {shippingCost === 0 ? <span className="text-emerald-600 font-bold">FREE</span> : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm font-extrabold text-gray-900 pt-2 border-t border-gray-200">
                  <span>Order Total</span>
                  <span className="text-emerald-600 font-heading text-lg font-black">
                    ${finalTotal.toFixed(2)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleCheckout}
                className="w-full bg-emerald-600 hover:bg-emerald-700 active:scale-98 text-white font-extrabold text-sm py-3.5 rounded-2xl shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                <span>Proceed to Secure Checkout</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <p className="text-[11px] text-center text-gray-400">
                🔒 256-bit SSL Encrypted • 30-Day Guaranteed Returns
              </p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
