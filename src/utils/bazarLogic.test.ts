import test from 'node:test';
import assert from 'node:assert/strict';
import {
  toBanglaDigits,
  parseBanglaNumber,
  formatPriceBn,
  formatChangeBadge,
  formatUnitBn,
  getTopRisers,
  getTopFallers,
  sortProducts,
  calculateMarketSummary,
} from './bazarLogic';
import { FALLBACK_PRODUCTS } from '../data/fallbackData';

test('toBanglaDigits and parseBanglaNumber convert accurately', () => {
  assert.equal(toBanglaDigits(148), '১৪৮');
  assert.equal(toBanglaDigits('1,850'), '১,৮৫০');
  assert.equal(parseBanglaNumber('১,৮৫০ টাকা'), 1850);
  assert.equal(parseBanglaNumber('৬৩.৫০'), 63.5);
});

test('formatPriceBn formats integer and decimal prices in Bengali', () => {
  assert.equal(formatPriceBn(148), '১৪৮ টাকা');
  assert.equal(formatPriceBn(1850), '১,৮৫০ টাকা');
  assert.equal(formatPriceBn(63.5), '৬৩.৫০ টাকা');
});

test('formatChangeBadge formats up, down, and flat changes properly', () => {
  assert.deepEqual(formatChangeBadge('up', 2.1), {
    symbol: '▲',
    pctBn: '২.১%',
    fullText: '▲ ২.১%',
  });
  assert.deepEqual(formatChangeBadge('down', -2.9), {
    symbol: '▼',
    pctBn: '২.৯%',
    fullText: '▼ ২.৯%',
  });
  assert.deepEqual(formatChangeBadge('flat', 0), {
    symbol: '—',
    pctBn: '০.০%',
    fullText: '— ০.০%',
  });
});

test('formatUnitBn maps unit codes to Bengali labels', () => {
  assert.equal(formatUnitBn('kg'), 'প্রতি কেজি');
  assert.equal(formatUnitBn('litre'), 'প্রতি লিটার');
  assert.equal(formatUnitBn('dozen'), 'প্রতি ডজন');
  assert.equal(formatUnitBn('piece'), 'প্রতি পিস');
});

test('getTopRisers and getTopFallers return top 6 matching Figma design', () => {
  const risers = getTopRisers(FALLBACK_PRODUCTS, 6);
  assert.equal(risers.length, 6);
  assert.equal(risers[0].nameBn, 'পেঁয়াজ');
  assert.equal(risers[1].nameBn, 'আদা');
  assert.equal(risers[2].nameBn, 'বেগুন');

  const fallers = getTopFallers(FALLBACK_PRODUCTS, 6);
  assert.equal(fallers.length, 6);
  assert.equal(fallers[0].nameBn, 'কাঁচামরিচ');
  assert.equal(fallers[1].nameBn, 'রসুন');
  assert.equal(fallers[2].nameBn, 'আলু');
});

test('sortProducts handles default, price-asc, and price-desc numerically (Challenge C1)', () => {
  const chalProducts = FALLBACK_PRODUCTS.filter((p) => p.category === 'chal');
  assert.equal(chalProducts.length, 4);

  const asc = sortProducts(chalProducts, 'price-asc');
  assert.equal(asc[0].today, 66); // বাটাম সাইজ চাল
  assert.equal(asc[3].today, 148); // স্বর্ণমাছি চাল

  const desc = sortProducts(chalProducts, 'price-desc');
  assert.equal(desc[0].today, 148);
  assert.equal(desc[3].today, 66);
});

test('calculateMarketSummary computes min, max, avg, and sorted market breakdown', () => {
  const batamChal = FALLBACK_PRODUCTS.find((p) => p.today === 66 && p.category === 'chal');
  assert.ok(batamChal);
  const summary = calculateMarketSummary(batamChal);
  assert.equal(summary.minPrice, 59);
  assert.equal(summary.maxPrice, 73);
  assert.equal(summary.avgPrice, 66);
  assert.equal(summary.yesterdayDiff, 2);
  assert.equal(summary.sortedMarkets.length, 12);
  assert.equal(summary.sortedMarkets[0].market, 'মাঠ বাজার');
  assert.equal(summary.sortedMarkets[0].avg, 62);
});
