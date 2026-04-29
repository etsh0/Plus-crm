"use client";

import React from "react";
import { useParams, useRouter } from "next/navigation";
import { 
  ChevronLeft, 
  User, 
  Mail, 
  Phone, 
  Globe, 
  MapPin,
  Calendar,
  Zap,
  Target,
  MessageSquare,
  Share2,
  Pencil,
  Trash2,
  Building2
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function LeadDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  // Mock data for the lead
  const lead = {
    id: id,
    name: "Ahmed Lead",
    email: "ahmed.contact@example.com",
    phone: "+20 100 200 3000",
    company: "Future Horizons Inc.",
    role: "Marketing Director",
    status: "new",
    source: "Website Form",
    created: "Jan 15, 2026",
    score: 85,
    location: "Cairo, Egypt",
    website: "www.future-horizons.com",
    owner: "Ahmed Hassan",
    description: "Interested in our enterprise CRM solutions for their sales team of 50+. Primary focus on lead scoring and automated follow-ups.",
  };

  const getStatusColorClass = (status: string) => {
    switch (status) {
      case "new": return "blue";
      case "contacted": return "purple";
      case "qualified": return "amber";
      case "proposal": return "emerald";
      case "closed": return "rose";
      default: return "gray";
    }
  };

  const statusColor = getStatusColorClass(lead.status);

  return (
    <div className="space-y-8 animate-in fade-in duration-500 max-w-6xl mx-auto pb-12">
      {/* Top Navigation */}
      <div className="flex items-center justify-between">
        <button 
          onClick={() => router.back()}
          className="flex items-center gap-2 text-gray-500 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors group"
        >
          <div className="p-2 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 group-hover:border-gray-300 dark:group-hover:border-white/20">
            <ChevronLeft size={20} />
          </div>
          <span className="font-semibold text-sm">Back to Leads</span>
        </button>

        <div className="flex items-center gap-3">
          <Button variant="secondary" className="gap-2">
            <Share2 size={16} />
          </Button>
          <Button variant="secondary" className="gap-2" onClick={() => router.push(`/leads/edit/${id}`)}>
            <Pencil size={16} />
            <span className="hidden sm:inline">Edit Lead</span>
          </Button>
          <Button variant="outline" className="text-red-500 border-red-500/20 hover:bg-red-500/5 hover:text-red-600">
            <Trash2 size={16} />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          {/* Main Info Card */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden">
            <div className={cn("absolute top-0 right-0 w-64 h-64 blur-3xl -mr-32 -mt-32 rounded-full", `bg-${statusColor}-500/5`)} />
            
            <div className="relative z-10">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
                <div className="flex items-center gap-6">
                  <div className={cn("w-20 h-20 rounded-3xl flex items-center justify-center text-white text-2xl font-bold shadow-xl", 
                    statusColor === "blue" ? "bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-blue-500/20" :
                    statusColor === "purple" ? "bg-gradient-to-tr from-purple-600 to-fuchsia-500 shadow-purple-500/20" :
                    statusColor === "amber" ? "bg-gradient-to-tr from-amber-500 to-orange-400 shadow-amber-500/20" :
                    statusColor === "emerald" ? "bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-emerald-500/20" :
                    statusColor === "rose" ? "bg-gradient-to-tr from-rose-500 to-pink-400 shadow-rose-500/20" : "bg-gray-500 shadow-gray-500/20"
                  )}>
                    {lead.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">{lead.name}</h1>
                    <div className="flex items-center gap-3">
                      <span className={cn("px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border", 
                        lead.status === "new" ? "bg-blue-500/10 text-blue-500 border-blue-500/20" :
                        lead.status === "contacted" ? "bg-purple-500/10 text-purple-500 border-purple-500/20" :
                        lead.status === "qualified" ? "bg-amber-500/10 text-amber-500 border-amber-500/20" :
                        lead.status === "proposal" ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" :
                        lead.status === "closed" ? "bg-rose-500/10 text-rose-500 border-rose-500/20" : "bg-gray-500/10 text-gray-500 border-gray-500/20"
                      )}>
                        {lead.status}
                      </span>
                      <span className="text-gray-300 dark:text-white/10">|</span>
                      <p className="text-sm font-medium text-gray-500 dark:text-white/40">{lead.role} at {lead.company}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-50 dark:bg-white/5 p-4 rounded-2xl border border-gray-100 dark:border-white/5 text-center min-w-32">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lead Score</p>
                  <p className={cn("text-3xl font-black", `text-${statusColor}-500`)}>{lead.score}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 pt-8 border-t border-gray-100 dark:border-white/5">
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Mail size={12} /> Email
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.email}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <Phone size={12} /> Phone
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.phone}</p>
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2 flex items-center gap-2">
                    <MapPin size={12} /> Location
                  </p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.location}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Description */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Additional Information</h2>
              <div className="flex items-center gap-2 text-xs font-medium text-gray-400">
                <Calendar size={14} />
                Created on {lead.created}
              </div>
            </div>
            
            <p className="text-gray-600 dark:text-white/60 leading-relaxed mb-10">
              {lead.description}
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-orange-500/10 flex items-center justify-center text-orange-500">
                  <Target size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Lead Source</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.source}</p>
                </div>
              </div>
              <div className="p-6 rounded-2xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-indigo-500/10 flex items-center justify-center text-indigo-500">
                  <Globe size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">Website</p>
                  <p className="text-sm font-semibold text-gray-900 dark:text-white">{lead.website}</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Quick Connect */}
          <div className={cn("rounded-3xl p-6 text-white shadow-xl", 
            statusColor === "blue" ? "bg-gradient-to-br from-blue-600 to-indigo-700 shadow-blue-500/20" :
            statusColor === "purple" ? "bg-gradient-to-br from-purple-600 to-violet-700 shadow-purple-500/20" :
            statusColor === "amber" ? "bg-gradient-to-br from-amber-500 to-orange-600 shadow-amber-500/20" :
            statusColor === "emerald" ? "bg-gradient-to-br from-emerald-500 to-teal-600 shadow-emerald-500/20" :
            statusColor === "rose" ? "bg-gradient-to-br from-rose-500 to-pink-600 shadow-rose-500/20" : "bg-gray-700 shadow-gray-500/20"
          )}>
            <h3 className="font-bold mb-6 flex items-center gap-2">
              <Zap size={18} /> Quick Connect
            </h3>
            <div className="space-y-3">
              <Button className={cn("w-full bg-white hover:bg-blue-50 border-none font-bold py-6", `text-${statusColor}-600`)}>
                Send Email
              </Button>
              <Button variant="outline" className="w-full border-white/20 hover:bg-white/10 text-white font-bold py-6">
                Schedule Meeting
              </Button>
            </div>
          </div>

          {/* Lead Details Stats */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Internal Details</h3>
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <User size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 font-medium">Owner</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">{lead.owner}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <Building2 size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 font-medium">Company</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white text-right truncate max-w-24">{lead.company}</span>
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <MessageSquare size={16} className="text-gray-400" />
                  <span className="text-sm text-gray-500 font-medium">Last Contact</span>
                </div>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Yesterday</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
