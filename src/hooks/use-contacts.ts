import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Contact } from "@/types";
import { toast } from "sonner";
import { useTheme } from "next-themes";

export const useContacts = (initialContacts: Contact[]) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");
  const { resolvedTheme } = useTheme();

  // Load data from localStorage on mount
  useEffect(() => {
    const saved = localStorage.getItem("crm_contacts");
    if (saved) {
      setContacts(JSON.parse(saved));
    } else {
      localStorage.setItem("crm_contacts", JSON.stringify(initialContacts));
    }
  }, [initialContacts]);

  const handleDelete = (id: number, name: string) => {
    const isDark = resolvedTheme === 'dark';

    Swal.fire({
      title: "Delete Contact?",
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
        const updatedContacts = contacts.filter((c) => c.id !== id);
        setContacts(updatedContacts);
        localStorage.setItem("crm_contacts", JSON.stringify(updatedContacts));

        toast.success(`${name} deleted successfully`, {
          description: "The contact record has been removed.",
        });
      }
    });
  };

  const filteredContacts = useMemo(() => {
    return contacts.filter(
      (c) =>
        c.name.toLowerCase().includes(search.toLowerCase()) ||
        c.email.toLowerCase().includes(search.toLowerCase()) ||
        c.company.toLowerCase().includes(search.toLowerCase())
    );
  }, [contacts, search]);

  return {
    contacts,
    search,
    setSearch,
    handleDelete,
    filteredContacts,
  };
};
