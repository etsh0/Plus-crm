"use client";

import React from "react";
import { ArrowLeft, Save, Repeat, Calendar, Star } from "lucide-react";
import Link from "next/link";
import { useAddLead } from "@/hooks/use-add-lead";
import { Button } from "@/components/ui/button";

export default function AddLeadPage() {
  const { formData, handleChange, handleSave } = useAddLead();

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/leads" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Lead Details</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Create or edit lead information</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Contact Information Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Contact Information</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Enter the basic contact details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Company</label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Job Title</label>
                <input 
                  type="text" 
                  name="jobTitle"
                  placeholder="Job title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Lead Information Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Lead Information</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Lead qualification and source details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
                >
                  <option value="">Select status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                </select>
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
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Lead Score</label>
                <input 
                  type="number" 
                  name="leadScore"
                  value={formData.leadScore}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-bold text-gray-600 dark:text-white/70">Lead Owner</label>
              <select 
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
              >
                <option value="">Select owner</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 dark:text-white/70">Notes</label>
              <textarea 
                name="notes"
                placeholder="Lead notes and comments"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all resize-none"
              ></textarea>
            </div>

          </div>

        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Actions Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSave} variant="primary" className="w-full">
                <Save className="w-4 h-4" />
                <span>Save Lead</span>
              </Button>
              <Button variant="secondary" className="w-full">
                <Repeat className="w-4 h-4 text-gray-400 dark:text-white/40" />
                <span>Convert to Deal</span>
              </Button>
              <Button variant="secondary" className="w-full">
                <Calendar className="w-4 h-4 text-gray-400 dark:text-white/40" />
                <span>Schedule Follow-up</span>
              </Button>
            </div>
          </div>

          {/* Lead Score Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Lead Score</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-500 fill-amber-500" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{formData.leadScore}<span className="text-sm text-gray-500 dark:text-white/40 font-normal">/100</span></div>
                <div className="text-sm text-emerald-600 dark:text-emerald-400 font-bold">High Quality Lead</div>
              </div>
            </div>
          </div>

          {/* Lead Summary Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Lead Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Created:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Last Contact:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Never</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Activities:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">0</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
