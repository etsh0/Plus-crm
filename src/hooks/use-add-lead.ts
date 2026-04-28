import { useState } from "react";
import { toast } from "sonner";

export const useAddLead = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    company: "",
    jobTitle: "",
    status: "",
    source: "",
    leadScore: "85",
    owner: "",
    notes: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // Logic for saving would go here
    console.log("Saving lead:", formData);
    toast.success("Lead saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
