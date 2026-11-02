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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#d5e4da] shadow-xs">
      {/* Row 1: Brand Identity + Bangla Date on Left, Auth / Profile on Right */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 h-[70px] flex items-center justify-between gap-4">
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
            <span className="text-lg sm:text-xl font-bold tracking-tight text-[#0f1f17] group-hover:text-[#047857] transition-colors leading-tight whitespace-nowrap">
              বাজার দর
            </span>
            <span className="text-[11px] sm:text-xs font-medium text-[#4b6356] leading-tight whitespace-nowrap">
              {todayBanglaDate}
            </span>
          </div>
        </Link>

        {/* Right Side Auth Buttons or Logged-in User Menu */}
        <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
          {!user ? (
            <>
              <Link
                to="/signin"
                className={`px-4 py-2 text-xs sm:text-sm font-semibold rounded-xl border transition-all whitespace-nowrap ${
                  location.pathname === '/signin'
                    ? 'bg-[#ecfdf5] border-[#10b981] text-[#047857]'
                    : 'bg-white border-[#d5e4da] text-[#0f1f17] hover:bg-[#f3f7f4] hover:border-[#9ca3af]'
                }`}
              >
                সাইন ইন
              </Link>
              <Link
                to="/signup"
                className="px-4 sm:px-5 py-2 text-xs sm:text-sm font-semibold text-white btn-3d-primary rounded-xl whitespace-nowrap"
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
                className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl bg-[#f3f7f4] hover:bg-[#e6f0ea] border border-[#d5e4da] transition-all cursor-pointer"
              >
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-xl btn-3d-primary text-white font-bold text-sm flex items-center justify-center shrink-0">
                  {userInitial}
                </div>
                <span className="text-sm font-bold text-[#0f1f17] max-w-[110px] truncate">
                  {firstName}
                </span>
                <span className="text-xs text-[#4b6356]" aria-hidden="true">
                  ▾
                </span>
              </button>

              {menuOpen && (
                <div className="absolute right-0 mt-2.5 w-64 bg-white border border-[#d5e4da] rounded-2xl shadow-xl py-2 z-50">
                  <div className="px-4 py-3 border-b border-[#e8f0eb] bg-[#f8fbf9] rounded-t-2xl">
                    <p className="text-sm font-bold text-[#0f1f17] truncate">
                      {user.name}
                    </p>
                    <p className="text-xs text-[#4b6356] truncate">{user.email}</p>
                  </div>
                  <div className="py-1.5">
                    <Link
                      to="/profile"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">👤</span>
                      <span>আমার প্রোফাইল</span>
                    </Link>
                    <Link
                      to="/profile/update"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">✏️</span>
                      <span>তথ্য আপডেট করুন</span>
                    </Link>
                    <Link
                      to="/compare"
                      className="flex items-center gap-2.5 px-4 py-2 text-sm font-medium text-[#0f1f17] hover:bg-[#ecfdf5] hover:text-[#047857] transition-colors"
                    >
                      <span aria-hidden="true">⚖️</span>
                      <span>বাজার তুলনা</span>
                    </Link>
                  </div>
                  <div className="border-t border-[#e8f0eb] pt-1">
                    <button
                      type="button"
                      onClick={handleSignOut}
                      className="w-full text-left flex items-center gap-2.5 px-4 py-2 text-sm font-semibold text-[#dc2626] hover:bg-[#fef2f2] transition-colors cursor-pointer"
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

      {/* Row 2: Category Navigation Bar */}
      <div className="border-t border-[#ebf2ed] bg-[#f8fbf9]">
        <nav
          aria-label="পণ্য বিভাগসমূহ"
          className="max-w-6xl mx-auto px-4 sm:px-6 h-12 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar"
        >
          <div className="flex items-center gap-1.5 sm:gap-2">
            <Link
              to="/"
              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                location.pathname === '/'
                  ? 'btn-3d-primary text-white'
                  : 'text-[#2e473b] hover:bg-[#e6f0ea]'
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
                  className={`inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
                    isActive
                      ? 'btn-3d-primary text-white'
                      : 'text-[#2e473b] hover:bg-[#e6f0ea]'
                  }`}
                >
                  <span aria-hidden="true">{cat.icon}</span>
                  <span>{cat.nameBn}</span>
                </Link>
              );
            })}
          </div>

          <Link
            to="/compare"
            className={`hidden md:inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-semibold transition-all whitespace-nowrap shrink-0 ${
              location.pathname === '/compare'
                ? 'btn-3d-primary text-white'
                : 'bg-white border border-[#d5e4da] text-[#0f1f17] hover:border-[#059669] hover:text-[#047857]'
            }`}
          >
            <span aria-hidden="true">⚖️</span>
            <span>বাজার তুলনা</span>
          </Link>
        </nav>
      </div>

      {/* Row 3: Infinite Price Ticker (Marquee) below Navbar */}
      <div
        className="border-t border-[#dce6df] bg-[#0f1f17] text-white h-9 overflow-hidden flex items-center"
        aria-label="আজকের বাজার দর টিকার"
      >
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
                <span className="font-semibold text-white">{item.nameBn}</span>
                <span className="text-emerald-100/80 tabular-nums">
                  {toBanglaDigits(item.today)} টাকা/{formatShortUnitBn(item.unit)}
                </span>
                <span
                  className={`font-bold px-1.5 py-0.5 rounded text-[11px] tabular-nums ${
                    isUp
                      ? 'bg-emerald-500/20 text-emerald-300'
                      : isDown
                      ? 'bg-rose-500/20 text-rose-300'
                      : 'bg-slate-500/20 text-slate-300'
                  }`}
                >
                  {badge.fullText}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
};
