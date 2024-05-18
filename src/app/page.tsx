"use client";

import React, { useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import DroppableColumn from "@/components/ui/DroppableColumn";

export interface TaskItem {
  id: number;
  content: string;
}

const todoTasks: TaskItem[] = [
  { id: 1, content: "Todo 1" },
  { id: 2, content: "Todo 2" },
  { id: 3, content: "Todo 3" },
];

const inProgressTasks: TaskItem[] = [
  { id: 4, content: "Todo 4" },
  { id: 5, content: "Todo 5" },
  { id: 6, content: "Todo 6" },
];

const completedTasks: TaskItem[] = [
  { id: 7, content: "Todo 7" },
  { id: 8, content: "Todo 8" },
  { id: 9, content: "Todo 9" },
];

export default function Home() {
  const [todoTaskItems, setTodoTaskItems] = useState(todoTasks);
  const [inProgressTaskItems, setInProgressTaskItems] =
    useState(inProgressTasks);
  const [completedTaskItems, setCompletedTaskItems] = useState(completedTasks);

  const updateSourceAndDestination = (
    sourceDroppable: string,
    destinationDroppable: string,
    sourceIndex: number
  ) => {
    let movedTask: TaskItem | undefined;
    switch (sourceDroppable) {
      case "todo":
        const newTodoTasks = Array.from(todoTaskItems);
        [movedTask] = newTodoTasks.splice(sourceIndex, 1);
        setTodoTaskItems(newTodoTasks);
        break;
      case "inProgress":
        const newInProgressTasks = Array.from(inProgressTaskItems);
        [movedTask] = newInProgressTasks.splice(sourceIndex, 1);
        setInProgressTaskItems(newInProgressTasks);
        break;
      case "completed":
        const newCompletedTasks = Array.from(completedTaskItems);
        [movedTask] = newCompletedTasks.splice(sourceIndex, 1);
        setCompletedTaskItems(newCompletedTasks);
        break;
      default:
        console.log("Not a valid droppable source");
    }

    if (!movedTask) return;

    switch (destinationDroppable) {
      case "todo":
        setTodoTaskItems([...todoTaskItems, movedTask]);
        break;
      case "inProgress":
        setInProgressTaskItems([...inProgressTaskItems, movedTask]);

        break;
      case "completed":
        setCompletedTaskItems([...completedTasks, movedTask]);
        break;
      default:
        console.log("Not a valid droppable destination");
    }
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    const { destination, source } = result;

    if (!destination) {
      return;
    }

    updateSourceAndDestination(
      source.droppableId,
      destination.droppableId,
      source.index
    );
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <DragDropContext onDragEnd={onDragEnd}>
        <section className="flex gap-2">
          <DroppableColumn
            droppableId="todo"
            title="To Do"
            description="Let's start a task"
            tasks={todoTaskItems}
          />
          <DroppableColumn
            droppableId="inProgress"
            title="In progress"
            description="Keep going!"
            tasks={inProgressTaskItems}
          />
          <DroppableColumn
            droppableId="completed"
            title="Completed"
            description="Hurray, You are doing great"
            tasks={completedTaskItems}
          />
        </section>
      </DragDropContext>
    </main>
  );
}
