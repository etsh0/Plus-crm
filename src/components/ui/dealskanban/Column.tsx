"use client";

import { useDroppable } from "@dnd-kit/core";


import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Deal } from "@/types/deal";
import DealCard from "./DealCard";

export default function Column({
  column,
  items,
  onDelete,
}: {
  column: { id: string; title: string };
  items: Deal[];
  onDelete?: (id: string) => void;
}) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const getTitleColor = (id: string) => {
    switch (id) {
      case "prospect": return "text-blue-500";
      case "negotiation": return "text-purple-500";
      case "won": return "text-amber-500";
      case "lost": return "text-emerald-500";
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
          <DealCard key={item.id} item={item} onDelete={onDelete} />
        ))}
      </div>

      <Button
        variant="ghost"
        className="w-full bg-white/2 border-dashed border-2 border-white/5 py-4 rounded hover:bg-white/5 hover:border-white/10 text-white/40 transition-all group cursor-pointer"
      >
        <Plus className="w-4 h-4 mr-2 group-hover:rotate-90 transition-transform" />
        <span className="text-xs font-bold">Add Deal</span>
      </Button>
    </div>
  );
}