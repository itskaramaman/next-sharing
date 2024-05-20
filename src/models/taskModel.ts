import mongoose from "mongoose";
import { TaskStatus } from "@/lib/constants";

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please provide a title"],
    },
    description: {
      type: String,
    },
    dueDate: {
      type: Date,
    },
    status: {
      type: String,
      enum: Object.values(TaskStatus),
      default: TaskStatus.todo,
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
  },
  { timestamps: true }
);

const Task = mongoose.models.tasks || mongoose.model("tasks", taskSchema);
export default Task;
