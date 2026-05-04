"use client";
import {
  ChevronLeft,
  Save,
  Target,
  DollarSign,
  Users,
  Info,
  Calendar as CalendarIcon,
} from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { Field, Form, Formik } from "formik";
import * as z from "zod";
import { updateDeal } from "@/redux/slice/deals/deals";
import { toast } from "sonner";
import { users } from "@/constants/users";

// Validation Schema with Zod
const dealSchema = z.object({
  deal_title: z.string().min(3, "Deal title must be at least 3 characters"),
  customer_id: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(1, "Please select a customer")),
  value: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(0, "Value cannot be negative")),
  status: z.enum(["NEW", "PROPOSAL", "WON", "LOST"]),
  expectedCloseDate: z.string().optional(),
  user_id: z
    .union([z.string(), z.number()])
    .transform((v) => Number(v))
    .pipe(z.number().min(1, "Please select an assigned user")),
});
export default function EditDealPage() {
  const params = useParams();
  const id = params.id;
  const router = useRouter();
  const dispatch = useDispatch();
  const { customers } = useSelector((state: RootState) => state.customers);
  const { deals } = useSelector((state: RootState) => state.deals);
  const deal = deals.find((deal) => deal.id === Number(id));
  const { status: leadStatuses } = useSelector(
    (state: RootState) => state.leadStatus,
  );
  const defaultStatus = leadStatuses.length > 0 ? leadStatuses[0].name : "New";

  const initialValues = {
    deal_title: deal?.deal_title || "",
    customer_id: deal?.customer_id || 0,
    value: deal?.value || 0,
    status: deal?.status || defaultStatus,
    expectedCloseDate: deal?.expectedCloseDate || "",
    user_id: deal?.user_id || 0,
    description: deal?.description || "",
  };

  // Validation function
  const validate = (values: any) => {
    const errors: any = {};

    if (!values.deal_title) {
      errors.deal_title = "Deal title is required";
    } else if (values.deal_title.length < 3) {
      errors.deal_title = "Deal title must be at least 3 characters";
    }

    if (!values.customer_id) {
      errors.customer_id = "Customer is required";
    }

    if (!values.value || Number(values.value) < 0) {
      errors.value = "Value must be a positive number";
    }

    if (!values.status) {
      errors.status = "Status is required";
    }

    if (!values.user_id) {
      errors.user_id = "Assigned user is required";
    }

    return errors;
  };

  const handleEditDeal = (values: any) => {
    const data = {
      ...values,
      customer_id: Number(values.customer_id),
      value: Number(values.value),
      user_id: Number(values.user_id),
      id: Number(id),
      createdAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "2-digit",
        year: "numeric",
      }),
    };
    dispatch(updateDeal(data));
    toast.success("Deal created successfully!");
    router.push("/deals");
  };

  return (
    <div className="max-w-6xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700 pb-12">
      <Formik
        initialValues={initialValues}
        validate={validate}
        onSubmit={handleEditDeal}
      >
        {({ errors, touched, isSubmitting }) => (
          <Form className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => router.back()}
                  className="p-2.5 rounded-xl bg-white dark:bg-[#18181b] border border-gray-200 dark:border-white/10 hover:border-violet-500/50 transition-all text-gray-500 dark:text-white/40 hover:text-violet-500 group shadow-sm"
                >
                  <ChevronLeft
                    size={20}
                    className="group-hover:-translate-x-0.5 transition-transform"
                  />
                </button>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                    Create New Deal
                  </h1>
                  <p className="text-gray-500 dark:text-white/40 text-sm mt-1 font-medium">
                    Add a new opportunity to your sales pipeline
                  </p>
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
                  type="submit"
                  disabled={isSubmitting}
                  className="rounded-xl gap-2 bg-violet-600 hover:bg-violet-700 text-white shadow-lg shadow-violet-500/20 px-6"
                >
                  <Save size={18} />
                  <span>{isSubmitting ? "Saving..." : "Save Deal"}</span>
                </Button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Form Content */}
              <div className="lg:col-span-2 space-y-8">
                <div className="bg-white dark:bg-[#18181b] rounded-3xl p-8 border border-gray-200 dark:border-white/8 shadow-sm space-y-8 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-violet-500/5 blur-3xl -mr-32 -mt-32 rounded-full" />

                  <div className="relative z-10 space-y-8">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center text-violet-500 shadow-inner">
                        <Target size={20} />
                      </div>
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                        Deal Information
                      </h2>
                    </div>

                    <div className="space-y-6">
                      {/* Title */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                          Deal Title <span className="text-red-500">*</span>
                        </label>
                        <Field
                          name="deal_title"
                          placeholder="e.g. Website Project Expansion"
                          className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all shadow-sm ${
                            errors.deal_title && touched.deal_title
                              ? "border-red-500 focus:ring-red-500/20"
                              : "border-gray-200 dark:border-white/5 focus:ring-violet-500/20 focus:border-violet-500/50"
                          }`}
                        />
                        {errors.deal_title && touched.deal_title && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                            {errors.deal_title as string}
                          </p>
                        )}
                      </div>

                      {/* Customer */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                          Customer / Account{" "}
                          <span className="text-red-500">*</span>
                        </label>
                        <Field
                          as="select"
                          name="customer_id"
                          className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer shadow-sm ${
                            errors.customer_id && touched.customer_id
                              ? "border-red-500"
                              : "border-gray-200 dark:border-white/5 focus:border-violet-500/50"
                          }`}
                        >
                          <option value={0}>Select Customer</option>
                          {customers.map((customer) => (
                            <option key={customer.id} value={customer.id}>
                              {customer.company_name}
                            </option>
                          ))}
                        </Field>
                        {errors.customer_id && touched.customer_id && (
                          <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                            {errors.customer_id as string}
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Value */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                            <DollarSign size={12} /> Value ($){" "}
                            <span className="text-red-500">*</span>
                          </label>
                          <div className="relative">
                            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 font-bold">
                              $
                            </div>
                            <Field
                              type="number"
                              name="value"
                              placeholder="10000"
                              className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-2xl pl-10 pr-5 py-4 text-sm text-gray-900 dark:text-white outline-none transition-all shadow-sm ${
                                errors.value && touched.value
                                  ? "border-red-500"
                                  : "border-gray-200 dark:border-white/5 focus:border-violet-500/50"
                              }`}
                            />
                          </div>
                          {errors.value && touched.value && (
                            <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                              {errors.value as string}
                            </p>
                          )}
                        </div>

                        {/* Status */}
                        <div className="space-y-2">
                          <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                            Status
                          </label>
                          <Field
                            as="select"
                            name="status"
                            className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 transition-all appearance-none cursor-pointer shadow-sm"
                          >
                            <option value="NEW">New</option>
                            <option value="PROPOSAL">Proposal</option>
                            <option value="WON">Won</option>
                            <option value="LOST">Lost</option>
                          </Field>
                        </div>
                      </div>

                      {/* Close Date */}
                      <div className="space-y-2">
                        <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1 flex items-center gap-2">
                          <CalendarIcon size={12} /> Expected Close Date
                        </label>
                        <Field
                          type="date"
                          name="expectedCloseDate"
                          className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:border-violet-500/50 transition-all shadow-sm"
                        />
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
                    <h2 className="text-xl font-bold text-gray-900 dark:text-white tracking-tight">
                      Additional Information
                    </h2>
                  </div>

                  <div className="space-y-2">
                    <label className="text-[11px] font-black text-gray-400 dark:text-white/30 uppercase tracking-widest ml-1">
                      Description / Deal Notes
                    </label>
                    <Field
                      as="textarea"
                      name="description"
                      rows={5}
                      placeholder="Client wants full website project with SEO..."
                      className="w-full bg-gray-50 dark:bg-[#0f0f11] border border-gray-200 dark:border-white/5 rounded-2xl px-5 py-4 text-sm text-gray-900 dark:text-white outline-none focus:ring-2 focus:ring-violet-500/20 focus:border-violet-500/50 transition-all resize-none shadow-sm"
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
                    <h3 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-widest">
                      Ownership
                    </h3>
                  </div>

                  <div className="space-y-6">
                    <div className="space-y-2">
                      <label className="text-[10px] font-bold text-gray-400 dark:text-white/40 uppercase tracking-widest ml-1">
                        Assigned User <span className="text-red-500">*</span>
                      </label>
                      <Field
                        as="select"
                        name="user_id"
                        className={`w-full bg-gray-50 dark:bg-[#0f0f11] border rounded-xl px-4 py-3.5 text-sm text-gray-900 dark:text-white outline-none transition-all appearance-none cursor-pointer ${
                          errors.user_id && touched.user_id
                            ? "border-red-500"
                            : "border-gray-200 dark:border-white/5 focus:border-violet-500/50"
                        }`}
                      >
                        <option value={0}>Select User</option>
                        {users.map((user) => (
                          <option key={user.id} value={user.id}>
                            {user.name}
                          </option>
                        ))}
                      </Field>
                      {errors.user_id && touched.user_id && (
                        <p className="text-[10px] text-red-500 font-bold uppercase tracking-wider ml-1">
                          {errors.user_id as string}
                        </p>
                      )}
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
