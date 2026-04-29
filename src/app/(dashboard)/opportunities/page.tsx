"use client";

import React from "react";
import { 
  Plus, 
  Target,
  DollarSign,
  TrendingUp,
  Award
} from "lucide-react";
import Link from "next/link";
import { useOpportunities, Opportunity } from "@/hooks/use-opportunities";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { StatusBadge } from "@/components/ui/status-badge";
import { initialOpportunities } from "@/constants/mock-data";

export default function OpportunitiesPage() {
  const { searchQuery, setSearchQuery, filteredOpportunities } = useOpportunities(initialOpportunities);

  const stats = [
    { title: "Total Opportunities", value: "24", change: "+4 this week", icon: Target },
    { title: "Expected Value", value: "$850,000", change: "+15% from last month", icon: DollarSign },
    { title: "Active Opportunities", value: "18", change: "Across all stages", icon: TrendingUp },
    { title: "Win Rate", value: "32%", change: "+2.4% from last month", icon: Award },
  ];

  return (
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Opportunities</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage and track your potential business opportunities</p>
        </div>
        <Button asChild variant="primary">
          <Link href="/opportunities/add" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Opportunity</span>
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all group">
            <div className="flex items-center justify-between mb-4">
              <span className="text-sm font-semibold text-gray-600 dark:text-white/70 group-hover:text-gray-900 dark:group-hover:text-white transition-colors">{stat.title}</span>
              <stat.icon className="w-4 h-4 text-gray-400 dark:text-white/30 group-hover:text-gray-600 dark:group-hover:text-white/60 transition-colors" />
            </div>
            <div>
              <div className="text-3xl font-bold text-gray-900 dark:text-white mb-1 tracking-tight">{stat.value}</div>
              <div className="text-xs font-medium text-gray-400 dark:text-white/40 group-hover:text-gray-500 dark:group-hover:text-white/50 transition-colors">{stat.change}</div>
            </div>
          </div>
        ))}
      </div>

      {/* All Opportunities Section */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl shadow-sm p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">All Opportunities</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Track your business pipeline</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput 
              placeholder="Search opportunities..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="md:w-64"
            />
            <Button variant="secondary">
              Filter
            </Button>
          </div>
        </div>

        {/* Opportunities List */}
        <div className="flex flex-col gap-4">
          {filteredOpportunities.map((opp) => (
            <div key={opp.id} className="bg-gray-50/50 dark:bg-[#18181b]/50 hover:bg-gray-50 dark:hover:bg-[#18181b] border border-gray-100 dark:border-white/[0.04] hover:border-gray-200 dark:hover:border-white/10 rounded-xl p-6 transition-all group flex flex-col md:flex-row justify-between md:items-center gap-6">
              
              <div className="flex items-start md:items-center gap-5">
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-base font-bold text-gray-900 dark:text-white group-hover:text-violet-600 dark:group-hover:text-[#a855f7] transition-colors">{opp.title}</span>
                  </div>
                  <div className="text-sm text-gray-600 dark:text-white/60 font-medium">
                    {opp.customer}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-gray-400 dark:text-white/40">
                    <StatusBadge status={opp.status} />
                    <span className="flex items-center gap-1"><span className="text-gray-400 dark:text-white/30">Source:</span> {opp.source}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center justify-between md:flex-row md:items-center gap-6 pt-4 md:pt-0 border-t border-gray-100 dark:border-white/5 md:border-t-0 mt-2 md:mt-0">
                <div className="text-xl font-bold tracking-tight text-emerald-600 dark:text-emerald-400">
                  {opp.expectedValue}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 flex items-center justify-center text-gray-900 dark:text-white text-sm font-bold shadow-sm">
                    {opp.initials}
                  </div>
                  <div className="text-sm font-bold text-gray-600 dark:text-white/80 group-hover:text-gray-900 dark:group-hover:text-white transition-colors hidden sm:block">{opp.assignedUser}</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
