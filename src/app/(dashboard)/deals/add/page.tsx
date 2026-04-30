"use client";

import React from "react";
import { ChevronLeft, Save, Target, DollarSign, Users, Info, Calendar as CalendarIcon, Globe, ArrowRightLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";

export default function AddDealPage() {
  const router = useRouter();

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 hover:border-violet-500/50 transition-all text-gray-500 dark:text-white/40 hover:text-violet-500 group shadow-sm"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create New Deal</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1 font-medium">Add a new opportunity to your sales pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button 
            variant="secondary" 
            onClick={() => router.back()}
            className="rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
          >
            Cancel
          </Button>
          <Button 
            className="rounded-xl gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 px-6"
          >
            <Save size={18} />
            <span>Save Deal</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-3xl -mr-32 -mt-32 rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shadow-inner">
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Deal Information</h2>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                    Deal Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    placeholder="e.g. Website Project"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all shadow-sm"
                  />
                </div>

                {/* Customer */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                    Customer / Account <span className="text-red-500">*</span>
                  </label>
                  <select 
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="">Select Customer</option>
                  </select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Value */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <DollarSign size={12}/> Value ($)
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                      <input 
                        type="number" 
                        placeholder="10000"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl pl-10 pr-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Probability */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <ArrowRightLeft size={12}/> Probability (%)
                    </label>
                    <input 
                      type="number" 
                      placeholder="50"
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all shadow-sm"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Status */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">Status</label>
                    <select 
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="pending">Pending</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>

                  {/* Close Date */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <CalendarIcon size={12}/> Expected Close Date
                    </label>
                    <input 
                      type="date" 
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all shadow-sm"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Description Card */}
          <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm">
             <div className="flex items-center gap-3 mb-8">
                <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                  <Info size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Additional Information</h2>
              </div>
              
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                  Description / Deal Notes
                </label>
                <textarea 
                  rows={5}
                  placeholder="Client wants full website..."
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all resize-none shadow-sm"
                />
              </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                <Users size={20} />
              </div>
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Ownership & Source</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">Assigned User</label>
                <select 
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select User</option>
                  <option value="1">Ahmed Hassan</option>
                  <option value="2">Sarah Johnson</option>
                  <option value="3">John Smith</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <Globe size={12}/> Source
                </label>
                <select 
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="lead">Lead</option>
                  <option value="referral">Referral</option>
                  <option value="website">Website</option>
                  <option value="cold_call">Cold Call</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
