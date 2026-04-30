import { useState } from "react";
import { toast } from "sonner";

export const useAddLead = () => {
  const [formData, setFormData] = useState({
    title: "",
    customer_id: "",
    expected_value: "",
    source: "",
    follow_up_manager_id: "",
    assigned_user_id: "",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const existingLeads = JSON.parse(localStorage.getItem("leads") || "[]");
    const newLead = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: "new",
      created: new Date().toLocaleDateString(),
    };
    localStorage.setItem("leads", JSON.stringify([...existingLeads, newLead]));
    toast.success("Lead saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
