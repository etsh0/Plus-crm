"use client";

import React, { useState } from "react";

const initialContacts = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "VP of Sales",
    avatar: "https://i.pravatar.cc/150?img=1",
    company: "Acme Corp",
    email: "sarah.j@acmecorp.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "Hot Lead",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?img=11",
    company: "TechStart Inc",
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    status: "Customer",
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Director of IT",
    avatar: "https://i.pravatar.cc/150?img=5",
    company: "Global Solutions",
    email: "emily@globalsol.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    status: "Warm Lead",
    lastContact: "3 days ago",
  },
  {
    id: 4,
    name: "James Wilson",
    role: "CTO",
    avatar: "https://i.pravatar.cc/150?img=12",
    company: "Innovate Ltd",
    email: "jwilson@innovate.com",
    phone: "+1 (555) 456-7890",
    location: "Boston, MA",
    status: "Cold Lead",
    lastContact: "2 weeks ago",
  },
  {
    id: 5,
    name: "Lisa Anderson",
    role: "Marketing Manager",
    avatar: "",
    initials: "LA",
    company: "NextGen Co",
    email: "l.anderson@nextgen.co",
    phone: "+1 (555) 567-8901",
    location: "Seattle, WA",
    status: "Hot Lead",
    lastContact: "Yesterday",
  },
  {
    id: 6,
    name: "David Martinez",
    role: "Operations Lead",
    avatar: "https://i.pravatar.cc/150?img=8",
    company: "BuildIt Inc",
    email: "david.m@buildit.com",
    phone: "+1 (555) 678-9012",
    location: "Chicago, IL",
    status: "Customer",
    lastContact: "4 days ago",
  },
];

export default function ContactsPage() {
  const [contacts, setContacts] = useState(initialContacts);
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredContacts = contacts.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()) ||
      c.company.toLowerCase().includes(search.toLowerCase()),
  );

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "Hot Lead":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-red-500/10 text-red-500 border border-red-500/20">
            {status}
          </span>
        );
      case "Customer":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
            {status}
          </span>
        );
      case "Warm Lead":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-amber-500/10 text-amber-500 border border-amber-500/20">
            {status}
          </span>
        );
      case "Cold Lead":
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-blue-500/10 text-blue-500 border border-blue-500/20">
            {status}
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-white/5 text-white/50 border border-white/10">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-8 max-w-[1600px] mx-auto">
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Contacts</h1>
          <p className="text-white/40 text-sm mt-1">
            Manage your customer relationships and leads
          </p>
        </div>
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 rounded-lg bg-[#a855f7] text-sm cursor-pointer font-medium text-white hover:bg-[#9333ea] transition-all duration-200 flex items-center gap-2"
        >
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
        </button>
      </div>

      <div className="rounded-xl bg-[#18181b] border border-white/[0.08] shadow-2xl overflow-hidden">
        {/* Toolbar */}
        <div className="p-4 border-b border-white/[0.04]">
          <div className="relative max-w-xl">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-white/30"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search contacts by name, email, or company..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full bg-[#27272a]/50 border border-white/5 rounded-lg pl-9 pr-4 py-2 text-sm text-white placeholder-white/30 outline-none focus:border-white/20 transition-colors"
            />
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
          <table className="w-full text-xs text-left whitespace-nowrap">
            <thead>
              <tr className="border-b border-white/[0.04] bg-[#18181b]">
                <th className="px-4 py-3 text-[11px] font-medium text-white/50 uppercase tracking-wider">
                  Contact
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
              </tr>
            </thead>
            <tbody className="divide-y divide-white/[0.04]">
              {filteredContacts.length > 0 ? (
                filteredContacts.map((c) => (
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
                    <td className="px-4 py-3">{getStatusBadge(c.status)}</td>
                    <td className="px-4 py-3 text-white/50 text-[11px]">
                      {c.lastContact}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-8 text-center text-white/40"
                  >
                    No contacts found matching your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Contact Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-[#18181b] border border-white/10 rounded-2xl w-full max-w-md overflow-hidden shadow-2xl">
            <div className="px-6 py-5 border-b border-white/[0.04] flex items-center justify-between">
              <h2 className="text-lg font-semibold text-white">
                Add New Contact
              </h2>
              <button
                onClick={() => setIsModalOpen(false)}
                className="text-white/40 hover:text-white transition-colors"
              >
                <svg
                  width="20"
                  height="20"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
            <div className="p-5 grid grid-cols-2 gap-x-4 gap-y-3">
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Name</label>
                <input type="text" placeholder="Sarah Johnson" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Email</label>
                <input type="email" placeholder="sarah@example.com" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Company</label>
                <input type="text" placeholder="Acme Corp" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Phone</label>
                <input type="tel" placeholder="+1 (555) 234-5678" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Location</label>
                <input type="text" placeholder="City, State" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
              <div className="flex flex-col gap-1.5 col-span-2 sm:col-span-1">
                <label className="text-[11px] text-white/50 font-medium uppercase tracking-wider">Position</label>
                <input type="text" placeholder="Job title" className="bg-[#27272a]/50 border border-white/5 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-[#a855f7]/50 focus:ring-1 focus:ring-[#a855f7]/50 transition-all" />
              </div>
            </div>
            <div className="px-6 py-4 border-t border-white/[0.04] flex items-center justify-end gap-3 bg-[#18181b]/50">
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg text-sm font-medium text-white/60 hover:text-white hover:bg-white/5 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => setIsModalOpen(false)}
                className="px-4 py-2 rounded-lg bg-[#a855f7] text-sm font-medium text-white hover:bg-[#9333ea] transition-all"
              >
                Save Contact
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
