"use client";

import { useState } from 'react';
import { 
  Plus,  
  FileText, 
  Printer, 
  X
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { SearchInput } from '@/components/ui/search-input';


interface LeadStatusItem {
  id: number;
  name: string;
  color: string;
  order: number;
}

const leadStatuses: LeadStatusItem[] = [
  { id: 1, name: "New", color: "#17a2b8", order: 1 },
  { id: 2, name: "Qualified", color: "#ffc107", order: 2 },
  { id: 3, name: "Proposal", color: "#7e5233", order: 3 },
  { id: 4, name: "Won", color: "#28a745", order: 4 },
  { id: 5, name: "Contacted", color: "#dc3545", order: 5 },
];

export default function LeadsStatusPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Status</h1>
    
        <Button 
          variant="primary"
          onClick={() => setIsModalOpen(true)}
        >
          <Plus className="w-4 h-4" />
          <span>Add New </span>
        </Button>
      </div>

      {/* Main Content Card */}
      <div className="bg-white dark:bg-[#1c1c1f] rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <SearchInput 
              placeholder="Search lead status..." 
              className="w-full"
            />
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
              <tr className="bg-gray-50/50 dark:bg-white/[0.02] text-gray-500 dark:text-gray-400 text-xs font-bold uppercase tracking-wider">
                <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5 w-16">#</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Name</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Color</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5">Order</th>
                <th className="px-6 py-4 border-b border-gray-100 dark:border-white/5 text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {leadStatuses.map((item) => (
                <tr key={item.id} className="hover:bg-gray-50/50 dark:hover:bg-white/[0.01] transition-colors group">
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{item.id}</td>
                  <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">{item.name}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-500 dark:text-gray-400 font-mono">{item.color}</span>
                      <div 
                        className="w-5 h-5 rounded shadow-sm border border-black/5" 
                        style={{ backgroundColor: item.color }}
                      />
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">{item.order}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={''} >
                            <svg
                              width="12"
                              height="12"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                              />
                            </svg>
                            Edit
                          </Link>
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                        >
                          <svg
                            width="12"
                            height="12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                            />
                          </svg>
                          Delete
                        </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty state fallback if no data */}
        {leadStatuses.length === 0 && (
          <div className="p-12 text-center text-gray-500 dark:text-gray-400">
            No lead statuses found.
          </div>
        )}
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add Lead Status</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Status Name</label>
                <input type="text" placeholder="e.g. In Progress" className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Color Code</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="#HEX" className="flex-1 bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
                    <input type="color" className="w-10 h-10 rounded border-0 p-0 overflow-hidden cursor-pointer bg-transparent" defaultValue="#a855f7" />
                  </div>
                </div>
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Sort Order</label>
                  <input type="number" placeholder="1" className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/4 flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#18181b]/50">
              <Button variant="secondary" onClick={() => setIsModalOpen(false)}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => setIsModalOpen(false)}>
                Save Status
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

