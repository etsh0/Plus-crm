"use client";

import * as React from "react";
import {
  MoreHorizontal,
  Pencil,
  Trash2,
  Eye,
  ExternalLink,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface ActionDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
  className?: string;
}

export function ActionDropdown({
  onEdit,
  onDelete,
  onDetails,
  className,
}: ActionDropdownProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isOpen]);

  const handleAction = (action?: () => void) => {
    if (action) action();
    setIsOpen(false);
  };

  return (
    <div className={cn("relative inline-block", className)} ref={containerRef}>
      <button
        onClick={(e) => {
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
        onPointerDown={(e) => e.stopPropagation()}
        onMouseDown={(e) => e.stopPropagation()}
        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-white/5 transition-all"
      >
        <MoreHorizontal className="w-4 h-4" />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-1 w-48 rounded-xl bg-white dark:bg-[#121212] border border-gray-200 dark:border-white/10 shadow-[0_10px_30px_rgba(0,0,0,0.1)] dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] overflow-hidden z-[100] animate-in fade-in zoom-in-95 duration-200">
          <div className="p-1.5">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDetails);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Eye size={16} className="text-gray-400 dark:text-white/30" />
              View Details
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onEdit);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-gray-600 dark:text-white/70 hover:text-gray-900 dark:hover:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-colors"
            >
              <Pencil size={16} className="text-gray-400 dark:text-white/30" />
              Edit Action
            </button>
            <div className="my-1 border-t border-gray-100 dark:border-white/5" />
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleAction(onDelete);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
              className="w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm text-red-500 hover:bg-red-500/10 transition-colors"
            >
              <Trash2 size={16} />
              Delete Action
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
