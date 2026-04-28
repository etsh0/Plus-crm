export interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  lastContact: string;
}

export interface Customer {
  id: number;
  name: string;
  role: string;
  avatar: string;
  initials?: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  status: string;
  lastContact: string;
}
