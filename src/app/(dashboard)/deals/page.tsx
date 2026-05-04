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
import KanbanBoard from "@/components/ui/dealskanban/kanbanBoard";
import { useEffect, useState, useMemo } from "react";
import { CardSkeleton } from "@/components/ui/loaders/CardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";


export default function DealsPage() {
  const [isInitialLoading, setIsInitialLoading] = useState(true);
  const { deals } = useSelector((state: RootState) => state.deals);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const stats = useMemo(() => {
    const totalPipeline = deals.reduce((acc, d) => acc + (d.value || 0), 0);
    const activeDeals = deals.filter(d => d.status !== "WON" && d.status !== "LOST").length;
    const wonDeals = deals.filter(d => d.status === "WON").length;
    const winRate = deals.length > 0 ? ((wonDeals / deals.length) * 100).toFixed(0) : "0";
    
    const closingThisMonth = deals.filter(d => {
      if (!d.createdAt) return false;
      const date = new Date(d.createdAt);
      const now = new Date();
      return date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear();
    }).length;

    const newThisWeek = deals.filter(d => {
      if (!d.createdAt) return false;
      const date = new Date(d.createdAt);
      const now = new Date();
      return (now.getTime() - date.getTime()) / (1000 * 3600 * 24) <= 7;
    }).length;

    const formatCurrency = (val: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(val);

    return [
      { title: "Total Pipeline Value", value: formatCurrency(totalPipeline), change: "Cumulative value", icon: DollarSign },
      { title: "Active Deals", value: activeDeals.toString(), change: `+${newThisWeek} new this week`, icon: TrendingUp },
      { title: "Win Rate", value: `${winRate}%`, change: "Won vs Total", icon: Percent },
      { title: "Closing This Month", value: closingThisMonth.toString(), change: "Expected this cycle", icon: Calendar },
    ];
  }, [deals]);

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
        </div>

        {/* Deals List */}
        <div className="">
          <KanbanBoard />
        </div>
      </div>
    </div>
  );
}

