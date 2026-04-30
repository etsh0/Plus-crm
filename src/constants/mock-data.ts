import { Customer, Contact } from "@/types";
import { Lead } from "@/hooks/use-leads";
import { Deal } from "@/hooks/use-deals";
import { Opportunity } from "@/hooks/use-opportunities";
import { CustomerCategory } from "@/hooks/use-customer-categories";
import { CustomerType } from "@/hooks/use-customer-types";

export const initialCustomers: Customer[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "VP of Sales",
    avatar: "https://i.pravatar.cc/150?img=1",
    company: "Acme Corp",
    email: "sarah.j@acmecorp.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    status: "Active",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?img=11",
    company: "TechStart Inc",
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    status: "Premium",
    lastContact: "1 week ago",
  },
];

export const initialContacts: Contact[] = [
  {
    id: 1,
    name: "Sarah Johnson",
    role: "VP of Sales",
    avatar: "https://i.pravatar.cc/150?img=1",
    company: "Acme Corp",
    email: "sarah.j@acmecorp.com",
    phone: "+1 (555) 123-4567",
    location: "New York, NY",
    related_to: "Lead",
    lastContact: "2 days ago",
  },
  {
    id: 2,
    name: "Mike Chen",
    role: "CEO",
    avatar: "https://i.pravatar.cc/150?img=11",
    company: "TechStart Inc",
    email: "m.chen@techstart.io",
    phone: "+1 (555) 234-5678",
    location: "San Francisco, CA",
    related_to: "Customer",
    lastContact: "1 week ago",
  },
  {
    id: 3,
    name: "Emily Davis",
    role: "Director of IT",
    avatar: "https://i.pravatar.cc/150?img=5",
    company: "Global Solutions",
    email: "emily@globalsol.com",
    phone: "+1 (555) 345-6789",
    location: "Austin, TX",
    related_to: "Deal",
    lastContact: "3 days ago",
  },
];

export const initialLeads: Lead[] = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice@example.com",
    company: "Tech Solutions Inc.",
    status: "New",
    source: "Website",
    created: "1/10/2024",
    score: 85,
    owner: "John Smith",
    initials: "AJ"
  },
  {
    id: 2,
    name: "Bob Wilson",
    email: "bob@startup.com",
    company: "Startup ABC",
    status: "Contacted",
    source: "LinkedIn",
    created: "1/8/2024",
    score: 72,
    owner: "Sarah Johnson",
    initials: "BW"
  }
];

export const initialDeals: Deal[] = [
  {
    id: 1,
    title: "Enterprise Software License",
    company: "TechCorp Inc.",
    stage: "Negotiation",
    probability: "80%",
    closeDate: "1/15/2024",
    value: "$150,000",
    owner: "John Smith",
    initials: "JS"
  },
  {
    id: 2,
    title: "Marketing Automation Setup",
    company: "StartupXYZ",
    stage: "Proposal",
    probability: "60%",
    closeDate: "1/20/2024",
    value: "$75,000",
    owner: "Sarah Johnson",
    initials: "SJ"
  }
];

export const initialOpportunities: Opportunity[] = [
  {
    id: 1,
    title: "New ERP Implementation",
    customer: "Tech Solutions Inc.",
    expectedValue: "$120,000",
    source: "Website",
    assignedUser: "John Smith",
    initials: "JS",
    status: "Active"
  },
  {
    id: 2,
    title: "Cloud Migration Project",
    customer: "Global Retail Corp",
    expectedValue: "$85,000",
    source: "Referral",
    assignedUser: "Sarah Johnson",
    initials: "SJ",
    status: "Active"
  }
];

export const initialCategories: CustomerCategory[] = [
  { id: "#001", name: "Enterprise Companies", description: "Large scale B2B clients with 1000+ employees...", customers: 142, date: "Oct 24, 2023",  },
  { id: "#002", name: "Individual Professionals", description: "Independent consultants and freelancers...", customers: 2845, date: "Nov 12, 2023" },
  { id: "#003", name: "E-commerce Partners", description: "Online retailers and D2C brands...", customers: 89, date: "Dec 01, 2023" },
  { id: "#004", name: "Educational Institutions", description: "Universities, schools, and ed-tech platforms...", customers: 34, date: "Jan 15, 2024" },
];

export const initialCustomerTypes: CustomerType[] = [
  { id: "#001", name: "VIP", color: "bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.8)]", description: "High-value enterprise clients with dedic...", customers: 142, date: "Oct 24, 2023" },
  { id: "#002", name: "Regular", color: "bg-blue-400 shadow-[0_0_10px_rgba(96,165,250,0.8)]", description: "Standard active accounts on monthly o...", customers: 2845, date: "Nov 12, 2023" },
  { id: "#003", name: "New", color: "bg-amber-400 shadow-[0_0_10px_rgba(251,191,36,0.8)]", description: "Onboarding phase accounts (first 30 d...", customers: 89, date: "Dec 01, 2023" },
  { id: "#004", name: "Returning", color: "bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,0.8)]", description: "Previously churned customers who hav...", customers: 34, date: "Jan 15, 2024" },
];

export const dashboardStats = [
  { label: "Total Customers", value: "1,284", change: "+12%", up: true, data: [30, 40, 45, 50, 49, 60, 70, 91] },
  { label: "Active Leads", value: "347", change: "+5%", up: true, data: [20, 25, 20, 30, 28, 35, 40, 45] },
  { label: "Won Deals", value: "89", change: "+15%", up: true, data: [10, 15, 12, 20, 25, 24, 30, 35] },
  { label: "Lost Deals", value: "12", change: "-3%", up: false, data: [5, 4, 6, 8, 5, 3, 4, 2] },
];

export const recentActivity = [
  "New customer added: Sarah Connor",
  "Lead status updated: Acme Corp → Qualified",
  "Deal won: TechStart Inc — $12,000",
  "Meeting scheduled with: Wayne Enterprises",
];
