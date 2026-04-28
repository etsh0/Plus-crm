import { useState, useEffect, useMemo } from "react";
import Swal from "sweetalert2";
import { Contact } from "@/types";
import { toast } from "sonner";

export const useContacts = (initialContacts: Contact[]) => {
  const [contacts, setContacts] = useState<Contact[]>(initialContacts);
  const [search, setSearch] = useState("");

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
    Swal.fire({
      title: "Are you sure?",
      text: `You are about to delete contact "${name}". This cannot be undone!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#a855f7",
      cancelButtonColor: "#3f3f46",
      confirmButtonText: "Yes, delete it!",
      background: "#18181b",
      color: "#fff",
      customClass: {
        popup: "rounded-2xl border border-white/10 shadow-2xl",
        title: "text-white font-bold",
        htmlContainer: "text-white/60",
        confirmButton: "rounded-xl px-6 py-2.5 font-medium",
        cancelButton: "rounded-xl px-6 py-2.5 font-medium",
      },
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedContacts = contacts.filter((c) => c.id !== id);
        setContacts(updatedContacts);
        localStorage.setItem("crm_contacts", JSON.stringify(updatedContacts));

        toast.success("Contact deleted successfully");
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
