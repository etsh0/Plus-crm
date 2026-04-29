"use client";

import { useDraggable } from "@dnd-kit/core";
import { Lead } from "@/types/lead";

import { MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export default function LeadCard({ item }: { item: Lead }) {
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
      case "new": return "text-blue-500 bg-blue-500/10 border-blue-500/20";
      case "contacted": return "text-purple-500 bg-purple-500/10 border-purple-500/20";
      case "qualified": return "text-amber-500 bg-amber-500/10 border-amber-500/20";
      case "proposal": return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
      case "closed": return "text-rose-500 bg-rose-500/10 border-rose-500/20";
      default: return "text-gray-500 bg-gray-500/10 border-gray-500/20";
    }
  };

  const getStatusTextOnly = (status: string) => {
    switch (status) {
      case "new": return "text-blue-500";
      case "contacted": return "text-purple-500";
      case "qualified": return "text-amber-500";
      case "proposal": return "text-emerald-500";
      case "closed": return "text-rose-500";
      default: return "text-white";
    }
  };

  // Mock data for visual completeness
  const mockData = {
    contact: "Tarek Samir",
    role: "CEO",
    value: "$75K",
    tag: "Website",
    owner: "Ahmed Hassan",
    date: "Jan 15",
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
      <div className="flex items-start justify-between mb-5">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight">
          {item.title}
        </h3>
        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
          <MoreHorizontal className="w-4 h-4" />
        </button>
      </div>

      <div className="flex items-center gap-3 mb-6">
        <div className={cn("w-8 h-8 rounded-full flex items-center justify-center text-[10px] font-bold border", getStatusColor(item.status))}>
          {mockData.initials}
        </div>
        <div>
          <div className="text-[13px] font-bold text-gray-800 dark:text-gray-200">{mockData.contact}</div>
          <div className="text-[11px] text-gray-400 font-medium">{mockData.role}</div>
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className={cn("text-lg font-black tracking-tight", getStatusTextOnly(item.status))}>
          {mockData.value}
        </div>
        <div className="bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-400 border border-gray-100 dark:border-white/5">
          {mockData.tag}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] font-medium">
        <span className="text-gray-400">{mockData.owner}</span>
        <span className="text-gray-400">{mockData.date}</span>
      </div>
    </div>
  );
}