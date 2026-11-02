import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { SocialAuthModal } from '../components/SocialAuthModal';
import toast from 'react-hot-toast';

export const SignInPage: React.FC = () => {
  const { signInWithEmail, signInWithSocial, loading } = useAuth();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const redirectTo = searchParams.get('redirect') || '/';

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [formError, setFormError] = useState<string | null>(null);
  const [socialProvider, setSocialProvider] = useState<'google' | 'github' | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);

    if (!email.trim()) {
      const msg = 'অনুগ্রহ করে আপনার ইমেইল ঠিকানা লিখুন।';
      setFormError(msg);
      toast.error(msg);
      return;
    }
    if (!password || password.length < 8) {
      const msg = 'পাসওয়ার্ড কমপক্ষে ৮ অক্ষরের হতে হবে।';
      setFormError(msg);
      toast.error(msg);
      return;
    }

    const ok = await signInWithEmail(email, password);
    if (ok) {
      navigate(redirectTo, { replace: true });
    } else {
      setFormError('ইমেইল অথবা পাসওয়ার্ড সঠিক নয়। আবার চেষ্টা করুন।');
    }
  };

  const handleSocialSelect = async (
    provider: 'google' | 'github',
    profile: { name: string; email: string }
  ) => {
    setSocialProvider(null);
    setFormError(null);
    const ok = await signInWithSocial(provider, profile);
    if (ok) {
      navigate(redirectTo, { replace: true });
    }
  };

  return (
    <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-14">
      <div className="max-w-md mx-auto">
        <div className="mb-5">
          <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0f1f17]">
            সাইন ইন
          </h1>
          <p className="text-xs sm:text-sm text-[#4b6356] font-medium mt-1">
            বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
          </p>
        </div>

        <div className="hero-surface-3d rounded-3xl p-6 sm:p-8 space-y-5">
          {formError && (
            <div
              role="alert"
              className="bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs sm:text-sm font-semibold px-4 py-3 rounded-xl"
            >
              {formError}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4" noValidate>
            <div>
              <label
                htmlFor="signin-email"
                className="block text-xs sm:text-sm font-bold text-[#0f1f17] mb-1.5"
              >
                ইমেইল
              </label>
              <input
                id="signin-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-white border border-[#c6dbd0] focus:border-[#059669] rounded-xl px-3.5 py-2.5 text-sm text-[#0f1f17] placeholder:text-[#4b6356]/60 focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
              />
            </div>

            <div>
              <label
                htmlFor="signin-password"
                className="block text-xs sm:text-sm font-bold text-[#0f1f17] mb-1.5"
              >
                পাসওয়ার্ড
              </label>
              <input
                id="signin-password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="কমপক্ষে ৮ অক্ষর"
                className="w-full bg-white border border-[#c6dbd0] focus:border-[#059669] rounded-xl px-3.5 py-2.5 text-sm text-[#0f1f17] placeholder:text-[#4b6356]/60 focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-2.5 px-4 btn-3d-primary disabled:opacity-60 text-white text-sm font-bold rounded-xl transition-all cursor-pointer"
            >
              {loading ? 'সাইন ইন হচ্ছে…' : 'সাইন ইন'}
            </button>
          </form>

          {/* Divider */}
          <div className="relative flex items-center justify-center">
            <div className="border-t border-[#d5e4da] w-full" />
            <span className="bg-[#f8fcf9] px-3 text-xs font-semibold text-[#4b6356]">অথবা</span>
            <div className="border-t border-[#d5e4da] w-full" />
          </div>

          {/* Social Login Buttons */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <button
              type="button"
              disabled={loading}
              onClick={() => setSocialProvider('google')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-[#ecfdf5] border border-[#c6dbd0] rounded-xl text-xs sm:text-sm font-bold text-[#0f1f17] shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
                <path
                  fill="#4285F4"
                  d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"
                />
                <path
                  fill="#34A853"
                  d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.11-6.72-4.96H1.29v3.14C3.26 21.3 7.31 24 12 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.28 14.24c-.24-.72-.38-1.49-.38-2.24s.14-1.52.38-2.24V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.99-3.14z"
                />
                <path
                  fill="#EA4335"
                  d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.99 3.14c.95-2.85 3.6-4.96 6.72-4.96z"
                />
              </svg>
              <span>Google দিয়ে চালিয়ে যান</span>
            </button>

            <button
              type="button"
              disabled={loading}
              onClick={() => setSocialProvider('github')}
              className="flex items-center justify-center gap-2 py-2.5 px-3 bg-white hover:bg-[#ecfdf5] border border-[#c6dbd0] rounded-xl text-xs sm:text-sm font-bold text-[#0f1f17] shadow-2xs transition-colors cursor-pointer whitespace-nowrap"
            >
              <svg
                className="w-4 h-4 shrink-0 fill-current"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
              </svg>
              <span>GitHub দিয়ে চালিয়ে যান</span>
            </button>
          </div>

          <p className="text-xs sm:text-sm text-[#4b6356] text-center pt-1 font-medium">
            অ্যাকাউন্ট নেই?{' '}
            <Link
              to="/signup"
              className="font-bold text-[#047857] hover:underline"
            >
              সাইন আপ করুন
            </Link>
          </p>
        </div>

        <div className="mt-5">
          <Link
            to="/"
            className="inline-flex items-center gap-1.5 text-xs sm:text-sm font-bold text-[#047857] hover:underline transition-colors"
          >
            <span>← হোম পেজে ফিরে যান</span>
          </Link>
        </div>
      </div>

      <SocialAuthModal
        provider={socialProvider}
        onClose={() => setSocialProvider(null)}
        onSelectAccount={handleSocialSelect}
      />
    </main>
  );
};
