export type DealStatus =
  | "prospect"
  | "negotiation"
  | "won"
  | "lost";

export type Deal = {
  id: string;
  title: string;
  value: number;
  status: DealStatus;
};