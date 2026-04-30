"use client";

import { useEffect, useRef } from "react";
import { ChevronLeft, Save, Target, DollarSign, Users, Info, ArrowRightLeft, Globe, Search, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { useAddLead } from "@/hooks/use-add-lead";
import { Button } from "@/components/ui/button";

export default function AddLeadPage() {
  const router = useRouter();
  const { formData, handleChange } = useAddLead();
  
  const dropdownRef = useRef<HTMLDivElement>(null);



  // Handle click outside dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);



  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12 space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="p-2.5 rounded-xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 hover:border-purple-500/50 transition-all text-gray-500 dark:text-white/40 hover:text-purple-500 group shadow-sm"
          >
            <ChevronLeft size={20} className="group-hover:-translate-x-0.5 transition-transform" />
          </button>
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create Opportunity</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1 font-medium">Capture and track a new sales lead</p>
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
            variant="outline" 
            className="rounded-xl gap-2 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
          >
            <ArrowRightLeft size={18} />
            <span>Convert to Deal</span>
          </Button>
          <Button 
            className="rounded-xl gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6"
          >
            <Save size={18} />
            <span>Save Opportunity</span>
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Form Content */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm space-y-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl -mr-32 -mt-32 rounded-full" />
            
            <div className="relative z-10 space-y-8">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner">
                  <Target size={20} />
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Opportunity Details</h2>
              </div>

              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-2">
                  <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                    Opportunity Title <span className="text-red-500">*</span>
                  </label>
                  <input 
                    type="text" 
                    name="title"
                    placeholder="e.g. Enterprise License Expansion"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all shadow-sm"
                  />
                </div>

                {/* Customer (Searchable Select) */}
                <div className="space-y-2 relative" ref={dropdownRef}>
                  <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                    Customer / Account <span className="text-red-500">*</span>
                  </label>
                  <div className="relative">
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                      <Search size={18} />
                    </div>
                    <input 
                      type="text" 
                      placeholder="Search customers..."
                      onChange={(e) => {

                      }}
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl pl-12 pr-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all shadow-sm"
                    />
                  </div>
                  

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Expected Value */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <DollarSign size={12}/> Expected Value
                    </label>
                    <div className="relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                      <input 
                        type="number" 
                        name="expected_value"
                        placeholder="0.00"
                        value={formData.expected_value}
                        onChange={handleChange}
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl pl-10 pr-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all shadow-sm"
                      />
                    </div>
                  </div>

                  {/* Source */}
                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                      <Globe size={12}/> Opportunity Source
                    </label>
                    <select 
                      name="source"
                      value={formData.source}
                      onChange={handleChange}
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                    >
                      <option value="">Select source</option>
                      <option value="Website">Website</option>
                      <option value="LinkedIn">LinkedIn</option>
                      <option value="Referral">Referral</option>
                      <option value="Cold Call">Cold Call</option>
                      <option value="Event">Event</option>
                    </select>
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
                  Description / Opportunity Notes
                </label>
                <textarea 
                  name="description"
                  rows={5}
                  placeholder="Describe the opportunity details, pain points, and next steps..."
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all resize-none shadow-sm"
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
              <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Ownership</h3>
            </div>
            
            <div className="space-y-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">Follow-up Manager</label>
                <select 
                  name="follow_up_manager_id"
                  value={formData.follow_up_manager_id}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select Manager</option>
                  <option value="1">Ahmed Hassan</option>
                  <option value="2">Sarah Johnson</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">Responsible User</label>
                <select 
                  name="assigned_user_id"
                  value={formData.assigned_user_id}
                  onChange={handleChange}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select User</option>
                  <option value="1">Ahmed Hassan</option>
                  <option value="2">Sarah Johnson</option>
                  <option value="3">John Smith</option>
                </select>
              </div>

              <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                <div className="flex items-center gap-2 mb-2">
                  <User size={14} className="text-purple-500" />
                  <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Active Manager</span>
                </div>
                <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                  Assigning a manager ensures the opportunity is tracked and followed up within 24 hours.
                </p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
