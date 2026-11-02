import { Product, MarketPrice } from '../data/fallbackData';

const EN_TO_BN_MAP: Record<string, string> = {
  '0': '০',
  '1': '১',
  '2': '২',
  '3': '৩',
  '4': '৪',
  '5': '৫',
  '6': '৬',
  '7': '৭',
  '8': '৮',
  '9': '৯',
};

const BN_TO_EN_MAP: Record<string, string> = {
  '০': '0',
  '১': '1',
  '২': '2',
  '৩': '3',
  '৪': '4',
  '৫': '5',
  '৬': '6',
  '৭': '7',
  '৮': '8',
  '৯': '9',
};

/**
 * Converts English digits in a number or string to Bengali digits.
 */
export function toBanglaDigits(value: number | string): string {
  const str = String(value);
  return str.replace(/[0-9]/g, (d) => EN_TO_BN_MAP[d] ?? d);
}

/**
 * Parses a number or Bengali numeral string into a standard JS number.
 */
export function parseBanglaNumber(value: number | string): number {
  if (typeof value === 'number') return value;
  const cleaned = String(value)
    .replace(/[০-৯]/g, (d) => BN_TO_EN_MAP[d] ?? d)
    .replace(/,/g, '')
    .replace(/[^\d.-]/g, '');
  const parsed = parseFloat(cleaned);
  return Number.isNaN(parsed) ? 0 : parsed;
}

/**
 * Formats a numeric price with commas and Bengali digits (e.g. 1850 -> "১,৮৫০", 63.5 -> "৬৩.৫০").
 */
export function formatNumberBn(num: number): string {
  const isDecimal = !Number.isInteger(num);
  const formattedEn = isDecimal
    ? num.toFixed(2)
    : num.toLocaleString('en-IN');
  return toBanglaDigits(formattedEn);
}

/**
 * Formats price with "টাকা" suffix (e.g. "১৪৮ টাকা", "১,৮৫০ টাকা").
 */
export function formatPriceBn(num: number): string {
  return `${formatNumberBn(num)} টাকা`;
}

/**
 * Formats change percentage badge text (e.g. "▲ ২.১%", "▼ ২.৯%", "— ০.০%").
 */
export function formatChangeBadge(dir: 'up' | 'down' | 'flat', pct: number): {
  symbol: string;
  pctBn: string;
  fullText: string;
} {
  const absPct = Math.abs(pct).toFixed(1);
  const pctBn = `${toBanglaDigits(absPct)}%`;
  const symbol = dir === 'up' ? '▲' : dir === 'down' ? '▼' : '—';
  return {
    symbol,
    pctBn,
    fullText: `${symbol} ${pctBn}`,
  };
}

/**
 * Maps unit code ("kg", "litre", "dozen", "piece") to Bengali full unit label ("প্রতি কেজি", etc.)
 */
export function formatUnitBn(unit: string): string {
  switch (unit) {
    case 'kg':
      return 'প্রতি কেজি';
    case 'litre':
      return 'প্রতি লিটার';
    case 'dozen':
      return 'প্রতি ডজন';
    case 'piece':
      return 'প্রতি পিস';
    default:
      return unit.startsWith('প্রতি') ? unit : `প্রতি ${unit}`;
  }
}

/**
 * Maps unit code ("kg", "litre", "dozen", "piece") to short Bengali unit ("কেজি", "লিটার", "ডজন", "পিস")
 */
export function formatShortUnitBn(unit: string): string {
  switch (unit) {
    case 'kg':
      return 'কেজি';
    case 'litre':
      return 'লিটার';
    case 'dozen':
      return 'ডজন';
    case 'piece':
      return 'পিস';
    default:
      return unit;
  }
}

/**
 * Returns top N rising products ("আজ দাম বেড়েছে ▲") sorted by percentage increase descending.
 */
export function getTopRisers(products: Product[], limit = 6): Product[] {
  return [...products]
    .filter((p) => p.change.dir === 'up')
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}

