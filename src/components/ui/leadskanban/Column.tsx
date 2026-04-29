"use client";

import { useDroppable } from "@dnd-kit/core";
import { Lead } from "@/types/lead";

import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import LeadCard from "./LeadCard";

export default function Column({
  column,
  items,
}: {
  column: { id: string; title: string };
  items: Lead[];
}) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const getTitleColor = (id: string) => {
    switch (id) {
      case "new": return "text-blue-500";
      case "contacted": return "text-purple-500";
      case "qualified": return "text-amber-500";
      case "proposal": return "text-emerald-500";
      case "closed": return "text-rose-500";
      default: return "text-white";
    }
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-white/5 rounded-lg py-4 px-2 min-h-125 border border-white/5"
    >
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 className={cn("text-xs font-black uppercase tracking-widest", getTitleColor(column.id))}>
          {column.title}
        </h2>
        <span className="flex items-center justify-center text-[11px] font-bold h-6 w-6 rounded-full bg-white/10 text-white/60">
          {items.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 mb-4">
        {items.map((item) => (
          <LeadCard key={item.id} item={item} />
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full bg-white/2 border-dashed border-2 border-white/5 py-4 rounded hover:bg-white/5 hover:border-white/10 text-white/40 transition-all group cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
        <span className="text-xs font-bold">Add Lead</span>
      </Button>
    </div>
  );
}