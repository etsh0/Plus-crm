

export type UserRole = "admin" | "manager" | "sales";

export interface User {
  id: number;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
}

export const users: User[] = [
  {
    id: 1,
    name: "Ahmed Hassan",
    email: "ahmed@crm.com",
    role: "admin",
    avatar: "",
  },
  {
    id: 2,
    name: "Mohamed Ebrahim",
    email: "mohamed@crm.com",
    role: "manager",
    avatar: "",
  },
  {
    id: 3,
    name: "Mostafa Omar",
    email: "mostafa@crm.com",
    role: "sales",
    avatar: "",
  },
  {
    id: 4,
    name: "Kareem Ali",
    email: "kareem@crm.com",
    role: "sales",
    avatar: "",
  },
];