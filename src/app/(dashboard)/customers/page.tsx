"use client";

import React, { useState } from 'react';

const initialCustomers = [
  { id: 1, name: "Sarah Connor", email: "sarah@skynet.com", status: "Active", createdDate: "2023-10-12" },
  { id: 2, name: "John Wick", email: "john@continental.com", status: "Active", createdDate: "2023-11-05" },
  { id: 3, name: "Tony Stark", email: "tony@stark.com", status: "Inactive", createdDate: "2023-09-21" },
  { id: 4, name: "Bruce Wayne", email: "bruce@wayne.com", status: "Active", createdDate: "2024-01-15" },
  { id: 5, name: "Clark Kent", email: "clark@dailyplanet.com", status: "Inactive", createdDate: "2024-02-02" },
];

export default function CustomersPage() {
  const [customers, setCustomers] = useState(initialCustomers);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("All");
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Filtered data
  const filteredCustomers = customers.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(search.toLowerCase()) || c.email.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = filterStatus === "All" || c.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-white/40 text-sm mt-1">Manage your customer base</p>
        </div>
        <button 
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-all duration-200"
        >
          + Add Customer
        </button>
      </div>

      {/* Toolbar: Search and Filter */}
      <div className="flex items-center gap-4 mb-6">
        <div className="flex-1 max-w-sm relative">
          <svg className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input 
            type="text" 
            placeholder="Search customers..." 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-white/[0.04] border border-white/10 rounded-xl pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/30 transition-colors"
          />
        </div>
        <select 
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          className="bg-white/[0.04] border border-white/10 rounded-xl px-4 py-2 text-sm text-white outline-none focus:border-white/30 transition-colors appearance-none"
        >
          <option value="All" className="bg-[#111113]">All Statuses</option>
          <option value="Active" className="bg-[#111113]">Active</option>
          <option value="Inactive" className="bg-[#111113]">Inactive</option>
        </select>
      </div>

      {/* Table */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-white/[0.08]">
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-widest">Name</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-widest">Email</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-widest">Status</th>
              <th className="text-left px-5 py-3 text-xs font-medium text-white/40 uppercase tracking-widest">Created Date</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.length > 0 ? (
              filteredCustomers.map((c) => (
                <tr
                  key={c.id}
                  className="border-b border-white/[0.04] last:border-0 hover:bg-white/[0.03] transition-colors"
                >
                  <td className="px-5 py-3.5 text-white font-medium">{c.name}</td>
                  <td className="px-5 py-3.5 text-white/50">{c.email}</td>
                  <td className="px-5 py-3.5">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                        c.status === "Active"
                          ? "bg-emerald-500/10 text-emerald-400"
                          : "bg-white/5 text-white/30"
                      }`}
                    >
                      {c.status}
                    </span>
                  </td>
                  <td className="px-5 py-3.5 text-white/50">{c.createdDate}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-white/40">No customers found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Add Customer Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md p-4">
          <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl w-full max-w-md overflow-hidden shadow-[0_32px_80px_0_rgba(0,0,0,0.5)]">
            <div className="px-6 py-5 border-b border-white/10 flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add New Customer</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white">
                <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 uppercase tracking-widest">Name</label>
                <input type="text" placeholder="John Doe" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 uppercase tracking-widest">Email</label>
                <input type="email" placeholder="john@example.com" className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/40 uppercase tracking-widest">Status</label>
                <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white outline-none focus:border-white/30 transition-colors appearance-none">
                  <option value="Active" className="bg-[#111113]">Active</option>
                  <option value="Inactive" className="bg-[#111113]">Inactive</option>
                </select>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/10 flex items-center justify-end gap-3">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl text-sm text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-xl bg-white/10 border border-white/20 text-sm text-white hover:bg-white/20 transition-all">
                Save Customer
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
