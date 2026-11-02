import React, { createContext, useContext, useState, useEffect } from 'react';
import { authClient, AuthUser, getCurrentSessionUser } from '../services/authClient';
import toast from 'react-hot-toast';

interface AuthContextType {
  user: AuthUser | null;
  loading: boolean;
  signInWithEmail: (email: string, password: string) => Promise<boolean>;
  signUpWithEmail: (name: string, email: string, password: string) => Promise<boolean>;
  signInWithSocial: (provider: 'google' | 'github') => Promise<boolean>;
  updateUserInfo: (name: string) => Promise<boolean>;
  signOut: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => getCurrentSessionUser());
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const sessionUser = getCurrentSessionUser();
    setUser(sessionUser);
  }, []);

  const signInWithEmail = async (email: string, password: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.email({ email, password });
      if (error || !data) {
        toast.error(error?.message || 'সাইন ইন করতে ব্যর্থ হয়েছে।');
        return false;
      }
      setUser(data);
      toast.success(`স্বাগতম, ${data.name}! সফলভাবে সাইন ইন হয়েছে।`);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const signUpWithEmail = async (
    name: string,
    email: string,
    password: string
  ): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signUp.email({ name, email, password });
      if (error || !data) {
        toast.error(error?.message || 'সাইন আপ করতে সমস্যা হয়েছে।');
        return false;
      }
      toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে! অনুগ্রহ করে এখন সাইন ইন করুন।');
      return true;
    } finally {
      setLoading(false);
    }
  };

  const signInWithSocial = async (provider: 'google' | 'github'): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await authClient.signIn.social({ provider });
      if (error || !data) {
        toast.error(error?.message || 'সোশ্যাল লগইন ব্যর্থ হয়েছে।');
        return false;
      }
      setUser(data);
      const label = provider === 'google' ? 'Google' : 'GitHub';
      toast.success(`${label} দিয়ে সফলভাবে সাইন ইন হয়েছে!`);
      return true;
    } finally {
      setLoading(false);
    }
  };

  const updateUserInfo = async (name: string): Promise<boolean> => {
    setLoading(true);
    try {
      const { data, error } = await authClient.updateUser({ name });
      if (error || !data) {
        toast.error(error?.message || 'তথ্য আপডেট করা যায়নি।');
        return false;
      }
      setUser(data);
      toast.success('প্রোফাইল তথ্য সফলভাবে আপডেট করা হয়েছে!');
      return true;
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (): Promise<void> => {
    await authClient.signOut();
    setUser(null);
    toast.success('সফলভাবে সাইন আউট করা হয়েছে।');
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        signInWithEmail,
        signUpWithEmail,
        signInWithSocial,
        updateUserInfo,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return ctx;
}