/**
 * Returns top N falling products ("আজ দাম কমেছে ▼") sorted by percentage drop descending.
 */
export function getTopFallers(products: Product[], limit = 6): Product[] {
  return [...products]
    .filter((p) => p.change.dir === 'down')
    .sort((a, b) => Math.abs(b.change.pct) - Math.abs(a.change.pct))
    .slice(0, limit);
}

export type SortOption = 'default' | 'price-asc' | 'price-desc';

/**
 * Sorts products by numeric price while supporting Bengali numeral strings or numbers (Challenge C1).
 */
export function sortProducts(products: Product[], sortBy: SortOption): Product[] {
  const copy = [...products];
  if (sortBy === 'price-asc') {
    return copy.sort((a, b) => parseBanglaNumber(a.today) - parseBanglaNumber(b.today));
  }
  if (sortBy === 'price-desc') {
    return copy.sort((a, b) => parseBanglaNumber(b.today) - parseBanglaNumber(a.today));
  }
  return copy;
}

export interface MarketRowWithAvg extends MarketPrice {
  avg: number;
}

export interface ProductMarketSummary {
  minPrice: number;
  maxPrice: number;
  avgPrice: number;
  lowestMarketName: string;
  highestMarketName: string;
  yesterdayDiff: number;
  sortedMarkets: MarketRowWithAvg[];
}

/**
 * Calculates minimum, maximum, average prices and market breakdown for a product.
 */
export function calculateMarketSummary(product: Product): ProductMarketSummary {
  const markets = product.markets || [];
  if (markets.length === 0) {
    return {
      minPrice: product.today,
      maxPrice: product.today,
      avgPrice: product.today,
      lowestMarketName: 'প্রযোজ্য নয়',
      highestMarketName: 'প্রযোজ্য নয়',
      yesterdayDiff: Math.abs(product.today - product.yesterday),
      sortedMarkets: [],
    };
  }

  let minPrice = Infinity;
  let maxPrice = -Infinity;
  let lowestMarketName = markets[0].market;
  let highestMarketName = markets[0].market;

  const marketsWithAvg: MarketRowWithAvg[] = markets.map((m) => {
    if (m.min < minPrice) {
      minPrice = m.min;
      lowestMarketName = `${m.market}, ${m.division}`;
    }
    if (m.max > maxPrice) {
      maxPrice = m.max;
      highestMarketName = `${m.market}, ${m.division}`;
    }
    const avg = (m.min + m.max) / 2;
    return {
      ...m,
      avg,
    };
  });

  // Sort markets from lowest average price to highest (matching Figma Product Details table)
  const sortedMarkets = [...marketsWithAvg].sort((a, b) => a.avg - b.avg || a.min - b.min);

  const avgPrice = product.today || Math.round((minPrice + maxPrice) / 2);
  const yesterdayDiff = Math.abs(product.today - product.yesterday);

  return {
    minPrice,
    maxPrice,
    avgPrice,
    lowestMarketName,
    highestMarketName,
    yesterdayDiff,
    sortedMarkets,
  };
}

/**
 * Formats a date in Bengali (e.g., "মঙ্গলবার, ৬ অক্টোবর, ২০২৬")
 */
export function getBanglaDateString(date?: Date): string {
  if (!date) {
    return 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';
  }
  try {
    return new Intl.DateTimeFormat('bn-BD', {
      weekday: 'long',
      day: 'numeric',
      month: 'long',
      year: 'numeric',
    }).format(date);
  } catch {
    return 'মঙ্গলবার, ৬ অক্টোবর, ২০২৬';
  }
}

/**
 * Calculates the percentage spread between minimum and maximum market prices.
 */
export function getMarketPriceSpread(minPrice: number, maxPrice: number): string {
  if (minPrice <= 0 || maxPrice <= minPrice) return '০.০%';
  const spreadPct = ((maxPrice - minPrice) / minPrice) * 100;
  return `${toBanglaDigits(spreadPct.toFixed(1))}%`;
}

