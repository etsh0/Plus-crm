"use client";

import { useState } from 'react';
import { 
  Plus,  
  FileText, 
  Printer, 
  X,
  Layers
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Link from "next/link";
import { SearchInput } from '@/components/ui/search-input';
import { useDispatch, useSelector } from 'react-redux';
import { addNewStatus, deleteStatus, leadStatus, updateStatus } from '@/redux/slice/lead-status/lead-status';
import { useEffect } from "react";
import { TableSkeleton } from "@/components/ui/loaders/TableSkeleton";


export default function LeadsStatusPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQury] = useState("")
  const [name, setName] = useState("")
  const [color, setColor] = useState("#a855f7")
  const [isLoading, setIsLoading] = useState(false);
  const [editingStatus, setEditingStatus] = useState<leadStatus | null>(null);
  const dispatch = useDispatch();
  const [isInitialLoading, setIsInitialLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsInitialLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const status = useSelector(
    (state: any) => state.leadStatus.status
  );

  const filterStatus = status.filter( (type: any) => type.name.toLowerCase().includes(searchQuery.toLowerCase()))


  const handleSaveType = () => {
    if (!name.trim()) return;
    setIsLoading(true);
  
    setTimeout(() => {
      if (editingStatus) {
        const updatedStatus: leadStatus = {
          ...editingStatus,
          name: name,
          color: color,
        };
        dispatch(updateStatus(updatedStatus));
      } else {
        const newLeadStatus: leadStatus = {
          id: `#${Math.floor(Math.random() * 1000).toString().padStart(2, "0")}`,
          name: name,
          color: color
        };
        dispatch(addNewStatus(newLeadStatus));
      }
    
      setIsLoading(false);
      handleCloseModal();
    }, 800);
  };
  
  const handleEdit = (type: leadStatus) => {
    setEditingStatus(type);
    setName(type.name);
    setColor(type.color);
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingStatus(null);
    setName("");
    setColor("");
  };
  
  const handleDelete = (id: string) => {
    dispatch(deleteStatus(id));
  };

  if (isInitialLoading) {
    return (
      <div className="p-6 space-y-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Status</h1>
          <div className="h-10 w-28 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <TableSkeleton rows={4} />
      </div>
    );
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Leads Status</h1>
    
        <Button 
          variant="primary"
          onClick={() => {
            setEditingStatus(null);
            setName("");
            setColor("#a855f7");
            setIsModalOpen(true);
          }}
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
              onChange={(e) => setSearchQury(e.target.value)}
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
              <tr className="border-y border-gray-100 dark:border-white/4 bg-gray-50/50 dark:bg-white/1">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">ID</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Color</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-right">Operations</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filterStatus && filterStatus.length > 0 ? (
                filterStatus.map((item: any) => (
                  <tr
                    key={item.id}
                    className="hover:bg-gray-50/50 dark:hover:bg-white/1 transition-colors group"
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-500 dark:text-gray-400">
                      {item.id}
                    </td>
                    <td className="px-6 py-4 text-sm font-bold text-gray-900 dark:text-white">
                      {item.name}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400 font-mono">
                          {item.color}
                        </span>
                        <div
                          className="w-5 h-5 rounded shadow-sm border border-black/5"
                          style={{ backgroundColor: item.color }}
                        />
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          asChild
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(item)}
                        >
                          <Link href={""}>
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
                          onClick={() => handleDelete(item.id)}
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
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-inner">
                        <Layers className="w-8 h-8 text-gray-400 dark:text-white/20" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          No lead statuses found
                        </h3>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/4 flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Add Lead Status</h2>
              <button onClick={() => handleCloseModal()} className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Status Name</label>
                <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="e.g. In Progress" className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="flex flex-col gap-1.5">
                  <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Color Code</label>
                  <div className="flex gap-2">
                    <input value={color} onChange={(e) => setColor(e.target.value)} type="text" placeholder="#HEX" className="flex-1 bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
                    <input value={color} onChange={(e) => setColor(e.target.value)} type="color" className="w-10 h-10 rounded border-0 p-0 overflow-hidden cursor-pointer bg-transparent" defaultValue="#a855f7" />
                  </div>
                </div>
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/4 flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#18181b]/50">
              <Button variant="secondary" onClick={() => handleCloseModal()}>
                Cancel
              </Button>
              <Button variant="primary" onClick={() => handleSaveType()} disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  editingStatus ? "Update Status" : "Save Status"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

