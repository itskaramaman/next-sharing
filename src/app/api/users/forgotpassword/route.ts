import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { sendEmail } from "@/helpers/mailer";
import bcryptjs from "bcryptjs";

connectDB();

export async function POST(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { email } = reqBody;

    const user = await User.findOne({ email }).select("-password");

    await sendEmail({ email, emailType: "FORGET", userId: user._id });

    return NextResponse.json({
      message: "GET forgot password request",
      success: true,
      data: user,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const reqBody = await request.json();
    const { token, password } = reqBody;

    console.log({ token, password });

    const hashedPassword = await bcryptjs.hash(password, 10);

    const user = await User.findOne({
      forgotPasswordToken: token,
      forgotPasswordTokenExpiry: { $gt: Date.now() },
    });

    if (!user) {
      return NextResponse.json({
        message: "Invalid token",
        success: false,
        status: 400,
      });
    }

    user.password = hashedPassword;
    user.forgotPasswordToken = undefined;
    user.forgotPasswordTokenExpiry = undefined;
    await user.save();

    return NextResponse.json({
      message: "Password Updated successfully",
      success: true,
    });
  } catch (error: any) {
    return NextResponse.json({
      error: error.message,
      status: 500,
    });
  }
}
