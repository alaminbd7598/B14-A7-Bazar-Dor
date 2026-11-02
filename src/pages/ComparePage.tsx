import React, { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/fallbackData';
import {
  formatPriceBn,
  formatUnitBn,
  toBanglaDigits,
} from '../utils/bazarLogic';

interface ComparePageProps {
  products: Product[];
}

export const ComparePage: React.FC<ComparePageProps> = ({ products }) => {
  const allMarkets = useMemo(() => {
    const first = products[0];
    if (!first) return [];
    return first.markets.map((m) => `${m.market} (${m.division})`);
  }, [products]);

  const [marketA, setMarketA] = useState<string>(
    () => allMarkets[0] || 'কারওয়ান বাজার (ঢাকা)'
  );
  const [marketB, setMarketB] = useState<string>(
    () => allMarkets[2] || 'চৌদগ্রাম বাজার (চট্টগ্রাম)'
  );
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const filteredProducts = useMemo(() => {
    if (selectedCategory === 'all') return products;
    return products.filter((p) => p.category === selectedCategory);
  }, [products, selectedCategory]);

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 space-y-6">
      <div className="hero-surface-3d rounded-3xl p-6 sm:p-8 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="w-12 h-12 rounded-2xl icon-well-3d flex items-center justify-center text-2xl shrink-0">
              <span aria-hidden="true">⚖️</span>
            </div>
            <div>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f17]">
                বাজার তুলনা
              </h1>
              <p className="text-xs sm:text-sm text-[#4b6356] font-medium mt-0.5">
                যেকোনো দুটি বাজারের পণ্যের গড় দর এবং পার্থক্য পাশাপাশি তুলনা করুন।
              </p>
            </div>
          </div>
          <Link
            to="/"
            className="text-xs sm:text-sm font-bold text-[#047857] hover:underline"
          >
            ← হোম পেজে ফিরে যান
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div>
            <label
              htmlFor="compare-market-a"
              className="block text-xs font-bold text-[#2e473b] mb-1.5"
            >
              প্রথম বাজার নির্বাচন করুন
            </label>
            <select
              id="compare-market-a"
              value={marketA}
              onChange={(e) => setMarketA(e.target.value)}
              className="w-full bg-white border border-[#d5e4da] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0f1f17] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {allMarkets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="compare-market-b"
              className="block text-xs font-bold text-[#2e473b] mb-1.5"
            >
              দ্বিতীয় বাজার নির্বাচন করুন
            </label>
            <select
              id="compare-market-b"
              value={marketB}
              onChange={(e) => setMarketB(e.target.value)}
              className="w-full bg-white border border-[#d5e4da] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0f1f17] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              {allMarkets.map((m) => (
                <option key={m} value={m}>
                  {m}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="compare-category"
              className="block text-xs font-bold text-[#2e473b] mb-1.5"
            >
              পণ্য বিভাগ
            </label>
            <select
              id="compare-category"
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-white border border-[#d5e4da] rounded-xl px-3.5 py-2.5 text-xs sm:text-sm font-bold text-[#0f1f17] focus:outline-none focus:ring-2 focus:ring-[#059669]"
            >
              <option value="all">সব বিভাগ ({toBanglaDigits(products.length)})</option>
              <option value="chal">চাল</option>
              <option value="dal">ডাল</option>
              <option value="tel">তেল</option>
              <option value="sobji">সবজি</option>
              <option value="mach">মাছ</option>
              <option value="mangsho">মাংস</option>
              <option value="dim-dui">ডিম-দুধ</option>
              <option value="mosla">মসলা</option>
            </select>
          </div>
        </div>
      </div>

      {/* Comparison Table */}
      <div className="card-3d rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-[#d5e4da] bg-[#f3f7f4] text-xs sm:text-sm font-bold text-[#2e473b]">
                <th className="py-3.5 px-4 sm:px-6">পণ্য</th>
                <th className="py-3.5 px-4 sm:px-6">একক</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">{marketA}</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">{marketB}</th>
                <th className="py-3.5 px-4 sm:px-6 text-right">পার্থক্য</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#e8f0eb] text-xs sm:text-sm">
              {filteredProducts.map((p, idx) => {
                const mA = p.markets.find(
                  (m) => `${m.market} (${m.division})` === marketA
                );
                const mB = p.markets.find(
                  (m) => `${m.market} (${m.division})` === marketB
                );
                const avgA = mA ? (mA.min + mA.max) / 2 : p.today;
                const avgB = mB ? (mB.min + mB.max) / 2 : p.today;
                const diff = avgA - avgB;

                return (
                  <tr
                    key={p.id}
                    className={
                      idx % 2 === 1
                        ? 'bg-[#f8fbf9] hover:bg-[#ecfdf5]/60 transition-colors'
                        : 'bg-white hover:bg-[#ecfdf5]/60 transition-colors'
                    }
                  >
                    <td className="py-3.5 px-4 sm:px-6 font-bold text-[#0f1f17] whitespace-nowrap">
                      <Link
                        to={`/product/${p.slug}`}
                        className="inline-flex items-center gap-2 hover:text-[#047857]"
                      >
                        <span aria-hidden="true">{p.image}</span>
                        <span>{p.nameBn}</span>
                      </Link>
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-[#4b6356] font-medium whitespace-nowrap">
                      {formatUnitBn(p.unit)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-[#0f1f17] tabular-nums whitespace-nowrap">
                      {formatPriceBn(avgA)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-bold text-[#0f1f17] tabular-nums whitespace-nowrap">
                      {formatPriceBn(avgB)}
                    </td>
                    <td className="py-3.5 px-4 sm:px-6 text-right font-extrabold tabular-nums whitespace-nowrap">
                      {diff === 0 ? (
                        <span className="text-[#64748b]">সমান</span>
                      ) : diff > 0 ? (
                        <span className="text-[#dc2626]">
                          +{formatPriceBn(Math.abs(diff))}
                        </span>
                      ) : (
                        <span className="text-[#047857]">
                          -{formatPriceBn(Math.abs(diff))}
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </main>
  );
};
