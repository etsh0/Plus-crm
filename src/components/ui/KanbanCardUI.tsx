import React from "react";
import { cn } from "@/lib/utils";

export const CardWrapper = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & { isDragging?: boolean }
>(({ className, isDragging, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "group relative flex flex-col p-5 bg-white dark:bg-[#1c1c1f] rounded-2xl border border-gray-100 dark:border-white/10 shadow-sm transition-all duration-300",
      "hover:shadow-xl hover:shadow-gray-200/50 dark:hover:shadow-black/40 hover:-translate-y-1",
      "cursor-grab active:cursor-grabbing",
      isDragging && "opacity-50 scale-[1.02] shadow-2xl z-50",
      className
    )}
    {...props}
  >
    {children}
  </div>
));
CardWrapper.displayName = "CardWrapper";

export const CardLabel = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn("text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-wider mb-1 block", className)}>
    {children}
  </span>
);

export const CardBadge = ({ children, className }: { children: React.ReactNode; className?: string }) => (
  <span className={cn(
    "px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-gray-100 dark:bg-white/5 text-gray-600 dark:text-gray-400 border border-gray-200/50 dark:border-white/5",
    className
  )}>
    {children}
  </span>
);

export const CardIconButton = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => (
  <button
    ref={ref}
    className={cn(
      "p-1.5 rounded-lg text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/10 transition-all",
      className
    )}
    {...props}
  >
    {children}
  </button>
));
CardIconButton.displayName = "CardIconButton";
