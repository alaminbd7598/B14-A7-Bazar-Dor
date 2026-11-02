import React from 'react';
import { Link } from 'react-router-dom';

export const NotFoundPage: React.FC = () => {
  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-16">
      <div className="max-w-lg mx-auto bg-[#fafcfa] border border-[#e1e8e1] rounded-3xl p-8 sm:p-10 text-center space-y-4 shadow-2xs">
        <div className="w-16 h-16 rounded-2xl bg-[#f0f5f0] flex items-center justify-center text-3xl mx-auto">
          <span role="img" aria-label="৪০৪ পাওয়া যায়নি">
            🧭
          </span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bold text-[#1d271f]">
          ৪০৪ — পেজটি খুঁজে পাওয়া যায়নি
        </h1>
        <p className="text-sm text-[#5c6b5e]">
          আপনি যে ঠিকানায় প্রবেশ করতে চাচ্ছেন তা সঠিক নয় অথবা সরিয়ে ফেলা হয়েছে।
        </p>
        <div className="pt-2">
          <Link
            to="/"
            className="inline-flex items-center justify-center px-5 py-2.5 text-sm font-semibold text-white bg-[#05893e] hover:bg-[#047f39] rounded-xl shadow-xs transition-colors"
          >
            হোম পেজে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};
