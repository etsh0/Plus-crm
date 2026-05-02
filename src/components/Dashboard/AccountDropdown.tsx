"use client";

import * as React from "react";
import { 
  User, 
  Settings, 
  LogOut, 
  Bell, 
  Shield, 
  HelpCircle,
  ChevronDown
} from "lucide-react";
import Link from "next/link";
import { useAccount } from "@/hooks/use-account";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { loadAuthData } from "@/redux/slice/auth/authSlice";

export function AccountDropdown() {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const { handleLogout } = useAccount();
  const dispatch = useDispatch();
  const currentUser = useSelector((state: RootState) => state.auth.currentUser);

  React.useEffect(() => {
    dispatch(loadAuthData());
  }, [dispatch]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const displayInitials = currentUser?.name
    ? currentUser.name.split(' ').map(n => n[0]).join('').substring(0, 2).toUpperCase()
    : 'AH';

  const displayName = currentUser?.name || 'Ahmed Hassan';
  const displayEmail = currentUser?.email || 'ahmed@pulse-crm.com';

  return (
    <div className="relative" ref={containerRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="group flex items-center gap-3 p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all duration-200 border border-transparent hover:border-gray-200 dark:hover:border-white/10"
      >
        <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-sm shadow-lg">
          {displayInitials}
        </div>
        <div className="hidden md:block text-left mr-1">
          <p className="text-sm font-semibold text-gray-900 dark:text-white leading-none">{displayName}</p>
          <p className="text-[10px] text-gray-500 dark:text-white/40 mt-1">Administrator</p>
        </div>
        <ChevronDown size={14} className="text-gray-400 dark:text-white/40 transition-transform duration-200 group-hover:text-gray-600 dark:group-hover:text-white" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-3 w-64 rounded-2xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 shadow-[0_10px_40px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_40px_rgba(0,0,0,0.5)] overflow-hidden z-[200] animate-in fade-in zoom-in-95 duration-200">
          {/* Header */}
          <div className="p-4 border-b border-gray-100 dark:border-white/5 flex items-center gap-4 bg-gray-50/50 dark:bg-white/5">
            <div className="w-12 h-12 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500">
                <User size={24} />
            </div>
            <div>
              <p className="text-base font-bold text-gray-900 dark:text-white">{displayName}</p>
              <p className="text-xs text-gray-500 dark:text-white/40">{displayEmail}</p>
            </div>
          </div>

          {/* Menu Items */}
          <div className="p-2">
            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <User size={18} className="text-gray-400 dark:text-white/30" />
              My Profile
            </Link>
            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Bell size={18} className="text-gray-400 dark:text-white/30" />
              Notifications
              <span className="ml-auto w-5 h-5 rounded-full bg-violet-500 text-[10px] flex items-center justify-center text-white font-bold">3</span>
            </Link>
            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Shield size={18} className="text-gray-400 dark:text-white/30" />
              Security
            </Link>
            <Link href="/account" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <Settings size={18} className="text-gray-400 dark:text-white/30" />
              Settings
            </Link>
          </div>

          <div className="p-2 border-t border-gray-100 dark:border-white/5">
            <Link href="/help" className="flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors">
              <HelpCircle size={18} className="text-gray-400 dark:text-white/30" />
              Help Center
            </Link>
            <button 
              onClick={() => {
                setIsOpen(false);
                handleLogout();
              }}
              className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-500 hover:bg-red-500/10 transition-colors mt-1"
            >
              <LogOut size={18} />
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
