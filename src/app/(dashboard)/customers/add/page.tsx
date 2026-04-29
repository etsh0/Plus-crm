"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "sonner";

export default function AddCustomerPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const editId = searchParams.get("edit");

  const [formData, setFormData] = useState({
    // Basic Info
    companyName: "",
    companyEmail: "",
    companyPhone: "",
    taxId: "",

    // Contact Person
    contactName: "",
    contactTitle: "",
    contactPhone: "",
    contactEmail: "",

    // Address
    city: "",
    addressDetail: "",

    // Credit
    creditLimit: "",
    paymentTerms: "",
    category: "General",
    rating: "A",

    // Notes
    notes: "",
  });

  // Load data if in edit mode
  React.useEffect(() => {
    if (editId) {
      const savedCustomers = JSON.parse(
        localStorage.getItem("crm_customers") || "[]",
      );
      const customerToEdit = savedCustomers.find(
        (c: any) => c.id.toString() === editId,
      );

      if (customerToEdit) {
        // If we have fullData stored, use it, otherwise map from the top-level properties
        if (customerToEdit.fullData) {
          setFormData(customerToEdit.fullData);
        } else {
          setFormData((prev) => ({
            ...prev,
            companyName: customerToEdit.company || "",
            companyEmail: customerToEdit.email || "",
            companyPhone: customerToEdit.phone || "",
            contactName: customerToEdit.name || "",
            contactTitle: customerToEdit.role || "",
            city: customerToEdit.location || "",
            contactEmail: customerToEdit.email || "",
            contactPhone: customerToEdit.phone || "",
          }));
        }
      }
    }
  }, [editId]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const savedCustomers = JSON.parse(
      localStorage.getItem("crm_customers") || "[]",
    );

    if (editId) {
      // UPDATE EXISTING
      const updatedCustomers = savedCustomers.map((c: any) => {
        if (c.id.toString() === editId) {
          return {
            ...c,
            name: formData.contactName || formData.companyName,
            role: formData.contactTitle,
            company: formData.companyName,
            email: formData.contactEmail || formData.companyEmail,
            phone: formData.contactPhone || formData.companyPhone,
            location: formData.city,
            initials: (formData.contactName || formData.companyName)
              .split(" ")
              .map((n) => n[0])
              .join("")
              .toUpperCase()
              .slice(0, 2),
            fullData: formData,
          };
        }
        return c;
      });
      localStorage.setItem("crm_customers", JSON.stringify(updatedCustomers));
      toast.success("Customer updated successfully");
    } else {
      // CREATE NEW
      const newCustomer = {
        id: Date.now(),
        name: formData.contactName || formData.companyName,
        role: formData.contactTitle,
        company: formData.companyName,
        email: formData.contactEmail || formData.companyEmail,
        phone: formData.contactPhone || formData.companyPhone,
        location: formData.city,
        status: "Active",
        lastContact: "Not contacted yet",
        initials: (formData.contactName || formData.companyName)
          .split(" ")
          .map((n) => n[0])
          .join("")
          .toUpperCase()
          .slice(0, 2),
        fullData: formData,
      };
      localStorage.setItem(
        "crm_customers",
        JSON.stringify([...savedCustomers, newCustomer]),
      );
      toast.success("Customer created successfully");
    }

    router.push("/customers");
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="max-w-5xl mx-auto animate-in fade-in duration-500">
      <form
        onSubmit={handleSubmit}
        className="space-y-6 pb-20"
      >
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              {editId ? "Edit Customer" : "Create New Customer"}
            </h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
              {editId
                ? "Update existing customer details and contact information."
                : "Register a new company and its contact persons in the system."}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/customers"
              className="px-5 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 19l-7-7 7-7"
                />
              </svg>
              Back
            </Link>
            <button
              type="submit"
              className="px-6 py-2.5 rounded-xl bg-[#a855f7] text-white text-sm font-bold hover:bg-[#9333ea] transition-all shadow-lg shadow-purple-500/20 flex items-center gap-2 cursor-pointer"
            >
              <svg
                width="18"
                height="18"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4"
                />
              </svg>
              Save Data
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Section 1: Customer Basic Information */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-blue-500/10 text-blue-500">
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
                    d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Basic Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Company Name
                </label>
                <input
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleChange}
                  type="text"
                  placeholder="Enter company legal name"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Company Email
                  </label>
                  <input
                    required
                    name="companyEmail"
                    value={formData.companyEmail}
                    onChange={handleChange}
                    type="email"
                    placeholder="corp@company.com"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Company Phone
                  </label>
                  <input
                    required
                    name="companyPhone"
                    value={formData.companyPhone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Tax ID / Commercial Registration
                </label>
                <input
                  name="taxId"
                  value={formData.taxId}
                  onChange={handleChange}
                  type="text"
                  placeholder="VAT/TAX Registration Number"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Contact Person */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500">
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
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Contact Person</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    required
                    name="contactName"
                    value={formData.contactName}
                    onChange={handleChange}
                    type="text"
                    placeholder="Primary contact name"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Job Title
                  </label>
                  <input
                    name="contactTitle"
                    value={formData.contactTitle}
                    onChange={handleChange}
                    type="text"
                    placeholder="e.g. Sales Manager"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    type="tel"
                    placeholder="+1 (000) 000-0000"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Direct Email
                  </label>
                  <input
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    type="email"
                    placeholder="contact@email.com"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Section 3: Address Information */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-orange-500/10 text-orange-500">
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
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Address Information</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  City
                </label>
                <input
                  required
                  name="city"
                  value={formData.city}
                  onChange={handleChange}
                  type="text"
                  placeholder="e.g. New York, London"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>
              <div className="space-y-1.5">
                <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                  Full Detailed Address
                </label>
                <input
                  required
                  name="addressDetail"
                  value={formData.addressDetail}
                  onChange={handleChange}
                  type="text"
                  placeholder="Street name, Building No, Office No"
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 focus:ring-1 focus:ring-orange-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                />
              </div>
            </div>
          </div>

          {/* Section 4: Credit Classification */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-purple-500/10 text-purple-500">
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
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Credit Classification</h2>
            </div>

            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Credit Limit ($)
                  </label>
                  <input
                    name="creditLimit"
                    value={formData.creditLimit}
                    onChange={handleChange}
                    type="number"
                    placeholder="0.00"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20"
                  />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Payment Terms
                  </label>
                  <select
                    name="paymentTerms"
                    value={formData.paymentTerms}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer placeholder:text-gray-400 dark:placeholder:text-white/20"
                  >
                    <option value="">Select terms</option>
                    <option value="Net 30">Net 30</option>
                    <option value="Net 60">Net 60</option>
                    <option value="Immediate">Immediate</option>
                  </select>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Customer Category
                  </label>
                  <select
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 focus:ring-1 focus:ring-purple-500/50 transition-all appearance-none cursor-pointer placeholder:text-gray-400 dark:placeholder:text-white/20"
                  >
                    <option value="General">General</option>
                    <option value="Enterprise">Enterprise</option>
                    <option value="Retail">Retail</option>
                    <option value="VIP">VIP</option>
                  </select>
                </div>
                <div className="space-y-1.5">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Rating
                  </label>
                  <div className="flex gap-2">
                    {["A", "B", "C"].map((r) => (
                      <button
                        key={r}
                        type="button"
                        onClick={() =>
                          setFormData((prev) => ({ ...prev, rating: r }))
                        }
                        className={`flex-1 py-3 rounded-xl text-sm font-bold border transition-all ${
                          formData.rating === r
                            ? "bg-[#a855f7] border-[#a855f7] text-white shadow-lg shadow-[#a855f7]/20"
                            : "bg-gray-50 dark:bg-[#0f0f11] border-gray-200 dark:border-white/5 text-gray-400 dark:text-white/40 hover:border-gray-300 dark:hover:border-white/10"
                        }`}
                      >
                        {r}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 5: Additional Notes */}
          <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/[0.08] rounded-2xl p-6 space-y-5 shadow-sm col-span-1 lg:col-span-2 transition-colors duration-300">
            <div className="flex items-center gap-3 pb-2 border-b border-gray-100 dark:border-white/[0.04]">
              <div className="p-2 rounded-lg bg-gray-500/10 text-gray-500">
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
                    d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                  />
                </svg>
              </div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Additional Notes</h2>
            </div>

            <div className="space-y-1.5">
              <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                Internal Notes
              </label>
              <textarea
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={4}
                placeholder="Add any specific instructions or internal comments regarding this customer..."
                className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 focus:ring-1 focus:ring-blue-500/50 transition-all placeholder:text-gray-400 dark:placeholder:text-white/20 resize-none"
              />
            </div>
          </div>
        </div>
      </form>
    </div>
  );
}
