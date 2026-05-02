import React from 'react';

export function TableSkeleton({ rows = 5 }: { rows?: number }) {
  return (
    <div className="w-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm animate-pulse">
      {/* Toolbar Skeleton */}
      <div className="p-5 flex items-center justify-between border-b border-gray-100 dark:border-white/4">
        <div className="h-10 w-64 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
        <div className="flex gap-2">
          <div className="h-10 w-20 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
          <div className="h-10 w-20 bg-gray-200 dark:bg-white/10 rounded-lg"></div>
        </div>
      </div>
      
      {/* Table Header Skeleton */}
      <div className="w-full grid grid-cols-5 gap-4 px-6 py-4 bg-gray-50/50 dark:bg-white/1 border-b border-gray-100 dark:border-white/4">
        <div className="h-4 w-24 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-4 w-32 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-4 w-40 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-4 w-20 bg-gray-200 dark:bg-white/10 rounded"></div>
        <div className="h-4 w-16 bg-gray-200 dark:bg-white/10 rounded justify-self-end"></div>
      </div>

      {/* Table Rows Skeleton */}
      <div className="divide-y divide-gray-100 dark:divide-white/5">
        {Array.from({ length: rows }).map((_, i) => (
          <div key={i} className="w-full grid grid-cols-5 gap-4 px-6 py-5 items-center">
            <div className="h-4 w-16 bg-gray-200 dark:bg-white/5 rounded"></div>
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-full bg-gray-200 dark:bg-white/5"></div>
              <div className="space-y-2">
                <div className="h-4 w-28 bg-gray-200 dark:bg-white/5 rounded"></div>
                <div className="h-3 w-20 bg-gray-200 dark:bg-white/5 rounded"></div>
              </div>
            </div>
            <div className="h-4 w-32 bg-gray-200 dark:bg-white/5 rounded"></div>
            <div className="h-6 w-20 bg-gray-200 dark:bg-white/5 rounded-full"></div>
            <div className="flex gap-2 justify-self-end">
              <div className="h-8 w-16 bg-gray-200 dark:bg-white/5 rounded-lg"></div>
              <div className="h-8 w-8 bg-gray-200 dark:bg-white/5 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
