import { useState, useMemo } from "react";

export interface Lead {
  id: number;
  name: string;
  email: string;
  company: string;
  status: string;
  source: string;
  created: string;
  score: number;
  owner: string;
  initials: string;
}

export const useLeads = (initialLeads: Lead[]) => {
  const [leads, setLeads] = useState<Lead[]>(initialLeads);
  const [searchQuery, setSearchQuery] = useState("");

  const filteredLeads = useMemo(() => {
    return leads.filter(
      (lead) =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.company.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [leads, searchQuery]);

  return {
    leads,
    searchQuery,
    setSearchQuery,
    filteredLeads,
  };
};
