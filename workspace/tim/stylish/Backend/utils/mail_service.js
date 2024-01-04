require("dotenv").config();
const nodemailer = require("nodemailer");

const mailOptions = {
  resetPassword: (name, resetLink) => {
    const subject = `Stylish - Reset Password`;
    const html = `
      <h3>Dear ${name},</h3>
      <p>Please click the link below to reset your password.</p>
      <a href="${resetLink}">Reset Password</a>
      <hr>
      <p>Best Regards,</p>
      <p>Stylish Team</p>
      `;
    return [subject, html];
  },
};

async function sendMailWithOption(options) {
  console.log("sendMailWithOption");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.SYSTEM_EMAIL,
      pass: process.env.SYSTEM_EMAIL_PWD,
    },
  });

  try {
    const info = await transporter.sendMail(options);
    console.log("Email Sent Successfully: " + info.response);
    return { success: true, message: "Email sent successfully." };
  } catch (error) {
    console.log(error);
    return { success: false, message: "Failed to send email." };
  }
}

const sendResetLink = async (email, resetToken) => {
  console.log("sendResetLink");
  const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;
  const [subject, html] = mailOptions.resetPassword(email, resetLink);
  const options = {
    from: process.env.SYSTEM_EMAIL,
    to: email,
    subject: subject,
    html: html,
  };
  const result = await sendMailWithOption(options);
  console.log(result);
  return result;
};

module.exports = {
  sendResetLink,
};
