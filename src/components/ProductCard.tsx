import React from 'react';
import { Link } from 'react-router-dom';
import { Product } from '../data/fallbackData';
import {
  formatPriceBn,
  formatUnitBn,
  formatChangeBadge,
  toBanglaDigits,
} from '../utils/bazarLogic';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const badge = formatChangeBadge(product.change.dir, product.change.pct);
  const isUp = product.change.dir === 'up';
  const isDown = product.change.dir === 'down';

  return (
    <Link
      to={`/product/${product.slug}`}
      title={`${product.nameBn} — ${formatPriceBn(product.today)}`}
      className="group relative block card-3d rounded-2xl overflow-hidden focus:outline-none focus:ring-2 focus:ring-[#059669]"
    >
      {/* Top 3D Accent Strip */}
      <div
        className={`h-1.5 w-full ${
          isUp
            ? 'bg-gradient-to-r from-[#f59e0b] via-[#ef4444] to-[#dc2626]'
            : isDown
            ? 'bg-gradient-to-r from-[#10b981] via-[#059669] to-[#047857]'
            : 'bg-gradient-to-r from-[#94a3b8] to-[#64748b]'
        }`}
      />

      <div className="p-4 sm:p-5">
        {/* Top Row: 3D Sculpted Emoji Pedestal + Product Name + Category Tag */}
        <div className="flex items-start justify-between gap-3">
          <div className="flex items-center gap-3.5 min-w-0">
            <div className="w-13 h-13 rounded-2xl icon-well-3d flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-108 transition-transform">
              <span role="img" aria-label={product.nameBn}>
                {product.image}
              </span>
            </div>
            <div className="min-w-0">
              <h3 className="text-[16px] sm:text-[17px] font-extrabold text-[#0f1f17] truncate group-hover:text-[#047857] transition-colors">
                {product.nameBn}
              </h3>
              <p className="text-xs font-semibold text-[#4b6356] mt-0.5">
                {formatUnitBn(product.unit)}
              </p>
            </div>
          </div>

          <span className="px-2.5 py-0.5 rounded-lg bg-[#edf6f0] border border-[#cde0d3] text-[11px] font-bold text-[#1e3a2c] shrink-0">
            {product.categoryNameBn}
          </span>
        </div>

        {/* Bottom Row: Today's Price + Yesterday Reference + 3D Change Pill */}
        <div className="mt-4 pt-3.5 border-t border-[#e3efe7] flex items-end justify-between gap-2">
          <div>
            <span className="block text-[11px] font-semibold text-[#4b6356] leading-none mb-1">
              আজকের গড় দর
            </span>
            <div className="flex items-baseline gap-2">
              <span className="text-xl sm:text-[22px] font-extrabold text-[#0f1f17] tabular-nums leading-tight">
                {formatPriceBn(product.today)}
              </span>
              <span className="text-[11px] font-semibold text-[#5c7467] tabular-nums">
                গতকাল {toBanglaDigits(product.yesterday)}৳
              </span>
            </div>
          </div>

          <span
            className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-extrabold tabular-nums whitespace-nowrap shrink-0 border shadow-2xs ${
              isUp
                ? 'bg-[#fff1f2] border-[#fecdd3] text-[#e11d48]'
                : isDown
                ? 'bg-[#ecfdf5] border-[#a7f3d0] text-[#047857]'
                : 'bg-[#f1f5f9] border-[#cbd5e1] text-[#475569]'
            }`}
          >
            <span>{badge.symbol}</span>
            <span>{badge.pctBn}</span>
          </span>
        </div>

        {/* Subtle Interactive Footer Bar */}
        <div className="mt-3 pt-2.5 border-t border-dashed border-[#d8e8dd] flex items-center justify-between text-[11px] font-bold text-[#4b6356] group-hover:text-[#047857] transition-colors">
          <span>{toBanglaDigits(product.markets?.length || 12)}টি বাজারের দর</span>
          <span className="inline-flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
            বিস্তারিত দেখুন →
          </span>
        </div>
      </div>
    </Link>
  );
};

export const ProductCardSkeleton: React.FC = () => {
  return (
    <div
      className="card-3d rounded-2xl p-4 sm:p-5 animate-pulse"
      aria-busy="true"
      aria-label="পণ্য লোড হচ্ছে"
    >
      <div className="flex items-center gap-3.5">
        <div className="w-13 h-13 rounded-2xl bg-[#dce6df] shrink-0" />
        <div className="flex-1 space-y-2">
          <div className="h-4 bg-[#dce6df] rounded w-3/4" />
          <div className="h-3 bg-[#e8f0eb] rounded w-1/2" />
        </div>
      </div>
      <div className="mt-4 pt-3.5 border-t border-[#e8f0eb] flex items-end justify-between">
        <div className="space-y-1.5">
          <div className="h-2.5 bg-[#e8f0eb] rounded w-14" />
          <div className="h-5 bg-[#dce6df] rounded w-24" />
        </div>
        <div className="h-6 bg-[#dce6df] rounded-xl w-16" />
      </div>
    </div>
  );
};
