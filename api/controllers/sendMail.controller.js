import nodemailer from "nodemailer";

import dotenv from "dotenv";
dotenv.config();
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_ID,
    pass: process.env.MAIL_PASS,
  },
});

export const SendMail = async (req, res, next) => {
  try {
    const { name, email, message } = req.body;

    const mailOptions = {
      from: `"Contact Form" <${process.env.MAIL_ID}>`,
      to: process.env.MAIL_ID,
      subject: `New Contact Message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "Mail sent successfully!",
    });
  } catch (error) {
    console.error("Mail Error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send mail",
    });
  }
};
