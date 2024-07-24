// Importing nodemailer module
import nodemailer from "nodemailer";

// Function to send email using nodemailer
export const mailSender = async (
  email: string,
  title: string,
  body: string
) => {
  try {
    // Creating a nodemailer transporter using SMTP settings
    const transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST, // SMTP server hostname
      auth: {
        user: process.env.MAIL_USER, // SMTP username
        pass: process.env.MAIL_PASS, // SMTP password
      },
    });

    // Sending email using transporter
    const info = await transporter.sendMail({
      from: "LernePulse || By Akshat Jain", // Sender's email address
      to: `${email}`, // Recipient's email address
      subject: `${title}`, // Email subject
      html: `${body}`, // Email body in HTML format
    });

    return info; // Returning information about the sent email
  } catch (error) {
    // Handling errors if any occur during the email sending process
    console.log("Error while sending mail (mailSender) - ", email);
  }
};
