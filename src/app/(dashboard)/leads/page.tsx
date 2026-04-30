"use client";

import { 
  Plus, 
  Target,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import KanbanBoard from "@/components/ui/leadskanban/kanbanBoard";
import { SearchInput } from "@/components/ui/search-input";

export default function LeadsPage() {

  const stats = [
    { title: "Total Leads", value: "3", change: "+8 new this week", icon: Target },
    { title: "Qualified Leads", value: "1", change: "+2 from last week", icon: TrendingUp },
    { title: "Avg. Lead Score", value: "84", change: "+3 points this month", icon: Star },
    { title: "Conversion Rate", value: "24%", change: "+2% from last month", icon: Users },
  ];

  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Leads</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage your potential customers and prospects</p>
        </div>
        <Button asChild variant="primary">
          <Link href={"leads/add"} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
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

      {/* All Leads Section */}
      <div className="">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">All Leads</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Track and manage your sales opportunities</p>
          </div>
          <div className="flex items-center gap-3">
            <SearchInput 
              placeholder="Search leads..." 
              className="md:w-64"
            />
          </div>
        </div>
        <KanbanBoard />
      </div>
    </div>
  );
}
