"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import DroppableColumn from "@/components/ui/DroppableColumn";
import axios from "axios";
import { request } from "http";

export interface TaskItem {
  _id: string;
  author: string;
  dueDate: string;
  status: string;
  title: string;
  description: string;
}

export default function Home() {
  const [todoTaskItems, setTodoTaskItems] = useState<TaskItem[]>([]);
  const [inProgressTaskItems, setInProgressTaskItems] = useState<TaskItem[]>(
    []
  );
  const [completedTaskItems, setCompletedTaskItems] = useState<TaskItem[]>([]);

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
        setCompletedTaskItems([...completedTaskItems, movedTask]);
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

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("/api/tasks/task");
      console.log(response.data.data);
      if (response.data?.success) {
        const { todos, inprogress, completed } = response.data?.data;
        console.log(todos);
        setTodoTaskItems(todos);
        setInProgressTaskItems(inprogress);
        setCompletedTaskItems(completed);
      }
    };
    getTasks();
  }, []);

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
