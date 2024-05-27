import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";

connectDB();

interface TaskParams {
  id: string;
}

export async function PUT(
  request: NextRequest,
  { params }: { params: TaskParams }
) {
  try {
    const { id } = params;
    const { title, description, dueDate } = await request.json();
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      { title, description, dueDate },
      { new: true }
    );
    return NextResponse.json(
      { task: updatedTask, success: true },
      { status: 200 }
    );
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: TaskParams }
) {
  try {
    const { id } = params;
    await Task.findByIdAndDelete(id);

    return NextResponse.json({
      data: { id },
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({ error: error.message, status: 500 });
  }
}
