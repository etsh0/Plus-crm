import { useState } from "react";
import { toast } from "sonner";

export const useAddDeal = () => {
  const [formData, setFormData] = useState({
    title: "",
    company: "",
    value: "0",
    stage: "",
    probability: "50",
    description: "",
    closeDate: "",
    owner: "",
    contact: ""
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    const existingDeals = JSON.parse(localStorage.getItem("deals") || "[]");
    const newDeal = {
      ...formData,
      id: Math.random().toString(36).substr(2, 9),
      status: formData.stage || "prospect",
      value: parseFloat(formData.value) || 0,
    };
    localStorage.setItem("deals", JSON.stringify([...existingDeals, newDeal]));
    console.log("Saving deal:", newDeal);
    toast.success("Deal saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
