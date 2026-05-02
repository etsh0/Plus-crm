import React from 'react';

export function CardSkeleton() {
  return (
    <div className="rounded-3xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 p-6 flex flex-col gap-4 animate-pulse h-[140px]">
      <div className="flex items-center justify-between">
        <div className="h-5 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/10"></div>
      </div>
      <div className="space-y-3 mt-auto">
        <div className="h-8 w-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded"></div>
      </div>
    </div>
  );
}
