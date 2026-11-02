import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product, Category } from '../data/fallbackData';
import {
  getTopRisers,
  getTopFallers,
  sortProducts,
  SortOption,
  toBanglaDigits,
  getBanglaDateString,
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
  const todayBanglaDate = getBanglaDateString();

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
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full text-xs font-bold bg-[#064e3b] text-white border border-[#059669] shadow-sm">
              <span className="w-2 h-2 rounded-full bg-[#34d399] animate-ping" />
              <span>📅 {todayBanglaDate}</span>
              <span aria-hidden="true">·</span>
              <span className="text-emerald-200">লাইভ বাজার দর</span>
            </div>

            <h1 className="text-2xl sm:text-4xl lg:text-[44px] font-extrabold text-[#0f1f17] tracking-tight leading-[1.18]">
              আজকের বাজারের দাম{' '}
              <span className="text-[#047857] underline decoration-[#10b981]/40 decoration-wavy underline-offset-8">
                এক নজরে
              </span>
            </h1>

            <p className="text-sm sm:text-base text-[#2e473b] font-medium leading-relaxed max-w-xl">
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
                className="inline-flex items-center justify-center gap-2 px-5 py-3 text-sm font-bold text-[#0f1f17] card-3d rounded-xl whitespace-nowrap"
              >
                <span aria-hidden="true">⚖️</span>
                <span>বাজার তুলনা</span>
              </Link>
            </div>

            {/* Key Market Stats 3D Plaques */}
            <div className="pt-4 grid grid-cols-3 gap-3 sm:gap-4 max-w-lg">
              <div className="card-3d rounded-2xl p-3 sm:p-3.5">
                <span className="block text-[11px] font-bold text-[#4b6356]">
                  পণ্য
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#047857] tabular-nums">
                  {toBanglaDigits(products.length || 33)}
                </span>
                <span className="block text-[11px] font-medium text-[#4b6356]">
                  টি নিত্যদিনের পণ্য
                </span>
              </div>
              <div className="card-3d rounded-2xl p-3 sm:p-3.5">
                <span className="block text-[11px] font-bold text-[#4b6356]">
                  বাজার
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#047857] tabular-nums">
                  ১২
                </span>
                <span className="block text-[11px] font-medium text-[#4b6356]">
                  টি বাজার অন্তর্ভুক্ত
                </span>
              </div>
              <div className="card-3d rounded-2xl p-3 sm:p-3.5">
                <span className="block text-[11px] font-bold text-[#4b6356]">
                  বিভাগ
                </span>
                <span className="text-xl sm:text-2xl font-extrabold text-[#047857] tabular-nums">
                  ৬
                </span>
                <span className="block text-[11px] font-medium text-[#4b6356]">
                  টি বিভাগের তথ্য
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: 3D Floating Market Basket Showcase */}
          <div className="lg:col-span-5 flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[360px] sm:max-w-[400px] flex items-center justify-center">
              {/* Glowing 3D Pedestal Ring */}
              <div
                aria-hidden="true"
                className="absolute w-64 h-64 sm:w-72 sm:h-72 rounded-full bg-gradient-to-tr from-[#10b981]/25 via-[#34d399]/15 to-transparent blur-xl"
              />

              {/* Floating 3D Callout Top-Left */}
              <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl card-3d absolute -top-3 -left-3 z-20">
                <span className="w-8 h-8 rounded-xl icon-well-3d flex items-center justify-center text-base">
                  🥔
                </span>
                <div className="leading-tight">
                  <span className="block text-[11px] font-extrabold text-[#0f1f17]">
                    আলু · ৩০৳/কেজি
                  </span>
                  <span className="text-[10px] font-bold text-[#047857]">
                    ▼ ৬.৩% আজ সস্তা
                  </span>
                </div>
              </div>

              <img
                src="/bazar-hero.png"
                alt="নিত্যপ্রয়োজনীয় বাজারের পণ্যের ঝুড়ি"
                className="relative z-10 w-full h-auto object-contain max-h-[260px] sm:max-h-[300px] drop-shadow-xl animate-float"
              />

              {/* Floating 3D Callout Bottom-Right */}
              <div className="hidden sm:flex items-center gap-2.5 px-3.5 py-2 rounded-2xl card-3d absolute -bottom-2 -right-2 z-20">
                <span className="w-8 h-8 rounded-xl icon-well-3d flex items-center justify-center text-base">
                  🌾
                </span>
                <div className="leading-tight">
                  <span className="block text-[11px] font-extrabold text-[#0f1f17]">
                    মিনিকেট চাল · ৯৯৳
                  </span>
                  <span className="text-[10px] font-bold text-[#047857]">
                    ১২টি বাজার যাচাইকৃত
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Price Increased Today ("আজ দাম বেড়েছে") */}
      <section aria-labelledby="price-up-heading" className="space-y-5">
        <div className="hero-surface-3d rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#fff1f2] border border-[#fecdd3] text-[#e11d48] flex items-center justify-center shadow-2xs shrink-0">
              <TrendingUp className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="price-up-heading"
                className="text-xl sm:text-2xl font-extrabold text-[#0f1f17]"
              >
                আজ দাম বেড়েছে
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                গতকালের তুলনায় যেসব পণ্যের দর সবচেয়ে বেশি বেড়েছে
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#fff1f2] border border-[#fecdd3] text-xs font-extrabold text-[#e11d48]">
            ▲ সর্বোচ্চ ৬টি পণ্য
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={`up-skel-${i}`} />
              ))
            : topRisers.map((product) => (
                <ProductCard key={`up-${product.id}`} product={product} />
              ))}
        </div>
      </section>

      {/* 3. Price Decreased Today ("আজ দাম কমেছে") */}
      <section aria-labelledby="price-down-heading" className="space-y-5">
        <div className="hero-surface-3d rounded-2xl p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] flex items-center justify-center shadow-2xs shrink-0">
              <TrendingDown className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="price-down-heading"
                className="text-xl sm:text-2xl font-extrabold text-[#0f1f17]"
              >
                আজ দাম কমেছে
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                গতকালের তুলনায় যেসব পণ্যের দর সবচেয়ে বেশি কমেছে
              </p>
            </div>
          </div>
          <span className="self-start sm:self-center px-3 py-1 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-xs font-extrabold text-[#047857]">
            ▼ সাশ্রয়ী ৬টি পণ্য
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
          {loading
            ? Array.from({ length: 6 }).map((_, i) => (
                <ProductCardSkeleton key={`down-skel-${i}`} />
              ))
            : topFallers.map((product) => (
                <ProductCard key={`down-${product.id}`} product={product} />
              ))}
        </div>
      </section>

      {/* 4. All Products ("সব পণ্য") with Search, Category Filter & Sort (Challenge C1) */}
      <section id="সব-পণ্য" aria-labelledby="all-products-heading" className="space-y-5 scroll-mt-32">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-xl icon-well-3d text-[#047857] flex items-center justify-center shrink-0">
              <Layers className="w-5 h-5" />
            </span>
            <div>
              <h2
                id="all-products-heading"
                className="text-xl sm:text-2xl font-extrabold text-[#0f1f17]"
              >
                সব পণ্য
              </h2>
              <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                বিভাগ বেছে নিন বা দাম অনুযায়ী সাজান ({toBanglaDigits(filteredAndSortedProducts.length)}টি পণ্য)
              </p>
            </div>
          </div>

          {/* Sort Dropdown (Challenge C1) */}
          <SortDropdown
            id="home-sort-select"
            value={sortBy}
            onChange={setSortBy}
          />
        </div>

        {/* Category Filter Bar + Quick Search */}
        <div className="card-3d rounded-2xl p-3.5 sm:p-4 flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          <div
            role="tablist"
            aria-label="পণ্য বিভাগ ফিল্টার"
            className="flex items-center gap-1.5 overflow-x-auto pb-1 md:pb-0 no-scrollbar"
          >
            <button
              type="button"
              role="tab"
              aria-selected={selectedCategory === 'all'}
              onClick={() => setSelectedCategory('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                selectedCategory === 'all'
                  ? 'btn-3d-primary text-white'
                  : 'bg-[#f3f7f4] text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857]'
              }`}
            >
              সব ({toBanglaDigits(products.length)})
            </button>
            {categories.map((cat) => {
              const isSelected = selectedCategory === cat.slug;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  onClick={() => setSelectedCategory(cat.slug)}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap cursor-pointer ${
                    isSelected
                      ? 'btn-3d-primary text-white'
                      : 'bg-[#f3f7f4] text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857]'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </button>
              );
            })}
          </div>

          {/* Search Box */}
          <div className="relative min-w-[220px] sm:min-w-[250px]">
            <Search
              className="w-4 h-4 text-[#4b6356] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none"
              aria-hidden="true"
            />
            <input
              type="search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="পণ্য খুঁজুন (যেমন: চাল, আলু)…"
              aria-label="পণ্য খুঁজুন"
              className="w-full bg-[#f3f7f4] focus:bg-white border border-[#d5e4da] focus:border-[#059669] rounded-xl pl-9 pr-3.5 py-2 text-xs sm:text-sm font-medium text-[#0f1f17] placeholder:text-[#4b6356]/70 focus:outline-none focus:ring-2 focus:ring-[#059669]/20 transition-all"
            />
          </div>
        </div>

        {/* All Products Grid */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {Array.from({ length: 9 }).map((_, i) => (
              <ProductCardSkeleton key={`all-skel-${i}`} />
            ))}
          </div>
        ) : filteredAndSortedProducts.length === 0 ? (
          <div className="card-3d rounded-2xl p-10 text-center space-y-3">
            <p className="text-base font-bold text-[#0f1f17]">
              কোনো পণ্য খুঁজে পাওয়া যায়নি
            </p>
            <p className="text-xs sm:text-sm text-[#4b6356]">
              অনুগ্রহ করে অন্য কোনো নাম বা বিভাগ নির্বাচন করে আবার চেষ্টা করুন।
            </p>
            <button
              type="button"
              onClick={() => {
                setSelectedCategory('all');
                setSearchQuery('');
                setSortBy('default');
              }}
              className="mt-2 inline-flex items-center px-4 py-2 text-xs sm:text-sm font-bold text-white btn-3d-primary rounded-xl transition-all cursor-pointer"
            >
              সব ফিল্টার মুছুন
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5">
            {filteredAndSortedProducts.map((product) => (
              <ProductCard key={`all-${product.id}`} product={product} />
            ))}
          </div>
        )}
      </section>
    </main>
  );
};
