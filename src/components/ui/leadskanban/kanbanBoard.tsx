"use client";

import {
  DndContext,
  DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";

import { useState } from "react";
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

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id as LeadStatus;

    setItems((prev) =>
      prev.map((item) =>
        item.id === active.id
          ? { ...item, status: newStatus }
          : item
      )
    );
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