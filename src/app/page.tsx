"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import DroppableColumn from "@/components/ui/DroppableColumn";

export interface TaskItem {
  id: number;
  content: string;
}

const initialTasks: TaskItem[] = [
  { id: 0, content: "Todo 1" },
  { id: 1, content: "Todo 2" },
  { id: 2, content: "Todo 3" },
];

export default function Home() {
  const [taskItems, setTaskItems] = useState(initialTasks);

  const onDragEnd = (result: DropResult) => {
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    const newItems = Array.from(taskItems);
    const [removed] = newItems.splice(source.index, 1);
    newItems.splice(destination.index, 0, removed);

    setTaskItems(newItems);
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="flex gap-2">
          <DroppableColumn
            droppableId="1"
            title="To Do"
            description="Let's start a task"
            tasks={taskItems}
          />
          <DroppableColumn
            droppableId="2"
            title="In progress"
            description="Keep going!"
          />
          <DroppableColumn
            droppableId="3"
            title="Completed"
            description="Hurray, You are doing great"
          />
        </section>
      </DragDropContext>
    </main>
  );
}
