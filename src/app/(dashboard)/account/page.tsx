"use client";
import { useRouter } from 'next/navigation';
import { User, Mail, Shield, LogOut, Camera, Key, Bell, CreditCard } from 'lucide-react';
import Swal from 'sweetalert2';
import Image from 'next/image';

export default function AccountPage() {
  const router = useRouter();

  const handleLogout = () => {
    Swal.fire({
      title: 'Sign Out?',
      text: "Are you sure you want to log out of your account?",
      icon: 'warning',
      showCancelButton: true,
      background: '#111',
      color: '#fff',
      confirmButtonColor: '#ef4444',
      cancelButtonColor: '#3f3f46',
      confirmButtonText: 'Yes, log out',
      cancelButtonText: 'Cancel',
      customClass: {
        popup: 'rounded-3xl border border-white/10',
        confirmButton: 'rounded-xl px-6 py-2.5 font-medium',
        cancelButton: 'rounded-xl px-6 py-2.5 font-medium',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        router.push('/login');
      }
    });
  };

  return (
    <div className="p-4 md:p-8 max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Header section with gradient */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-indigo-500/20 via-purple-500/20 to-pink-500/20 border border-white/10 p-8 md:p-12">
        <div className="absolute inset-0 bg-white/5 backdrop-blur-3xl -z-10" />
        <div className="flex flex-col md:flex-row items-center gap-6 relative z-10">
          <div className="relative group">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-indigo-400 to-purple-500 p-1">
              <div className="w-full h-full rounded-full bg-black/50 flex items-center justify-center backdrop-blur-md overflow-hidden">
                <span className="text-3xl font-bold text-white">JD</span>
              </div>
            </div>
            <button className="absolute bottom-0 right-0 p-2 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 text-white backdrop-blur-md transition-all opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 shadow-xl">
              <Camera size={16} />
            </button>
          </div>
          <div className="text-center md:text-left">
            <h1 className="text-3xl font-bold text-white tracking-tight">John Doe</h1>
            <p className="text-white/60 mt-1 flex items-center justify-center md:justify-start gap-2">
              <Mail size={14} /> john@example.com
            </p>
          </div>
          <div className="md:ml-auto">
            <button className="px-5 py-2.5 rounded-xl bg-white text-black font-semibold text-sm hover:bg-white/90 transition-all shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_30px_rgba(255,255,255,0.5)]">
              Edit Profile
            </button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Navigation Sidebar */}
        <div className="lg:col-span-1 space-y-2">
          {[
            { icon: User, label: 'Personal Info', active: true },
            { icon: Shield, label: 'Security', active: false },
            { icon: Bell, label: 'Notifications', active: false },
            { icon: CreditCard, label: 'Billing', active: false },
          ].map((item, idx) => (
            <button
              key={idx}
              className={`w-full flex items-center gap-3 px-5 py-3.5 rounded-2xl text-sm font-medium transition-all ${
                item.active 
                  ? 'bg-white/10 text-white border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.2)]' 
                  : 'text-white/50 hover:bg-white/5 hover:text-white/90 border border-transparent'
              }`}
            >
              <item.icon size={18} className={item.active ? 'text-indigo-400' : 'text-white/40'} />
              {item.label}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Profile Details Form */}
          <div className="rounded-3xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
            <div className="p-6 border-b border-white/10 bg-white/[0.02]">
              <h2 className="text-lg font-semibold text-white">Personal Information</h2>
              <p className="text-sm text-white/40 mt-1">Update your personal details here.</p>
            </div>
            <div className="p-6 space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-widest pl-1">First Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      defaultValue="John"
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-xs font-medium text-white/50 uppercase tracking-widest pl-1">Last Name</label>
                  <div className="relative">
                    <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                    <input
                      defaultValue="Doe"
                      className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                    />
                  </div>
                </div>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-xs font-medium text-white/50 uppercase tracking-widest pl-1">Email Address</label>
                <div className="relative">
                  <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30" />
                  <input
                    defaultValue="john@example.com"
                    type="email"
                    className="w-full bg-black/20 border border-white/10 rounded-xl pl-11 pr-4 py-3 text-sm text-white outline-none focus:border-indigo-500/50 focus:bg-white/5 transition-all focus:ring-4 focus:ring-indigo-500/10"
                  />
                </div>
              </div>
              
              <div className="pt-4 flex justify-end">
                <button className="px-6 py-3 rounded-xl bg-indigo-500 hover:bg-indigo-600 text-sm font-semibold text-white transition-all shadow-[0_0_15px_rgba(99,102,241,0.4)] hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]">
                  Save Changes
                </button>
              </div>
            </div>
          </div>

          {/* Danger Zone */}
          <div className="rounded-3xl bg-red-500/5 border border-red-500/20 overflow-hidden relative">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-red-500/5 -z-10" />
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="p-3 bg-red-500/10 rounded-xl text-red-400">
                  <Shield size={24} />
                </div>
                <div className="flex-1">
                  <h2 className="text-lg font-semibold text-white">Danger Zone</h2>
                  <p className="text-sm text-white/40 mt-1 mb-5">
                    Irreversible and destructive actions related to your account.
                  </p>
                  <div className="flex items-center justify-between p-4 rounded-2xl bg-black/20 border border-white/5">
                    <div>
                      <h3 className="text-sm font-medium text-white/90">Sign Out Everywhere</h3>
                      <p className="text-xs text-white/40 mt-0.5">End all active sessions on other devices</p>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-red-500/10 text-red-400 border border-red-500/20 hover:bg-red-500 hover:text-white transition-all text-sm font-medium"
                    >
                      <LogOut size={16} />
                      Log Out
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
