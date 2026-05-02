"use client";

import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";
import { PiplineChart } from "@/components/ui/PiplineChart";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { useEffect, useState } from "react";
import { CardSkeleton } from "@/components/ui/loaders/CardSkeleton";


const stats = [
  { label: "Total Customers", value: "1,284", change: "+12%", up: true, icon:<Users className="w-5 h-5"/> },
  { label: "Total Leads", value: "2,154", change: "+12%", up: true, icon:<Users className="w-5 h-5"/> },
  { label: "Revenue", value: "$54,200", change: "+8%", up: true, icon:<TrendingUp className="w-5 h-5" /> },
  { label: "Active Deals", value: "18", change: "+3%", up: true, icon:<DollarSign className="w-5 h-5" /> },
];

const revenueData = [
  { name: 'Jan', revenue: 40, leads: 25 },
  { name: 'Feb', revenue: 55, leads: 35 },
  { name: 'Mar', revenue: 45, leads: 30 },
  { name: 'Apr', revenue: 70, leads: 50 },
  { name: 'May', revenue: 65, leads: 45 },
  { name: 'Jun', revenue: 85, leads: 60 },
  { name: 'Jul', revenue: 90, leads: 55 },
  { name: 'Aug', revenue: 75, leads: 45 },
];

const customerCategoriesData = [
  { name: 'Enterprise Companies', value: 42, color: '#3b82f6' },
  { name: 'Individual Professionals', value: 28, color: '#8b5cf6' },
  { name: 'E-commerce Partners', value: 18, color: '#10b981' },
  { name: 'Educational Institutions', value: 12, color: '#f59e0b' },
];

const pipelineData = [
  { name: 'Proposal', value: 250, color: '#3b82f6' },
  { name: 'Negotiation', value: 600, color: '#8b5cf6' },
  { name: 'Won', value: 150, color: '#10b981' },
  { name: 'Lost', value: 20, color: '#ef4444' },
];

const recentActivity = [
  { id: 1, action: "Deal Won", detail: "Retail POS System · $95K", time: "2h ago", color: "bg-emerald-500" },
  { id: 2, action: "New Lead", detail: "Pharma Plus · Omar Fathy", time: "4h ago", color: "bg-blue-500" },
  { id: 3, action: "Customer Updated", detail: "TechCorp Solutions profile", time: "5h ago", color: "bg-amber-500" },
  { id: 4, action: "Deal Moved", detail: "Logistics Suite → Negotiation", time: "1d ago", color: "bg-violet-500" },
  { id: 5, action: "Contact Added", detail: "Rania Khalil · Nile Tech", time: "1d ago", color: "bg-gray-400" },
  { id: 6, action: "Lead Converted", detail: "Nile Tech → Customer", time: "2d ago", color: "bg-emerald-500" },
];

