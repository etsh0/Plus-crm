import { useState, useMemo } from "react";

export interface CustomerType {
  id: string;
  name: string;
  color: string;
  description: string;
  customers: number;
  date: string;
}

export const useCustomerTypes = (initialTypes: CustomerType[]) => {
  const [types, setTypes] = useState<CustomerType[]>(initialTypes);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTypes = useMemo(() => {
    return types.filter(
      (type) =>
        type.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        type.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [types, searchQuery]);

  return {
    types,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    filteredTypes,
  };
};
