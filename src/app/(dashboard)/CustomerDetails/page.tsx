"use client";

import React, { useState } from 'react';

export default function CustomerDetailsPage() {
  const [status, setStatus] = useState("Active");
  const [notes, setNotes] = useState("Interested in upgrading to the premium tier. Follow up next week.");

  return (
    <div className="p-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Customer Details</h1>
        <p className="text-white/40 text-sm mt-1">View and manage customer information</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left Column: Info & Status */}
        <div className="md:col-span-1 flex flex-col gap-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
            <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center mb-4 text-xl font-bold text-white">
              SC
            </div>
            <h2 className="text-lg font-bold text-white">Sarah Connor</h2>
            <p className="text-sm text-white/50 mb-6">sarah@skynet.com</p>
            
            <div className="flex flex-col gap-4">
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Phone</p>
                <p className="text-sm text-white">+1 555 0101</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Company</p>
                <p className="text-sm text-white">Skynet Corp</p>
              </div>
              <div>
                <p className="text-xs text-white/40 uppercase tracking-widest mb-1">Created Date</p>
                <p className="text-sm text-white">2023-10-12</p>
              </div>
            </div>
          </div>

          {/* Status Update */}
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Status</h3>
            <select 
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors appearance-none"
            >
              <option value="Active" className="bg-[#111113]">Active</option>
              <option value="Inactive" className="bg-[#111113]">Inactive</option>
              <option value="Lead" className="bg-[#111113]">Lead</option>
            </select>
          </div>
        </div>

        {/* Right Column: Notes & Activity */}
        <div className="md:col-span-2 flex flex-col gap-6">
          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Notes</h3>
            <textarea 
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full h-32 bg-white/5 border border-white/10 rounded-xl p-4 text-sm text-white outline-none focus:border-white/30 transition-colors resize-none"
              placeholder="Add notes about this customer..."
            />
            <div className="mt-4 flex justify-end">
              <button className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-all">
                Save Notes
              </button>
            </div>
          </div>

          <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
            <h3 className="text-sm font-semibold text-white mb-4">Recent Interactions</h3>
            <div className="flex flex-col gap-4">
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-emerald-400 shrink-0" />
                <div>
                  <p className="text-sm text-white">Call with Sarah</p>
                  <p className="text-xs text-white/40 mt-0.5">Oct 15, 2023 at 2:30 PM</p>
                </div>
              </div>
              <div className="flex gap-4">
                <div className="w-2 h-2 mt-1.5 rounded-full bg-blue-400 shrink-0" />
                <div>
                  <p className="text-sm text-white">Sent promotional email</p>
                  <p className="text-xs text-white/40 mt-0.5">Oct 12, 2023 at 10:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
