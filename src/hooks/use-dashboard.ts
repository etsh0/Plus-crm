import { useMemo } from "react";
import { dashboardStats, recentActivity } from "@/constants/mock-data";

export interface Stat {
  label: string;
  value: string;
  change: string;
  up: boolean;
  data: number[];
}

export const useDashboard = () => {
  const stats: Stat[] = useMemo(() => dashboardStats, []);

  return {
    stats,
    recentActivity,
  };
};
