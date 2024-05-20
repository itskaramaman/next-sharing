import { connectDB } from "@/dbConfig/dbConfig";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/taskModel";

connectDB();

interface DeleteParams {
  id: string;
}

export async function DELETE({ params }: { params: DeleteParams }) {
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
