"use client";

import Link from "next/link";
import { Formik, Form, Field } from "formik";
import { addNewContact, contacts } from "@/redux/slice/contacts/contacts";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

export default function AddContactPage() {


  const { customers } = useSelector((state: RootState) => state.customers);
  const dispatch = useDispatch()


  const initialValues: Partial<contacts> = {
      name: "",
      phone: "",
      email: "",
      contact_method: "email",
      job_title: "",
      customer_id: 0,
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
  };

  const handleSaveContact = (values: any) => {
    const data: contacts = {
      ...values,
      id: Date.now(),
      customer_id: Number(values.customer_id)
    }
    dispatch(addNewContact(data))
  }


  return (
    <div className="max-w-250 mx-auto animate-in fade-in duration-500 pb-20">
      <Formik initialValues={initialValues} onSubmit={handleSaveContact}>
        {({ values, setFieldValue }) => (
          <Form className="space-y-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
              <div>
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                  Create New Contact
                </h1>
                <p className="text-gray-500 dark:text-white/40 text-sm mt-1">
                  Add a new professional contact to your CRM database.
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

                {/* Company Name */}
                <div className="space-y-2 relative">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="customer_id"
                    as="select"
                    placeholder="Enter company name..."
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                  >
                    <option value={0} disabled>Select Company</option>
                    {
                      customers.map( (customer) => (
                        <option key={customer.id} value={customer.id}>
                          {
                            customer.company_name
                          }
                        </option>
                      ))
                    }
                  </Field>
                </div>

                {/* Full Name */}
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <Field
                    name="name"
                    type="text"
                    placeholder="Enter contact name"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                  />
                </div>

                {/* Email and Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                      Email Address
                    </label>
                    <Field
                      name="email"
                      type="email"
                      placeholder="example@email.com"
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                      Phone Number
                    </label>
                    <Field
                      name="phone"
                      type="tel"
                      placeholder="05xxxxxxxx"
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                    />
                  </div>
                </div>

                {/* Job Title */}
                <div className="space-y-2">
                  <label className="text-[11px] text-gray-500 dark:text-white/50 font-bold uppercase tracking-wider">
                    Job Title
                  </label>
                  <Field
                    name="job_title"
                    type="text"
                    placeholder="e.g. Sales Manager"
                    className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none focus:border-purple-500/50 transition-all shadow-sm"
                  />
                </div>
              </div>

              {/* Card 2: Communication & Tips */}
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
                        onClick={() => setFieldValue("contact_method", "phone")}
                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                          values.contact_method === "phone"
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
                        onClick={() => setFieldValue("contact_method", "email")}
                        className={`flex items-center justify-center gap-3 p-4 rounded-xl border transition-all ${
                          values.contact_method === "email"
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

                {/* Pro Tip */}
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
          </Form>
        )}
      </Formik>
    </div>
  );
}
