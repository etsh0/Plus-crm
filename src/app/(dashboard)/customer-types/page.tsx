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
    <div className="space-y-8 max-w-[1600px] mx-auto animate-in fade-in duration-500">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Types</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage and organize your customer categorization hierarchy.</p>
        </div>
        <Button 
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add New Type</span>
        </Button>
      </div>

      {/* Main Container */}
      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300">
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
          
          <div className="flex items-center bg-gray-50 dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-lg overflow-hidden">
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-medium text-gray-600 dark:text-white/70 border-r border-gray-200 dark:border-white/10 transition-all">
              <FileText className="w-4 h-4" />
              <span>Excel</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-medium text-gray-600 dark:text-white/70 border-r border-gray-200 dark:border-white/10 transition-all">
              <FileText className="w-4 h-4" />
              <span>PDF</span>
            </button>
            <button className="flex items-center gap-2 px-4 py-2.5 hover:bg-gray-100 dark:hover:bg-white/5 text-sm font-medium text-gray-600 dark:text-white/70 transition-all">
              <Printer className="w-4 h-4" />
              <span>Print</span>
            </button>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-100 dark:border-white/[0.04] bg-gray-50/50 dark:bg-white/1">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Type Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Description</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-center">Customers</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/[0.04]">
              {filteredTypes.map((type) => (
                <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-white/1 transition-colors group">
                  <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/60 font-medium">{type.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
                      <div className={`w-2 h-2 rounded-full ${type.color}`} />
                      <span className="text-sm font-bold text-gray-900 dark:text-white">{type.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/40">{type.description}</td>
                  <td className="px-6 py-5 text-center">
                    <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[11px] font-bold text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/[0.05]">
                      {type.customers.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/60">{type.date}</td>
                  <td className="px-6 py-5 text-right">
                    <button className="p-2 hover:bg-gray-100 dark:hover:bg-white/5 rounded-lg text-gray-400 dark:text-white/20 hover:text-gray-900 dark:hover:text-white transition-all">
                      <MoreHorizontal className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {/* Pagination */}
        <div className="px-6 py-5 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-between bg-gray-50/30 dark:bg-white/1">
          <p className="text-sm text-gray-500 dark:text-white/40">Showing 1 to {filteredTypes.length} of {filteredTypes.length} entries</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-400 dark:text-white/20 disabled:opacity-50 cursor-not-allowed transition-all">Previous</button>
            <button className="px-5 py-2 rounded-lg border border-gray-200 dark:border-white/10 text-xs font-semibold text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add Customer Type</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Type Name</label>
                <input type="text" placeholder="e.g. Enterprise" className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Description</label>
                <textarea rows={3} placeholder="Describe this customer category..." className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#18181b]/50">
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
