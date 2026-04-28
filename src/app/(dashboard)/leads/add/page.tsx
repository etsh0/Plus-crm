"use client";

import { useState } from "react";
import { ArrowLeft, Save, Repeat, Calendar, Star } from "lucide-react";
import Link from "next/link";

export default function AddLeadPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    status: "",
    source: "",
    leadScore: "85",
    owner: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/leads" 
          className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Lead Details</h1>
          <p className="text-white/40 text-sm mt-1">Create or edit lead information</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Contact Information Panel */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1">Contact Information</h2>
            <p className="text-sm text-white/40 mb-6">Enter the basic contact details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">First Name</label>
                <input 
                  type="text" 
                  name="firstName"
                  placeholder="First name"
                  value={formData.firstName}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Last Name</label>
                <input 
                  type="text" 
                  name="lastName"
                  placeholder="Last name"
                  value={formData.lastName}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Email</label>
                <input 
                  type="email" 
                  name="email"
                  placeholder="email@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Phone</label>
                <input 
                  type="tel" 
                  name="phone"
                  placeholder="Phone number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Company</label>
                <input 
                  type="text" 
                  name="company"
                  placeholder="Company name"
                  value={formData.company}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Job Title</label>
                <input 
                  type="text" 
                  name="jobTitle"
                  placeholder="Job title"
                  value={formData.jobTitle}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
            </div>
          </div>

          {/* Lead Information Panel */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1">Lead Information</h2>
            <p className="text-sm text-white/40 mb-6">Lead qualification and source details</p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Status</label>
                <select 
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
                >
                  <option value="">Select status</option>
                  <option value="new">New</option>
                  <option value="contacted">Contacted</option>
                  <option value="qualified">Qualified</option>
                </select>
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
                  <option value="linkedin">LinkedIn</option>
                  <option value="referral">Referral</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Lead Score</label>
                <input 
                  type="number" 
                  name="leadScore"
                  value={formData.leadScore}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
            </div>

            <div className="flex flex-col gap-2 mb-6">
              <label className="text-sm font-medium text-white/70">Lead Owner</label>
              <select 
                name="owner"
                value={formData.owner}
                onChange={handleChange}
                className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
              >
                <option value="">Select owner</option>
                <option value="john">John Smith</option>
                <option value="sarah">Sarah Johnson</option>
              </select>
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/70">Notes</label>
              <textarea 
                name="notes"
                placeholder="Lead notes and comments"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all resize-none"
              ></textarea>
            </div>

          </div>

        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Actions Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-semibold transition-all active:scale-95 shadow-[0_0_15px_rgba(168,85,247,0.4)]">
                <Save className="w-4 h-4" />
                <span>Save Lead</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#18181b] hover:bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium transition-all">
                <Repeat className="w-4 h-4 text-white/40" />
                <span>Convert to Deal</span>
              </button>
              <button className="flex items-center justify-center gap-2 w-full py-2.5 bg-[#18181b] hover:bg-white/5 border border-white/10 text-white rounded-lg text-sm font-medium transition-all">
                <Calendar className="w-4 h-4 text-white/40" />
                <span>Schedule Follow-up</span>
              </button>
            </div>
          </div>

          {/* Lead Score Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Lead Score</h2>
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-amber-500/10 rounded-xl flex items-center justify-center">
                <Star className="w-6 h-6 text-amber-400 fill-amber-400" />
              </div>
              <div>
                <div className="text-2xl font-bold text-white tracking-tight">85<span className="text-sm text-white/40 font-normal">/100</span></div>
                <div className="text-sm text-white/60">High Quality Lead</div>
              </div>
            </div>
          </div>

          {/* Lead Summary Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Lead Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Created:</span>
                <span className="text-sm font-medium text-white">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Last Contact:</span>
                <span className="text-sm font-medium text-white">Never</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Activities:</span>
                <span className="text-sm font-medium text-white">0</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
