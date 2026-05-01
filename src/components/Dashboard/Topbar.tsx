"use client";

import { Bell } from "lucide-react";
import { AccountDropdown } from "./AccountDropdown";

export default function Topbar() {
  return (
    <header className="h-16 shrink-0 border-b border-gray-200 dark:border-white/10 bg-white/80 dark:bg-[#0A0A0A]/80 backdrop-blur-md sticky top-0 z-10 px-6 flex items-center justify-between transition-colors duration-300">

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
