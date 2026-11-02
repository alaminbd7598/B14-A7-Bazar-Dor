import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product, Category } from '../data/fallbackData';
import { fetchProductsByCategory } from '../services/api';
import { sortProducts, SortOption, toBanglaDigits } from '../utils/bazarLogic';
import { ProductCard, ProductCardSkeleton } from '../components/ProductCard';
import { SortDropdown } from '../components/SortDropdown';

export const CategoryPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [category, setCategory] = useState<Category | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<SortOption>('default');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSortBy('default');

    fetchProductsByCategory(slug || '').then((res) => {
      if (!active) return;
      setCategory(res.category);
      setProducts(res.products);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  const sortedProducts = useMemo(
    () => sortProducts(products, sortBy),
    [products, sortBy]
  );

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="hero-surface-3d rounded-3xl p-6 animate-pulse flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#e3efe7]" />
          <div className="space-y-2">
            <div className="h-6 bg-[#e3efe7] rounded w-32" />
            <div className="h-4 bg-[#f0f7f2] rounded w-56" />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {Array.from({ length: 6 }).map((_, i) => (
            <ProductCardSkeleton key={i} />
          ))}
        </div>
      </main>
    );
  }

  // Empty state / Invalid category slug
  if (!category || products.length === 0) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-lg mx-auto hero-surface-3d rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl icon-well-3d flex items-center justify-center text-3xl mx-auto">
            <span role="img" aria-label="পাওয়া যায়নি">
              🔍
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0f1f17]">
            ৪০৪ — বিভাগটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-[#4b6356]">
            আপনি যে পণ্য বিভাগটি খুঁজছেন তা বিদ্যমান নেই অথবা বর্তমানে এই বিভাগে
            কোনো পণ্য তালিকাভুক্ত নেই।
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white btn-3d-primary rounded-xl transition-all"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const countBn = toBanglaDigits(sortedProducts.length);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-[#4b6356]">
        <Link to="/" className="hover:text-[#047857] font-medium transition-colors">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <span className="font-bold text-[#0f1f17]">{category.nameBn}</span>
      </nav>

      {/* Category Header */}
      <div className="hero-surface-3d rounded-3xl p-5 sm:p-7 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl icon-well-3d flex items-center justify-center text-3xl sm:text-4xl shrink-0">
            <span role="img" aria-label={category.nameBn}>
              {category.icon}
            </span>
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-extrabold text-[#0f1f17]">
              {category.nameBn}
            </h1>
            <p className="text-xs sm:text-sm text-[#4b6356] font-medium mt-0.5">
              {countBn}টি পণ্যের আজকের দাম ও পরিবর্তন
            </p>
          </div>
        </div>

        {/* Sort Control (Challenge C1) */}
        <SortDropdown
          id="category-sort-select"
          value={sortBy}
          onChange={setSortBy}
        />
      </div>

      {/* Count Line */}
      <div className="flex items-center justify-between">
        <p className="text-xs sm:text-sm font-bold text-[#4b6356]">
          মোট {countBn}টি পণ্য দেখানো হচ্ছে
        </p>
      </div>

      {/* Product Cards List */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {sortedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
};
