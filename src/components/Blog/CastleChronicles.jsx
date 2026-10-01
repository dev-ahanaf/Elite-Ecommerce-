import React from 'react';
import { BookOpen, Calendar, Clock, ArrowRight } from 'lucide-react';
import { CASTLE_CHRONICLES } from '../../data/mockData';

export default function CastleChronicles() {
  return (
    <section id="blogs-section" className="max-w-7xl mx-auto px-4 py-8 sm:py-12">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-2 text-emerald-600 font-bold text-xs uppercase tracking-wider mb-1">
            <BookOpen className="w-3.5 h-3.5" />
            <span>Editorial &amp; Insights</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 tracking-tight font-heading">
            Castle Chronicles
          </h2>
        </div>
        <a
          href="#"
          className="text-xs sm:text-sm font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1 group transition-colors"
        >
          <span>Explore All Articles</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </a>
      </div>

      {/* 3 Blog Cards with Image Title Overlay */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {CASTLE_CHRONICLES.map((post) => (
          <div
            key={post.id}
            className="group relative rounded-3xl overflow-hidden aspect-4/5 sm:aspect-3/4 bg-gray-900 shadow-md hover:shadow-2xl transition-all duration-500 cursor-pointer border border-gray-100"
          >
            {/* Background Image */}
            <img
              src={post.image}
              alt={post.title}
              className="w-full h-full object-cover group-hover:scale-108 transition-transform duration-700 opacity-80 group-hover:opacity-70"
            />

            {/* Gradient Overlay for high text contrast */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/40 to-transparent" />

            {/* Top Tag & Read Time */}
            <div className="absolute top-4 left-4 right-4 flex items-center justify-between z-10">
              <span className="bg-emerald-600/90 backdrop-blur-md text-white text-[11px] font-extrabold px-3 py-1 rounded-full uppercase tracking-wider">
                {post.category}
              </span>
              <div className="flex items-center gap-1 bg-black/50 backdrop-blur-md text-gray-200 text-xs px-2.5 py-1 rounded-full">
                <Clock className="w-3.5 h-3.5 text-emerald-400" />
                <span>{post.readTime}</span>
              </div>
            </div>

            {/* Bottom Title Overlay & Excerpt */}
            <div className="absolute bottom-0 inset-x-0 p-6 z-10 text-white space-y-2">
              <div className="flex items-center gap-2 text-xs text-emerald-300 font-medium">
                <Calendar className="w-3.5 h-3.5" />
                <span>{post.date}</span>
              </div>
              <h3 className="text-lg sm:text-xl font-bold font-heading leading-snug group-hover:text-emerald-300 transition-colors line-clamp-2">
                {post.title}
              </h3>
              <p className="text-xs text-gray-300 line-clamp-2 leading-relaxed">
                {post.excerpt}
              </p>
              <div className="pt-2 flex items-center gap-1.5 text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>Read Full Story</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
