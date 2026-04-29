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
    console.log("Saving deal:", formData);
    toast.success("Deal saved successfully!");
  };

  return {
    formData,
    handleChange,
    handleSave,
  };
};
