import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

export const UpdateProfilePage: React.FC = () => {
  const { user, updateUserInfo, loading } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || '');

  if (!user) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = name.trim();
    if (!cleaned || cleaned.length < 2) {
      toast.error('অনুগ্রহ করে কমপক্ষে ২ অক্ষরের সঠিক নাম লিখুন।');
      return;
    }
    const ok = await updateUserInfo(cleaned);
    if (ok) {
      navigate('/profile');
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-12">
      <div className="max-w-lg mx-auto space-y-6">
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f17]">
            তথ্য আপডেট করুন
          </h1>
          <p className="text-xs sm:text-sm text-[#4b6356] font-medium mt-1">
            আপনার প্রোফাইলের নাম পরিবর্তন করে সংরক্ষণ করুন।
          </p>
        </div>

        <div className="hero-surface-3d rounded-3xl p-6 sm:p-8 space-y-5">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="update-name-input"
                className="block text-xs sm:text-sm font-bold text-[#0f1f17] mb-1.5"
              >
                নাম (Name)
              </label>
              <input
                id="update-name-input"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="আপনার নাম লিখুন"
                className="w-full bg-white border border-[#c6dbd0] focus:border-[#059669] rounded-xl px-3.5 py-2.5 text-sm text-[#0f1f17] placeholder:text-[#4b6356]/60 focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
              />
            </div>

            <div>
              <label
                htmlFor="update-email-readonly"
                className="block text-xs sm:text-sm font-bold text-[#4b6356] mb-1.5"
              >
                ইমেইল (পরিবর্তনযোগ্য নয়)
              </label>
              <input
                id="update-email-readonly"
                type="email"
                disabled
                value={user.email}
                className="w-full bg-[#f3f7f4] border border-[#d5e4da] rounded-xl px-3.5 py-2.5 text-sm text-[#4b6356] cursor-not-allowed"
              />
            </div>

            <div className="pt-2 flex items-center gap-3">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 py-2.5 px-5 btn-3d-primary disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
              >
                {loading ? 'আপডেট হচ্ছে…' : 'Update Information (আপডেট)'}
              </button>
              <Link
                to="/profile"
                className="py-2.5 px-4 bg-[#e8f0eb] hover:bg-[#d5e4da] text-[#0f1f17] text-sm font-bold rounded-xl transition-colors"
              >
                বাতিল
              </Link>
            </div>
          </form>
        </div>

        <div>
          <Link
            to="/profile"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#047857] hover:underline transition-colors"
          >
            ← প্রোফাইলে ফিরে যান
          </Link>
        </div>
      </div>
    </main>
  );
};
