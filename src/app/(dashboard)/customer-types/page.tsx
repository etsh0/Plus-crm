"use client";

import React from "react";
import { 
  Plus, 
  MoreHorizontal, 
  FileText,
  Printer,
  X
} from "lucide-react";
import { useCustomerTypes, CustomerType } from "@/hooks/use-customer-types";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { initialCustomerTypes } from "@/constants/mock-data";

export default function CustomerTypesPage() {
  const { 
    searchQuery, 
    setSearchQuery, 
    isModalOpen, 
    setIsModalOpen, 
    filteredTypes 
  } = useCustomerTypes(initialCustomerTypes);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      {/* Title and Tabs */}
      <div className="mb-8">
        <div className="flex items-end justify-between border-b border-white/[0.08]">
          <div className="pb-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">Customer Types</h1>
            <p className="text-white/40 text-sm mt-2">Manage and organize your customer categorization hierarchy.</p>
          </div>
          <Button 
            variant="primary"
            onClick={() => setIsModalOpen(true)}
            className="mb-6"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Type</span>
          </Button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white/2 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <SearchInput 
              placeholder="Search customer types..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full"
            />
            <Button variant="secondary">
              Filter
            </Button>
          </div>
          
          <div className="flex items-center bg-[#18181b] border border-white/10 rounded-lg overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 text-sm font-medium text-white/70 border-r border-white/10 transition-all">
              <FileText className="w-4 h-4" />
              <span>Excel</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 text-sm font-medium text-white/70 border-r border-white/10 transition-all">
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-white/5 text-sm font-medium text-white/70 transition-all">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-white/[0.04] bg-white/1">
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Type Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Description</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em] text-center">Customers</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredTypes.map((type) => (
                <tr key={type.id} className="hover:bg-white/1 transition-colors group">
                  <td className="px-6 py-5 text-sm text-white/60 font-medium">{type.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${type.color}`} />
                      <span className="text-sm font-bold text-white">{type.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-white/40">{type.description}</td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-white/5 text-[11px] font-bold text-white/60 border border-white/[0.05]">
                      {type.customers.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-white/60">{type.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-white/5 rounded-lg text-white/20 hover:text-white transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-5 border-t border-white/[0.04] flex items-center justify-between bg-white/1">
          <p className="text-sm text-white/40">Showing 1 to {filteredTypes.length} of {filteredTypes.length} entries</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2 rounded-lg border border-white/10 text-xs font-semibold text-white/20 disabled:opacity-50 cursor-not-allowed transition-all">Previous</button>
            <button className="px-5 py-2 rounded-lg border border-white/10 text-xs font-semibold text-white hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add Customer Type</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">Type Name</label>
                <input type="text" placeholder="e.g. Enterprise" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">Description</label>
                <textarea rows={3} placeholder="Describe this customer category..." className="bg-[#27272a]/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-end gap-3 bg-[#18181b]/50">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Save Type
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
