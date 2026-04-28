
"use client";

import React from "react";
import { useDashboard } from "@/hooks/use-dashboard";

export default function DashboardPage() {
  const { stats, recentActivity } = useDashboard();

  return (
    <div className="p-8">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-white">Dashboard</h1>
        <p className="text-white/40 text-sm mt-1">Overview of your CRM</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] px-5 py-4 flex flex-col justify-between"
          >
            <div>
              <p className="text-xs text-white/40 uppercase tracking-widest mb-2">
                {stat.label}
              </p>
              <div className="flex items-end justify-between">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <div className="flex items-end gap-1 h-8 opacity-70">
                  {stat.data.map((val, i) => (
                    <div 
                      key={i} 
                      className={`w-1.5 rounded-t-sm ${stat.up ? 'bg-emerald-400' : 'bg-red-400'}`} 
                      style={{ height: `${(val / Math.max(...stat.data)) * 100}%` }}
                    />
                  ))}
                </div>
              </div>
            </div>
            <p
              className={`text-xs mt-3 font-medium ${
                stat.up ? "text-emerald-400" : "text-red-400"
              }`}
            >
              {stat.change} vs last month
            </p>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] p-6">
        <h2 className="text-sm font-semibold text-white/70 mb-4">
          Recent Activity
        </h2>
        <div className="flex flex-col gap-3">
          {recentActivity.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-3 py-2 border-b border-white/[0.05] last:border-0"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-white/20 shrink-0" />
              <span className="text-sm text-white/50">{item}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
