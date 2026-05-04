"use client";

import { Lead, updateLeadStatus } from "@/redux/slice/leads/leads";
import { RootState } from "@/redux/store/store";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { ArrowLeftRight, Building2, Pencil } from "lucide-react";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { CardBadge, CardIconButton, CardLabel, CardWrapper } from "../KanbanCardUI";
import { addNewDeal } from "@/redux/slice/deals/deals";

export default function LeadCard({
  item,
  statusColor,
  onEdit,
}: {
  item: Lead;
  statusColor: string;
  onEdit?: (lead: Lead) => void;
}) {

  const dispatch = useDispatch()
  const handleConvert = (lead: Lead) => {
    if(lead.status === "CONVERTED") return;
      const newDeal = {
      id: Date.now(),
      deal_title: lead.lead_title || "New Deal",
      value: lead.expected_value,

      status: "NEW",

      customer_id: lead.customer_id, 
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      description: lead.description || ""
    };


    dispatch(addNewDeal(newDeal));
    dispatch(updateLeadStatus({
      id: lead.id,
      status: "CONVERTED"
    }));
  }

  const { customers } = useSelector((state: RootState) => state.customers);
  const customer = customers.find((c) => c.id === item.customer_id);

  // kanban
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: item.id.toString(),
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    borderColor: statusColor ? `${statusColor}80` : undefined,
  };

  const formattedValue = item.expected_value
    ? new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(item.expected_value)
    : "$0";

  return (
    <CardWrapper
      ref={setNodeRef}
      style={style}
      isDragging={isDragging}
      {...attributes}
      {...listeners}
    >
      <div className="flex items-start justify-between mb-4">
        <h3 className="font-bold text-[15px] text-gray-900 dark:text-white leading-tight pr-4">
          {item.lead_title}
        </h3>
        <div className="flex items-center gap-1 flex-shrink-0">
          <Link href={`/leads/edit/${item.id}`}>
            <CardIconButton
              onClick={(e) => {
                e.stopPropagation();
                onEdit?.(item);
              }}
              onPointerDown={(e) => e.stopPropagation()}
              onMouseDown={(e) => e.stopPropagation()}
            >
              <Pencil size={14} />
            </CardIconButton>
          </Link>
          <div  onPointerDown={(e) => 
            {
              e.stopPropagation();
              handleConvert(item)
            }
            } className="relative group/tooltip">
            <CardIconButton >
              <ArrowLeftRight size={14} />
            </CardIconButton>
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-2 py-1 bg-gray-900 dark:bg-black text-white text-[10px] font-bold uppercase tracking-widest rounded border border-white/10 opacity-0 group-hover/tooltip:opacity-100 transition-opacity whitespace-nowrap z-[110] shadow-xl">
              Convert to deal
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4 mb-6">
        <div>
          <CardLabel>Company</CardLabel>
          <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400">
            <Building2 className="w-3.5 h-3.5 opacity-70" />
            <span className="text-sm font-medium truncate">
              {customer?.company_name || "Unknown"}
            </span>
          </div>
        </div>

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

      <div className="mt-auto pt-4 border-t border-gray-50 dark:border-white/5 flex items-end justify-between">
        <div className="flex flex-col gap-0.5">
          <CardLabel className="mb-0">Expected</CardLabel>
          <div className="text-lg font-black tracking-tight text-gray-900 dark:text-white">
            {formattedValue}
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <CardBadge className="bg-blue-50 dark:bg-blue-500/10 text-blue-600 dark:text-blue-400 border-blue-100 dark:border-blue-500/20">
            {item.source}
          </CardBadge>
          <div className="flex items-center gap-1.5 text-[10px] text-gray-400 font-medium">
            <span>{item.createdAt}</span>
          </div>
        </div>
      </div>
      
      <div className="mt-3 text-[10px] text-gray-300 dark:text-gray-600 font-bold uppercase tracking-tighter">
        Owner #{item.user_id || "0"}
      </div>
    </CardWrapper>
  );
}

