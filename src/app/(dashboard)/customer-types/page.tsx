"use client";

import { 
  Plus, 
  FileText,
  Printer,
  X,
  Users,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import { addNewType, deleteType, updateType, CustomerType } from "../../../redux/slice/customer-types/customer-types"

export default function CustomerTypesPage() {
  const dispatch = useDispatch();
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQury] = useState("")
  const [editingType, setEditingType] = useState<CustomerType | null>(null);


  // Select types from Redux state
 const types = useSelector(
  (state: any) => state.customerTypes.types
);

const filterTypes = types.filter( (type: any) => type.name.toLowerCase().includes(searchQuery.toLowerCase()))

const handleSaveType = () => {
  if (!name.trim()) return;

  if (editingType) {
    const updatedType: CustomerType = {
      ...editingType,
      name: name,
      description: description,
    };
    dispatch(updateType(updatedType));
  } else {
    const newCustomerType: CustomerType = {
      id: `#${Math.floor(Math.random() * 1000).toString().padStart(3, "0")}`,
      name: name,
      description: description,
      customers: 0,
      date: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    dispatch(addNewType(newCustomerType));
  }

  handleCloseModal();
};

const handleEdit = (type: CustomerType) => {
  setEditingType(type);
  setName(type.name);
  setDescription(type.description);
  setIsModalOpen(true);
};

const handleCloseModal = () => {
  setIsModalOpen(false);
  setEditingType(null);
  setName("");
  setDescription("");
};

const handleDelete = (id: string) => {
  dispatch(deleteType(id));
};


  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      {/* Title and Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Customer Types</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Manage and organize your customer categorization hierarchy.</p>
        </div>
        <Button 
          variant="primary"
          className="cursor-pointer"
          onClick={() => {
            setEditingType(null);
            setName("");
            setDescription("");
            setIsModalOpen(true);
          }}
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
              placeholder="Search customer types name..." 
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
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Type Name</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Description</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-center">Customers</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">Created Date</th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/4">
              {filterTypes && filterTypes.length > 0 ? (
                filterTypes.map((type: any) => (
                  <tr key={type.id} className="hover:bg-gray-50 dark:hover:bg-white/1 transition-colors group">
                    <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/60 font-medium">{type.id}</td>
                    <td className="px-6 py-5">
                      <div className="flex items-center gap-3">
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
                      <div className="flex items-center justify-end gap-2">
                        <Button variant="secondary" size="sm" onClick={() => handleEdit(type)}>
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
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          className="cursor-pointer"
                          onClick={() => handleDelete(type.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-20 text-center">
                    <div className="flex flex-col items-center justify-center gap-4 animate-in fade-in slide-in-from-bottom-4 duration-500">
                      <div className="w-16 h-16 rounded-2xl bg-gray-50 dark:bg-white/5 flex items-center justify-center border border-gray-100 dark:border-white/5 shadow-inner">
                        <Users className="w-8 h-8 text-gray-400 dark:text-white/20" />
                      </div>
                      <div className="space-y-1.5">
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">No customer types found</h3>
                        <p className="text-sm text-gray-500 dark:text-white/40 max-w-xs mx-auto">
                          You haven&apos;t created any customer Types yet. Types your customers to better organize your workflow.
                        </p>
                      </div>
                      <Button 
                        variant="primary" 
                        size="default"
                        className="mt-2"
                        onClick={() => setIsModalOpen(true)}
                      >
                        <Plus className="w-4 h-4 mr-2" />
                        Create Your First Type
                      </Button>
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
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingType ? "Edit Customer Type" : "Add Customer Type"}
              </h2>
              <button onClick={handleCloseModal} className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Type Name</label>
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="e.g. Enterprise" className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">Description</label>
                <textarea rows={3} value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Describe this customer category..." className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all resize-none" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#18181b]/50">
              <Button variant="secondary" onClick={handleCloseModal}>
                Cancel
              </Button>
              <Button variant="primary" onClick={handleSaveType}>
                {editingType ? "Update Type" : "Save Type"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
