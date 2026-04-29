"use client";

import React from "react";
import { ChevronLeft, Save, FileText, Layout, Info, Calendar as CalendarIcon, User as UserIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddDeal } from "@/hooks/use-add-deal";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function AddDealPage() {
  const router = useRouter();
  const { formData, handleChange, handleSave } = useAddDeal();

  const onSave = () => {
    handleSave();
    router.push("/deals");
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in duration-500 pb-12 space-y-8">
      {/* Header with Glassmorphism Back Button */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 hover:border-gray-300 dark:hover:border-white/20 transition-all text-gray-500 dark:text-white/40 hover:text-gray-900 dark:hover:text-white group"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create New Deal</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1 font-medium">Add a new opportunity to your sales pipeline</p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="secondary" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button onClick={onSave} variant="primary" className="gap-2 shadow-lg shadow-violet-500/20">
            <Save size={18} />
            <span>Save Deal</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Section */}
        <div className="lg:col-span-2 space-y-8">
          {/* Basic Information Card */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-3xl -mr-32 -mt-32 rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500">
                  <Info size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white">Basic Information</h2>
              </div>

              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Deal Title</label>
                  <input 
                    type="text" 
                    name="title"
                    placeholder="e.g. Enterprise Software License"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Company</label>
                    <input 
                      type="text" 
                      name="company"
                      placeholder="Company name"
                      value={formData.company}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Value ($)</label>
                    <input 
                      type="number" 
                      name="value"
                      placeholder="0.00"
                      value={formData.value}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Pipeline Stage</label>
                    <select 
                      name="stage"
                      value={formData.stage}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all appearance-none cursor-pointer"
                    >
                      <option value="">Select stage</option>
                      <option value="prospect">Prospect</option>
                      <option value="negotiation">Negotiation</option>
                      <option value="won">Won</option>
                      <option value="lost">Lost</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Probability (%)</label>
                    <input 
                      type="number" 
                      name="probability"
                      placeholder="50"
                      value={formData.probability}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1">Description</label>
                  <textarea 
                    name="description"
                    placeholder="Enter deal notes and details..."
                    value={formData.description}
                    onChange={handleChange}
                    rows={4}
                    className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/40 transition-all resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Timeline & Contacts Card */}
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-8 border border-gray-200 dark:border-white/5 shadow-sm">
            <div className="flex items-center gap-3 mb-8">
              <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500">
                <Layout size={20} />
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Timeline & Contacts</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <CalendarIcon size={12} /> Expected Close Date
                </label>
                <input 
                  type="date" 
                  name="closeDate"
                  value={formData.closeDate}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] font-black text-gray-400 uppercase tracking-widest ml-1 flex items-center gap-2">
                  <UserIcon size={12} /> Primary Contact
                </label>
                <input 
                  type="text" 
                  name="contact"
                  placeholder="Contact person name"
                  value={formData.contact}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-blue-500/20 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <div className="bg-white dark:bg-[#1c1c1f] rounded-3xl p-6 border border-gray-200 dark:border-white/5 shadow-sm">
            <h3 className="text-sm font-bold text-gray-900 dark:text-white mb-6 uppercase tracking-widest">Configuration</h3>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest ml-1">Deal Owner</label>
                <select 
                  name="owner"
                  value={formData.owner}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select owner</option>
                  <option value="john">Ahmed Hassan</option>
                  <option value="sarah">Sarah Johnson</option>
                </select>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-violet-600 to-indigo-700 rounded-3xl p-6 text-white shadow-xl shadow-violet-500/20">
            <h3 className="font-bold mb-2">Pro Tip</h3>
            <p className="text-xs text-white/70 leading-relaxed">
              Deals with detailed descriptions and realistic close dates are 40% more likely to close successfully.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
