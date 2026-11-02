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
      className="group block card-3d rounded-2xl p-4 sm:p-5 focus:outline-none focus:ring-2 focus:ring-[#059669]"
    >
      {/* Top Row: 3D Sculpted Emoji Box + Product Name + Unit & Category */}
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-3.5 min-w-0">
          <div className="w-13 h-13 rounded-2xl icon-well-3d flex items-center justify-center text-2xl sm:text-3xl shrink-0 group-hover:scale-105 transition-transform">
            <span role="img" aria-label={product.nameBn}>
              {product.image}
            </span>
          </div>
          <div className="min-w-0">
            <h3 className="text-[16px] sm:text-[17px] font-bold text-[#0f1f17] truncate group-hover:text-[#047857] transition-colors">
              {product.nameBn}
            </h3>
            <p className="text-xs font-medium text-[#4b6356] mt-0.5">
              {formatUnitBn(product.unit)} · {product.categoryNameBn}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Row: Today's Price + Yesterday Reference + Dimensional Change Badge */}
      <div className="mt-4 pt-3.5 border-t border-[#e8f0eb] flex items-end justify-between gap-2">
        <div>
          <span className="block text-[11px] font-medium text-[#4b6356] leading-none mb-1">
            আজকের দাম
          </span>
          <div className="flex items-baseline gap-2">
            <span className="text-xl font-bold text-[#0f1f17] tabular-nums leading-tight">
              {formatPriceBn(product.today)}
            </span>
            <span className="text-[11px] text-[#6b7f73] tabular-nums">
              গতকাল {toBanglaDigits(product.yesterday)}৳
            </span>
          </div>
        </div>

        <span
          className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-xl text-xs font-bold tabular-nums whitespace-nowrap shrink-0 border ${
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
