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

// Function to send login alert email
async function sendLoginAlert(email) {
  try {
    const info = await transporter.sendMail({
      from: `"Owais" <${process.env.EMAIL_USER}>`,
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
        <p>Regards,<br/>Team Owais</p>
      </div>
      `,
    });

    console.log("Login alert email sent:", info.messageId);
  } catch (error) {
    console.error("Login email error:", error);
  }
}
async function sendContactMail({ name, email, subject, message }) {
  try {
    // 1️⃣ Acknowledgment email to the user
    const userInfo = await transporter.sendMail({
      from: `"Blinkbitlabs Support" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Thank you for contacting Blinkbitlabs!",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>👋 Hello ${name},</h2>
          <p>Thank you for reaching out to us. We’ve received your message and will get back to you soon.</p>
          <br/>
          <p>Best regards,<br/><b>The Blinkbitlabs Team</b></p>
        </div>
      `,
    });
    console.log("Acknowledgment email sent to user:", userInfo.messageId);

    const forwardEmail = await transporter.sendMail({
      from: `"Blinkbitlabs Forward" <${process.env.EMAIL_USER}>`,
      to: "shazzujgr@gmail.com", // replace with your desired forwarding email
      subject: `FWD: New Message from ${name}: ${subject}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Forwarded Contact Submission</h2>
          <p><strong>Original Sender:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <br/>
          <p>— Blinkbitlabs Website</p>
        </div>
      `,
    });
    console.log("Forwarded email sent:", forwardEmail.messageId);

    const CompanyEmail = await transporter.sendMail({
      from: `"Blinkbitlabs Forward" <${process.env.EMAIL_USER}>`,
      to: "blinkbitlabs@gmail.com",
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Forwarded Contact Submission</h2>
          <p><strong>Original Sender:</strong> ${name} (${email})</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
          <br/>
          <p>— Blinkbitlabs Website</p>
        </div>
      `,
    });
    console.log("CompanyEmail email sent:", CompanyEmail.messageId);
  } catch (error) {
    console.error("Contact mail error:", error);
  }
}

module.exports = { sendLoginAlert, sendContactMail };
