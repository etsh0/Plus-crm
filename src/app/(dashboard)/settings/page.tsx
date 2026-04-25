"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function SettingsPage() {
  const router = useRouter();

  const handleLogout = () => {
    // Basic placeholder for logout functionality
    router.push('/login');
  };

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Settings</h1>
        <p className="text-white/40 text-sm mt-1">Manage your account preferences</p>
      </div>

      <div className="flex flex-col gap-4 max-w-xl">
        {/* Profile section */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
          <h2 className="text-sm font-semibold text-white mb-4">Profile</h2>
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/40 uppercase tracking-widest">Full Name</label>
              <input
                defaultValue="John Doe"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors"
              />
            </div>
            <div className="flex flex-col gap-1.5">
              <label className="text-xs text-white/40 uppercase tracking-widest">Email</label>
              <input
                defaultValue="john@example.com"
                className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors"
              />
            </div>
          </div>
          <div className="mt-4 flex justify-end">
            <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-all">
              Save Profile
            </button>
          </div>
        </div>

        {/* Authentication / Logout section */}
        <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
          <h2 className="text-sm font-semibold text-white mb-1">Account Access</h2>
          <p className="text-xs text-white/40 mb-4">Manage your session.</p>
          <button 
            onClick={handleLogout}
            className="px-4 py-2 rounded-xl border border-red-500/30 text-sm font-medium text-red-400 hover:bg-red-500/10 transition-colors"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
