import { useState } from "react";
import { toast } from "sonner";

export const useAddDeal = () => {
  const [formData, setFormData] = useState({
    title: "",
    customer_id: "",
    value: "",
    probability: "50",
    status: "pending",
    close_date: "",
    assigned_user_id: "",
    source: "lead",
    description: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const existingDeals = JSON.parse(localStorage.getItem("deals") || "[]");
    const newDeal = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      created: new Date().toLocaleDateString(),
    };
    localStorage.setItem("deals", JSON.stringify([...existingDeals, newDeal]));
    toast.success("Deal saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
