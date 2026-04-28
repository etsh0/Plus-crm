import { useState, useMemo } from "react";

export interface Opportunity {
  id: number;
  title: string;
  customer: string;
  expectedValue: string;
  source: string;
  assignedUser: string;
  initials: string;
  status: string;
}

export const useOpportunities = (initialOpportunities: Opportunity[]) => {
  const [opportunities, setOpportunities] = useState<Opportunity[]>(initialOpportunities);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter(
      (opp) =>
        opp.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        opp.customer.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [opportunities, searchQuery]);

  return {
    opportunities,
    searchQuery,
    setSearchQuery,
    filteredOpportunities,
  };
};
