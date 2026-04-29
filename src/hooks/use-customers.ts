import { useState, useEffect, useMemo } from "react";
import { Customer } from "@/types";
import Swal from "sweetalert2";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export const useCustomers = (initialCustomers: Customer[]) => {
  const [customers, setCustomers] = useState<Customer[]>(initialCustomers);
  const [search, setSearch] = useState("");
  const { resolvedTheme } = useTheme();

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("crm_customers");
    if (saved) {
      setCustomers(JSON.parse(saved));
    } else {
      localStorage.setItem("crm_customers", JSON.stringify(initialCustomers));
    }
  }, [initialCustomers]);

  const handleDelete = (id: number, name: string) => {
    const isDark = resolvedTheme === 'dark';

    Swal.fire({
      title: "Delete Customer?",
      text: `Are you sure you want to delete "${name}"? This action cannot be undone.`,
      icon: "warning",
      showCancelButton: true,
      background: isDark ? "#111" : "#fff",
      color: isDark ? "#fff" : "#111",
      confirmButtonColor: "#ef4444",
      cancelButtonColor: isDark ? "#3f3f46" : "#e4e4e7",
      confirmButtonText: "Yes, delete",
      cancelButtonText: "Cancel",
      customClass: {
        popup: `rounded-3xl border ${isDark ? 'border-white/10' : 'border-gray-200'} shadow-xl`,
        confirmButton: "rounded-xl px-6 py-2.5 font-bold",
        cancelButton: "rounded-xl px-6 py-2.5 font-bold",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCustomers = customers.filter((c) => c.id !== id);
        setCustomers(updatedCustomers);
        localStorage.setItem("crm_customers", JSON.stringify(updatedCustomers));

        toast.success(`${name} deleted successfully`, {
          description: "The customer record has been permanently removed.",
        });
      }
    });
  };

  const filteredCustomers = useMemo(() => {
    return customers.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase()),
    );
  }, [customers, search]);

  return {
    customers,
    search,
    setSearch,
    handleDelete,
    filteredCustomers,
  };
};
