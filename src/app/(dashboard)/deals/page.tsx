"use client";

import { 
  Plus, 
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import KanbanBoard from "@/components/ui/dealskanban/kanbanBoard";
import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/ui/loaders/CardSkeleton";

export default function DealsPage() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = [
    { title: "Total Pipeline Value", value: "$425,000", change: "+12% from last month", icon: DollarSign },
    { title: "Active Deals", value: "3", change: "+3 new this week", icon: TrendingUp },
    { title: "Avg. Probability", value: "60%", change: "+5% from last month", icon: Percent },
    { title: "This Month", value: "5", change: "deals closing", icon: Calendar },
  ];

  if (isInitialLoading) {
    return (
      <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Deals</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage your sales pipeline and opportunities</p>
          </div>
          <div className="h-10 w-28 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Deals</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage your sales pipeline and opportunities</p>
        </div>
        <Button asChild variant="primary">
          <Link href="/deals/add" className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
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

      {/* All Deals Section */}
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">All Deals</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Track and manage your sales opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput 
              placeholder="Search deals..." 
              className="md:w-64"
            />
          </div>
        </div>

        {/* Deals List */}
        <div className="">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}
