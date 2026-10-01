import React, { useState } from 'react';
import { Plus, Minus, HelpCircle, MessageSquare } from 'lucide-react';
import { FAQ_ITEMS } from '../../data/mockData';

export default function FAQAccordion() {
  const [openIds, setOpenIds] = useState(new Set(['faq-1', 'faq-4']));

  const toggleAccordion = (id) => {
    setOpenIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <section id="faq-section" className="max-w-4xl mx-auto px-4 py-10 sm:py-14">
      {/* Centered Heading */}
      <div className="text-center mb-10">
        <div className="inline-flex items-center gap-2 text-emerald-600 bg-emerald-50 border border-emerald-200/60 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider mb-2">
          <HelpCircle className="w-3.5 h-3.5 text-emerald-500" />
          <span>Support &amp; Clarity</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-black text-gray-900 tracking-tight font-heading">
          Frequently Asked Questions
        </h2>
        <p className="text-sm text-gray-500 max-w-xl mx-auto mt-2">
          Everything you need to know about delivery, warranties, memberships, and buyer protection.
        </p>
      </div>

      {/* Accordion Rows */}
      <div className="space-y-3.5">
        {FAQ_ITEMS.map((item) => {
          const isOpen = openIds.has(item.id);

          return (
            <div
              key={item.id}
              className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                isOpen
                  ? 'bg-emerald-50/40 border-emerald-300 shadow-xs'
                  : 'bg-white border-gray-200/80 hover:border-emerald-200'
              }`}
            >
              {/* Accordion Header */}
              <button
                onClick={() => toggleAccordion(item.id)}
                className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 cursor-pointer select-none"
              >
                <span
                  className={`font-bold text-sm sm:text-base font-heading ${
                    isOpen ? 'text-emerald-900' : 'text-gray-800'
                  }`}
                >
                  {item.question}
                </span>

                {/* +/- Icon */}
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-colors ${
                    isOpen
                      ? 'bg-emerald-600 text-white'
                      : 'bg-gray-100 text-gray-500 hover:bg-emerald-100 hover:text-emerald-700'
                  }`}
                >
                  {isOpen ? <Minus className="w-4 h-4 stroke-[2.5]" /> : <Plus className="w-4 h-4 stroke-[2.5]" />}
                </div>
              </button>

              {/* Accordion Content */}
              {isOpen && (
                <div className="px-5 sm:px-6 pb-5 pt-1 text-xs sm:text-sm text-gray-600 leading-relaxed border-t border-emerald-100/70">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Extra help footer */}
      <div className="mt-8 text-center p-6 bg-white rounded-2xl border border-gray-100 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-3 text-left">
          <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-700 flex items-center justify-center shrink-0">
            <MessageSquare className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-gray-900 text-sm">Still have questions?</h4>
            <p className="text-xs text-gray-400">Our customer happiness team responds in under 5 minutes.</p>
          </div>
        </div>
        <a
          href="#footer"
          className="bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold px-5 py-2.5 rounded-xl shadow-xs transition-colors shrink-0"
        >
          Contact Support
        </a>
      </div>
    </section>
  );
}
