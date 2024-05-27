import { createSlice } from "@reduxjs/toolkit";

interface Task {
  title: string;
  description: string;
  date: Date;
  status: string;
}

const initialState = {
  todos: [],
  inProgress: [],
  completed: [],
};

const taskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    loadTodoTasks: (state, action) => {
      state.todos.concat(action.payload.tasks);
    },
    loadInProgressTasks: (state, action) => {
      state.inProgress.concat(action.payload.tasks);
    },
    loadCompletedTasks: (state, action) => {
      state.completed.concat(action.payload.tasks);
    },
    addTaskToTodo: (state, action) => {
      (state.todos as Task[]).push(action.payload.task);
    },
    addTaskToInProgress: (state, action) => {
      (state.inProgress as Task[]).push(action.payload.task);
    },
    addTaskToCompleted: (state, action) => {
      (state.completed as Task[]).push(action.payload.task);
    },
  },
});

export const {
  loadTodoTasks,
  loadInProgressTasks,
  loadCompletedTasks,
  addTaskToTodo,
  addTaskToInProgress,
  addTaskToCompleted,
} = taskSlice.actions;
export default taskSlice.reducer;
