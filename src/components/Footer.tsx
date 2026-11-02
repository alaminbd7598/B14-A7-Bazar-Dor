import React from 'react';
import { Link } from 'react-router-dom';
import { FALLBACK_CATEGORIES } from '../data/fallbackData';
import { getBanglaDateString } from '../utils/bazarLogic';

export const Footer: React.FC = () => {
  const todayBanglaDate = getBanglaDateString();

  return (
    <footer className="bg-[#0b1912] text-white border-t-4 border-[#059669] mt-20">
      {/* Top Smart Telemetry Strip */}
      <div className="border-b border-white/10 bg-[#0f2419]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3.5 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 font-bold text-emerald-300">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            <span>সিস্টেম সচল: বাংলাদেশের ৬টি বিভাগের ১২টি প্রধান বাজারের তথ্য সংযুক্ত</span>
          </div>
          <div className="flex items-center gap-4 text-emerald-100/80 font-semibold">
            <span>📅 {todayBanglaDate}</span>
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="px-2.5 py-1 rounded-lg bg-white/10 hover:bg-emerald-600 text-white font-bold transition-colors"
            >
              ↑ উপরে যান
            </a>
          </div>
        </div>
      </div>

      {/* Main Multi-Column Smart Software Footer */}
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12 grid grid-cols-1 md:grid-cols-12 gap-8">
        {/* Column 1: Brand & Mission (5 cols) */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="inline-flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl btn-3d-primary flex items-center justify-center text-lg">
              <span role="img" aria-hidden="true">
                🛒
              </span>
            </div>
            <div>
              <span className="block text-lg font-extrabold text-white tracking-tight">
                বাজার দর
              </span>
              <span className="block text-xs text-emerald-300 font-semibold">
                ডিজিটাল বাজার দর মনিটরিং প্ল্যাটফর্ম
              </span>
            </div>
          </Link>

          <p className="text-sm font-bold text-emerald-100">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>

          <p className="text-xs text-emerald-100/70 leading-relaxed max-w-sm">
            নিত্যপ্রয়োজনীয় চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার প্রতিদিনের
            সর্বনিম্ন, সর্বাধিক ও গড় বাজার দর সহজেই ট্র্যাক এবং তুলনা করার স্মার্ট
            ওয়েব অ্যাপ্লিকেশন।
          </p>

          <div className="flex flex-wrap items-center gap-2 pt-1">
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
              ৩৩টি নিত্যপণ্য
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
              ৮টি ক্যাটাগরি
            </span>
            <span className="px-3 py-1 rounded-lg bg-white/5 border border-white/10 text-[11px] font-bold text-emerald-200">
              ১২টি বাজার
            </span>
          </div>
        </div>

        {/* Column 2: Product Categories (4 cols) */}
        <div className="md:col-span-4 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            পণ্য বিভাগসমূহ
          </h3>
          <div className="grid grid-cols-2 gap-2">
            {FALLBACK_CATEGORIES.map((cat) => (
              <Link
                key={cat.id}
                to={`/category/${cat.slug}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-white/5 hover:bg-emerald-600/30 border border-white/10 hover:border-emerald-400/40 text-xs font-bold text-emerald-50 transition-all"
              >
                <span aria-hidden="true">{cat.icon}</span>
                <span>{cat.nameBn}</span>
              </Link>
            ))}
          </div>
        </div>

        {/* Column 3: Quick Software Navigation (3 cols) */}
        <div className="md:col-span-3 space-y-3">
          <h3 className="text-xs font-extrabold uppercase tracking-wider text-emerald-300">
            দ্রুত নেভিগেশন
          </h3>
          <ul className="space-y-2 text-xs font-semibold text-emerald-100/85">
            <li>
              <Link
                to="/"
                className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>🏠</span>
                <span>হোম ড্যাশবোর্ড</span>
              </Link>
            </li>
            <li>
              <Link
                to="/compare"
                className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>⚖️</span>
                <span>বাজার দর তুলনা</span>
              </Link>
            </li>
            <li>
              <Link
                to="/profile"
                className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>👤</span>
                <span>আমার প্রোফাইল</span>
              </Link>
            </li>
            <li>
              <Link
                to="/signin"
                className="hover:text-emerald-300 transition-colors inline-flex items-center gap-1.5"
              >
                <span>🔐</span>
                <span>সাইন ইন / সাইন আপ</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Legal & Required Disclaimer Bar */}
      <div className="border-t border-white/10 bg-[#07120c]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2 text-xs text-emerald-100/75">
          <p className="text-center sm:text-left font-medium">
            সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
          </p>
          <p className="text-center sm:text-right font-semibold text-emerald-300/90">
            © বাজার দর (BazarDor) — সর্বস্বত্ব সংরক্ষিত
          </p>
        </div>
      </div>
    </footer>
  );
};
