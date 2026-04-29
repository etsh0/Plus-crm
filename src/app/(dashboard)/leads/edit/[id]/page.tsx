"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, User, Mail, Building2 } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function EditLeadPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id;

  const [formData, setFormData] = useState({
    name: "Ahmed Lead",
    email: "ahmed.contact@example.com",
    phone: "+20 100 200 3000",
    company: "Future Horizons Inc.",
    role: "Marketing Director",
    status: "new",
    source: "Website Form",
    score: "85",
    owner: "john",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSave = () => {
    console.log("Saving lead:", id, formData);
    router.push(`/leads/${id}`);
  };

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <button 
          onClick={() => router.back()}
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </button>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Edit Lead</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Update lead information for #{id}</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        {/* Main Form Area */}
        <div className="flex-1 space-y-6">
          {/* Contact Information */}
          <div className="bg-white dark:bg-[#1c1c1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Contact Information</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Full Name</label>
                <input 
                  type="text" 
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Email Address</label>
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Phone Number</label>
                <input 
                  type="text" 
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Lead Score</label>
                <input 
                  type="number" 
                  name="score"
                  value={formData.score}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Company Information */}
          <div className="bg-white dark:bg-[#1c1c1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Company Details</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Company Name</label>
                <input 
                  type="text" 
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Job Title</label>
                <input 
                  type="text" 
                  name="role"
                  value={formData.role}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Status & Source */}
          <div className="bg-white dark:bg-[#1c1c1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-6">Lead Status</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                  <option value="proposal">Proposal</option>
                  <option value="closed">Closed</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Lead Source</label>
                <input 
                  type="text" 
                  name="source"
                  value={formData.source}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-full lg:w-[350px] space-y-6">
          <div className="bg-white dark:bg-[#1c1c1f] border border-gray-200 dark:border-white/5 rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSave} variant="primary" className="w-full bg-blue-600 hover:bg-blue-700">
                <Save className="w-4 h-4" />
                <span>Save Changes</span>
              </Button>
              <Button variant="secondary" className="w-full" onClick={() => router.back()}>
                <span>Cancel</span>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
