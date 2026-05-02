"use client";

import { Plus, FileText, Printer, X, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchInput } from "@/components/ui/search-input";
import { PiplineChart } from "@/components/ui/PiplineChart";
import { useSelector, useDispatch } from "react-redux";
import {
  addNewCategory,
  CustomerCategory,
  deleteCategory,
  editCategory,
} from "@/redux/slice/customerCategory/customerCategory";
import { useState } from "react";

export default function CustomerCategoriesPage() {
  const dispatch = useDispatch();
  const [search, setSearch] = useState("");
  const [name, setName] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [description, setDescription] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCategory, setEditingCategory] = useState<CustomerCategory | null>(null);



  const categories =
    useSelector((state: any) => state.customerCategory.categories) || [];

  const filterCategory = categories.filter((category: any) =>
    category.name.toLowerCase().includes(search.toLowerCase()),
  );

  const handleSaveCategory = () => {
    if (!name.trim()) return;
    setIsLoading(true);

    setTimeout(() => {
      if (editingCategory) {
        const updatedCategory: CustomerCategory = {
          ...editingCategory,
          name,
          description,
        };
        dispatch(editCategory(updatedCategory));
      } else {
        const newCustomerCategory: CustomerCategory = {
          id: Date.now(),
          name,
          description,
          customers: 0,
          date: new Date().toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          }),
        };
        dispatch(addNewCategory(newCustomerCategory));
      }

      setIsLoading(false);
      handleCloseModal();
    }, 800);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingCategory(null);
    setName("");
    setDescription("");
  };

  const handleEdit = (category: CustomerCategory) => {
    setEditingCategory(category);
    setName(category.name);
    setDescription(category.description);
    setIsModalOpen(true);
  };
  const handleDelete = (id: number) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
            Customer Categories
          </h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
            Manage and track your primary customer business segments.
          </p>
        </div>
        <Button variant="primary" onClick={() => setIsModalOpen(true)}>
          <Plus className="w-4 h-4" />
          <span>Add New Category</span>
        </Button>
      </div>

      <div className="bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 rounded-2xl overflow-hidden shadow-sm transition-colors duration-300">
        <div className="p-5 flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1 max-w-2xl">
            <SearchInput
              placeholder="Search customer category..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
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

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-y border-gray-100 dark:border-white/[0.04] bg-gray-50/50 dark:bg-white/1">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest">
                  ID
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">
                  Category Name
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">
                  Description
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-center">
                  Customers
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em]">
                  Created Date
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-[0.1em] text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/4">
              {filterCategory && filterCategory.length > 0 ? (
                filterCategory.map((category: any) => (
                  <tr
                    key={category.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/1 transition-colors group"
                  >
                    <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/60 font-medium">
                      #{category.id.toString().slice(-2).padStart(3, "0")}
                    </td>
                    <td className="px-6 py-5">
                      <span className="text-sm font-bold text-gray-900 dark:text-white">
                        {category.name}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/40">
                      {category.description}
                    </td>
                    <td className="px-6 py-5 text-center">
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-gray-100 dark:bg-white/5 text-[11px] font-bold text-gray-600 dark:text-white/60 border border-gray-200 dark:border-white/[0.05]">
                        {category?.customers?.toLocaleString()}
                      </span>
                    </td>
                    <td className="px-6 py-5 text-sm text-gray-500 dark:text-white/60">
                      {category.date}
                    </td>
                    <td className="px-6 py-5 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button
                          variant="secondary"
                          size="sm"
                          onClick={() => handleEdit(category)}
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
                              d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                            />
                          </svg>
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(category.id)}
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
                        <h3 className="text-base font-bold text-gray-900 dark:text-white">
                          No customer categories found
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

      <div className="grid grid-cols-1 gap-6">
        <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm p-6">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">
              Customers per Category
            </h2>
          </div>
          <div className="h-[300px] w-full">
            <PiplineChart data={categories} />
          </div>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 dark:bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/[0.04] flex items-center justify-between">
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">
                {editingCategory ? "Edit Category" : "Add Category"}
              </h2>

              <button
                onClick={handleCloseModal}
                className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 flex flex-col gap-4">
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Category Name
                </label>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  type="text"
                  placeholder="e.g. Enterprise"
                  className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label className="text-xs text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Description
                </label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={3}
                  placeholder="Describe this customer category..."
                  className="bg-gray-50 dark:bg-[#27272a]/50 border border-gray-200 dark:border-white/5 rounded-lg px-4 py-2.5 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 dark:focus:border-[#a855f7]/50 transition-all resize-none"
                />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/[0.04] flex items-center justify-end gap-3 bg-gray-50/50 dark:bg-[#18181b]/50">
              <Button onClick={handleCloseModal} variant="secondary">
                Cancel
              </Button>
              <Button onClick={handleSaveCategory} variant="primary" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  "Save Category"
                )}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
