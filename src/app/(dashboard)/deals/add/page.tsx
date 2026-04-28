"use client";

import React from "react";
import { ArrowLeft, Save, FileText } from "lucide-react";
import Link from "next/link";
import { useAddDeal } from "@/hooks/use-add-deal";
import { Button } from "@/components/ui/button";

export default function AddDealPage() {
  const { formData, handleChange, handleSave } = useAddDeal();

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Header */}
      <div className="mb-8 flex items-center gap-4">
        <Link 
          href="/deals" 
          className="p-2 hover:bg-white/10 rounded-lg text-white/70 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <div>
          <h1 className="text-3xl font-bold text-white tracking-tight">Deal Details</h1>
          <p className="text-white/40 text-sm mt-1">Create or edit deal information</p>
        </div>
      </div>

      <div className="flex flex-col lg:flex-row gap-6">
        
        {/* Main Form Area */}
        <div className="flex-1 flex flex-col gap-6">
          
          {/* Basic Information Panel */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-xl font-bold text-white mb-1">Basic Information</h2>
            <p className="text-sm text-white/40 mb-6">Enter the core details about this deal</p>

            <div className="flex flex-col gap-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Deal Title</label>
                <input 
                  type="text" 
                  name="title"
                  placeholder="Enter deal title"
                  value={formData.title}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  <label className="text-sm font-medium text-white/70">Deal Value</label>
                  <input 
                    type="number" 
                    name="value"
                    placeholder="0"
                    value={formData.value}
                    onChange={handleChange}
                    className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-sm font-medium text-white/70">Stage</label>
                  <select 
                    name="stage"
                    value={formData.stage}
                    onChange={handleChange}
                    className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all appearance-none"
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
                  <label className="text-sm font-medium text-white/70">Probability (%)</label>
                  <input 
                    type="number" 
                    name="probability"
                    placeholder="50"
                    value={formData.probability}
                    onChange={handleChange}
                    className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Description</label>
                <textarea 
                  name="description"
                  placeholder="Deal description and notes"
                  value={formData.description}
                  onChange={handleChange}
                  rows={4}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-3 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all resize-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Timeline & Contacts Panel */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl mb-6 lg:mb-0">
            <h2 className="text-xl font-bold text-white mb-1">Timeline & Contacts</h2>
            <p className="text-sm text-white/40 mb-6">Important dates and people involved</p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Expected Close Date</label>
                <input 
                  type="date" 
                  name="closeDate"
                  value={formData.closeDate}
                  onChange={handleChange}
                  className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all [color-scheme:dark]"
                />
              </div>
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium text-white/70">Deal Owner</label>
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
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium text-white/70">Primary Contact</label>
              <input 
                type="text" 
                name="contact"
                placeholder="Contact name"
                value={formData.contact}
                onChange={handleChange}
                className="bg-[#18181b] border border-white/[0.08] rounded-lg px-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all"
              />
            </div>
          </div>

        </div>

        {/* Sidebar Cards */}
        <div className="w-full lg:w-[350px] flex flex-col gap-6">
          
          {/* Actions Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Actions</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleSave} variant="primary" className="w-full">
                <Save className="w-4 h-4" />
                <span>Save Deal</span>
              </Button>
              <Button variant="secondary" className="w-full">
                <FileText className="w-4 h-4 text-white/40" />
                <span>Save as Draft</span>
              </Button>
            </div>
          </div>

          {/* Deal Summary Card */}
          <div className="bg-white/2 border border-white/[0.08] rounded-2xl p-6 shadow-xl">
            <h2 className="text-lg font-bold text-white mb-4">Deal Summary</h2>
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Status:</span>
                <span className="text-sm font-medium text-white">Active</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Created:</span>
                <span className="text-sm font-medium text-white">Today</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-white/40">Last Updated:</span>
                <span className="text-sm font-medium text-white">Just now</span>
              </div>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
