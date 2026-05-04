"use client";

import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";


import Column from "./Column";
import { useDispatch } from "react-redux";
import { updateDealStatus } from "@/redux/slice/deals/deals";

export const columns = [
  { id: "new", title: "New" },
  { id: "proposal", title: "Proposal" },
  { id: "won", title: "Won" },
  { id: "lost", title: "Lost" },
];

export default function KanbanBoard() {
  const dispatch = useDispatch();

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const dealId = Number(active.id);
    const targetStatus = over.id as any;

    const statusMap: Record<string, any> = {
      new: "NEW",
      proposal: "PROPOSAL",
      won: "WON",
      lost: "LOST",
    };

    if (statusMap[targetStatus]) {
      dispatch(updateDealStatus({
        id: dealId,
        status: statusMap[targetStatus]
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid grid-cols-4 gap-3">
        {columns.map((col: {id:string, title:string}) => (
          <Column
            key={col.id}
            column={col}
          />
        ))}
      </div>
    </DndContext>
  );
}
