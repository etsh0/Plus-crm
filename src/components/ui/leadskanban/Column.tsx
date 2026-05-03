"use client";

import { useDroppable } from "@dnd-kit/core";

import LeadCard from "./LeadCard";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { leadStatus } from "@/redux/slice/lead-status/lead-status";

export default function Column({column,}: {column: leadStatus;}) {

  const { setNodeRef } = useDroppable({
    id: column.id,
  });

  const leads = useSelector((state: RootState) => state.leads.leads);
  const columnLeads = leads.filter((lead) => lead.status.toUpperCase() === column.name.toUpperCase());

  return (
    <div
      ref={setNodeRef}
      className="flex flex-col bg-white/5 rounded-lg py-4 px-2 min-h-125 border border-white/5"
    >
      <div className="flex items-center justify-between mb-6 px-1">
        <h2 
          className="text-xs font-black uppercase tracking-widest"
          style={{ color: column.color || 'white' }}
        >
          {column.name}
        </h2>
        <span className="flex items-center justify-center text-[11px] font-bold h-6 w-6 rounded-full bg-white/10 text-white/60">
          {columnLeads.length}
        </span>
      </div>
      <div className="my-4 flex flex-col gap-3">
        {
          columnLeads.map( (item) => (
            <LeadCard key={item.id} item={item} statusColor={column.color} />
          ))
        }
      </div>


    </div>
  );
}