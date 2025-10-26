const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || undefined,
  host: process.env.EMAIL_HOST || undefined,
  port: process.env.EMAIL_PORT || undefined,
  secure: process.env.EMAIL_SECURE === "true", 
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

async function sendEmail(email, type) {
  try {
    if (type === "loginMail") {
      let info = await transporter.sendMail({
        from: `"owiaseee" <${process.env.EMAIL_USER}>`,
        to: email,
        subject: "Your account was just logged in",
        html: `
      <div style="font-family: Arial, sans-serif; padding: 20px;">
        <h2>🔔 Login Alert</h2>
        <p>Hello,</p>
        <p>Your account was just logged in. If this was <b>not you</b>, please reset your password immediately.</p>
        <p>
          <a href="https://grabxy/reset-password" 
             style="background: red; color: white; padding: 10px 15px; text-decoration: none; border-radius: 5px;">
             Reset Password
          </a>
        </p>
        <br/>
        <p>Regards,<br/>Team owiaseee</p>
      </div>
    `,
      });

      console.log("Email sent:", info.messageId);
    }
  } catch (error) {
    console.error("Email error:", error);
  }
}

module.exports = sendEmail;
