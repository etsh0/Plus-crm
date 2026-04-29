"use client";

import React from "react";
import { ArrowLeft, Save, FileText, ChevronDown, Search } from "lucide-react";
import Link from "next/link";
import { useAddOpportunity } from "@/hooks/use-add-opportunity";
import { Button } from "@/components/ui/button";

export default function AddOpportunityPage() {
  const { 
    formData, 
    handleChange, 
    handleSave,
    isCustomerDropdownOpen,
    setIsCustomerDropdownOpen,
    customerSearch,
    setCustomerSearch,
    handleCustomerSelect
  } = useAddOpportunity();

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/opportunities" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Add Opportunity</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Create a new opportunity record</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Basic Information Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Basic Information</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Enter the core details about this opportunity</p>

            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">
                  Title <span className="text-red-500">*</span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="Enter opportunity title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">
                    Customer <span className="text-red-500">*</span>
                  </label>
                  
                  <div 
                    className="relative"
                    onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
                  >
                    <div className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white flex items-center justify-between cursor-pointer focus-within:border-violet-500/50 dark:focus-within:border-[#a855f7]/50 focus-within:ring-1 focus-within:ring-violet-500/50 dark:focus-within:ring-[#a855f7]/50 transition-all">
                      <span className={formData.customerId ? "text-gray-900 dark:text-white font-medium" : "text-gray-400 dark:text-white/30"}>
                        {formData.customerId ? customerSearch : "Select or search customer"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-gray-400 dark:text-white/50" />
                    </div>
                  </div>

                  {isCustomerDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-white dark:bg-[#27272a] border border-gray-200 dark:border-white/10 rounded-lg shadow-2xl z-10 overflow-hidden animate-in slide-in-from-top-2 duration-200">
                      <div className="p-2 border-b border-gray-100 dark:border-white/5 relative">
                        <Search className="w-4 h-4 text-gray-400 dark:text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search..."
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                          className="w-full bg-gray-50 dark:bg-black/20 rounded-md pl-9 pr-3 py-1.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto p-1">
                        <div onClick={() => handleCustomerSelect("cust_1", "Tech Solutions Inc.")} className="px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded cursor-pointer transition-colors">Tech Solutions Inc.</div>
                        <div onClick={() => handleCustomerSelect("cust_2", "Global Retail Corp")} className="px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded cursor-pointer transition-colors">Global Retail Corp</div>
                        <div onClick={() => handleCustomerSelect("cust_3", "Startup XYZ")} className="px-3 py-2 text-sm text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 rounded cursor-pointer transition-colors">Startup XYZ</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">Expected Value </label>
                  <input 
                    type="number" 
                    name="expectedValue"
                    placeholder="0"
                    value={formData.expectedValue}
                    onChange={handleChange}
                    className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">Source</label>
                  <select 
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select source</option>
                    <option value="website">Website</option>
                    <option value="referral">Referral</option>
                    <option value="social">Social Media</option>
                    <option value="event">Event/Conference</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Details & Assignment Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm mb-6 lg:mb-0 transition-colors duration-300">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Details & Assignment</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Assign managers and provide description</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Follow-up Manager</label>
                <select 
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select follow-up manager</option>
                  <option value="mgr_1">Alex Mercer</option>
                  <option value="mgr_2">Jordan Lee</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Assigned User </label>
                <select 
                  name="assignedUserId"
                  value={formData.assignedUserId}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select assigned user</option>
                  <option value="user_1">John Smith</option>
                  <option value="user_2">Sarah Johnson</option>
                </select>
              </div>
              
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 dark:text-white/70">Description </label>
              <textarea 
                name="description"
                placeholder="Opportunity description and notes"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all resize-none"
              ></textarea>
            </div>
          </div>

        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Actions Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm sticky top-8 transition-colors duration-300">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSave} variant="primary" className="w-full">
                <Save className="w-4 h-4" />
                <span>Save Opportunity</span>
              </Button>
              <Button variant="secondary" className="w-full">
                <FileText className="w-4 h-4 text-gray-400 dark:text-white/40" />
                <span>Save as Draft</span>
              </Button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
