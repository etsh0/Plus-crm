export type LeadStatus =
  | "new"
  | "contacted"
  | "qualified"
  | "proposal"
  | "closed";

export type Lead = {
  id: string;
  title: string;
  status: LeadStatus;
};

