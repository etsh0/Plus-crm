"use client";

import { useDraggable } from "@dnd-kit/core";
import { useRouter } from "next/navigation";
import { Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { Deal } from "@/types/deal";
import { ActionDropdown } from "@/components/ui/action-dropdown";

export default function DealCard({ item, onDelete }: { item: Deal; onDelete?: (id: string) => void }) {
  const router = useRouter();
  const { attributes, listeners, setNodeRef, transform } =
    useDraggable({
      id: item.id,
    });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "prospect": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "negotiation": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "won": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "lost": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusTextOnly = (status: string) => {
    switch (status) {
      case "prospect": return "text-blue-500";
      case "negotiation": return "text-purple-500";
      case "won": return "text-amber-500";
      case "lost": return "text-emerald-500";
      default: return "text-white";
    }
  };

  // Format currency
  const formatValue = (val: number) => {
    if (val >= 1000) {
      return `$${(val / 1000).toFixed(0)}K`;
    }
    return `$${val}`;
  };

  // Mock data to match the requested design
  const mockData = {
    company: "TechCorp Solutions",
    contact: "Tarek Samir",
    role: "CEO",
    probability: 40,
    date: "Mar 01",
    owner: "Ahmed Hassan",
    initials: item.title.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
  };

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      className="bg-white dark:bg-[#1c1c1f] py-4 px-3 rounded shadow-sm border border-gray-100 dark:border-white/5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
    >
      {/* Header: Title and Actions */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight">
          {item.title}
        </h3>
        <ActionDropdown 
          onEdit={() => router.push(`/deals/edit/${item.id}`)}
          onDelete={() => onDelete?.(item.id)}
          onDetails={() => router.push(`/deals/${item.id}`)}
        />
      </div>

      {/* Company/Organization */}
      <div className="flex items-center gap-1.5 mb-4 text-gray-400 dark:text-gray-500">
        <Building2 className="w-3.5 h-3.5" />
        <span className="text-[12px] font-medium">{mockData.company}</span>
      </div>

      {/* Contact Person */}
      <div className="flex items-center gap-2 mb-6">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border", getStatusColor(item.status))}>
          {mockData.initials}
        </div>
        <div className="text-[13px]">
          <span className="font-bold text-gray-800 dark:text-gray-200">{mockData.contact}</span>
          <span className="text-gray-400 dark:text-gray-500 mx-1">·</span>
          <span className="text-gray-400 dark:text-gray-500 font-medium">{mockData.role}</span>
        </div>
      </div>

      {/* Deal Value */}
      <div className="mb-4">
        <div className={cn("text-lg font-black tracking-tight", getStatusTextOnly(item.status))}>
          {formatValue(item.value)}
        </div>
      </div>

      {/* Probability Progress */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-2 text-[11px]">
          <span className="text-gray-400 dark:text-gray-500 font-medium">Probability</span>
          <span className={cn("font-bold", getStatusTextOnly(item.status))}>{mockData.probability}%</span>
        </div>
        <div className="h-1.5 w-full bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
          <div 
            className={cn("h-full rounded-full transition-all duration-500", 
              item.status === "prospect" ? "bg-blue-500" :
              item.status === "negotiation" ? "bg-purple-500" :
              item.status === "won" ? "bg-amber-500" :
              item.status === "lost" ? "bg-emerald-500" : "bg-gray-500"
            )} 
            style={{ width: `${mockData.probability}%` }}
          />
        </div>
      </div>

      {/* Footer: Date and Owner */}
      <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] font-medium">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{mockData.date}</span>
        </div>
        <span className="text-gray-400">{mockData.owner}</span>
      </div>
    </div>
  );
}
