"use client";


import { Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";
import { ActionDropdown } from "@/components/ui/action-dropdown";
import { Deal } from "@/redux/slice/deals/deals";

import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function DealCard({ item, statusColor }: { item: Deal, statusColor?: string }) {
  const { customers } = useSelector((state: RootState) => state.customers);
  const customer = customers.find((c) => c.id === item.customer_id);

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

  // Format currency
  const formatValue = (val: number) => {
    return new Intl.NumberFormat('en-US', { 
      style: 'currency', 
      currency: 'USD', 
      maximumFractionDigits: 0 
    }).format(val);
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className="bg-white dark:bg-[#1c1c1f] py-4 px-3 rounded shadow-sm border border-gray-100 dark:border-white/5 cursor-grab active:cursor-grabbing hover:shadow-md transition-all group"
    >
      {/* Header: Title and Actions */}
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight">
          {item.deal_title}
        </h3>
        <ActionDropdown />
      </div>

      {/* Company/Organization */}
      <div className="flex flex-col gap-1 mb-4">
        <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">Company</span>
        <div className="flex items-center gap-1.5 text-gray-400 dark:text-gray-500">
          <Building2 className="w-3.5 h-3.5" />
          <span className="text-[12px] font-medium">{customer?.company_name || "Unknown Company"}</span>
        </div>
      </div>

      {/* Contact Person */}
      <div className="flex flex-col gap-1 mb-6">
        <span className="text-[10px] font-black text-gray-400 dark:text-white/20 uppercase tracking-widest">Contact</span>
        <div className="text-[13px]">
          <span className="font-bold text-gray-800 dark:text-gray-200">{customer?.contact_person_name || "N/A"}</span>
          {customer?.job_title && (
            <>
              <span className="text-gray-400 dark:text-gray-500 mx-1">·</span>
              <span className="text-gray-400 dark:text-gray-500 font-medium">{customer.job_title}</span>
            </>
          )}
        </div>
      </div>

      {/* Deal Value */}
      <div className="mb-4">
        <div className={cn("text-lg font-black tracking-tight")}>
          {formatValue(item.value)}
        </div>
      </div>

      {/* Footer: Date and Owner */}
      <div className="pt-4 border-t border-gray-50 dark:border-white/5 flex items-center justify-between text-[11px] font-medium">
        <div className="flex items-center gap-1.5 text-gray-400">
          <Calendar className="w-3.5 h-3.5" />
          <span>{item.createdAt}</span>
        </div>
        <span className="text-gray-400">Owner #{item.user_id || "Unassigned"}</span>
      </div>
    </div>
  );
}

