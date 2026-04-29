import React from "react";
import { cn } from "@/lib/utils";

interface StatusBadgeProps {
  status: string;
  variant?: "default" | "hot" | "warm" | "customer" | "premium" | "active" | "at-risk" | "churned";
  className?: string;
}

const statusConfig: Record<string, { className: string }> = {
  "Hot Lead": {
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
  "Warm Lead": {
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  "Customer": {
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  "Premium": {
    className: "bg-purple-500/10 text-purple-500 border-purple-500/20",
  },
  "Active": {
    className: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
  },
  "At Risk": {
    className: "bg-amber-500/10 text-amber-500 border-amber-500/20",
  },
  "Churned": {
    className: "bg-red-500/10 text-red-500 border-red-500/20",
  },
};

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status, className }) => {
  const config = statusConfig[status] || {
    className: "bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-white/50 border-gray-200 dark:border-white/10",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border",
        config.className,
        className
      )}
    >
      {status}
    </span>
  );
};
