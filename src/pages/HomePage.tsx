import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../data/fallbackData';
import {
  getTopRisers,
  getTopFallers,
  sortProducts,
  SortOption,
  toBanglaDigits,
} from '../utils/bazarLogic';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import { SortDropdown } from '../components/SortDropdown';
import { Search, TrendingUp, TrendingDown, Layers } from 'lucide-react';

interface HomePageProps {
  products: Product[];
  categories: Category[];
  loading: boolean;
}

export const HomePage: React.FC<HomePageProps> = ({
  products,
  categories,
  loading,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [sortBy, setSortBy] = useState<SortOption>('default');

  const topRisers = useMemo(() => getTopRisers(products, 6), [products]);
  const topFallers = useMemo(() => getTopFallers(products, 6), [products]);

  const filteredAndSortedProducts = useMemo(() => {
    let list = products;
    if (selectedCategory !== 'all') {
      list = list.filter((p) => p.category === selectedCategory);
    }
    const q = searchQuery.trim().toLowerCase();
    if (q) {
      list = list.filter(
        (p) =>
          p.nameBn.toLowerCase().includes(q) ||
          p.slug.toLowerCase().includes(q) ||
          p.categoryNameBn.toLowerCase().includes(q)
      );
    }
    return sortProducts(list, sortBy);
  }, [products, selectedCategory, searchQuery, sortBy]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-9 space-y-12 sm:space-y-14">
      {/* 1. Hero / Banner Section with 3D Tactile Depth */}
      <section
        aria-label="আজকের বাজারের সারসংক্ষেপ"
        className="hero-surface-3d rounded-3xl p-6 sm:p-9 lg:p-11 relative overflow-hidden"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          {/* Left Column: Eyebrow, Heading, Subtitle, Primary CTA */}
          <div className="lg:col-span-7 space-y-4 sm:space-y-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-bold bg-[#065f46] text-white shadow-xs">
              <span>📅 মঙ্গলবার, ৬ অক্টোবর, ২০২৬</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-200">লাইভ বাজার দর</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[42px] font-bold text-[#0f1f17] tracking-tight leading-[1.2]">
              আজকের বাজারের দাম এক নজরে
            </h1>

            <p className="text-sm sm:text-base text-[#3b5246] leading-relaxed max-w-xl">
              চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক
              বিস্তারিত, গড়, সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।
            </p>

            <div className="pt-1 flex flex-wrap items-center gap-3.5">
              <a
                href="#সব-পণ্য"
                className="inline-flex items-center justify-center px-6 py-3 text-sm font-bold text-white btn-3d-primary rounded-xl whitespace-nowrap"
              >
                সব পণ্য দেখুন ↓
              </a>
              <Link
                to="/compare"
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#0f1f17] bg-white hover:bg-[#ecfdf5] border border-[#d5e4da] hover:border-[#059669] rounded-xl shadow-2xs transition-all whitespace-nowrap"
              >
                <span aria-hidden="true">⚖️</span>
                <span>বাজার তুলনা</span>
              </Link>
            </div>

            {/* Key Market Stats Cards */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              <div className="bg-white/90 border border-[#d5e4da] rounded-2xl p-3 sm:p-3.5 shadow-2xs">
                <span className="block text-[11px] font-semibold text-[#4b6356]">
                  পণ্য
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#047857] tabular-nums">
                  {toBanglaDigits(products.length || 33)}
                </span>
                <span className="block text-[11px] text-[#4b6356]">
                  টি নিত্যদিনের পণ্য
                </span>
              </div>
              <div className="bg-white/90 border border-[#d5e4da] rounded-2xl p-3 sm:p-3.5 shadow-2xs">
                <span className="block text-[11px] font-semibold text-[#4b6356]">
                  বাজার
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#047857] tabular-nums">
                  ১২
                </span>
                <span className="block text-[11px] text-[#4b6356]">
                  টি বাজার অন্তর্ভুক্ত
                </span>
              </div>
              <div className="bg-white/90 border border-[#d5e4da] rounded-2xl p-3 sm:p-3.5 shadow-2xs">
                <span className="block text-[11px] font-semibold text-[#4b6356]">
                  বিভাগ
                </span>
                <span className="text-xl sm:text-2xl font-bold text-[#047857] tabular-nums">
                  ৬
                </span>
                <span className="block text-[11px] text-[#4b6356]">
                  টি বিভাগের তথ্য
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Hero Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center">
            <div className="relative w-full max-w-[350px]">
              <div className="card-3d rounded-3xl p-6 flex items-center justify-center relative animate-float">
                <img
                  src="/bazar-hero.png"
                  alt="বাজারের নিত্যপ্রয়োজনীয় পণ্যের ঝুড়ি"
                  referrerPolicy="no-referrer"
                  className="w-full h-auto max-h-[250px] object-contain drop-shadow-md"
                />
                {/* Floating 3D Callout Badge Top-Right */}
                <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-[#a7f3d0] rounded-2xl px-3 py-2 shadow-md absolute -top-3 -right-3">
                  <span className="text-lg" aria-hidden="true">
                    🥔
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] font-bold text-[#0f1f17] leading-none">
                      আলু ৩০৳/কেজি
                    </span>
                    <span className="text-[10px] font-bold text-[#047857]">
                      ▼ ৬.২% কমেছে
                    </span>
                  </div>
                </div>
                {/* Floating 3D Callout Badge Bottom-Left */}
                <div className="hidden sm:flex items-center gap-2 bg-white/95 backdrop-blur-xs border border-[#d5e4da] rounded-2xl px-3 py-2 shadow-md absolute -bottom-3 -left-3">
                  <span className="text-lg" aria-hidden="true">
                    🍚
                  </span>
                  <div className="text-left">
                    <span className="block text-[11px] font-bold text-[#0f1f17] leading-none">
                      মিনিকেট চাল ৯৯৳
                    </span>
                    <span className="text-[10px] font-bold text-[#047857]">
                      ▼ ২.৯% সাশ্রয়ী
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Section A — “আজ দাম বেড়েছে ▲” (Top 6 Risers) */}
      <section aria-labelledby="section-risers-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#dce6df]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] flex items-center justify-center text-[#047857]">
              <TrendingUp className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2
              id="section-risers-heading"
              className="text-lg sm:text-xl font-bold text-[#0f1f17] flex items-center gap-1.5"
            >
              <span className="text-[#047857]" aria-hidden="true">
                ▲
              </span>
              <span>আজ দাম বেড়েছে</span>
            </h2>
          </div>
          <span className="text-xs font-medium text-[#4b6356]">
            শীর্ষ ৬টি পণ্য
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topRisers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 3. Section B — “আজ দাম কমেছে ▼” (Top 6 Fallers) */}
      <section aria-labelledby="section-fallers-heading" className="space-y-4">
        <div className="flex items-center justify-between gap-2 pb-2 border-b border-[#dce6df]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#fef2f2] border border-[#fecaca] flex items-center justify-center text-[#dc2626]">
              <TrendingDown className="w-4 h-4" aria-hidden="true" />
            </div>
            <h2
              id="section-fallers-heading"
              className="text-lg sm:text-xl font-bold text-[#0f1f17] flex items-center gap-1.5"
            >
              <span className="text-[#dc2626]" aria-hidden="true">
                ▼
              </span>
              <span>আজ দাম কমেছে</span>
            </h2>
          </div>
          <span className="text-xs font-medium text-[#4b6356]">
            শীর্ষ ৬টি পণ্য
          </span>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 6 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {topFallers.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* 4. Section C — “সব পণ্য” */}
      <section
        id="সব-পণ্য"
        aria-labelledby="section-all-products-heading"
        className="space-y-5 scroll-mt-36"
      >
        <div className="card-3d rounded-2xl p-4 sm:p-6 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl icon-well-3d flex items-center justify-center text-[#047857]">
                <Layers className="w-5 h-5" aria-hidden="true" />
              </div>
              <div>
                <h2
                  id="section-all-products-heading"
                  className="text-xl sm:text-2xl font-bold text-[#0f1f17]"
                >
                  সব পণ্য
                </h2>
                <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                  মোট {toBanglaDigits(filteredAndSortedProducts.length)}টি পণ্য দেখানো হচ্ছে
                </p>
              </div>
            </div>

            {/* Search & Sort Controls */}
            <div className="flex flex-wrap items-center gap-3">
              <div className="relative flex-1 sm:flex-initial min-w-[210px]">
                <Search
                  className="w-4 h-4 text-[#4b6356] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  aria-label="পণ্যের নাম লিখুন"
                  placeholder="পণ্যের নাম লিখুন…"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-[#f8fbf9] border border-[#d5e4da] focus:border-[#059669] rounded-xl pl-9 pr-8 py-2 text-xs sm:text-sm text-[#0f1f17] placeholder:text-[#4b6356]/70 focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
                />
                {searchQuery && (
                  <button
                    type="button"
                    aria-label="সার্চ মুছুন"
                    onClick={() => setSearchQuery('')}
                    className="absolute right-2.5 top-1/2 -translate-y-1/2 text-xs text-[#4b6356] hover:text-[#0f1f17] cursor-pointer"
                  >
                    ✕
                  </button>
                )}
              </div>

              <SortDropdown
                id="home-sort-select"
                value={sortBy}
                onChange={setSortBy}
              />
            </div>
          </div>

          {/* Category Filter Tabs inside "সব পণ্য" */}
          <div
            className="flex items-center gap-2 overflow-x-auto pt-2 border-t border-[#e8f0eb] no-scrollbar"
            role="tablist"
            aria-label="বিভাগ অনুযায়ী ফিল্টার"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-4 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                selectedCategory === 'all'
                  ? 'btn-3d-primary text-white'
                  : 'bg-[#f3f7f4] text-[#2e473b] hover:bg-[#e3efe7]'
              }`}
            >
              সব ({toBanglaDigits(products.length)})
            </button>
            {categories.map((cat) => (
              <button
                key={cat.id}
                type="button"
                role="tab"
                aria-selected={selectedCategory === cat.slug}
                onClick={() => setSelectedCategory(cat.slug)}
                className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 cursor-pointer ${
                  selectedCategory === cat.slug
                    ? 'btn-3d-primary text-white'
                    : 'bg-[#f3f7f4] text-[#2e473b] hover:bg-[#e3efe7]'
                }`}
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="card-3d rounded-2xl p-10 text-center space-y-3">
            <p className="text-base font-bold text-[#0f1f17]">
              কোনো পণ্য খুঁজে পাওয়া যায়নি।
            </p>
            <p className="text-xs sm:text-sm text-[#4b6356]">
              অন্য কোনো নাম বা বিভাগ নির্বাচন করে আবার চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('default');
              }}
              className="px-5 py-2.5 text-xs sm:text-sm font-bold text-white btn-3d-primary rounded-xl cursor-pointer"
            >
              ফিল্টার রিসেট করুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
