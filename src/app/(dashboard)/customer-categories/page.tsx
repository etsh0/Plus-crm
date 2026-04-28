"use client";

import { useState } from "react";
import { 
  Plus, 
  Search, 
  Filter, 
  MoreHorizontal, 
  FileText,
  Printer,
  X
} from "lucide-react";

export default function CustomerCategoriesPage() {

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data with restored vibrant colors
  const customerCategories = [
    { id: "#001", name: "Enterprise Companies", description: "Large scale B2B clients with 1000+ employees...", customers: 142, date: "Oct 24, 2023",  },
    { id: "#002", name: "Individual Professionals", description: "Independent consultants and freelancers...", customers: 2845, date: "Nov 12, 2023" },
    { id: "#003", name: "E-commerce Partners", description: "Online retailers and D2C brands...", customers: 89, date: "Dec 01, 2023" },
    { id: "#004", name: "Educational Institutions", description: "Universities, schools, and ed-tech platforms...", customers: 34, date: "Jan 15, 2024" },
  ];


  return (
    <div className="p-8 max-w-[1600px] mx-auto">

      {/* Title and Tabs */}
      <div className="mb-8">
        <div className="flex items-end justify-between border-b border-white/[0.08]">
          <div className="pb-4">
            <h1 className="text-3xl font-bold text-white tracking-tight">Customer Categories</h1>
          </div>
          <button 
            onClick={() => setIsModalOpen(true)}
            className="mb-6 flex items-center gap-2 px-4 py-2 bg-[#a855f7] hover:bg-[#9333ea] text-white rounded-lg text-sm font-semibold transition-all active:scale-95"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Category</span>
          </button>
        </div>
      </div>

      {/* Main Container */}
      <div className="bg-white/2 border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
        {/* Toolbar */}
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30" />
              <input 
                type="text" 
                placeholder="Search customer Category..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-[#18181b] border border-white/[0.08] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors"
              />
            </div>
            <button className="flex items-center gap-2 px-4 py-2.5 bg-[#18181b] hover:bg-[#27272a] border border-white/10 rounded-lg text-sm font-medium text-white/70 hover:text-white transition-all">
              <Filter className="w-4 h-4" />
              <span>Filter</span>
            </button>
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
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Category Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Description</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em] text-center">Customers</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em]">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-white/40 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {customerCategories.map((type) => (
                <tr key={type.id} className="hover:bg-white/1 transition-colors group">
                  <td className="px-6 py-5 text-sm text-white/60 font-medium">{type.id}</td>
                  <td className="px-6 py-5">
                    <div className="flex items-center gap-3">
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
          <p className="text-sm text-white/40">Showing 1 to 4 of 4 entries</p>
          <div className="flex items-center gap-2">
            <button className="px-5 py-2 rounded-lg border border-white/10 text-xs font-semibold text-white/20 disabled:opacity-50 cursor-not-allowed transition-all">Previous</button>
            <button className="px-5 py-2 rounded-lg border border-white/10 text-xs font-semibold text-white hover:bg-white/5 transition-all">Next</button>
          </div>
        </div>
      </div>

      {/* Modal Reused from Design 1 */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">Add Category</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-white/40 hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">Category Name</label>
                <input type="text" placeholder="e.g. Enterprise" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-white/50 font-medium">Description</label>
                <textarea rows={3} placeholder="Describe this customer category..." className="bg-[#27272a]/50 border border-white/5 rounded-lg px-4 py-2.5 text-sm text-white outline-none focus:border-[#a855f7]/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/4 flex items-center justify-end gap-3 bg-[#18181b]/50">
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors">
                Cancel
              </button>
              <button onClick={() => setIsModalOpen(false)} className="px-4 py-2 rounded-lg bg-[#a855f7] text-sm font-medium text-white hover:bg-[#9333ea] transition-all">
                Save Type
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}




