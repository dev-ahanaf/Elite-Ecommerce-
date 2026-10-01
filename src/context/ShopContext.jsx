import React, { createContext, useContext, useState, useEffect } from 'react';
import confetti from 'canvas-confetti';

const ShopContext = createContext();

export function ShopProvider({ children }) {
  // Cart state initialized with 2 starter sample items for immediate rich display
  const [cart, setCart] = useState([
    {
      id: 'fy-1',
      title: 'Aura Wireless Noise Cancelling Headphones',
      category: 'Electronics',
      price: 199.99,
      originalPrice: 269.99,
      image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600&auto=format&fit=crop&q=80',
      quantity: 1,
    },
    {
      id: 'fy-2',
      title: 'Minimalist Titanium Chronograph Wristwatch',
      category: 'Fashion',
      price: 149.00,
      originalPrice: 199.00,
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=600&auto=format&fit=crop&q=80',
      quantity: 1,
    }
  ]);

  // Wishlist state initialized with 2 sample product IDs
  const [wishlist, setWishlist] = useState(new Set(['fy-1', 'tr-1', 'deal-1']));

  // UI Drawer / Modal states
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);
  const [isSignInOpen, setIsSignInOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState(null);

  // Search & Navigation Filters
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSearchCategory, setSelectedSearchCategory] = useState('All Categories');
  const [activeNavCategory, setActiveNavCategory] = useState('Home');

  // Toast notifications
  const [toasts, setToasts] = useState([]);

  const showToast = (message, type = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3500);
  };

  const addToCart = (product, quantity = 1) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + quantity } : item
        );
      }
      return [
        ...prev,
        {
          id: product.id,
          title: product.title,
          category: product.category || 'General',
          price: product.price,
          originalPrice: product.originalPrice || product.price,
          image: product.image,
          quantity: quantity,
        },
      ];
    });

    showToast(`Added "${product.title.slice(0, 24)}..." to cart!`);

    // subtle celebratory confetti burst if added
    try {
      confetti({
        particleCount: 25,
        spread: 45,
        origin: { y: 0.8, x: 0.85 },
        colors: ['#16A34A', '#22C55E', '#86EFAC', '#FACC15'],
      });
    } catch {
      // ignore in environments without canvas
    }
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
    showToast('Item removed from cart', 'info');
  };

  const updateQuantity = (id, delta) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean)
    );
  };

  const toggleWishlist = (productId, productTitle = 'Item') => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(productId)) {
        next.delete(productId);
        showToast(`Removed from wishlist`, 'info');
      } else {
        next.add(productId);
        showToast(`Saved "${productTitle.slice(0, 24)}..." to wishlist!`);
      }
      return next;
    });
  };

  const isWishlisted = (productId) => wishlist.has(productId);

  const cartTotalCount = cart.reduce((acc, item) => acc + item.quantity, 0);
  const cartSubtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);
  const freeShippingThreshold = 150;
  const progressToFreeShipping = Math.min(100, (cartSubtotal / freeShippingThreshold) * 100);

  return (
    <ShopContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        isCartOpen,
        setIsCartOpen,
        cartTotalCount,
        cartSubtotal,
        freeShippingThreshold,
        progressToFreeShipping,
        wishlist,
        toggleWishlist,
        isWishlisted,
        wishlistCount: wishlist.size,
        isWishlistOpen,
        setIsWishlistOpen,
        isSignInOpen,
        setIsSignInOpen,
        quickViewProduct,
        setQuickViewProduct,
        searchQuery,
        setSearchQuery,
        selectedSearchCategory,
        setSelectedSearchCategory,
        activeNavCategory,
        setActiveNavCategory,
        toasts,
        showToast,
      }}
    >
      {children}
    </ShopContext.Provider>
  );
}

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
