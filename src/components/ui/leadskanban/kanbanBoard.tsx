"use client";

import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";

import { useState, useEffect } from "react";
import { Lead, LeadStatus } from "@/types/lead";
import Column from "./Column";

const initialData: Lead[] = [
  { id: "1", title: "Ahmed Lead", status: "new" },
  { id: "2", title: "Company Deal", status: "contacted" },
];

const columns: { id: LeadStatus; title: string }[] = [
  { id: "new", title: "New" },
  { id: "contacted", title: "Contacted" },
  { id: "qualified", title: "Qualified" },
  { id: "proposal", title: "Proposal" },
  { id: "closed", title: "Closed" },
];

export default function KanbanBoard() {
  const [items, setItems] = useState<Lead[]>(initialData);

  useEffect(() => {
    const savedLeads = localStorage.getItem("leads");
    if (savedLeads) {
      const parsedLeads = JSON.parse(savedLeads);
      const combined = [...initialData];
      parsedLeads.forEach((l: Lead) => {
        if (!combined.find((c) => c.id === l.id)) {
          combined.push(l);
        }
      });
      setItems(combined);
    }
  }, []);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id as LeadStatus;

    setItems((prev) => {
      const updated = prev.map((item) =>
        item.id === active.id ? { ...item, status: newStatus } : item,
      );

      // Persist to localStorage if it exists
      const savedLeads = localStorage.getItem("leads");
      if (savedLeads) {
        const parsedLeads = JSON.parse(savedLeads);
        const updatedSaved = parsedLeads.map((l: any) =>
          l.id === active.id ? { ...l, status: newStatus } : l,
        );
        localStorage.setItem("leads", JSON.stringify(updatedSaved));
      }
      return updated;
    });
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-5 gap-3">
        {columns.map((col) => (
          <Column
            key={col.id}
            column={col}
            items={items.filter((i) => i.status === col.id)}
          />
        ))}
      </div>
    </DndContext>
  );
}
