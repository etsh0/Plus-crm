"use client";

import React from "react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import { useAddDeal } from "@/hooks/use-add-deal";
import { Button } from "@/components/ui/button";

export default function AddDealPage() {
  const { formData, handleChange, handleSave } = useAddDeal();

  return (
    <div className="max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/deals" 
          className="p-2 hover:bg-gray-100 dark:hover:bg-white/10 rounded-lg text-gray-500 dark:text-white/70 hover:text-gray-900 dark:hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Deal Details</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Create or edit deal information</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Basic Information Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Basic Information</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Enter the core details about this deal</p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Deal Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Enter deal title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">Deal Value</label>
                  <input 
                    type="number" 
                    name="value"
                    placeholder="0"
                    value={formData.value}
                    onChange={handleChange}
                    className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">Stage</label>
                  <select 
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all appearance-none cursor-pointer"
                  >
                    <option value="">Select stage</option>
                    <option value="lead">Lead</option>
                    <option value="proposal">Proposal</option>
                    <option value="negotiation">Negotiation</option>
                    <option value="won">Closed Won</option>
                    <option value="lost">Closed Lost</option>
                  </select>
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-bold text-gray-600 dark:text-white/70">Probability (%)</label>
                  <input 
                    type="number" 
                    name="probability"
                    placeholder="50"
                    value={formData.probability}
                    onChange={handleChange}
                    className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Description</label>
                <textarea 
                  name="description"
                  placeholder="Deal description and notes"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-3 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Timeline & Contacts Panel */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-1">Timeline & Contacts</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mb-6">Important dates and people involved</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Expected Close Date</label>
                <input 
                  type="date" 
                  name="closeDate"
                  value={formData.closeDate}
                  onChange={handleChange}
                  className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-bold text-gray-600 dark:text-white/70">Deal Owner</label>
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-bold text-gray-600 dark:text-white/70">Primary Contact</label>
              <input 
                type="text" 
                name="contact"
                placeholder="Contact name"
                value={formData.contact}
                onChange={handleChange}
                className="bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-white/30 outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 focus:ring-1 focus:ring-violet-500/50 dark:focus:ring-[#a855f7]/50 transition-all"
              />
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
                <span>Save Deal</span>
              </Button>
              <Button variant="secondary" className="w-full">
                <FileText className="w-4 h-4 text-gray-400 dark:text-white/40" />
                <span>Save as Draft</span>
              </Button>
            </div>
          </div>

          {/* Deal Summary Card */}
          <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 shadow-sm">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white mb-4">Deal Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Status:</span>
                <span className="text-sm font-bold text-emerald-600 dark:text-emerald-400">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Created:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-gray-500 dark:text-white/40">Last Updated:</span>
                <span className="text-sm font-bold text-gray-900 dark:text-white">Just now</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
