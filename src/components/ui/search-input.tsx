import React from "react";
import { cn } from "@/lib/utils";

interface SearchInputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  containerClassName?: string;
}

export const SearchInput: React.FC<SearchInputProps> = ({
  className,
  containerClassName,
  ...props
}) => {
  return (
    <div className={cn("relative max-w-xl", containerClassName)}>
      <svg
        className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
      </svg>
      <input
        type="text"
        className={cn(
          "w-full bg-[#27272a]/50 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors",
          className
        )}
        {...props}
      />
    </div>
  );
};
