"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function AddCustomerPage() {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className="max-w-350 mx-auto animate-in fade-in duration-500 pb-20">
      <form className="space-y-6">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create New Customer
            </h1>
            <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
              Enter customer and facility details to add them to the CRM system.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/customers"
              className="px-6 py-2.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-medium text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all flex items-center gap-2"
            >
              Cancel
            </Link>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left/Main Column (7/12) */}
          <div className="lg:col-span-7 space-y-8">
            {/* Classification & Status */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-purple-500/10 text-purple-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Classification & Status</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-3">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Customer Type
                  </label>
                  <select
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="commercial">VIP</option>
                    <option value="individual">Regular</option>
                    <option value="individual">New</option>
                    <option value="individual">Returning</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Customer Category
                  </label>
                  <select
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                  >
                    <option value="A">Enterprise Companies</option>
                    <option value="B">Individual Professionals</option>
                    <option value="C">E-commerce Partners</option>
                    <option value="D">Educational Institutions</option>
                  </select>
                </div>

                <div className="space-y-3">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Assigned User
                  </label>
                  <input
                    type="text"
                    placeholder="Search for user..."
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                  />
                </div>

                <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 md:col-span-2">
                  <span className="text-sm font-semibold text-gray-700 dark:text-white/70">Account Status</span>
                  <button
                    type="button"
                    onClick={() => setIsActive(!isActive)}
                    className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                      isActive ? "bg-purple-600 shadow-md shadow-purple-500/20" : "bg-gray-200 dark:bg-white/10"
                    }`}
                  >
                    <span
                      className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                        isActive ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Basic Information */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-blue-500/10 text-blue-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Basic Information</h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Facility Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter company name"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Email Address
                  </label>
                  <input
                    type="email"
                    placeholder="example@company.com"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Primary Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="05xxxxxxxx"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Additional Phone
                  </label>
                  <input
                    type="tel"
                    placeholder="01xxxxxxxx"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Additional Notes */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-gray-500/10 text-gray-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Additional Notes</h2>
              </div>
              <div className="space-y-2">
                <textarea
                  rows={4}
                  placeholder="Any internal remarks or special instructions..."
                  className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all resize-none shadow-sm"
                />
              </div>
            </div>
          </div>

          {/* Right/Secondary Column (5/12) */}
          <div className="lg:col-span-5 space-y-8">
            {/* Address Information */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-orange-500/10 text-orange-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Location</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Main Address
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Enter street, building, district details..."
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 transition-all resize-none shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Additional Details
                  </label>
                  <textarea
                    rows={2}
                    placeholder="Building, floor, office number..."
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 transition-all resize-none shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Business Data */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-indigo-500/10 text-indigo-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Business</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Job Title
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. Procurement Manager"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Commercial Register
                  </label>
                  <input
                    type="text"
                    placeholder="1010xxxxxx"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Tax Certificate (Tax ID)
                  </label>
                  <input
                    type="text"
                    placeholder="300xxxxxxxxx"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>

            {/* Contact Person */}
            <div className="bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/8 rounded-2xl p-8 shadow-sm">
              <div className="flex items-center gap-4 mb-8">
                <div className="p-3 rounded-xl bg-emerald-500/10 text-emerald-500">
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <h2 className="text-xl font-bold text-gray-900 dark:text-white uppercase tracking-wider">Contact Person</h2>
              </div>
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Full Name
                  </label>
                  <input
                    type="text"
                    placeholder="Contact name"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 transition-all shadow-sm"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    placeholder="05xxxxxxxx"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 transition-all shadow-sm"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Global Footer Actions */}
        <div className="flex items-center justify-end gap-4 pt-12 border-t border-gray-100 dark:border-white/5">
          <Link
            href="/customers"
            className="px-10 py-3.5 rounded-xl bg-white dark:bg-white/5 border border-gray-200 dark:border-white/10 text-sm font-bold text-gray-700 dark:text-white hover:bg-gray-50 dark:hover:bg-white/10 transition-all"
          >
            Cancel
          </Link>
          <button
            type="button"
            className="px-12 py-3.5 rounded-xl bg-[#a855f7] text-white text-sm font-bold hover:bg-[#9333ea] transition-all  flex items-center gap-3"
          >
            <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
            </svg>
            Save Customer Data
          </button>
        </div>
      </form>
    </div>
  );
}
