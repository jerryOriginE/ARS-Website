const { MailtrapClient } = require("mailtrap");
const nodemailer = require("nodemailer");

// ----------------------
// ENV DETECTION
// ----------------------
const isProd = process.env.NODE_ENV === "production";

// ----------------------
// BASE URL
// ----------------------
const BASE_URL =
  process.env.BASE_URL || "http://localhost:5000";

// ----------------------
// EMAIL FUNCTION
// ----------------------
async function sendVerificationEmail(to, token) {
  const link = `${BASE_URL}/auth/verify-email?token=${token}`;

  // DEVELOPMENT (MAILTRAP)
  if (!isProd) {
    const client = new MailtrapClient({
      token: process.env.MAILTRAP_TOKEN || '25e2d22a9b6562c3c79399acb2fe9b07',
    });

    const sender = {
      email: "no-reply@ars.local",
      name: "ARS Dev System",
    };

    await client.send({
      from: sender,
      to: [{ email: to }],
      subject: "Verify your ARS account",
      text: `Verify your account: ${link}`,
      html: `
        <div style="font-family: Arial">
          <h2>👋 Welcome to ARS (DEV)</h2>
          <p>Click below to verify your email:</p>
          <a href="${link}"
             style="padding:10px 15px;background:#6E9B2D;color:white;text-decoration:none;border-radius:6px;">
            Verify Email
          </a>
          <p style="color:#888;margin-top:10px;">
            DEV MODE - Mailtrap Email
          </p>
        </div>
      `,
      category: "dev-verification",
    });

    return;
  }

  // PRODUCTION 
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,   // e.g. smtp.zoho.com
    port: process.env.EMAIL_PORT || 465,
    secure: true,
    auth: {
      user: process.env.EMAIL_USER, // no-reply@balamserver.top
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"ARS System" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Verify your ARS account",
    html: `
      <div style="font-family: Arial">
        <h2>Bienvenido a ARS 👋</h2>
        <p>Por favor, verifica tu correo electrónico haciendo clic abajo:</p>
        <a href="${link}" style="padding:10px 15px;background:#6E9B2D;color:white;text-decoration:none;border-radius:6px;">
          Verificar correo
        </a>
        <p style="margin-top:20px;color:#888;">Si no te registraste, ignora este correo.</p>
      </div>
    `
  });
}

module.exports = {
  sendVerificationEmail,
};