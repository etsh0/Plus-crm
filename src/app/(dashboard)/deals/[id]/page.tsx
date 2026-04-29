"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  Building2, 
  User, 
  Calendar, 
  DollarSign, 
  TrendingUp, 
  Mail, 
  Phone,
  MoreVertical,
  Pencil,
  Share2,
  Trash2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function DealDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  // Mock data for the deal
  const deal = {
    id: id,
    title: "Project Alpha Expansion",
    company: "TechCorp Solutions",
    contact: "Tarek Samir",
    role: "CEO",
    email: "tarek@techcorp.com",
    phone: "+20 123 456 7890",
    value: 75000,
    status: "negotiation",
    probability: 65,
    closeDate: "June 15, 2026",
    owner: "Ahmed Hassan",
    description: "Expansion of the existing cloud infrastructure to support the new APAC region operations. This deal includes 24/7 premium support and customized security protocols.",
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "prospect": return "blue";
      case "negotiation": return "purple";
      case "won": return "amber";
      case "lost": return "emerald";
      default: return "gray";
    }
  };

  const statusColor = getStatusColorClass(deal.status);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      {/* Back Button and Top Actions */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 group-hover:border-gray-300 dark:group-hover:border-white/20">
            <ChevronLeft size={20} />
          </div>
          <span className="font-semibold text-sm">Back to Pipeline</span>
        </button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Share2 size={16} />
            <span className="hidden sm:inline">Share</span>
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => router.push(`/deals/edit/${id}`)}>
            <Pencil size={16} />
            <span className="hidden sm:inline">Edit</span>
          </Button>
          <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/5 hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm overflow-hidden relative group">
            {/* Background Decoration */}
            <div className={cn("absolute top-0 right-0 w-64 h-64 blur-3xl -mr-32 -mt-32 rounded-full", `bg-${statusColor}-500/10`)} />
            
            <div className="relative z-10">
              <div className="flex items-center gap-3 mb-6">
                <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", 
                  deal.status === "prospect" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                  deal.status === "negotiation" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                  deal.status === "won" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                  deal.status === "lost" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                )}>
                  {deal.status}
                </span>
                <span className="text-gray-400 dark:text-white/20">·</span>
                <span className="text-sm font-medium text-gray-500 dark:text-white/40">Deal ID: #{deal.id}</span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4 tracking-tight leading-tight">
                {deal.title}
              </h1>

              <div className="flex flex-wrap items-center gap-6 mt-8 pt-8 border-t border-gray-100 dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Deal Value</p>
                  <p className="text-2xl font-black text-gray-900 dark:text-white">${deal.value.toLocaleString()}</p>
                </div>
                <div className="w-px h-10 bg-gray-100 dark:bg-white/5 hidden sm:block" />
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Probability</p>
                  <div className="flex items-center gap-3">
                    <p className={cn("text-2xl font-black", `text-${statusColor}-500`)}>{deal.probability}%</p>
                    <div className="w-24 h-2 bg-gray-100 dark:bg-white/5 rounded-full overflow-hidden">
                      <div className={cn("h-full rounded-full", `bg-${statusColor}-500`)} style={{ width: `${deal.probability}%` }} />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description & Insights */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Deal Overview</h2>
            <p className="text-gray-600 dark:text-white/60 leading-relaxed">
              {deal.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
              <div className={cn("p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 group transition-all", `hover:border-${statusColor}-500/30`)}>
                <div className="flex items-center gap-4">
                  <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center", `bg-${statusColor}-500/10 text-${statusColor}-500`)}>
                    <TrendingUp size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Last Update</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">Probability increased by 15%</p>
                  </div>
                </div>
              </div>
              <div className="p-5 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 group hover:border-blue-500/30 transition-all">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                    <Calendar size={24} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Expected Close</p>
                    <p className="text-sm font-semibold text-gray-900 dark:text-white">{deal.closeDate}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Key Contact</h3>
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-500 to-indigo-500 flex items-center justify-center text-white font-bold text-lg">
                  {deal.contact.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <p className="font-bold text-gray-900 dark:text-white">{deal.contact}</p>
                  <p className="text-xs text-gray-500 dark:text-white/40 font-medium">{deal.role}</p>
                </div>
              </div>

              <div className="space-y-3">
                <a href={`mailto:${deal.email}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <Mail size={18} className="text-gray-400 group-hover:text-blue-500" />
                  <span className="text-sm text-gray-600 dark:text-white/70">{deal.email}</span>
                </a>
                <a href={`tel:${deal.phone}`} className="flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group">
                  <Phone size={18} className="text-gray-400 group-hover:text-green-500" />
                  <span className="text-sm text-gray-600 dark:text-white/70">{deal.phone}</span>
                </a>
                <div className="flex items-center gap-3 p-3 rounded-xl">
                  <Building2 size={18} className="text-gray-400" />
                  <span className="text-sm text-gray-600 dark:text-white/70">{deal.company}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Deal Owner */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Deal Owner</h3>
            <div className="flex items-center gap-4 p-2">
              <div className="w-10 h-10 rounded-full bg-violet-500/10 flex items-center justify-center text-violet-500 font-bold">
                AH
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900 dark:text-white">{deal.owner}</p>
                <p className="text-[10px] text-gray-500 uppercase font-black tracking-tighter">Administrator</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
