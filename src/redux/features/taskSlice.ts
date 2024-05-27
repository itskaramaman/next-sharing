import { createSlice } from "@reduxjs/toolkit";

interface Task {
  _id: string;
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
      state.todos = action.payload;
    },
    loadInProgressTasks: (state, action) => {
      state.inProgress = action.payload;
    },
    loadCompletedTasks: (state, action) => {
      state.completed = action.payload;
    },
    addTaskToTodo: (state, action) => {
      (state.todos as Task[]).push(action.payload);
    },
    addTaskToInProgress: (state, action) => {
      (state.inProgress as Task[]).push(action.payload);
    },
    addTaskToCompleted: (state, action) => {
      (state.completed as Task[]).push(action.payload);
    },
    updateTodoTask: (state, action) => {
      const index = state.todos.findIndex(
        (task: Task) => task._id === action.payload._id
      );
      (state.todos as Task[])[index] = action.payload;
    },
    updateInProgressTask: (state, action) => {
      const index = state.inProgress.findIndex(
        (task: Task) => task._id === action.payload._id
      );
      (state.inProgress as Task[])[index] = action.payload;
    },
    updateCompletedTask: (state, action) => {
      const index = state.completed.findIndex(
        (task: Task) => task._id === action.payload._id
      );
      (state.completed as Task[])[index] = action.payload;
    },
    removeTaskFromTodo: (state, action) => {
      state.todos = state.todos.filter(
        (task: Task) => task._id != action.payload._id
      );
    },
    removeTaskFromInProgress: (state, action) => {
      state.inProgress = state.inProgress.filter(
        (task: Task) => task._id != action.payload._id
      );
    },
    removeTaskFromCompleted: (state, action) => {
      state.completed = state.completed.filter(
        (task: Task) => task._id != action.payload._id
      );
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
  removeTaskFromTodo,
  removeTaskFromInProgress,
  removeTaskFromCompleted,
  updateTodoTask,
  updateInProgressTask,
  updateCompletedTask,
} = taskSlice.actions;
export default taskSlice.reducer;
