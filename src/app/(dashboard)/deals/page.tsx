"use client";

import React from "react";
import { 
  Plus, 
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { useDeals, Deal } from "@/hooks/use-deals";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/ui/status-badge";
import { initialDeals } from "@/constants/mock-data";

export default function DealsPage() {
  const { searchQuery, setSearchQuery, filteredDeals } = useDeals(initialDeals);

  const stats = [
    { title: "Total Pipeline Value", value: "$425,000", change: "+12% from last month", icon: DollarSign },
    { title: "Active Deals", value: "3", change: "+3 new this week", icon: TrendingUp },
    { title: "Avg. Probability", value: "60%", change: "+5% from last month", icon: Percent },
    { title: "This Month", value: "5", change: "deals closing", icon: Calendar },
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Title and Action */}
      <div className="mb-8">
        <div className="flex items-end justify-between border-b border-white/[0.08] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Deals</h1>
            <p className="text-white/40 text-sm mt-2">Manage your sales pipeline and opportunities</p>
          </div>
          <Button asChild variant="primary">
            <Link href="/deals/add" className="flex items-center gap-2">
              <Plus className="w-4 h-4" />
              <span>New Deal</span>
            </Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white/2 border border-white/[0.08] rounded-xl p-6 shadow-xl flex flex-col justify-between hover:bg-white/5 transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-white/70 group-hover:text-white transition-colors">{stat.title}</span>
              <stat.icon className="w-4 h-4 text-white/30 group-hover:text-white/60 transition-colors" />
            </div>
            <div>
              <div className="text-3xl font-bold text-white mb-2 tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-white/40 group-hover:text-white/50 transition-colors">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* All Deals Section */}
      <div className="bg-white/2 border border-white/[0.08] rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">All Deals</h2>
            <p className="text-sm text-white/40 mt-1">Track and manage your sales opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput 
              placeholder="Search deals..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-64"
            />
            <Button variant="secondary">
              Filter
            </Button>
          </div>
        </div>

        {/* Deals List */}
        <div className="flex flex-col gap-4">
          {filteredDeals.map((deal) => (
            <div key={deal.id} className="bg-[#18181b]/50 hover:bg-[#18181b] border border-white/[0.04] hover:border-white/10 rounded-xl p-6 transition-all group flex flex-col md:flex-row justify-between md:items-center gap-6">
              
              <div className="flex items-start md:items-center gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-base font-bold text-white group-hover:text-[#a855f7] transition-colors">{deal.title}</span>
                  </div>
                  <div className="text-sm text-white/60 font-medium">
                    {deal.company}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/40">
                    <StatusBadge status={deal.stage} />
                    <span className="flex items-center gap-1"><span className="text-white/30">{deal.probability}</span> probability</span>
                    <span className="flex items-center gap-1"><span className="text-white/30">Close:</span> {deal.closeDate}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center justify-between md:flex-row md:items-center gap-6 pt-4 md:pt-0 border-t border-white/5 md:border-t-0 mt-2 md:mt-0">
                <div className="text-xl font-bold tracking-tight text-white drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]">
                  {deal.value}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white text-sm font-bold shadow-inner">
                    {deal.initials}
                  </div>
                  <div className="text-sm font-bold text-white/80 group-hover:text-white transition-colors hidden sm:block">{deal.owner}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
