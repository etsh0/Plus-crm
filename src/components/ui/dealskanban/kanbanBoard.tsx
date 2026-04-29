"use client";

import {
  DndContext,
  DragEndEvent,
  closestCorners,
} from "@dnd-kit/core";

import { useState } from "react";

import { Deal, DealStatus } from "@/types/deal";
import Column from "./Column";


const initialData: Deal[] = [
  { id: "1", title: "Ahmed Lead", value:55, status: "lost" },
  { id: "2", title: "Company Deal", value:40, status: "won" },
];

export const columns: { id: DealStatus; title: string }[] = [
  { id: "prospect", title: "Prospect" },
  { id: "negotiation", title: "Negotiation" },
  { id: "won", title: "Won" },
  { id: "lost", title: "Lost" },
];

export default function KanbanBoard() {
  const [items, setItems] = useState<Deal[]>(initialData);

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (!over) return;

    const newStatus = over.id as DealStatus;

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
      <div className="grid grid-cols-4 gap-3">
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