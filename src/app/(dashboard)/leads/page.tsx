"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  Target,
  TrendingUp,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");

  const stats = [
    { title: "Total Leads", value: "3", change: "+8 new this week", icon: Target },
    { title: "Qualified Leads", value: "1", change: "+2 from last week", icon: TrendingUp },
    { title: "Avg. Lead Score", value: "84", change: "+3 points this month", icon: Star },
    { title: "Conversion Rate", value: "24%", change: "+2% from last month", icon: Users },
  ];

  const leads = [
    {
      id: 1,
      name: "Alice Johnson",
      email: "alice@example.com",
      company: "Tech Solutions Inc.",
      status: "New",
      source: "Website",
      created: "1/10/2024",
      score: 85,
      owner: "John Smith",
      initials: "AJ"
    },
    {
      id: 2,
      name: "Bob Wilson",
      email: "bob@startup.com",
      company: "Startup ABC",
      status: "Contacted",
      source: "LinkedIn",
      created: "1/8/2024",
      score: 72,
      owner: "Sarah Johnson",
      initials: "BW"
    }
  ];

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Title and Action */}
      <div className="mb-8">
        <div className="flex items-end justify-between border-b border-white/[0.08] pb-6">
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight">Leads</h1>
            <p className="text-white/40 text-sm mt-2">Manage your potential customers and prospects</p>
          </div>
          <Link href={"leads/add"} className="flex items-center gap-2 px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)] hover:shadow-[0_0_20px_rgba(168,85,247,0.6)]">
            <Plus className="w-4 h-4" />
            <span>New Lead</span>
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

      {/* All Leads Section */}
      <div className="bg-white/2 border border-white/[0.08] rounded-2xl shadow-2xl p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h2 className="text-xl font-bold text-white tracking-tight">All Leads</h2>
            <p className="text-sm text-white/40 mt-1">Track and manage your potential customers</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search leads..." 
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

        {/* Leads List */}
        <div className="flex flex-col gap-4">
          {leads.map((lead) => (
            <div key={lead.id} className="bg-[#18181b]/50 hover:bg-[#18181b] border border-white/[0.04] hover:border-white/10 rounded-xl p-6 transition-all group flex flex-col md:flex-row justify-between md:items-center gap-6">
              
              <div className="flex items-start md:items-center gap-5">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white font-bold shrink-0 text-lg shadow-inner">
                  {lead.initials}
                </div>
                
                {/* Info */}
                <div className="flex flex-col gap-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-1 md:gap-2">
                    <span className="text-base font-bold text-white group-hover:text-[#a855f7] transition-colors">{lead.name}</span>
                    <span className="text-sm text-white/50 hidden md:block">•</span>
                    <span className="text-sm text-white/50">{lead.email}</span>
                  </div>
                  <div className="text-sm text-white/60 font-medium">
                    {lead.company}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-3 mt-1 text-xs text-white/40">
                    <span className={`px-2.5 py-1 rounded-full font-bold uppercase tracking-wider text-[10px] ${
                      lead.status === 'New' 
                        ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20 shadow-[0_0_10px_rgba(59,130,246,0.1)]' 
                        : 'bg-amber-500/10 text-amber-400 border border-amber-500/20 shadow-[0_0_10px_rgba(245,158,11,0.1)]'
                    }`}>
                      {lead.status}
                    </span>
                    <span className="flex items-center gap-1"><span className="text-white/30">Source:</span> {lead.source}</span>
                    <span className="flex items-center gap-1"><span className="text-white/30">Created:</span> {lead.created}</span>
                  </div>
                </div>
              </div>

              {/* Right Side Info */}
              <div className="flex items-center justify-between md:flex-col md:items-end gap-3 md:gap-2 pt-4 md:pt-0 border-t border-white/5 md:border-t-0 mt-2 md:mt-0">
                <div className={`text-xl font-bold tracking-tight ${
                  lead.score >= 80 ? 'text-emerald-400 drop-shadow-[0_0_8px_rgba(52,211,153,0.4)]' : 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                }`}>
                  {lead.score}<span className="text-sm text-white/30 drop-shadow-none">/100</span>
                </div>
                <div className="text-right">
                  <div className="text-sm font-bold text-white group-hover:text-white/90 transition-colors">{lead.owner}</div>
                  <div className="text-[11px] font-semibold text-white/30 uppercase tracking-widest mt-0.5">Owner</div>
                </div>
              </div>

            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
