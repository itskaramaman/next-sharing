"use client";

import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "@hello-pangea/dnd";
import DroppableColumn from "@/components/ui/DroppableColumn";
import axios from "axios";
import { TaskStatus } from "@/lib/constants";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useDispatch } from "react-redux";
import {
  loadTodoTasks,
  loadInProgressTasks,
  loadCompletedTasks,
} from "@/redux/features/taskSlice";

export interface TaskItem {
  _id: string;
  author: string;
  dueDate: string;
  status: string;
  title: string;
  description: string;
}

export default function Home() {
  const dispatch = useDispatch();
  const {
    todos: todoTaskItems,
    inProgress: inProgressTaskItems,
    completed: completedTaskItems,
  } = useSelector((state: RootState) => state.taskReducer);

  const updateSourceAndDestination = async (
    sourceDroppable: string,
    destinationDroppable: string,
    sourceIndex: number
  ) => {
    if (sourceDroppable === destinationDroppable) return;
    let movedTask: TaskItem | undefined;
    switch (sourceDroppable) {
      case TaskStatus.todo:
        const newTodoTasks = Array.from(todoTaskItems);
        [movedTask] = newTodoTasks.splice(sourceIndex, 1);
        dispatch(loadTodoTasks(newTodoTasks));
        break;
      case TaskStatus.inprogress:
        const newInProgressTasks = Array.from(inProgressTaskItems);
        [movedTask] = newInProgressTasks.splice(sourceIndex, 1);
        dispatch(loadInProgressTasks(newInProgressTasks));
        break;
      case TaskStatus.completed:
        const newCompletedTasks = Array.from(completedTaskItems);
        [movedTask] = newCompletedTasks.splice(sourceIndex, 1);
        dispatch(loadCompletedTasks(newCompletedTasks));
        break;
      default:
        console.log("Not a valid droppable source");
    }
    if (!movedTask) return;

    switch (destinationDroppable) {
      case TaskStatus.todo:
        dispatch(loadTodoTasks([...todoTaskItems, movedTask]));
        await updateTaskStatus(movedTask._id, TaskStatus.todo);
        break;
      case TaskStatus.inprogress:
        dispatch(loadInProgressTasks([...inProgressTaskItems, movedTask]));
        await updateTaskStatus(movedTask._id, TaskStatus.inprogress);
        break;
      case TaskStatus.completed:
        dispatch(loadCompletedTasks([...completedTaskItems, movedTask]));
        await updateTaskStatus(movedTask._id, TaskStatus.completed);
        break;
      default:
        console.log("Not a valid droppable destination");
    }
  };

  const onDragEnd = (result: DropResult) => {
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

  const updateTaskStatus = async (taskId: string, status: string) => {
    const response = await axios.put("/api/tasks/task", { taskId, status });
  };

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("/api/tasks/task");
      if (response.data?.success) {
        const { todos, inprogress, completed } = response.data?.data;
        dispatch(loadTodoTasks(todos));
        dispatch(loadInProgressTasks(inprogress));
        dispatch(loadCompletedTasks(completed));
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
            droppableId="inprogress"
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
