"use client";

import { useDroppable } from "@dnd-kit/core";


import { cn } from "@/lib/utils";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import DealCard from "./DealCard";

export default function Column({column}: {column:{id:string, title:string}}) {
  const { setNodeRef } = useDroppable({
    id: column.id,
  });

    const deals = useSelector((state: RootState) => state.deals.deals);
    const columnDeals = deals.filter((deal) => deal.status.toUpperCase() === column.title.toUpperCase());


  const getTitleColor = (id: string) => {
    switch (id) {
      case "new": return "text-blue-500";
      case "proposal": return "text-indigo-500";
      case "won": return "text-emerald-500";
      case "lost": return "text-rose-500";
      default: return "text-white";
    }
  };

  const getHexColor = (id: string) => {
    switch (id) {
      case "new": return "#3b82f6";
      case "proposal": return "#6366f1";
      case "won": return "#10b981";
      case "lost": return "#f43f5e";
      default: return "#ffffff";
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
          {columnDeals.length}
        </span>
      </div>

      <div className="flex-1 space-y-3 mb-4">
        {columnDeals.map((item) => (
          <DealCard 
            key={item.id} 
            item={item} 
            statusColor={getHexColor(column.id)} 
          />
        ))}
      </div>

    </div>
  );
}