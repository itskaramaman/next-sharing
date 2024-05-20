import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";
import { getDataFromToken } from "@/helpers/getDataFromToken";
import { TaskStatus } from "@/lib/constants";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const userId = getDataFromToken(request);
    const { title, description, date } = reqBody;

    const task = new Task({
      title,
      description,
      dueDate: date,
      author: userId,
    });
    await task.save();

    return NextResponse.json({ data: task, success: true });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}

export async function GET(request: NextRequest) {
  try {
    const userId = getDataFromToken(request);
    const todos = await Task.find({ author: userId, status: TaskStatus.todo });
    const inprogress = await Task.find({
      author: userId,
      status: TaskStatus.inprogress,
    });
    const completed = await Task.find({
      author: userId,
      status: TaskStatus.completed,
    });
    return NextResponse.json({
      data: { todos, inprogress, completed },
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