const topCustomers = [
  { rank: 1, initials: 'AE', initialsBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400', name: 'Alexandria Exports', type: 'Wholesale', contact: 'Omar Fathy', status: 'Active', value: '$380K', deals: '4 deals', barWidth: '80%', barColor: 'bg-blue-500' },
  { rank: 2, initials: 'DW', initialsBg: 'bg-violet-500/10 dark:bg-violet-500/20 text-violet-600 dark:text-violet-400', name: 'Delta Wholesale Ltd', type: 'Wholesale', contact: 'Mohamed Karim', status: 'Not Active', value: '$230K', deals: '2 deals', barWidth: '50%', barColor: 'bg-violet-500' },
  { rank: 3, initials: 'OH', initialsBg: 'bg-emerald-500/10 dark:bg-emerald-500/20 text-emerald-600 dark:text-emerald-400', name: 'Oasis Hospitality', type: 'B2B', contact: 'Sara Ali', status: 'Active', value: '$200K', deals: '2 deals', barWidth: '40%', barColor: 'bg-emerald-500' },
  { rank: 4, initials: 'TS', initialsBg: 'bg-amber-500/10 dark:bg-amber-500/20 text-amber-600 dark:text-amber-400', name: 'TechCorp Solutions', type: 'B2B', contact: 'Ahmed Hassan', status: 'Active', value: '$145K', deals: '3 deals', barWidth: '30%', barColor: 'bg-amber-500' },
  { rank: 5, initials: 'NR', initialsBg: 'bg-red-500/10 dark:bg-red-500/20 text-red-600 dark:text-red-400', name: 'Nile Retail Group', type: 'Retail', contact: 'Sara Ali', status: 'Not Active', value: '$78K', deals: '5 deals', barWidth: '15%', barColor: 'bg-red-500' },
];


export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="p-8 pb-24 lg:pb-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Welcome back, Ahmed — here&apos;s what&apos;s happening today.</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }  return (
    <div className="p-8 pb-24 lg:pb-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
        <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Welcome back, Ahmed — here&apos;s what&apos;s happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-5 py-4 flex flex-col justify-between transition-colors duration-300">
            <div>
              <div className="flex items-end justify-between">
                <p className="text-xs text-gray-400 dark:text-white/40 uppercase tracking-widest mb-2 font-bold">
                  {stat.label}
                </p>
                <div className="text-gray-400 dark:text-white/70">
                  {stat.icon}
                </div>
              </div>
              <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
            </div>
            <p
              className={`text-xs mt-3 font-bold ${
                stat.up ? "text-emerald-600 dark:text-emerald-400" : "text-red-600 dark:text-red-400"
              }`}
            >
              {stat.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
        {/* Revenue & Leads Overview */}
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 transition-colors duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue & Leads Overview</h2>
              <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Monthly performance — 2026</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3b82f6]"></span>
                <span className="text-gray-600 dark:text-white/70">Revenue</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#8b5cf6]"></span>
                <span className="text-gray-600 dark:text-white/70">Leads</span>
              </div>
            </div>
          </div>
          <div className="h-75 w-full">
            <LineChart data={revenueData} />
          </div>
        </div>

        {/* Customer Categories */}
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Customer Categories</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Distribution by type</p>
          </div>
          <div className="h-50 w-full">
            <PieChart data={customerCategoriesData} />
          </div>
          <div className="grid grid-cols-1 gap-y-4 mt-6">
            {customerCategoriesData.map((category) => (
              <div key={category.name} className="flex items-center text-xs">
                <span className="w-2.5 h-2.5 rounded-sm mr-2" style={{ backgroundColor: category.color }}></span>
                <div className="flex items-center justify-between w-full">
                  <span className="text-gray-600 dark:text-white/70 font-medium">{category.name}</span>
                  <strong className="text-gray-900 dark:text-white font-bold">{category.value}%</strong>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Deal Pipeline */}
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Deal Pipeline</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">By stage — total value</p>
          </div>
          <div className="h-62.5 w-full">
            <PiplineChart data={pipelineData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 flex flex-col transition-colors duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            {recentActivity.map((activity) => (
              <div key={activity.id} className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.color}`}></div>
                  <div>
                    <p className="text-sm text-gray-900 dark:text-white font-bold">
                      {activity.action} <span className="text-gray-400 dark:text-white/40 font-normal ml-1 hidden sm:inline">— {activity.detail}</span>
                    </p>
                    {/* For smaller screens */}
                    <p className="text-xs text-gray-400 dark:text-white/40 sm:hidden mt-0.5">{activity.detail}</p>
                  </div>
                </div>
                <span className="text-xs text-gray-400 dark:text-white/40 shrink-0 ml-4 font-medium">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
      
      <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm dark:shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6 mt-6 text-gray-900 dark:text-white transition-colors duration-300">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Customers by Deal Value</h2>
        <div className="flex flex-col overflow-y-auto">
          {topCustomers.map((customer) => (
            <div key={customer.rank} className="flex items-center justify-between py-4 border-b border-gray-100 dark:border-white/5 last:border-0">
              <div className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-400 dark:text-white/40 w-5">#{customer.rank}</span>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm ${customer.initialsBg}`}>
                  {customer.initials}
                </div>
                <div>
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.name}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5 font-medium">{customer.type} · {customer.contact}</p>
                </div>
              </div>
              <div className="flex items-center gap-4 sm:gap-8">
                <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hidden sm:block">
                  {customer.status}
                </span>
                <div className="text-right w-16">
                  <p className="text-sm font-bold text-gray-900 dark:text-white">{customer.value}</p>
                  <p className="text-xs text-gray-400 dark:text-white/40 mt-0.5 font-medium">{customer.deals}</p>
                </div>
                <div className="w-24 h-1.5 rounded-full bg-gray-100 dark:bg-white/10 hidden md:block">
                  <div className={`h-full rounded-full ${customer.barColor}`} style={{ width: customer.barWidth }}></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}