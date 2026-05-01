export interface Contact {
  id: number;
  name: string;
  role: string;
  avatar: string;
  company: string;
  email: string;
  phone: string;
  location: string;
  related_to: string;
  lastContact: string;
}

export interface Customer {
  id: number;
  name: string; // Contact Person Full Name
  role: string; // Job Title
  avatar: string;
  initials?: string;
  company: string; // Facility Name
  email: string;
  phone: string; // Primary Phone
  additionalPhone?: string;
  location: string; // Main Address
  addressDetails?: string; // Additional Details
  customerType: string; // VIP, Regular, New, Returning
  customerCategory: string; // Enterprise, Individual, etc.
  assignedUser: string;
  isActive: boolean;
  notes?: string;
  commercialRegister?: string;
  taxId?: string;
  contactPersonMobile?: string;
  lastContact: string;
}


