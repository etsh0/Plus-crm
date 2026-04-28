"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  DollarSign,
  TrendingUp,
  Percent,
  Calendar,
} from "lucide-react";
import Link from "next/link";

export default function DealsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { title: "Total Pipeline Value", value: "$425,000", change: "+12% from last month", icon: DollarSign },
    { title: "Active Deals", value: "3", change: "+3 new this week", icon: TrendingUp },
    { title: "Avg. Probability", value: "60%", change: "+5% from last month", icon: Percent },
    { title: "This Month", value: "5", change: "deals closing", icon: Calendar },
  ];

  const deals = [
    {
      id: 1,
      title: "Enterprise Software License",
      company: "TechCorp Inc.",
      stage: "Negotiation",
      probability: "80%",
      closeDate: "1/15/2024",
      value: "$150,000",
      owner: "John Smith",
      initials: "JS"
    },
    {
      id: 2,
      title: "Marketing Automation Setup",
      company: "StartupXYZ",
      stage: "Proposal",
      probability: "60%",
      closeDate: "1/20/2024",
      value: "$75,000",
      owner: "Sarah Johnson",
      initials: "SJ"
    }
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
          <Link 
            href="/deals/add" 
            className="flex items-center gap-2 px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]"
          >
            <Plus className="w-4 h-4" />
            <span>New Deal</span>
          </Link>
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
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search deals..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full md:w-64 bg-[#18181b] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#18181b] hover:bg-[#27272a] border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
          </div>
        </div>

        {/* Deals List */}
        <div className="flex flex-col gap-4">
          {deals.map((deal) => (
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
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      deal.stage === 'Negotiation' 
                        ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]' 
                        : 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]'
                    }`}>
                      {deal.stage}
                    </span>
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
