"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SearchInput } from "@/components/ui/search-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store"; 
import { Eye, Pencil, Trash, X } from "lucide-react";
import { deleteCustomer } from "@/redux/slice/customers/customers";
import { useState, useEffect } from "react";
import { TableSkeleton } from "@/components/ui/loaders/TableSkeleton";


export default function CustomersPage() {
  const { customers } = useSelector((state: RootState) => state.customers);
  const customerTypes = useSelector((state: RootState) => state.customerTypes.types)
  const customerCategories = useSelector((state: RootState) => state.customerCategory.categories)
  const [searchQuery, setSearchQury] = useState("")
  const [isViewModalOpen, setIsViewModalOpen] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<any>(null);
  const dispatch = useDispatch()
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filterCustomers = customers.filter( (type: any) => 
    type.company_name.toLowerCase().includes(searchQuery.toLowerCase()) || 
    type.contact_person_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    type.email.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handleDeleteCustomer = (id : any) => {
    dispatch(deleteCustomer(id))
  }

  const handleViewCustomer = (customer: any) => {
    setSelectedCustomer(customer);
    setIsViewModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
              Manage your customer relationships and accounts
            </p>
          </div>
          <div className="h-10 w-36 bg-gray-200 dark:bg-white/10 rounded-lg animate-pulse" />
        </div>
        <TableSkeleton rows={5} />
      </div>
    );
  }

  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Customers</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
            Manage your customer relationships and accounts
          </p>
        </div>
        <Button asChild variant="primary">
          <Link href="/customers/add" className="flex items-center gap-2">
            <svg
              width="16"
              height="16"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 4v16m8-8H4"
              />
            </svg>
            Add Customer
          </Link>
        </Button>
      </div>

      <div className="rounded bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
          <SearchInput
            onChange={(e) => setSearchQury(e.target.value)}
            placeholder="Search customers by contact person name, email, or company..."

          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Contact Person
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Type
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 dark:divide-white/5">
              {filterCustomers.length > 0 ? (
                filterCustomers.map((c: any) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 text-[10px] font-bold">
                            {c.company_name?.split(' ').map((n: string) => n[0]).join('').toUpperCase().substring(0, 2)}
                          </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {c.company_name}
                          </div>
                          <div className="text-[10px] text-gray-500 dark:text-white/40 mt-0.5">
                            Customer ID: {c.id.toString().slice(-2).padStart(3, "0")}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-gray-600 dark:text-white/70">
                            {c.contact_person_name}
                            <span className="text-gray-500">
                              {c.contact_person_phone}
                            </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-gray-600 dark:text-white/70">
                      {customerTypes.find((t) => Number(t.id) === Number(c.customer_type_id))?.name || "N/A"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-[11px] text-gray-600 dark:text-white/70">
                        {customerCategories.find((cat) => Number(cat.id) === Number(c.customer_category_id))?.name || "N/A"}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1 text-[11px] text-gray-500 dark:text-white/50">
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                            />
                          </svg>
                          {c.email}
                        </div>
                        <div className="flex items-center gap-1.5">
                          <svg
                            className="w-3 h-3"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={1.5}
                              d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                            />
                          </svg>
                          {c.primary_phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-1.5 text-gray-600 dark:text-white/60 text-[11px]">
                        <svg
                          className="w-3.5 h-3.5 text-gray-400 dark:text-white/30"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                          />
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={1.5}
                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                          />
                        </svg>
                        {c.main_address}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <StatusBadge status={c.status === "active" ? "Active" : "Not Active"} />
                    </td>

                    <td className="px-6 py-4 text-gray-500 dark:text-white/50 text-[11px]">
                      {new Date(c.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/customers/edit/${c.id}`}>
                            <Pencil />
                          </Link>
                        </Button>
                        <Button
                          onClick={() => handleViewCustomer(c)}
                          className="cursor-pointer"
                          variant="secondary"
                          size="sm"
                        >
                          <Eye />
                        </Button>
                        <Button
                        onClick={() => handleDeleteCustomer(c.id)}
                          className="cursor-pointer"
                          variant="destructive"
                          size="sm"
                        >
                          <Trash />
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={9}
                    className="px-6 py-8 text-center text-gray-400 dark:text-white/40"
                  >
                    No customers found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Simple Modal */}
      {isViewModalOpen && selectedCustomer && (
        <div className="fixed z-100 inset-0 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 rounded-2xl w-full max-w-2xl overflow-hidden shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="px-6 py-5 border-b border-gray-100 dark:border-white/5 flex items-center justify-between">
              <h2 className="text-xl font-bold text-gray-900 dark:text-white">Customer Details</h2>
              <button onClick={() => setIsViewModalOpen(false)} className="text-gray-400 hover:text-gray-900 dark:text-white/40 dark:hover:text-white transition-colors cursor-pointer">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <div className="p-8 space-y-8 max-h-[75vh] overflow-y-auto custom-scrollbar">
              {/* Classification & Status */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-purple-500" />
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Classification & Status</h3>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Status</label>
                  <StatusBadge status={selectedCustomer.status === "active" ? "Active" : "Not Active"} />
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Customer Type</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {customerTypes.find((t) => Number(t.id) === Number(selectedCustomer.customer_type_id))?.name || "N/A"}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Customer Category</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">
                    {customerCategories.find((cat) => Number(cat.id) === Number(selectedCustomer.customer_category_id))?.name || "N/A"}
                  </div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Assigned User</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.assigned_user || "Unassigned"}</div>
                </div>
              </div>

              {/* Basic & Contact Info */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-blue-500" />
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Information</h3>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Company Name</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.company_name}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Email Address</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.email || "N/A"}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Primary Phone</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.primary_phone || "N/A"}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Additional Phone</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.additional_phone || "N/A"}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Created At</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.createdAt}</div>
                </div>
              </div>

              {/* Business Data */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-indigo-500" />
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Business Details</h3>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Job Title</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.job_title || "N/A"}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Commercial Register</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.commercial_register || "N/A"}</div>
                </div>
                <div className="col-span-2">
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Tax Certificate (Tax ID)</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.tax_certificate || "N/A"}</div>
                </div>
              </div>

              {/* Contact Person */}
              <div className="grid grid-cols-2 gap-x-8 gap-y-6">
                <div className="col-span-2 flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Person</h3>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Full Name</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.contact_person_name}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Mobile Number</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white">{selectedCustomer.contact_person_phone}</div>
                </div>
              </div>

              {/* Location & Notes */}
              <div className="grid grid-cols-1 gap-6">
                <div className="col-span-1 flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/5">
                  <div className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                  <h3 className="text-xs font-bold text-gray-900 dark:text-white uppercase tracking-wider">Location & Remarks</h3>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Main Address</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">{selectedCustomer.main_address}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Additional Details</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed">{selectedCustomer.additional_address || "N/A"}</div>
                </div>
                <div>
                  <label className="text-[10px] text-gray-500 font-bold uppercase tracking-widest mb-1 block">Internal Notes</label>
                  <div className="text-sm font-medium text-gray-900 dark:text-white leading-relaxed bg-gray-50 dark:bg-white/5 p-4 rounded-xl italic">
                    {selectedCustomer.notes || "No internal remarks available."}
                  </div>
                </div>
              </div>
            </div>

            <div className="px-6 py-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 flex justify-end">
              <Button className="cursor-pointer" onClick={() => setIsViewModalOpen(false)}>Close</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
