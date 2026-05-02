"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Field, Form, Formik } from "formik";
import { CustomerType } from "@/redux/slice/customer-types/customer-types";
import { useDispatch, useSelector } from "react-redux";
import { CustomerCategory } from "@/redux/slice/customerCategory/customerCategory";
import { addNewCustomer, customers } from "@/redux/slice/customers/customers";
import { z } from "zod";
import { toast } from "sonner";


const customerSchema = z.object({
  company_name: z.string().min(3, "Company name must be at least 3 characters"),
  email: z.string().email("Invalid email address").or(z.string().length(0)),
  primary_phone: z.string().min(10, "Primary phone must be at least 10 digits"),
  customer_type_id: z.union([z.string(), z.number()]).transform(v => Number(v)).pipe(z.number().min(1, "Please select a customer type")),
  customer_category_id: z.union([z.string(), z.number()]).transform(v => Number(v)).pipe(z.number().min(1, "Please select a customer category")),
  contact_person_name: z.string().min(3, "Contact person name is required"),
  contact_person_phone: z.string().min(10, "Mobile number is required"),
});

export default function AddCustomerPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const customerTypes = useSelector((state: any) => state.customerTypes.types);
  const customerCategories = useSelector((state: any) => state.customerCategory.categories);
  const dispatch = useDispatch();

  const initialValues = {
    company_name: "",
    email: "",
    primary_phone: "",
    additional_phone: "",
    main_address: "",
    additional_address: "",
    job_title: "",
    commercial_register: "",
    tax_certificate: "",
    customer_type_id: customerTypes[0]?.id || 0,
    customer_category_id: customerCategories[0]?.id || 0,
    contact_person_name: "",
    contact_person_phone: "",
    notes: "",
    status: "active",
    assigned_user: "",
  };

  const handelSaveCustomer = (values: any) => {
    setIsLoading(true);
    const data: customers = {
      ...values,
      customer_type_id: Number(values.customer_type_id),
      customer_category_id: Number(values.customer_category_id),
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
      user_id: 0,
    };
    dispatch(addNewCustomer(data));
    toast.success("Customer added successfully", {
      description: `${values.company_name} has been added to the CRM.`,
    });
    setTimeout(() => router.push("/customers"), 800);
  };

  
  const validate = (values: any) => {
    const result = customerSchema.safeParse(values);
    if (!result.success) {
      const errors: any = {};
      result.error.issues.forEach((issue) => {
        errors[issue.path[0]] = issue.message;
      });
      return errors;
    }
    return {};
  };
  

  return (
    <div className="max-w-350 mx-auto animate-in fade-in duration-500 pb-20">
      <Formik initialValues ={initialValues} onSubmit={handelSaveCustomer} validate={validate}>
        {({ values, setFieldValue, errors, touched }) => (
          <Form className="space-y-6">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Create New Customer
                </h1>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                  Enter customer and Company details to add them to the CRM system.
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
                      <Field
                        as="select"
                        name="customer_type_id"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value={0}>Select Type</option>
                        {customerTypes.map((type: CustomerType) => (
                          <option key={type.id} value={type.id}>{type.name}</option>
                        ))}
                      </Field>
                      {errors.customer_type_id && touched.customer_type_id && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.customer_type_id as string}</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Customer Category
                      </label>
                      <Field
                        as="select"
                        name="customer_category_id"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                      >
                        <option value={0}>Select Category</option>
                        {customerCategories.map((c: CustomerCategory) => (
                          <option key={c.id} value={c.id}>{c.name}</option>
                        ))}
                      </Field>
                      {errors.customer_category_id && touched.customer_category_id && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.customer_category_id as string}</div>
                      )}
                    </div>

                    <div className="space-y-3">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Assigned User
                      </label>
                      <Field
                        type="text"
                        name="assigned_user"
                        placeholder="Search for user..."
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                      />
                    </div>

                    <div className="flex items-center justify-between pt-6 border-t border-gray-100 dark:border-white/5 md:col-span-2">
                      <span className="text-sm font-semibold text-gray-700 dark:text-white/70">Account Status</span>
                      <button
                        type="button"
                        onClick={() => setFieldValue("status", values.status === "active" ? "inactive" : "active")}
                        className={`relative inline-flex h-7 w-12 items-center rounded-full transition-colors focus:outline-none ${
                          values.status === "active" ? "bg-purple-600 shadow-md shadow-purple-500/20" : "bg-gray-200 dark:bg-white/10"
                        }`}
                      >
                        <span
                          className={`inline-block h-5 w-5 transform rounded-full bg-white transition-transform ${
                            values.status === "active" ? "translate-x-6" : "translate-x-1"
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
                        Company Name <span className="text-red-500">*</span>
                      </label>
                      <Field
                        required
                        type="text"
                        name="company_name"
                        placeholder="Enter company name"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                      />
                      {errors.company_name && touched.company_name && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.company_name as string}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Email Address
                      </label>
                      <Field
                        type="email"
                        name="email"
                        placeholder="example@company.com"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                      />
                      {errors.email && touched.email && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.email as string}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Primary Phone
                      </label>
                      <Field
                        type="tel"
                        name="primary_phone"
                        placeholder="05xxxxxxxx"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-blue-500/50 transition-all shadow-sm"
                      />
                      {errors.primary_phone && touched.primary_phone && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.primary_phone as string}</div>
                      )}
                    </div>
                    <div className="space-y-2 md:col-span-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Additional Phone
                      </label>
                      <Field
                        type="tel"
                        name="additional_phone"
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
                    <Field
                      as="textarea"
                      name="notes"
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
                      <Field
                        as="textarea"
                        name="main_address"
                        rows={2}
                        placeholder="Enter street, building, district details..."
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-orange-500/50 transition-all resize-none shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Additional Details
                      </label>
                      <Field
                        as="textarea"
                        name="additional_address"
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
                      <Field
                        type="text"
                        name="job_title"
                        placeholder="e.g. Procurement Manager"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Commercial Register
                      </label>
                      <Field
                        type="text"
                        name="commercial_register"
                        placeholder="1010xxxxxx"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-indigo-500/50 transition-all shadow-sm"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Tax Certificate (Tax ID)
                      </label>
                      <Field
                        type="text"
                        name="tax_certificate"
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
                      <Field
                        type="text"
                        name="contact_person_name"
                        placeholder="Contact name"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 transition-all shadow-sm"
                      />
                      {errors.contact_person_name && touched.contact_person_name && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.contact_person_name as string}</div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                        Mobile Number
                      </label>
                      <Field
                        type="tel"
                        name="contact_person_phone"
                        placeholder="05xxxxxxxx"
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-emerald-500/50 transition-all shadow-sm"
                      />
                      {errors.contact_person_phone && touched.contact_person_phone && (
                        <div className="text-red-500 text-[10px] font-bold mt-1 uppercase tracking-wider">{errors.contact_person_phone as string}</div>
                      )}
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
                type="submit"
                disabled={isLoading}
                className="px-12 py-3.5 rounded-xl bg-[#a855f7] text-white text-sm font-bold hover:bg-[#9333ea] transition-all flex items-center gap-3 cursor-pointer disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                    Saving...
                  </>
                ) : (
                  <>
                    <svg width="22" height="22" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                    </svg>
                    Save Customer Data
                  </>
                )}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
