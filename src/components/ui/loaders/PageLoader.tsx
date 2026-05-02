import React from 'react';
import { Loader2 } from 'lucide-react';

export function PageLoader() {
  return (
    <div className="flex h-[60vh] w-full flex-col items-center justify-center gap-4 animate-in fade-in duration-500">
      <div className="h-12 w-12 rounded-full bg-violet-500/10 flex items-center justify-center">
        <Loader2 className="h-6 w-6 text-violet-500 animate-spin" />
      </div>
      <p className="text-sm font-medium text-gray-500 dark:text-white/40 tracking-wide">Loading data...</p>
    </div>
  );
}
