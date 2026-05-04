"use client";

import { Building2, Pencil } from "lucide-react";
import { Deal } from "@/redux/slice/deals/deals";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { CardBadge, CardIconButton, CardLabel, CardWrapper } from "../KanbanCardUI";
import Link from "next/link";
import { users } from "@/constants/users";

export default function DealCard({
  item,
  statusColor,
  onEdit,
}: {
  item: Deal;
  statusColor?: string;
  onEdit?: (deal: Deal) => void;
}) {
  const { customers } = useSelector((state: RootState) => state.customers);
  const customer = customers.find((c) => c.id === item.customer_id);
  const owner = users.find((u) => u.id == item.user_id);

  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id.toString(),
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderColor: statusColor ? `${statusColor}80` : undefined,
  };

  // Format currency
  const formatValue = (val: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
      maximumFractionDigits: 0,
    }).format(val);
  };

  return (
    <CardWrapper
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      {/* Header: Title and Actions */}
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight pr-4">
          {item.deal_title}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link href={`/deals/edit/${item.id}`}>
            <CardIconButton
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Pencil size={14} />
            </CardIconButton>
          </Link>
        </div>
      </div>

      {/* Main Info Sections */}
      <div className="space-y-4 mb-6">
        {/* Company/Organization */}
        <div>
          <CardLabel>Company</CardLabel>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Building2 className="w-3.5 h-3.5 opacity-70" />
            <span className="text-sm font-medium truncate">
              {customer?.company_name || "Unknown Company"}
            </span>
          </div>
        </div>

        {/* Contact Person */}
        <div>
          <CardLabel>Contact Info</CardLabel>
          <div className="flex flex-col gap-1">
            <span className="text-[13px] font-semibold text-gray-800 dark:text-gray-200">
              {customer?.contact_person_name || "N/A"}
            </span>
            {customer?.job_title && (
              <span className="text-[10px] font-bold text-blue-500/80 uppercase tracking-widest">
                {customer.job_title}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Footer: Value and Status */}
      <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <CardLabel className="mb-0">Value</CardLabel>
          <div className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            {formatValue(item.value)}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <CardBadge className="bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-100 dark:border-emerald-500/20 uppercase">
            {item.status}
          </CardBadge>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
            <span>{item.createdAt}</span>
          </div>
        </div>
      </div>

      <div className="mt-3 text-[10px] text-gray-400 dark:text-white/30 font-bold uppercase tracking-widest flex items-center gap-1.5">
        <div className="w-1 h-1 rounded-full bg-blue-500" />
        {owner?.name || `Owner #${item.user_id || "0"}`}
      </div>
    </CardWrapper>
  );
}




