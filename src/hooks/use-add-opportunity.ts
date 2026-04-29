import { useState } from "react";
import { toast } from "sonner";

export const useAddOpportunity = () => {
  const [formData, setFormData] = useState({
    title: "",
    customerId: "",
    expectedValue: "",
    source: "",
    userId: "",
    assignedUserId: "",
    description: "",
  });

  const [isCustomerDropdownOpen, setIsCustomerDropdownOpen] = useState(false);
  const [customerSearch, setCustomerSearch] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCustomerSelect = (customerId: string, customerName: string) => {
    setFormData({ ...formData, customerId });
    setCustomerSearch(customerName);
    setIsCustomerDropdownOpen(false);
  };

  const handleSave = () => {
    console.log("Saving opportunity:", formData);
    toast.success("Opportunity saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
    isCustomerDropdownOpen,
    setIsCustomerDropdownOpen,
    customerSearch,
    setCustomerSearch,
    handleCustomerSelect,
  };
};
