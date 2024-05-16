import nodemailer from "nodemailer";
import User from "@/models/userModel";
import bcryptjs from "bcryptjs";

enum EmailType {
  VERIFY,
  FORGET,
}

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // create a hashed token
    const hashedToken = await bcryptjs.hash(userId.toString(), 10);

    switch (emailType) {
      case "VERIFY":
        await User.findByIdAndUpdate(userId, {
          verifyToken: hashedToken,
          verifyTokenExpiry: Date.now() + 260000,
        });
        break;
      case "FORGET":
        await User.findByIdAndUpdate(userId, {
          forgotPasswordToken: hashedToken,
          forgotPasswordTokenExpiry: Date.now() + 260000,
        });
        break;
      default:
        console.log("Invalid Email Type");
    }

    var transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: process.env.MAILERTRAP_USERNAME,
        pass: process.env.MAILERTRAP_PASSWORD,
      },
    });

    const mailOptions = {
      from: "singhkaramjeetaman@gmail.com",
      to: email,
      subject:
        emailType === "VERIFY" ? "Verify Your Email" : "Reset Your Password",
      html:
        emailType === "VERIFY"
          ? `<p>Click 
        <a href="${process.env.DOMAIN}/verifyemail?token=${hashedToken}">here</a>
        to verify your email or copy and paste the link in your browser. <br>
        ${process.env.DOMAIN}/verifyemail?token=${hashedToken}</p>`
          : `<p>Click 
        <a href="${process.env.DOMAIN}/resetpassword?token=${hashedToken}">here</a>
        to reset your password or copy and paste the link in your browser. <br>
        ${process.env.DOMAIN}/resetpassword?token=${hashedToken}</p>`,
    };

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;
  } catch (error: any) {
    throw new Error(error.message);
  }
};
