import React, { useState } from 'react';
import { getAvailableAccounts } from '../services/authClient';
import { X, UserPlus } from 'lucide-react';

interface SocialAuthModalProps {
  provider: 'google' | 'github' | null;
  onClose: () => void;
  onSelectAccount: (
    provider: 'google' | 'github',
    profile: { name: string; email: string }
  ) => Promise<void>;
}

export const SocialAuthModal: React.FC<SocialAuthModalProps> = ({
  provider,
  onClose,
  onSelectAccount,
}) => {
  const [useCustom, setUseCustom] = useState(false);
  const [customName, setCustomName] = useState('');
  const [customEmail, setCustomEmail] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!provider) return null;

  const isGoogle = provider === 'google';
  const storedAccounts = getAvailableAccounts();

  const presetAccounts = [
    {
      name: 'Al Amin',
      email: isGoogle ? 'alaminbd7598@gmail.com' : 'alaminbd7598@github.com',
    },
    ...storedAccounts
      .filter(
        (acc) =>
          acc.email.toLowerCase() !== 'alaminbd7598@gmail.com' &&
          acc.email.toLowerCase() !== 'alaminbd7598@github.com'
      )
      .slice(0, 3)
      .map((acc) => ({
        name: acc.name,
        email: acc.email,
      })),
  ];

  const handleCustomSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    const trimmedName = customName.trim();
    const trimmedEmail = customEmail.trim().toLowerCase();

    if (!trimmedName || trimmedName.length < 2) {
      setError('অনুগ্রহ করে আপনার নাম লিখুন (কমপক্ষে ২ অক্ষর)।');
      return;
    }
    if (!trimmedEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      setError('অনুগ্রহ করে একটি সঠিক ইমেইল ঠিকানা লিখুন।');
      return;
    }

    await onSelectAccount(provider, {
      name: trimmedName,
      email: trimmedEmail,
    });
  };

  return (
    <div
      className="fixed inset-0 z-50 bg-[#0b1912]/60 backdrop-blur-xs flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="social-modal-title"
    >
      <div className="w-full max-w-md card-3d rounded-3xl overflow-hidden bg-white shadow-2xl">
        {/* Top Header */}
        <div className="px-6 py-4 bg-[#f4faf6] border-b border-[#d5e4da] flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            {isGoogle ? (
              <svg className="w-5 h-5 shrink-0" viewBox="0 0 24 24" aria-hidden="true">
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
            ) : (
              <svg className="w-5 h-5 shrink-0 fill-current text-[#0f1f17]" viewBox="0 0 24 24">
                <path d="M12 .3a12 12 0 0 0-3.8 23.4c.6.1.8-.3.8-.6v-2c-3.3.7-4-1.6-4-1.6-.6-1.4-1.4-1.8-1.4-1.8-1-.7.1-.7.1-.7 1.2.1 1.8 1.2 1.8 1.2 1 1.8 2.8 1.3 3.5 1 .1-.8.4-1.3.7-1.6-2.7-.3-5.5-1.3-5.5-5.9 0-1.3.5-2.4 1.2-3.2-.1-.3-.5-1.5.1-3.2 0 0 1-.3 3.3 1.2a11.5 11.5 0 0 1 6 0c2.3-1.5 3.3-1.2 3.3-1.2.6 1.7.2 2.9.1 3.2.8.8 1.2 1.9 1.2 3.2 0 4.6-2.8 5.6-5.5 5.9.4.4.8 1.1.8 2.2v3.3c0 .3.2.7.8.6A12 12 0 0 0 12 .3z" />
              </svg>
            )}
            <h2 id="social-modal-title" className="text-sm sm:text-base font-extrabold text-[#0f1f17]">
              {isGoogle ? 'Google দিয়ে সাইন ইন করুন' : 'GitHub দিয়ে সাইন ইন করুন'}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            aria-label="বন্ধ করুন"
            className="w-8 h-8 rounded-xl bg-white hover:bg-[#fee2e2] text-[#4b6356] hover:text-[#dc2626] border border-[#d5e4da] flex items-center justify-center transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Body */}
        <div className="p-6 space-y-4">
          {!useCustom ? (
            <>
              <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                <strong className="text-[#0f1f17]">বাজার দর</strong>-এ চালিয়ে যেতে একটি অ্যাকাউন্ট নির্বাচন করুন:
              </p>

              <div className="space-y-2.5">
                {presetAccounts.map((acc) => (
                  <button
                    key={acc.email}
                    type="button"
                    onClick={() => onSelectAccount(provider, acc)}
                    className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-[#f8fcf9] hover:bg-[#ecfdf5] border border-[#d5e4da] hover:border-[#059669] text-left transition-all cursor-pointer group"
                  >
                    <div className="w-10 h-10 rounded-xl btn-3d-primary text-white font-extrabold text-sm flex items-center justify-center shrink-0">
                      {acc.name.charAt(0).toUpperCase()}
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-extrabold text-[#0f1f17] group-hover:text-[#047857] truncate">
                        {acc.name}
                      </p>
                      <p className="text-xs font-medium text-[#4b6356] truncate">
                        {acc.email}
                      </p>
                    </div>
                    <span className="text-xs font-bold text-[#047857] opacity-0 group-hover:opacity-100 transition-opacity">
                      নির্বাচন →
                    </span>
                  </button>
                ))}

                {/* Use Another Account Button */}
                <button
                  type="button"
                  onClick={() => setUseCustom(true)}
                  className="w-full flex items-center gap-3.5 p-3.5 rounded-2xl bg-white hover:bg-[#f3f7f4] border border-dashed border-[#9ab8a8] hover:border-[#059669] text-left transition-all cursor-pointer"
                >
                  <div className="w-10 h-10 rounded-xl icon-well-3d text-[#047857] flex items-center justify-center shrink-0">
                    <UserPlus className="w-4 h-4" />
                  </div>
                  <div>
                    <p className="text-sm font-extrabold text-[#0f1f17]">
                      অন্য অ্যাকাউন্ট ব্যবহার করুন
                    </p>
                    <p className="text-xs font-medium text-[#4b6356]">
                      আপনার নিজের নাম ও ইমেইল দিয়ে প্রবেশ করুন
                    </p>
                  </div>
                </button>
              </div>
            </>
          ) : (
            <form onSubmit={handleCustomSubmit} className="space-y-4" noValidate>
              <p className="text-xs sm:text-sm font-medium text-[#4b6356]">
                আপনার {isGoogle ? 'Google' : 'GitHub'} অ্যাকাউন্টের নাম ও ইমেইল দিন:
              </p>

              {error && (
                <div className="bg-[#fef2f2] border border-[#fecaca] text-[#dc2626] text-xs font-bold px-3.5 py-2.5 rounded-xl">
                  {error}
                </div>
              )}

              <div>
                <label
                  htmlFor="social-custom-name"
                  className="block text-xs font-bold text-[#0f1f17] mb-1"
                >
                  আপনার নাম
                </label>
                <input
                  id="social-custom-name"
                  type="text"
                  required
                  value={customName}
                  onChange={(e) => setCustomName(e.target.value)}
                  placeholder="যেমন: সাকিব হাসান"
                  className="w-full bg-white border border-[#c6dbd0] focus:border-[#059669] rounded-xl px-3.5 py-2.5 text-sm text-[#0f1f17] focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
                />
              </div>

              <div>
                <label
                  htmlFor="social-custom-email"
                  className="block text-xs font-bold text-[#0f1f17] mb-1"
                >
                  ইমেইল ঠিকানা
                </label>
                <input
                  id="social-custom-email"
                  type="email"
                  required
                  value={customEmail}
                  onChange={(e) => setCustomEmail(e.target.value)}
                  placeholder={isGoogle ? 'yourname@gmail.com' : 'yourname@github.com'}
                  className="w-full bg-white border border-[#c6dbd0] focus:border-[#059669] rounded-xl px-3.5 py-2.5 text-sm text-[#0f1f17] focus:outline-none focus:ring-2 focus:ring-[#059669]/20"
                />
              </div>

              <div className="flex items-center gap-2.5 pt-1">
                <button
                  type="submit"
                  className="flex-1 py-2.5 px-4 btn-3d-primary text-white text-xs sm:text-sm font-bold rounded-xl cursor-pointer"
                >
                  চালিয়ে যান
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setUseCustom(false);
                    setError(null);
                  }}
                  className="py-2.5 px-4 bg-[#e8f0eb] hover:bg-[#d5e4da] text-[#0f1f17] text-xs sm:text-sm font-bold rounded-xl cursor-pointer"
                >
                  ফিরে যান
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};
