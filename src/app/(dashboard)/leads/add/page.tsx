"use client";

import { Save, Target, DollarSign, Users, Info, ArrowRightLeft, Globe, User } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { RootState } from "@/redux/store/store";
import { useDispatch, useSelector } from "react-redux";
import { Field, Form, Formik } from "formik";
import * as z from "zod";
import { addNewLead } from "@/redux/slice/leads/leads";
import { toast } from "sonner";
import Link from "next/link";

// Validation Schema with Zod
const leadSchema = z.object({
  lead_title: z.string().min(3, "Lead title must be at least 3 characters"),
  customer_id: z.union([z.string(), z.number()]).transform(v => Number(v)).pipe(z.number().min(1, "Please select a customer")),
  expected_value: z.union([z.string(), z.number()]).transform(v => Number(v)).pipe(z.number().min(0, "Value cannot be negative")),
  source: z.string().min(1, "Please select a source"),
  user_id: z.union([z.string(), z.number()]).transform(v => Number(v)).pipe(z.number().min(1, "Please select a responsible user")),
});

export default function AddLeadPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const { customers } = useSelector((state: RootState) => state.customers);
  const { status: leadStatuses } = useSelector((state: RootState) => state.leadStatus);
  const defaultStatus = leadStatuses.length > 0 ? leadStatuses[0].name : "New";

  const initialValues = {
    lead_title: "",
    customer_id: 0,
    expected_value: 0,
    source: "",
    user_id: 0,
    description: "",
    status: defaultStatus,
  };

  const handleSaveLead = (values: any) => {
    const data = {
      ...values,
      customer_id: Number(values.customer_id),
      expected_value: Number(values.expected_value),
      user_id: Number(values.user_id),
      id: Date.now(),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    dispatch(addNewLead(data));
    toast.success("Lead created successfully!");
    router.push("/leads");
  };

  const validate = (values: any) => {
    const result = leadSchema.safeParse(values);
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
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleSaveLead}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Create Lead</h1>
                  <p className="text-gray-500 dark:text-white/40 text-sm mt-1 font-medium">Capture and track a new sales lead</p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <Button 
                  type="button"
                  variant="secondary" 
                  onClick={() => router.back()}
                  className="rounded-xl border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                >
                  Cancel
                </Button>
                <Button 
                  type="button"
                  variant="outline" 
                  className="rounded-xl gap-2 border-purple-500/30 text-purple-600 dark:text-purple-400 hover:bg-purple-500/10"
                >
                  <ArrowRightLeft size={18} />
                  <span>Convert to Deal</span>
                </Button>
                <Button 
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl gap-2 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-6"
                >
                  <Save size={18} />
                  <span>{isSubmitting ? "Saving..." : "Save Lead"}</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-purple-500/5 blur-3xl -mr-32 -mt-32 rounded-full" />
                  
                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-purple-500/10 flex items-center justify-center text-purple-500 shadow-inner">
                        <Target size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Lead Details</h2>
                    </div>

                    <div className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                          Lead Title <span className="text-red-500">*</span>
                        </label>
                        <Field 
                          name="lead_title"
                          placeholder="e.g. Enterprise License Expansion"
                          className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all shadow-sm ${
                            errors.lead_title && touched.lead_title 
                            ? "border-red-500 focus:ring-red-500/20" 
                            : "border-gray-200 dark:border-white/5 focus:ring-purple-500/20 focus:border-purple-500/50"
                          }`}
                        />
                        {errors.lead_title && touched.lead_title && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.lead_title as string}</p>
                        )}
                      </div>

                      {/* Customer */}
                      <div className="space-y-2 relative">
                        <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                          Customer <span className="text-red-500">*</span>
                        </label>
                        <div className="relative">
                          <Field
                            as="select"
                            name="customer_id"
                            className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none transition-all shadow-sm appearance-none cursor-pointer ${
                              errors.customer_id && touched.customer_id 
                              ? "border-red-500" 
                              : "border-gray-200 dark:border-white/5 focus:border-purple-500/50"
                            }`}
                          >
                            <option value={0}>Select Customer</option>
                            {customers.map((customer) => (
                              <option key={customer.id} value={customer.id}>
                                {customer.company_name}
                              </option>
                            ))}
                          </Field>
                        </div>
                        {errors.customer_id && touched.customer_id && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.customer_id as string}</p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Expected Value */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <DollarSign size={12}/> Expected Value
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">$</div>
                            <Field 
                              type="number" 
                              name="expected_value"
                              placeholder="0.00"
                              className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl pl-10 pr-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all shadow-sm ${
                                errors.expected_value && touched.expected_value 
                                ? "border-red-500" 
                                : "border-gray-200 dark:border-white/5 focus:border-purple-500/50"
                              }`}
                            />
                          </div>
                          {errors.expected_value && touched.expected_value && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.expected_value as string}</p>
                          )}
                        </div>

                        {/* Source */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <Globe size={12}/> Opportunity Source <span className="text-red-500">*</span>
                          </label>
                          <Field 
                            as="select"
                            name="source"
                            className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer shadow-sm ${
                              errors.source && touched.source 
                              ? "border-red-500" 
                              : "border-gray-200 dark:border-white/5 focus:border-purple-500/50"
                            }`}
                          >
                            <option value="">Select source</option>
                            <option value="Website">Website</option>
                            <option value="LinkedIn">LinkedIn</option>
                            <option value="Referral">Referral</option>
                            <option value="Cold Call">Cold Call</option>
                            <option value="Event">Event</option>
                          </Field>
                          {errors.source && touched.source && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.source as string}</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Description Card */}
                <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm">
                   <div className="flex items-center gap-3 mb-8">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/10 flex items-center justify-center text-blue-500 shadow-inner">
                        <Info size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">Additional Information</h2>
                    </div>
                    
                    <div className="space-y-2">
                      <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                        Description / Opportunity Notes
                      </label>
                      <Field 
                        as="textarea"
                        name="description"
                        rows={5}
                        placeholder="Describe the opportunity details, pain points, and next steps..."
                        className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500/50 transition-all resize-none shadow-sm"
                      />
                    </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="space-y-6">
                <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm">
                  <div className="flex items-center gap-3 mb-8">
                    <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 shadow-inner">
                      <Users size={20} />
                    </div>
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">Ownership</h3>
                  </div>
                  
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">Responsible User <span className="text-red-500">*</span></label>
                      <Field 
                        as="select"
                        name="user_id"
                        className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer ${
                          errors.user_id && touched.user_id 
                          ? "border-red-500" 
                          : "border-gray-200 dark:border-white/5 focus:border-purple-500/50"
                        }`}
                      >
                        <option value={0}>Select User</option>
                        <option value={1}>Ahmed Hassan</option>
                        <option value={2}>Sarah Johnson</option>
                        <option value={3}>John Smith</option>
                      </Field>
                      {errors.user_id && touched.user_id && (
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">{errors.user_id as string}</p>
                      )}
                    </div>

                    <div className="p-4 rounded-2xl bg-purple-500/5 border border-purple-500/10">
                      <div className="flex items-center gap-2 mb-2">
                        <User size={14} className="text-purple-500" />
                        <span className="text-[10px] font-bold text-purple-500 uppercase tracking-widest">Active Manager</span>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-white/40 leading-relaxed">
                        Assigning a manager ensures the opportunity is tracked and followed up within 24 hours.
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
