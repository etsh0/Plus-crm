"use client";

import { useState } from "react";
import { ArrowLeft, Save, FileText, ChevronDown, Search } from "lucide-react";
import Link from "next/link";

export default function AddOpportunityPage() {
  const [formData, setFormData] = useState({
    title: "",
    customerId: "",
    expectedValue: "",
    source: "",
    userId: "",
    assignedUserId: "",
    description: "",
  });

  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomerSelect = (customerId: string, customerName: string) => {
    setFormData({ ...formData, customerId });
    setCustomerSearch(customerName);
    setIsCustomerDropdownOpen(false);
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/opportunities" 
          className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Add Opportunity</h1>
          <p className="text-white/40 text-sm mt-1">Create a new opportunity record</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Basic Information Panel */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1">Basic Information</h2>
            <p className="text-sm text-white/40 mb-6">Enter the core details about this opportunity</p>

            <div className="flex flex-col gap-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">
                  Title <span className="text-red-400">*</span>
                </label>
                <input 
                  type="text" 
                  name="title"
                  required
                  placeholder="Enter opportunity title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                <div className="flex flex-col gap-2 relative">
                  <label className="text-sm font-medium text-white/70">
                    Customer <span className="text-red-400">*</span>
                  </label>
                  
                  {/* Searchable Select Mockup */}
                  <div 
                    className="relative"
                    onClick={() => setIsCustomerDropdownOpen(!isCustomerDropdownOpen)}
                  >
                    <div className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white flex items-center justify-between cursor-pointer focus-within:border-[#a855f7]/50 focus-within:ring-1 focus-within:ring-[#a855f7]/50 transition-all">
                      <span className={formData.customerId ? "text-white" : "text-white/30"}>
                        {formData.customerId ? customerSearch : "Select or search customer"}
                      </span>
                      <ChevronDown className="w-4 h-4 text-white/50" />
                    </div>
                  </div>

                  {isCustomerDropdownOpen && (
                    <div className="absolute top-full left-0 w-full mt-2 bg-[#27272a] border border-white/10 rounded-lg shadow-2xl z-10 overflow-hidden">
                      <div className="p-2 border-b border-white/5 relative">
                        <Search className="w-4 h-4 text-white/40 absolute left-4 top-1/2 -translate-y-1/2" />
                        <input 
                          type="text" 
                          placeholder="Search..."
                          value={customerSearch}
                          onChange={(e) => setCustomerSearch(e.target.value)}
                          className="w-full bg-black/20 rounded-md pl-9 pr-3 py-1.5 text-sm text-white outline-none focus:border-[#a855f7]/50"
                        />
                      </div>
                      <div className="max-h-48 overflow-y-auto p-1">
                        <div onClick={() => handleCustomerSelect("cust_1", "Tech Solutions Inc.")} className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded cursor-pointer">Tech Solutions Inc.</div>
                        <div onClick={() => handleCustomerSelect("cust_2", "Global Retail Corp")} className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded cursor-pointer">Global Retail Corp</div>
                        <div onClick={() => handleCustomerSelect("cust_3", "Startup XYZ")} className="px-3 py-2 text-sm text-white hover:bg-white/10 rounded cursor-pointer">Startup XYZ</div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/70">Expected Value </label>
                  <input 
                    type="number" 
                    name="expectedValue"
                    placeholder="0"
                    value={formData.expectedValue}
                    onChange={handleChange}
                    className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
                
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/70">Source</label>
                  <select 
                    name="source"
                    value={formData.source}
                    onChange={handleChange}
                    className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
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
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-1">Details & Assignment</h2>
            <p className="text-sm text-white/40 mb-6">Assign managers and provide description</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Follow-up Manager</label>
                <select 
                  name="userId"
                  value={formData.userId}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
                >
                  <option value="">Select follow-up manager</option>
                  <option value="mgr_1">Alex Mercer</option>
                  <option value="mgr_2">Jordan Lee</option>
                </select>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Assigned User </label>
                <select 
                  name="assignedUserId"
                  value={formData.assignedUserId}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
                >
                  <option value="">Select assigned user</option>
                  <option value="user_1">John Smith</option>
                  <option value="user_2">Sarah Johnson</option>
                </select>
              </div>
              
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/70">Description </label>
              <textarea 
                name="description"
                placeholder="Opportunity description and notes"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all resize-none"
              ></textarea>
            </div>
          </div>

        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Actions Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl sticky top-8">
            <h2 className="text-lg font-bold text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <Save className="w-4 h-4" />
                <span>Save Opportunity</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#18181b] hover:bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium transition-all">
                <FileText className="w-4 h-4 text-white/40" />
                <span>Save as Draft</span>
              </button>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
