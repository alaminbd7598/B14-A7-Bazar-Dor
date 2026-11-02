import React, { useEffect } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    if (!loading && !user) {
      toast.error('বিস্তারিত তথ্য দেখতে অনুগ্রহ করে সাইন ইন করুন।', {
        id: 'protected-route-toast',
      });
    }
  }, [user, loading]);

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="bg-[#fafcfa] border border-[#e1e8e1] rounded-3xl p-8 animate-pulse space-y-4">
          <div className="h-8 bg-[#e1e8e1] rounded w-1/3" />
          <div className="h-4 bg-[#f0f5f0] rounded w-1/2" />
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-4">
            <div className="h-28 bg-[#f0f5f0] rounded-2xl" />
            <div className="h-28 bg-[#f0f5f0] rounded-2xl" />
            <div className="h-28 bg-[#f0f5f0] rounded-2xl" />
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    const redirectPath = `${location.pathname}${location.search}`;
    return (
      <Navigate
        to={`/signin?redirect=${encodeURIComponent(redirectPath)}`}
        replace
      />
    );
  }

  return <>{children}</>;
};
