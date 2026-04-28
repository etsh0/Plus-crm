import { useState, useMemo } from "react";

export interface CustomerCategory {
  id: string;
  name: string;
  description: string;
  customers: number;
  date: string;
}

export const useCustomerCategories = (initialCategories: CustomerCategory[]) => {
  const [categories, setCategories] = useState<CustomerCategory[]>(initialCategories);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredCategories = useMemo(() => {
    return categories.filter(
      (category) =>
        category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        category.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [categories, searchQuery]);

  return {
    categories,
    searchQuery,
    setSearchQuery,
    isModalOpen,
    setIsModalOpen,
    filteredCategories,
  };
};
