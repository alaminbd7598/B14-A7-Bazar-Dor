import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Category, Product, FALLBACK_CATEGORIES, FALLBACK_PRODUCTS } from '../data/fallbackData';
import {
  toBanglaDigits,
  formatShortUnitBn,
  formatChangeBadge,
  getBanglaDateString,
} from '../utils/bazarLogic';
import { useAuth } from '../context/AuthContext';

interface NavbarProps {
  categories?: Category[];
  products?: Product[];
}

export const Navbar: React.FC<NavbarProps> = ({
  categories = FALLBACK_CATEGORIES,
  products = FALLBACK_PRODUCTS,
}) => {
  const { user, signOut } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  const activeCategorySlug = location.pathname.startsWith('/category/')
    ? location.pathname.replace('/category/', '').split('/')[0]
    : '';

  const tickerItems = products.length > 0 ? products : FALLBACK_PRODUCTS;

  const handleSignOut = async () => {
    setMenuOpen(false);
    await signOut();
    navigate('/');
  };

  const firstName = user?.name ? user.name.split(' ')[0] : '';
  const userInitial = user?.name ? user.name.charAt(0).toUpperCase() : 'U';
  const todayBanglaDate = getBanglaDateString();

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-xl border-b border-[#c5ddd0] shadow-sm">
      {/* Row 1: Smart Software Command Bar */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[72px] flex items-center justify-between gap-3">
        {/* Left: Brand Identity + Live Date & Status */}
        <div className="flex items-center gap-4 min-w-0">
          <Link
            to="/"
            className="flex items-center gap-3.5 group focus:outline-none"
            aria-label="বাজার দর হোম পেজ"
          >
            <div className="w-11 h-11 rounded-2xl btn-3d-primary flex items-center justify-center text-xl shrink-0">
              <span role="img" aria-hidden="true">
                🛒
              </span>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-lg sm:text-xl font-extrabold tracking-tight text-[#0f1f17] group-hover:text-[#047857] transition-colors leading-tight whitespace-nowrap">
                  বাজার দর
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-extrabold bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0]">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#10b981] animate-pulse" />
                  লাইভ
                </span>
              </div>
              <span className="text-[11px] sm:text-xs font-semibold text-[#4b6356] leading-tight whitespace-nowrap mt-0.5">
                {todayBanglaDate}
              </span>
            </div>
          </Link>

          {/* Software Telemetry Pill (Desktop) */}
          <div className="hidden lg:flex items-center gap-2 pl-4 border-l border-[#d5e4da] text-xs font-bold text-[#2e473b]">
            <span className="px-2.5 py-1 rounded-lg bg-[#f2f8f4] border border-[#d5e4da]">
              📦 {toBanglaDigits(products.length || 33)}টি পণ্য
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-[#f2f8f4] border border-[#d5e4da]">
              🏪 ১২টি বাজার
            </span>
          </div>
        </div>

        {/* Right Side: Smart Action Dock + Auth / Profile Command Menu */}
        <div className="flex items-center gap-2 sm:gap-2.5 shrink-0">
          <Link
            to="/compare"
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${
              location.pathname === '/compare'
                ? 'btn-3d-primary text-white'
                : 'bg-[#f3f8f5] border border-[#c6dbd0] text-[#0f1f17] hover:bg-[#ecfdf5] hover:border-[#059669] hover:text-[#047857]'
            }`}
          >
            <span aria-hidden="true">⚖️</span>
            <span>বাজার তুলনা</span>
          </Link>

          {!user ? (
            <>
              <Link
                to="/signin"
                className={`px-3.5 sm:px-4 py-2 text-xs sm:text-sm font-bold rounded-xl border transition-all whitespace-nowrap ${
                  location.pathname === '/signin'
                    ? 'bg-[#ecfdf5] border-[#10b981] text-[#047857]'
                    : 'bg-white border-[#c6dbd0] text-[#0f1f17] hover:bg-[#f3f7f4] hover:border-[#059669]'
                }`}
              >
                সাইন ইন
              </Link>
              <Link
                to="/signup"
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-bold text-white btn-3d-primary rounded-xl whitespace-nowrap"
              >
                সাইন আপ
              </Link>
            </>
          ) : (
            <div className="relative" ref={menuRef}>
              <button
                type="button"
                onClick={() => setMenuOpen((prev) => !prev)}
                aria-expanded={menuOpen}
                aria-label="প্রোফাইল মেনু"
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#f3f8f5] hover:bg-[#e6f2eb] border border-[#c6dbd0] shadow-2xs transition-all cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl btn-3d-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                  {userInitial}
                </div>
                <div className="text-left hidden sm:block">
                  <span className="block text-xs font-extrabold text-[#0f1f17] max-w-[110px] truncate leading-tight">
                    {firstName}
                  </span>
                  <span className="block text-[10px] font-semibold text-[#047857] leading-tight">
                    সক্রিয় অ্যাকাউন্ট
                  </span>
                </div>
                <span className="text-xs text-[#4b6356]" aria-hidden="true">
                  ▾
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2.5 w-64 card-3d rounded-2xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#e3efe7] bg-[#f4faf6] rounded-t-2xl">
                    <p className="text-sm font-extrabold text-[#0f1f17] truncate">
                      {user.name}
                    </p>
                    <p className="text-xs font-medium text-[#4b6356] truncate">
                      {user.email}
                    </p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-bold text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <Link
                      to="/profile/update"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-bold text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">✏️</span>
                      <span>তথ্য আপডেট করুন</span>
                    </Link>
                    <Link
                      to="/compare"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-bold text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">⚖️</span>
                      <span>বাজার তুলনা</span>
                    </Link>
                  </div>
                  <div className="border-t border-[#e3efe7] pt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm font-extrabold text-[#dc2626] hover:bg-[#fef2f2] transition-colors cursor-pointer"
                    >
                      <span aria-hidden="true">↩</span>
                      <span>সাইন আউট</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>

      {/* Row 2: Segmented Smart Category Dock */}
      <div className="border-t border-[#d8e8dd] bg-gradient-to-r from-[#f4faf6] via-[#f8fcf9] to-[#f4faf6]">
        <nav
          aria-label="পণ্য বিভাগসমূহ"
          className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <span className="hidden sm:inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#4b6356] pr-1">
              বিভাগ:
            </span>
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                location.pathname === '/'
                  ? 'btn-3d-primary text-white'
                  : 'bg-white/80 border border-[#d5e4da] text-[#1e3a2c] hover:bg-[#ecfdf5] hover:border-[#059669]'
              }`}
            >
              <span>সব</span>
            </Link>
            {categories.map((cat) => {
              const isActive = activeCategorySlug === cat.slug;
              return (
                <Link
                  key={cat.id}
                  to={`/category/${cat.slug}`}
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'btn-3d-primary text-white'
                      : 'bg-white/80 border border-[#d5e4da] text-[#1e3a2c] hover:bg-[#ecfdf5] hover:border-[#059669]'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>
        </nav>
      </div>

      {/* Row 3: Smart Terminal Live Price Ticker */}
      <div
        className="border-t border-[#064e3b] bg-[#0b1912] text-white h-9 overflow-hidden flex items-center relative"
        aria-label="আজকের বাজার দর টিকার"
      >
        {/* Pinned Left Live Indicator Badge */}
        <div className="hidden sm:flex items-center gap-1.5 px-3.5 h-full bg-[#064e3b] border-r border-emerald-500/30 text-[11px] font-extrabold text-emerald-200 z-10 shrink-0 shadow-md">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
          <span>লাইভ দর</span>
        </div>

        <div className="overflow-hidden flex-1 flex items-center">
          <div className="animate-ticker">
            {[...tickerItems, ...tickerItems].map((item, idx) => {
              const badge = formatChangeBadge(item.change.dir, item.change.pct);
              const isUp = item.change.dir === 'up';
              const isDown = item.change.dir === 'down';
              return (
                <Link
                  key={`${item.id}-${idx}`}
                  to={`/product/${item.slug}`}
                  className="inline-flex items-center gap-2 px-4 h-9 border-r border-white/10 text-xs hover:bg-white/10 transition-colors whitespace-nowrap shrink-0"
                >
                  <span aria-hidden="true">{item.image}</span>
                  <span className="font-bold text-white">{item.nameBn}</span>
                  <span className="text-emerald-100/90 font-semibold tabular-nums">
                    {toBanglaDigits(item.today)} টাকা/{formatShortUnitBn(item.unit)}
                  </span>
                  <span
                    className={`font-extrabold px-1.5 py-0.5 rounded text-[11px] tabular-nums ${
                      isUp
                        ? 'bg-rose-500/25 text-rose-300'
                        : isDown
                        ? 'bg-emerald-500/25 text-emerald-300'
                        : 'bg-slate-500/25 text-slate-300'
                    }`}
                  >
                    {badge.fullText}
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </header>
  );
};
