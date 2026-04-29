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
    const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      title: `${formData.firstName} ${formData.lastName}`,
      status: formData.status || "new",
    };
    localStorage.setItem("leads", JSON.stringify([...existingLeads, newLead]));
    console.log("Saving lead:", newLead);
    toast.success("Lead saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
