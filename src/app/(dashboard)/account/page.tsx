"use client";

import React from 'react';
import { User, Mail, Shield, LogOut, Camera, Bell, CreditCard } from 'lucide-react';
import { useAccount } from '@/hooks/use-account';
import { Button } from '@/components/ui/button';

export default function AccountPage() {
  const { handleLogout } = useAccount();

  const navItems = [
    { icon: User, label: 'Personal Info', active: true },
    { icon: Shield, label: 'Security', active: false },
    { icon: Bell, label: 'Notifications', active: false },
    { icon: CreditCard, label: 'Billing', active: false },
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header section with gradient */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-500/10 via-purple-500/10 to-pink-500/10 border border-gray-200 dark:border-white/10 p-8 md:p-12 transition-colors duration-300">
        <div className="absolute inset-0 bg-white/40 dark:bg-black/20 backdrop-blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-white/80 dark:bg-black/50 flex items-center justify-center backdrop-blur-md overflow-hidden">
                <span className="text-3xl font-bold text-gray-900 dark:text-white">JD</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white dark:bg-white/10 hover:bg-gray-50 dark:hover:bg-white/20 border border-gray-200 dark:border-white/20 text-gray-600 dark:text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">John Doe</h1>
            <p className="text-gray-500 dark:text-white/60 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> john@example.com
            </p>
          </div>
          <div className="md:ml-auto">
            <Button variant="secondary" className="bg-white dark:bg-white/10 text-gray-900 dark:text-white border border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/20">
              Edit Profile
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {navItems.map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all border ${
                item.active 
                  ? 'bg-white dark:bg-white/10 text-gray-900 dark:text-white border-gray-200 dark:border-white/10 shadow-sm' 
                  : 'text-gray-500 dark:text-white/50 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white/90 border-transparent'
              }`}
            >
              <item.icon size={18} className={item.active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400 dark:text-white/40'} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Details Form */}
          <div className="rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
            <div className="p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/[0.02]">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Personal Information</h2>
              <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Update your personal details here.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 dark:text-white/50 uppercase tracking-widest pl-1">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                    <input
                      defaultValue="John"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-bold text-gray-400 dark:text-white/50 uppercase tracking-widest pl-1">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                    <input
                      defaultValue="Doe"
                      className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-bold text-gray-400 dark:text-white/50 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/30" />
                  <input
                    defaultValue="john@example.com"
                    type="email"
                    className="w-full bg-gray-50 dark:bg-black/20 border border-gray-200 dark:border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 dark:focus:border-indigo-500/50 focus:bg-white dark:focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <Button variant="primary" className="bg-indigo-600 hover:bg-indigo-700 shadow-lg shadow-indigo-500/20">
                  Save Changes
                </Button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-3xl bg-red-50 dark:bg-red-500/5 border border-red-200 dark:border-red-500/20 overflow-hidden relative">
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-100 dark:bg-red-500/10 rounded-xl text-red-600 dark:text-red-400">
                  <Shield size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-bold text-gray-900 dark:text-white">Danger Zone</h2>
                  <p className="text-sm text-gray-500 dark:text-white/40 mt-1 mb-5">
                    Irreversible and destructive actions related to your account.
                  </p>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-white/50 dark:bg-black/20 border border-red-100 dark:border-white/5">
                    <div>
                      <h3 className="text-sm font-bold text-gray-900 dark:text-white/90">Sign Out Everywhere</h3>
                      <p className="text-xs text-gray-500 dark:text-white/40 mt-0.5">End all active sessions on other devices</p>
                    </div>
                    <Button 
                      onClick={handleLogout}
                      variant="destructive"
                    >
                      <LogOut size={16} />
                      Log Out
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
