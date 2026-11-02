import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-white/90 border-t border-[#d5e4da] mt-16">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs sm:text-sm text-[#4b6356]">
        <div className="flex items-center gap-2.5">
          <img
            src="/logo-icon.png"
            alt=""
            className="w-5 h-5 object-contain"
          />
          <p className="font-bold text-[#0f1f17] text-center sm:text-left">
            বাজার দর — প্রয়োজনীয় পণ্যের দাম এক নজরে।
          </p>
        </div>
        <p className="text-center sm:text-right font-medium">
          সকল দাম সম্ভাব্য; বাজার অবস্থার ওপর নির্ভর করে পরিবর্তিত হয়।
        </p>
      </div>
    </footer>
  );
};
