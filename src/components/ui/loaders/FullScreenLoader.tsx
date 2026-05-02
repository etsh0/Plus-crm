import React from 'react';
import { Loader2 } from 'lucide-react';

export function FullScreenLoader({ message = "Loading..." }: { message?: string }) {
  return (
    <div className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white dark:bg-[#1c1c1f] border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-2xl flex flex-col items-center gap-4 animate-in zoom-in-95 duration-300">
        <Loader2 className="h-10 w-10 text-violet-500 animate-spin" />
        <p className="text-sm font-semibold text-gray-900 dark:text-white tracking-wide">{message}</p>
      </div>
    </div>
  );
}
