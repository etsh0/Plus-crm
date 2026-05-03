"use client";

import { ActionDropdown } from "@/components/ui/action-dropdown";
import { Lead } from "@/redux/slice/leads/leads";
import { RootState } from "@/redux/store/store";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { Building2 } from "lucide-react";
import { useSelector } from "react-redux";

export default function LeadCard({ item, statusColor }: { item: Lead, statusColor:string }) {

  const { customers } = useSelector((state: RootState) => state.customers);
  const customer = customers.find((c) => c.id === item.customer_id)

  // kanban
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: item.id.toString(),
  });

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    zIndex: isDragging ? 50 : 1,
    position: 'relative' as const,
    borderColor: statusColor ? `${statusColor}80` : undefined,
  };

  const formattedValue = item.expected_value 
    ? new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 }).format(item.expected_value)
    : "$0";

  return (
    <div
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      className="bg-white dark:bg-[#1c1c1f] py-4 px-3 rounded shadow-sm border border-gray-100 dark:border-white/5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
    >
      <div className="flex items-start justify-between mb-5">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight">
          {item.lead_title}
        </h3>
        <ActionDropdown 
          onEdit={() => {}}
        />
      </div>

      <div className="space-y-2.5 mb-6">
        <div className="flex flex-col gap-2">
          <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">Company</span>
          <div className="flex items-center gap-1.5 mb-4 text-gray-400 dark:text-gray-500">
            <Building2 className="w-3.5 h-3.5" />
            {customer?.company_name || "Unknown"}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">Contact Information</span>
          <span className="text-[14px] font-bold text-gray-700 dark:text-gray-300">
            {customer?.contact_person_name || "N/A"}
          </span>
          {customer?.job_title && (
            <span className={`text-[10px] font-black text-blue-400 uppercase tracking-[0.1em] mt-0.5`}>
              {customer.job_title}
            </span>
          )}
        </div>
      </div>

      <div className="flex items-center justify-between mb-5">
        <div className={"text-lg font-black tracking-tight"}>
          {formattedValue}
        </div>
        <div className="bg-gray-50 dark:bg-white/5 px-2.5 py-1 rounded-lg text-[10px] font-bold text-gray-400 border border-gray-100 dark:border-white/5">
          {item.source}
        </div>
      </div>

      <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] font-medium">
        <span className="text-gray-400">User #{item.user_id || "Unassigned"}</span>
        <span className="text-gray-400">{item.createdAt}</span>
      </div>
    </div>
  );
}
