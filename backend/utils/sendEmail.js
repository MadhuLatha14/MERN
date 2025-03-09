const nodemailer = require("nodemailer");
const fs = require("fs");  // For reading the PDF file
const path = require("path"); // For resolving the file path

const sendEmail = async (to, subject, text, pdfPath) => {
  try {
    // Create a transporter object using your email provider's SMTP server details
    const transporter = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      secure: false, // Set to true for 465 port
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // Email message details (sending plain text + PDF as an attachment)
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to,
      subject,
      text, // The prescription text you want to send
      attachments: [
        {
          filename: path.basename(pdfPath), // Use the filename of the PDF
          path: pdfPath, // Path to the generated PDF file
        },
      ],
    };

    // Send email
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully with attachment!");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = sendEmail;
