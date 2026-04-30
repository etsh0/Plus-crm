"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AddContactPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState({
    customer_id: "",
    name: "",
    email: "",
    phone: "",
    position: "",
    preferred_contact_method: "Email",
  });

  const [customers, setCustomers] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Load customers for the dropdown
  useEffect(() => {
    const savedCustomers = JSON.parse(
      localStorage.getItem("crm_customers") || "[]",
    );
    setCustomers(savedCustomers);
  }, []);

  // Load data if in edit mode
  useEffect(() => {
    if (editId) {
      const savedContacts = JSON.parse(
        localStorage.getItem("crm_contacts") || "[]",
      );
      const contactToEdit = savedContacts.find(
        (c: any) => c.id.toString() === editId,
      );

      if (contactToEdit) {
        if (contactToEdit.fullData) {
          setFormData(contactToEdit.fullData);
        } else {
          // Fallback mapping
          setFormData({
            customer_id: contactToEdit.customerId || "",
            name: contactToEdit.name || "",
            email: contactToEdit.email || "",
            phone: contactToEdit.phone || "",
            position: contactToEdit.role || "",
            preferred_contact_method: contactToEdit.preferredContact || "Email",
          });
        }
        
        // Find company name for search term display
        const savedCustomers = JSON.parse(localStorage.getItem("crm_customers") || "[]");
        const company = savedCustomers.find((c: any) => c.id.toString() === contactToEdit.customerId || c.id === contactToEdit.customerId);
        if (company) setSearchTerm(company.company || company.name);
      }
    }
  }, [editId]);

  // Click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsSearching(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedContacts = JSON.parse(
      localStorage.getItem("crm_contacts") || "[]",
    );

    const company = customers.find(c => c.id.toString() === formData.customer_id);
    const contactData = {
      id: editId ? Number(editId) : Date.now(),
      name: formData.name,
      role: formData.position,
      email: formData.email,
      phone: formData.phone,
      company: company ? (company.company || company.name) : "No Company",
      customerId: formData.customer_id,
      preferredContact: formData.preferred_contact_method,
      lastContact: "Not contacted yet",
      status: "Active",
      initials: formData.name
        .split(" ")
        .filter(Boolean)
        .map((n: string) => n[0])
        .join("")
        .toUpperCase()
        .slice(0, 2) || "??",
      fullData: formData,
    };

    if (editId) {
      const updatedContacts = savedContacts.map((c: any) =>
        c.id.toString() === editId ? contactData : c,
      );
      localStorage.setItem("crm_contacts", JSON.stringify(updatedContacts));
      toast.success("Contact updated successfully");
    } else {
      localStorage.setItem(
        "crm_contacts",
        JSON.stringify([...savedContacts, contactData]),
      );
      toast.success("Contact created successfully");
    }

    router.push("/contacts");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const filteredCustomers = customers.filter(c => 
    (c.company || c.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-[1000px] mx-auto animate-in fade-in duration-500 pb-20">
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {editId ? "Edit Contact" : "Create New Contact"}
            </h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
              {editId
                ? "Update contact details and company association."
                : "Add a new professional contact to your CRM database."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/contacts"
              className="px-6 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#a855f7] text-white text-sm font-bold hover:bg-[#9333ea] transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
            >
              <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
              </svg>
              Save Contact
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Card 1: Main Contact Info */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Details</h2>
            </div>

            {/* Searchable Select for Company */}
            <div className="space-y-2 relative" ref={dropdownRef}>
              <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                Choose Company (Customer) <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search for a company..."
                  value={searchTerm}
                  onChange={(e) => {
                    setSearchTerm(e.target.value);
                    setIsSearching(true);
                  }}
                  onFocus={() => setIsSearching(true)}
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400">
                  <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {isSearching && (
                <div className="absolute z-50 w-full mt-2 bg-white dark:bg-[#1c1c21] border border-gray-200 dark:border-white/10 rounded-xl shadow-2xl max-h-60 overflow-y-auto animate-in slide-in-from-top-2 duration-200">
                  {filteredCustomers.length > 0 ? (
                    filteredCustomers.map((customer) => (
                      <button
                        key={customer.id}
                        type="button"
                        onClick={() => {
                          setFormData(prev => ({ ...prev, customer_id: customer.id.toString() }));
                          setSearchTerm(customer.company || customer.name);
                          setIsSearching(false);
                        }}
                        className="w-full text-left px-4 py-3 text-sm text-gray-700 dark:text-white/80 hover:bg-purple-500/10 hover:text-purple-500 transition-colors border-b border-gray-50 dark:border-white/5 last:border-0"
                      >
                        <div className="font-bold">{customer.company || customer.name}</div>
                        {customer.company && <div className="text-[10px] opacity-50 uppercase tracking-tighter">{customer.name}</div>}
                      </button>
                    ))
                  ) : (
                    <div className="px-4 py-8 text-center text-gray-500 text-xs">No companies found</div>
                  )}
                </div>
              )}
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                required
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                placeholder="Enter contact name"
                className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Email Address
                </label>
                <input
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  type="email"
                  placeholder="example@email.com"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Phone Number
                </label>
                <input
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  type="tel"
                  placeholder="05xxxxxxxx"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                Position (Job Title)
              </label>
              <input
                name="position"
                value={formData.position}
                onChange={handleChange}
                type="text"
                placeholder="e.g. Sales Manager"
                className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
              />
            </div>
          </div>

          {/* Card 2: Preferences */}
          <div className="space-y-8">
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Communication</h2>
              </div>

              <div className="space-y-4">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Preferred Contact Method
                </label>
                <div className="grid grid-cols-2 gap-4">
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, preferred_contact_method: "Phone" }))}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                      formData.preferred_contact_method === "Phone"
                        ? "bg-purple-500/10 border-purple-500 text-purple-500 shadow-lg shadow-purple-500/10"
                        : "bg-gray-50 dark:bg-[#0f0f11] border-gray-200 dark:border-white/5 text-gray-500 hover:border-purple-500/30"
                    }`}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    <span className="text-sm font-bold">Phone</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setFormData(prev => ({ ...prev, preferred_contact_method: "Email" }))}
                    className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                      formData.preferred_contact_method === "Email"
                        ? "bg-purple-500/10 border-purple-500 text-purple-500 shadow-lg shadow-purple-500/10"
                        : "bg-gray-50 dark:bg-[#0f0f11] border-gray-200 dark:border-white/5 text-gray-500 hover:border-purple-500/30"
                    }`}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <span className="text-sm font-bold">Email</span>
                  </button>
                </div>
              </div>
            </div>

            <div className="bg-purple-500/5 rounded-2xl p-6 border border-purple-500/10">
                <div className="flex items-start gap-4">
                    <div className="mt-1 text-purple-500">
                        <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                    </div>
                    <div>
                        <h4 className="text-sm font-bold text-gray-900 dark:text-white">Pro Tip</h4>
                        <p className="text-xs text-gray-500 dark:text-white/40 mt-1 leading-relaxed">
                            Linking a contact to a company helps you track communications more effectively across your team.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
