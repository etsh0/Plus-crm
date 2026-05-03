"use client";

import { DndContext, DragEndEvent, closestCorners } from "@dnd-kit/core";
import Column from "./Column";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { leadStatus } from "@/redux/slice/lead-status/lead-status";
import { updateLeadStatus } from "@/redux/slice/leads/leads";



export default function KanbanBoard() {
  
  const dispatch = useDispatch()
  const status = useSelector((state: RootState) => state.leadStatus.status)

 const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;
    const targetStatus = status.find(s => s.id === over.id);
    
    if (targetStatus) {
      dispatch(updateLeadStatus({
        id: Number(active.id),
        status: targetStatus.name
      }));
    }
  };

  return (
    <DndContext collisionDetection={closestCorners} onDragEnd={handleDragEnd}>
      <div className="grid gap-3" style={{gridTemplateColumns: `repeat(${status.length}, minmax(0, 1fr))`}}>
        {status.map((col:leadStatus) => (
          <Column
            key={col.id}
            column={col}
          />
        ))}
      </div>
    </DndContext>
  );
}



