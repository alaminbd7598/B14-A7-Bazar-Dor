import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export const ProfilePage: React.FC = () => {
  const { user, signOut } = useAuth();
  const navigate = useNavigate();

  if (!user) return null;

  const userInitial = user.name ? user.name.charAt(0).toUpperCase() : 'U';

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Heading */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f17]">
            আমার প্রোফাইল
          </h1>
          <p className="text-xs sm:text-sm text-[#4b6356] font-medium mt-1">
            আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।
          </p>
        </div>

        {/* User Summary Card matching Penpot */}
        <section
          aria-label="প্রোফাইল সারাংশ"
          className="hero-surface-3d rounded-3xl p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
        >
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl btn-3d-primary text-white text-2xl font-extrabold flex items-center justify-center shrink-0">
              {userInitial}
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-extrabold text-[#0f1f17]">
                {user.name}
              </h2>
              <p className="text-xs sm:text-sm text-[#4b6356] font-medium">{user.email}</p>
            </div>
          </div>

          <button
            type="button"
            onClick={handleSignOut}
            className="inline-flex items-center justify-center gap-2 px-4 py-2 text-xs sm:text-sm font-bold text-[#dc2626] bg-[#fef2f2] hover:bg-[#fee2e2] border border-[#fecaca] rounded-xl transition-colors cursor-pointer whitespace-nowrap"
          >
            <span aria-hidden="true">↩</span>
            <span>সাইন আউট</span>
          </button>
        </section>

        {/* User Details & Challenge C3 Update Route Navigation */}
        <section
          aria-label="অ্যাকাউন্ট তথ্য"
          className="card-3d rounded-3xl p-6 sm:p-8 space-y-5"
        >
          <div className="flex items-center justify-between border-b border-[#e8f0eb] pb-3">
            <h3 className="text-base sm:text-lg font-extrabold text-[#0f1f17]">
              তথ্য
            </h3>
            <span className="text-xs font-semibold text-[#4b6356]">
              লগইন মাধ্যম: {user.provider === 'google' ? 'Google' : user.provider === 'github' ? 'GitHub' : 'ইমেইল ও পাসওয়ার্ড'}
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-[#f3f7f4] border border-[#d5e4da] rounded-2xl p-4">
              <span className="block text-xs font-semibold text-[#4b6356] mb-1">নাম</span>
              <span className="text-sm sm:text-base font-extrabold text-[#0f1f17]">
                {user.name}
              </span>
            </div>

            <div className="bg-[#f3f7f4] border border-[#d5e4da] rounded-2xl p-4">
              <span className="block text-xs font-semibold text-[#4b6356] mb-1">ইমেইল</span>
              <span className="text-sm sm:text-base font-extrabold text-[#0f1f17]">
                {user.email}
              </span>
            </div>
          </div>

          {/* Challenge C3: Update button that takes user to another route (/profile/update) */}
          <div className="pt-2 flex flex-wrap items-center justify-between gap-3">
            <Link
              to="/profile/update"
              className="inline-flex items-center justify-center gap-2 px-5 py-2.5 btn-3d-primary text-white text-sm font-bold rounded-xl transition-all"
            >
              <span>আপডেট (Update Information)</span>
            </Link>

            <Link
              to="/"
              className="text-xs sm:text-sm font-bold text-[#047857] hover:underline transition-colors"
            >
              ← হোম পেজে ফিরে যান
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
};
