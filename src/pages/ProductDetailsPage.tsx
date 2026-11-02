import React, { useState, useEffect, useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Product } from '../data/fallbackData';
import { fetchProductBySlug } from '../services/api';
import {
  calculateMarketSummary,
  formatPriceBn,
  formatNumberBn,
  formatUnitBn,
  formatShortUnitBn,
  formatChangeBadge,
  toBanglaDigits,
} from '../utils/bazarLogic';

export const ProductDetailsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [selectedDivision, setSelectedDivision] = useState<string>('all');

  useEffect(() => {
    let active = true;
    setLoading(true);
    setSelectedDivision('all');

    fetchProductBySlug(slug || '').then((found) => {
      if (!active) return;
      setProduct(found);
      setLoading(false);
    });

    return () => {
      active = false;
    };
  }, [slug]);

  const summary = useMemo(
    () => (product ? calculateMarketSummary(product) : null),
    [product]
  );

  const divisions = useMemo(() => {
    if (!product) return [];
    return Array.from(new Set(product.markets.map((m) => m.division)));
  }, [product]);

  const visibleMarkets = useMemo(() => {
    if (!summary) return [];
    if (selectedDivision === 'all') return summary.sortedMarkets;
    return summary.sortedMarkets.filter((m) => m.division === selectedDivision);
  }, [summary, selectedDivision]);

  if (loading) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
        <div className="h-5 bg-[#dce6df] rounded w-48 animate-pulse" />
        <div className="card-3d rounded-3xl p-6 sm:p-8 animate-pulse space-y-4">
          <div className="h-8 bg-[#dce6df] rounded w-1/3" />
          <div className="h-4 bg-[#e8f0eb] rounded w-1/2" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="h-28 card-3d rounded-2xl animate-pulse" />
          <div className="h-28 card-3d rounded-2xl animate-pulse" />
          <div className="h-28 card-3d rounded-2xl animate-pulse" />
        </div>
      </main>
    );
  }

  if (!product || !summary) {
    return (
      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
        <div className="max-w-lg mx-auto card-3d rounded-3xl p-8 sm:p-10 text-center space-y-4">
          <div className="w-16 h-16 rounded-2xl icon-well-3d flex items-center justify-center text-3xl mx-auto">
            <span role="img" aria-label="পণ্য পাওয়া যায়নি">
              📦
            </span>
          </div>
          <h1 className="text-2xl font-bold text-[#0f1f17]">
            ৪০৪ — পণ্যটি খুঁজে পাওয়া যায়নি
          </h1>
          <p className="text-sm text-[#4b6356]">
            আপনি যে পণ্যের বিস্তারিত দাম খুঁজছেন তা পাওয়া যায়নি।
          </p>
          <div className="pt-2">
            <Link
              to="/"
              className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-bold text-white btn-3d-primary rounded-xl"
            >
              হোম পেজে ফিরে যান
            </Link>
          </div>
        </div>
      </main>
    );
  }

  const badge = formatChangeBadge(product.change.dir, product.change.pct);
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  const marketSummaryText =
    isUp
      ? `গতকালের তুলনায় আজ দাম বেড়েছে · ${toBanglaDigits(summary.yesterdayDiff)} টাকা`
      : isDown
      ? `গতকালের তুলনায় আজ দাম কমেছে · ${toBanglaDigits(summary.yesterdayDiff)} টাকা`
      : 'গতকালের তুলনায় আজ দাম অপরিবর্তিত রয়েছে';

  const priceSpread = Math.max(1, summary.maxPrice - summary.minPrice);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8 space-y-8">
      {/* Breadcrumb Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm font-medium text-[#4b6356]">
        <Link to="/" className="hover:text-[#047857] transition-colors">
          হোম
        </Link>
        <span aria-hidden="true">›</span>
        <Link
          to={`/category/${product.category}`}
          className="hover:text-[#047857] transition-colors"
        >
          {product.categoryNameBn}
        </Link>
        <span aria-hidden="true">›</span>
        <span className="font-bold text-[#0f1f17]">{product.nameBn}</span>
      </nav>

      {/* Top — 3D Product Summary Card */}
      <section
        aria-label="পণ্যের প্রধান তথ্য"
        className="hero-surface-3d rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6"
      >
        <div className="flex items-start sm:items-center gap-4 sm:gap-5">
          <div className="w-18 h-18 sm:w-22 sm:h-22 rounded-3xl icon-well-3d flex items-center justify-center text-4xl sm:text-5xl shrink-0">
            <span role="img" aria-label={product.nameBn}>
              {product.image}
            </span>
          </div>

          <div className="space-y-1.5">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#0f1f17]">
              {product.nameBn}
            </h1>

            <div className="flex flex-wrap items-center gap-2 text-xs sm:text-sm text-[#4b6356]">
              <span className="font-semibold text-[#0f1f17]">
                {formatUnitBn(product.unit)}
              </span>
              <span aria-hidden="true">·</span>
              <Link
                to={`/category/${product.category}`}
                className="font-bold text-[#047857] hover:underline"
              >
                {product.categoryNameBn}
              </Link>
            </div>

            <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
              {marketSummaryText}
            </p>
          </div>
        </div>

        {/* Today's Price Box on Right */}
        <div className="bg-white/90 border border-[#d5e4da] rounded-2xl p-4 sm:px-6 flex md:flex-col items-center md:items-end justify-between gap-3 shadow-xs">
          <div>
            <span className="block text-xs font-semibold text-[#4b6356] md:text-right">
              আজকের দাম
            </span>
            <div className="flex items-baseline md:justify-end gap-1.5 mt-0.5">
              <span className="text-3xl sm:text-4xl font-bold text-[#0f1f17] tabular-nums">
                {formatNumberBn(product.today)}
              </span>
              <span className="text-xs sm:text-sm font-medium text-[#4b6356]">
                টাকা / {formatShortUnitBn(product.unit)}
              </span>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-3 py-1 rounded-xl text-xs sm:text-sm font-bold tabular-nums border ${
              isUp
                ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]'
                : isDown
                ? 'bg-[#fef2f2] border-[#fecaca] text-[#dc2626]'
                : 'bg-[#f1f5f9] border-[#cbd5e1] text-[#475569]'
            }`}
          >
            <span>{badge.symbol}</span>
            <span>{badge.pctBn}</span>
          </span>
        </div>
      </section>

      {/* Price Summary Section ("দামের সারসংক্ষেপ") */}
      <section aria-labelledby="price-summary-heading" className="space-y-4">
        <h2
          id="price-summary-heading"
          className="text-lg sm:text-xl font-bold text-[#0f1f17]"
        >
          দামের সারসংক্ষেপ
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5">
          {/* Minimum Price */}
          <div className="card-3d rounded-2xl p-5 space-y-1.5">
            <span className="text-xs font-semibold text-[#4b6356]">
              সর্বনিম্ন দাম
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#047857] tabular-nums">
              {formatPriceBn(summary.minPrice)}
            </p>
            <p className="text-xs text-[#4b6356]">
              সবচেয়ে কম দামের বাজার ({summary.lowestMarketName})
            </p>
          </div>

          {/* Maximum Price */}
          <div className="card-3d rounded-2xl p-5 space-y-1.5">
            <span className="text-xs font-semibold text-[#4b6356]">
              সর্বাধিক দাম
            </span>
            <p className="text-2xl sm:text-3xl font-bold text-[#dc2626] tabular-nums">
              {formatPriceBn(summary.maxPrice)}
            </p>
            <p className="text-xs text-[#4b6356]">
              সবচেয়ে বেশি দামের বাজার ({summary.highestMarketName})
            </p>
          </div>

          {/* Average Price */}
          <div className="card-3d rounded-2xl p-5 space-y-1.5">
            <span className="text-xs font-semibold text-[#4b6356]">গড় দাম</span>
            <p className="text-2xl sm:text-3xl font-bold text-[#0f1f17] tabular-nums">
              {formatPriceBn(summary.avgPrice)}
            </p>
            <p className="text-xs text-[#4b6356]">
              {formatUnitBn(product.unit)}-এর হিসাবে
            </p>
          </div>
        </div>

        {/* Historical Price Comparison Bar (Yesterday, Last Week, Last Month) */}
        <div className="card-3d rounded-2xl p-4 sm:px-6 grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
          <div className="flex items-center justify-between sm:justify-start gap-2">
            <span className="text-[#4b6356]">গতকালের দাম:</span>
            <span className="font-bold text-[#0f1f17] tabular-nums">
              {formatPriceBn(product.yesterday)}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-center gap-2">
            <span className="text-[#4b6356]">গত সপ্তাহের দাম:</span>
            <span className="font-bold text-[#0f1f17] tabular-nums">
              {formatPriceBn(product.lastWeek)}
            </span>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-2">
            <span className="text-[#4b6356]">গত মাসের দাম:</span>
            <span className="font-bold text-[#0f1f17] tabular-nums">
              {formatPriceBn(product.lastMonth)}
            </span>
          </div>
        </div>
      </section>

      {/* Market-wise Today's Prices ("বাজারভিত্তিক আজকের দাম") */}
      <section aria-labelledby="market-prices-heading" className="space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <h2
            id="market-prices-heading"
            className="text-lg sm:text-xl font-bold text-[#0f1f17]"
          >
            বাজারভিত্তিক আজকের দাম
          </h2>

          {/* Division Filter Buttons */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 no-scrollbar">
            <button
              type="button"
              onClick={() => setSelectedDivision('all')}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                selectedDivision === 'all'
                  ? 'btn-3d-primary text-white'
                  : 'bg-white border border-[#d5e4da] text-[#0f1f17] hover:bg-[#ecfdf5]'
              }`}
            >
              সব বিভাগ ({toBanglaDigits(summary.sortedMarkets.length)})
            </button>
            {divisions.map((div) => (
              <button
                key={div}
                type="button"
                onClick={() => setSelectedDivision(div)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-semibold transition-all whitespace-nowrap cursor-pointer ${
                  selectedDivision === div
                    ? 'btn-3d-primary text-white'
                    : 'bg-white border border-[#d5e4da] text-[#0f1f17] hover:bg-[#ecfdf5]'
                }`}
              >
                {div}
              </button>
            ))}
          </div>
        </div>

        {/* Market Table with Visual Range Bars */}
        <div className="card-3d rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-[#d5e4da] bg-[#f3f7f4] text-xs sm:text-sm font-bold text-[#2e473b]">
                  <th className="py-3.5 px-4 sm:px-6">বাজার</th>
                  <th className="py-3.5 px-4 sm:px-6">বিভাগ</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বনিম্ন</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">সর্বাধিক</th>
                  <th className="py-3.5 px-4 sm:px-6 text-right">গড়</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#e8f0eb] text-xs sm:text-sm">
                {visibleMarkets.map((m, idx) => {
                  const ratio = (m.avg - summary.minPrice) / priceSpread;
                  const barWidthClass =
                    ratio >= 0.85
                      ? 'w-full'
                      : ratio >= 0.65
                        ? 'w-4/5'
                        : ratio >= 0.45
                          ? 'w-3/5'
                          : ratio >= 0.25
                            ? 'w-2/5'
                            : 'w-1/4';
                  return (
                    <tr
                      key={`${m.market}-${m.division}`}
                      className={
                        idx % 2 === 1
                          ? 'bg-[#f8fbf9] hover:bg-[#ecfdf5]/60 transition-colors'
                          : 'bg-white hover:bg-[#ecfdf5]/60 transition-colors'
                      }
                    >
                      <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0f1f17] whitespace-nowrap">
                        {m.market}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-[#4b6356] font-medium whitespace-nowrap">
                        {m.division}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-semibold text-[#047857] tabular-nums whitespace-nowrap">
                        {formatPriceBn(m.min)}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right font-semibold text-[#dc2626] tabular-nums whitespace-nowrap">
                        {formatPriceBn(m.max)}
                      </td>
                      <td className="py-3.5 px-4 sm:px-6 text-right whitespace-nowrap">
                        <div className="inline-flex flex-col items-end gap-1">
                          <span className="font-bold text-[#0f1f17] tabular-nums">
                            {formatPriceBn(m.avg)}
                          </span>
                          <div className="w-16 h-1.5 bg-[#e3efe7] rounded-full overflow-hidden">
                            <div
                              className={`h-full bg-[#059669] rounded-full ${barWidthClass}`}
                            />
                          </div>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#047857] hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>
      </section>
    </main>
  );
};
