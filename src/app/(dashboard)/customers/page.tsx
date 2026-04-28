"use client";

import React from "react";
import Link from "next/link";
import { useCustomers } from "@/hooks/use-customers";
import { Button } from "@/components/ui/button";
import { StatusBadge } from "@/components/ui/status-badge";
import { SearchInput } from "@/components/ui/search-input";
import { initialCustomers } from "@/constants/mock-data";

export default function CustomersPage() {
  const { search, setSearch, handleDelete, filteredCustomers } = useCustomers(initialCustomers);

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Customers</h1>
          <p className="text-white/40 text-sm mt-1">
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

      <div className="rounded-xl bg-[#18181b] border border-white/[0.08] shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.04]">
          <SearchInput
            placeholder="Search customers by name, email, or company..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Table */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:h-1.5 [&::-webkit-scrollbar-thumb]:bg-white/10 [&::-webkit-scrollbar-thumb]:rounded-full hover:[&::-webkit-scrollbar-thumb]:bg-white/20 [&::-webkit-scrollbar-track]:bg-white/[0.02] [&::-webkit-scrollbar-track]:rounded-full pb-2">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/[0.04] bg-[#18181b]">
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Customer
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Company
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Contact Info
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Location
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Last Contact
                </th>
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider text-right">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((c) => (
                  <tr
                    key={c.id}
                    className="hover:bg-white/[0.02] transition-colors"
                  >
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        {c.avatar ? (
                          <img
                            src={c.avatar}
                            alt={c.name}
                            className="w-8 h-8 rounded-full object-cover border border-white/10"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-[#a855f7]/20 border border-[#a855f7]/30 flex items-center justify-center text-[#a855f7] text-[10px] font-bold">
                            {c.initials}
                          </div>
                        )}
                        <div>
                          <div className="font-medium text-white/90">
                            {c.name}
                          </div>
                          <div className="text-[10px] text-white/40 mt-0.5">
                            {c.role}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-2 text-white/70">
                        <svg
                          className="w-3.5 h-3.5 text-white/30"
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
                        {c.company}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex flex-col gap-1 text-[11px] text-white/50">
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
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-1.5 text-white/60 text-[11px]">
                        <svg
                          className="w-3.5 h-3.5 text-white/30"
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
                        {c.location}
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <StatusBadge status={c.status} />
                    </td>
                    <td className="px-4 py-3 text-white/50 text-[11px]">
                      {c.lastContact}
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Button asChild variant="secondary" size="sm">
                          <Link href={`/customers/add?edit=${c.id}`}>
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
                          onClick={() => handleDelete(c.id, c.name)}
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
                    className="px-4 py-8 text-center text-white/40"
                  >
                    No customers found matching your search.
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
