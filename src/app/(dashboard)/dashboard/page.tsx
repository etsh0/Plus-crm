"use client";

import { LineChart } from "@/components/ui/LineChart";
import { PieChart } from "@/components/ui/PieChart";
import { PiplineChart } from "@/components/ui/PiplineChart";
import { DollarSign, TrendingUp, Users } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import { CardSkeleton } from "@/components/ui/loaders/CardSkeleton";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";


export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  const { leads } = useSelector((state: RootState) => state.leads);
  const { deals } = useSelector((state: RootState) => state.deals);
  const { customers } = useSelector((state: RootState) => state.customers);
  const { categories } = useSelector((state: RootState) => state.customerCategory);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  // Calculate dynamic stats
  const stats = useMemo(() => {
    const totalCustomers = customers.length;
    const totalLeads = leads.length;
    const revenue = deals
      .filter((d) => d.status === "WON")
      .reduce((acc, d) => acc + d.value, 0);
    const activeDealsCount = deals.filter(
      (d) => d.status !== "WON" && d.status !== "LOST"
    ).length;

    const formatCurrency = (val: number) =>
      new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
        maximumFractionDigits: 0,
      }).format(val);

    return [
      { label: "Total Customers", value: totalCustomers.toLocaleString(), change: "+0%", up: true, icon: <Users className="w-5 h-5" /> },
      { label: "Total Leads", value: totalLeads.toLocaleString(), change: "+0%", up: true, icon: <Users className="w-5 h-5" /> },
      { label: "Revenue", value: formatCurrency(revenue), change: "+0%", up: true, icon: <TrendingUp className="w-5 h-5" /> },
      { label: "Active Deals", value: activeDealsCount.toLocaleString(), change: "+0%", up: true, icon: <DollarSign className="w-5 h-5" /> },
    ];
  }, [customers, leads, deals]);

  // Dynamic Revenue & Leads Data for Line Chart
  const revenueData = useMemo(() => {
    const months = [];
    const now = new Date();
    
    for (let i = 5; i >= 0; i--) {
      const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
      const monthName = d.toLocaleString('default', { month: 'short' });
      const monthIdx = d.getMonth();
      const year = d.getFullYear();

      const monthDeals = deals.filter(deal => {
        const dealDate = new Date(deal.createdAt);
        return dealDate.getMonth() === monthIdx && dealDate.getFullYear() === year && deal.status === "WON";
      });

      const monthLeads = leads.filter(lead => {
        if (!lead.createdAt) return false;
        const leadDate = new Date(lead.createdAt);
        return leadDate.getMonth() === monthIdx && leadDate.getFullYear() === year;
      });

      months.push({
        name: monthName,
        revenue: monthDeals.reduce((acc, deal) => acc + deal.value, 0) / 1000, // In K
        leads: monthLeads.length
      });
    }
    return months;
  }, [deals, leads]);

  // Dynamic Customer Categories for Pie Chart
  const customerCategoriesData = useMemo(() => {
    if (categories.length === 0 || customers.length === 0) {
      return [
        { name: 'No Data', value: 100, color: '#e5e7eb' }
      ];
    }
    
    const counts: Record<number, number> = {};
    customers.forEach(c => {
      counts[c.customer_category_id] = (counts[c.customer_category_id] || 0) + 1;
    });

    const colors = ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'];
    
    return categories.map((cat, index) => ({
      name: cat.name,
      value: Math.round(((counts[cat.id] || 0) / customers.length) * 100),
      color: colors[index % colors.length]
    })).filter(c => c.value > 0);
  }, [customers, categories]);

  // Dynamic Pipeline Data
  const pipelineData = useMemo(() => {
    const stages = [
      { name: 'New', status: 'NEW', color: '#3b82f6' },
      { name: 'Proposal', status: 'PROPOSAL', color: '#8b5cf6' },
      { name: 'Won', status: 'WON', color: '#10b981' },
      { name: 'Lost', status: 'LOST', color: '#ef4444' },
    ];

    return stages.map(stage => ({
      name: stage.name,
      value: deals
        .filter(d => d.status === stage.status)
        .reduce((acc, d) => acc + d.value, 0),
      color: stage.color
    }));
  }, [deals]);

  // Dynamic Recent Activity
  const recentActivity = useMemo(() => {
    const activities = [
      ...deals.map(d => ({
        id: `deal-${d.id}`,
        action: d.status === "WON" ? "Deal Won" : d.status === "LOST" ? "Deal Lost" : "Deal Updated",
        detail: `${d.deal_title} · $${(d.value / 1000).toFixed(0)}K`,
        time: d.createdAt,
        timestamp: new Date(d.createdAt).getTime(),
        color: d.status === "WON" ? "bg-emerald-500" : d.status === "LOST" ? "bg-red-500" : "bg-violet-500"
      })),
      ...leads.map(l => ({
        id: `lead-${l.id}`,
        action: "New Lead",
        detail: `${l.lead_title} · ${l.source}`,
        time: l.createdAt || "Recently",
        timestamp: l.createdAt ? new Date(l.createdAt).getTime() : 0,
        color: "bg-blue-500"
      }))
    ];

    return activities
      .sort((a, b) => b.timestamp - a.timestamp)
      .slice(0, 6)
      .map(act => ({
        ...act,
        time: act.time ? (act.time.includes('-') ? new Date(act.time).toLocaleDateString() : act.time) : "Recent"
      }));
  }, [deals, leads]);

  // Dynamic Top Customers
  const topCustomers = useMemo(() => {
    const customerValues: Record<number, number> = {};
    const customerDealsCount: Record<number, number> = {};
    
    deals.forEach(d => {
      if (d.customer_id) {
        customerValues[d.customer_id] = (customerValues[d.customer_id] || 0) + d.value;
        customerDealsCount[d.customer_id] = (customerDealsCount[d.customer_id] || 0) + 1;
      }
    });

    return Object.keys(customerValues)
      .map(idStr => {
        const id = parseInt(idStr);
        const cust = customers.find(c => c.id === id);
        return {
          id,
          name: cust?.company_name || "Unknown",
          type: "Customer",
          contact: cust?.contact_person_name || "N/A",
          status: cust?.status || "Active",
          value: customerValues[id],
          dealsCount: customerDealsCount[id],
          initials: (cust?.company_name || "U").substring(0, 2).toUpperCase()
        };
      })
      .sort((a, b) => b.value - a.value)
      .slice(0, 5)
      .map((c, index) => ({
        rank: index + 1,
        initials: c.initials,
        initialsBg: 'bg-blue-500/10 dark:bg-blue-500/20 text-blue-600 dark:text-blue-400',
        name: c.name,
        type: c.type,
        contact: c.contact,
        status: c.status,
        value: `$${(c.value / 1000).toFixed(0)}K`,
        deals: `${c.dealsCount} deals`,
        barWidth: `${Math.min(100, (c.value / 100000) * 100)}%`,
        barColor: 'bg-blue-500'
      }));
  }, [deals, customers]);


  if (isLoading) {
    return (
      <div className="p-8 pb-24 lg:pb-8 animate-in fade-in duration-500">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Analyzing your business performance...</p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
          <CardSkeleton />
        </div>
      </div>
    );
  }

  return (
    <div className="p-8 pb-24 lg:pb-8 animate-in fade-in duration-500">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Dashboard Overview</h1>
        <p className="text-gray-500 dark:text-white/40 text-sm mt-1">Real-time performance metrics for your CRM.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div key={stat.label} className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm px-5 py-4 flex flex-col justify-between transition-all duration-300 hover:shadow-md">
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
        <div className="lg:col-span-2 rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 transition-all duration-300">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <h2 className="text-lg font-bold text-gray-900 dark:text-white">Revenue & Leads Growth</h2>
              <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Monthly comparison of won deals and new leads</p>
            </div>
            <div className="flex items-center gap-4 text-sm font-medium">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-sm bg-[#3b82f6]"></span>
                <span className="text-gray-600 dark:text-white/70">Revenue (K)</span>
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
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Customer Segments</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Distribution across categories</p>
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
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Sales Pipeline</h2>
            <p className="text-sm text-gray-500 dark:text-white/40 mt-1">Total value by current stage</p>
          </div>
          <div className="h-62.5 w-full">
            <PiplineChart data={pipelineData} />
          </div>
        </div>

        {/* Recent Activity */}
        <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 flex flex-col transition-all duration-300">
          <div className="mb-6">
            <h2 className="text-lg font-bold text-gray-900 dark:text-white">Recent Activity</h2>
          </div>
          <div className="flex-1 space-y-6 flex flex-col justify-center">
            {recentActivity.length > 0 ? (
              recentActivity.map((activity) => (
                <div key={activity.id} className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`w-2 h-2 rounded-full mt-1.5 ${activity.color}`}></div>
                    <div>
                      <p className="text-sm text-gray-900 dark:text-white font-bold">
                        {activity.action} <span className="text-gray-400 dark:text-white/40 font-normal ml-1 hidden sm:inline">— {activity.detail}</span>
                      </p>
                      <p className="text-xs text-gray-400 dark:text-white/40 sm:hidden mt-0.5">{activity.detail}</p>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 dark:text-white/40 shrink-0 ml-4 font-medium">{activity.time}</span>
                </div>
              ))
            ) : (
              <p className="text-sm text-gray-400 text-center py-8">No recent activity recorded.</p>
            )}
          </div>
        </div>
      </div>
      
      {/* Top Customers Table */}
      <div className="rounded-2xl bg-white dark:bg-white/5 backdrop-blur-xl border border-gray-200 dark:border-white/10 shadow-sm p-6 mt-6 text-gray-900 dark:text-white transition-all duration-300">
        <h2 className="text-lg font-bold mb-4 text-gray-900 dark:text-white">Top Customers by Revenue</h2>
        <div className="flex flex-col overflow-y-auto">
          {topCustomers.length > 0 ? (
            topCustomers.map((customer) => (
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
                  <span className="px-2.5 py-1 rounded-md text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 hidden sm:block uppercase">
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
            )
          )) : (
            <p className="text-sm text-gray-400 text-center py-8">No customer deal data available.</p>
          )}
        </div>
      </div>
    </div>
  );
}
