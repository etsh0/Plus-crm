"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SearchInput } from "@/components/ui/search-input";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { deleteContact } from "@/redux/slice/contacts/contacts";
import { useState } from "react";

export default function ContactsPage() {

  const contacts = useSelector((state: RootState) => state.contacts.contacts)
  const { customers } = useSelector((state: RootState) => state.customers);
  const [searchQuery, setSearchQuery] = useState("")
  const dispatch = useDispatch()

    const handleDeleteContact = (id : any) => {
      dispatch(deleteContact(id))
    }

  const filterContacts = contacts.filter((c: any) => 
    (c.name?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (c.email?.toLowerCase() || "").includes(searchQuery.toLowerCase()) ||
    (customers.find(customer => customer.id === c.customer_id)?.company_name.toLowerCase() || "")
    .includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-8 max-w-400 mx-auto animate-in fade-in duration-500">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Contacts</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
            Manage your professional network and leads
          </p>
        </div>
        <Button asChild variant="primary">
          <Link href="/contacts/add" className="flex items-center gap-2">
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
            Add Contact
          </Link>
        </Button>
      </div>

      <div className="rounded-2xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 shadow-sm overflow-hidden transition-colors duration-300">
        {/* Toolbar */}
        <div className="p-4 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
          <SearchInput
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search contacts by name, email, or company..."
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto custom-scrollbar pb-2">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Contact
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Contact Method
                </th>
                <th className="px-6 py-4 text-[11px] font-bold text-gray-400 dark:text-white/30 uppercase tracking-wider">
                  Job Title
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
              {filterContacts.length > 0 ? (
                filterContacts.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-gray-50 dark:hover:bg-white/2 transition-colors"
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-violet-500/10 border border-violet-500/20 flex items-center justify-center text-violet-500 text-[10px] font-bold">
                            {c.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")
                              .toUpperCase()
                              .slice(0, 2)}
                          </div>
                        <div>
                          <div className="font-semibold text-gray-900 dark:text-white">
                            {c.name}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2 text-gray-600 dark:text-white/70">
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
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        {
                          customers.find( (customer) => Number(customer.id) === Number(c.customer_id))?.company_name || "N/A"
                        }
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
                          {c.phone}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium border ${
                          c.contact_method === "phone"
                            ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20"
                            : "bg-indigo-500/10 text-indigo-500 border-indigo-500/20"
                        }`}
                      >
                        {c.contact_method === "phone" ? "📞 Phone" : "📧 Email"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-white">
                      <StatusBadge status={c.job_title} />
                    </td>
                    <td className="px-6 py-4 text-gray-500 dark:text-white/50 text-[11px]">
                      {c.createdAt}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/contacts/edit/${c.id}`}>
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
                          onClick={() => handleDeleteContact(c.id)}
                          className="cursor-pointer"
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
                ))
              ) : (
                <tr>
                  <td
                    colSpan={7}
                    className="px-6 py-8 text-center text-gray-400 dark:text-white/40"
                  >
                    No contacts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
