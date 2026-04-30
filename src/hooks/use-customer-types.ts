import { useState } from "react";

export interface CustomerType {
  id: string;
  name: string;
  description: string;
  customers: number;
  date: string;
}

export const useCustomerTypes = (initialTypes: CustomerType[]) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return {
    isModalOpen,
    setIsModalOpen,
  };
};
