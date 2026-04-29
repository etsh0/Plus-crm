"use client";

import { Search, Bell, Menu } from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";

export default function Topbar() {
  return (
    <header className="h-16 shrink-0 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-30 px-6 flex items-center justify-between transition-colors duration-300">
      {/* Search Bar */}
      <div className="flex-1 max-w-md hidden sm:block">
        <div className="relative group">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 dark:text-white/40 group-focus-within:text-violet-400 transition-colors" size={18} />
          <input 
            type="text" 
            placeholder="Search everything..." 
            className="w-full bg-gray-100 dark:bg-white/5 border border-gray-200 dark:border-white/5 rounded-full py-2 pl-10 pr-4 text-sm text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-violet-500/50 focus:border-violet-500/50 transition-all"
          />
        </div>
      </div>

      {/* Right Actions */}
      <div className="flex items-center gap-2 ml-auto">
        <button className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white transition-all relative">
          <Bell size={20} />
          <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-[#0A0A0A]"></span>
        </button>
        
        <div className="h-6 w-px bg-gray-200 dark:bg-white/10 mx-2"></div>
        
        <AccountDropdown />
      </div>
    </header>
  );
}
