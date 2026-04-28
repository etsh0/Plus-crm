import { useState, useMemo } from "react";

export interface Deal {
  id: number;
  title: string;
  company: string;
  stage: string;
  probability: string;
  closeDate: string;
  value: string;
  owner: string;
  initials: string;
}

export const useDeals = (initialDeals: Deal[]) => {
  const [deals, setDeals] = useState<Deal[]>(initialDeals);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredDeals = useMemo(() => {
    return deals.filter(
      (deal) =>
        deal.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        deal.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [deals, searchQuery]);

  return {
    deals,
    searchQuery,
    setSearchQuery,
    filteredDeals,
  };
};
