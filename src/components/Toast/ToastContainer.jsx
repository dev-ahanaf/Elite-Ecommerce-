import React from 'react';
import { CheckCircle, Info, X } from 'lucide-react';
import { useShop } from '../../context/ShopContext';

export default function ToastContainer() {
  const { toasts } = useShop();

  if (!toasts.length) return null;

  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-2.5 max-w-sm w-full pointer-events-none">
      {toasts.map((toast) => (
        <div
          key={toast.id}
          className={`pointer-events-auto p-4 rounded-2xl shadow-xl border flex items-center gap-3 backdrop-blur-md transition-all duration-300 animate-in slide-in-from-bottom-5 fade-in ${
            toast.type === 'info'
              ? 'bg-gray-900/95 text-white border-gray-700'
              : 'bg-emerald-950/95 text-white border-emerald-700'
          }`}
        >
          {toast.type === 'info' ? (
            <Info className="w-5 h-5 text-sky-400 shrink-0" />
          ) : (
            <CheckCircle className="w-5 h-5 text-emerald-400 shrink-0" />
          )}

          <p className="text-xs sm:text-sm font-semibold flex-1 leading-snug">
            {toast.message}
          </p>
        </div>
      ))}
    </div>
  );
}
