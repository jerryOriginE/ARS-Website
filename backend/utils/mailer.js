const { Resend } = require("resend");
const { render } = require("@react-email/render");
const React = require("react");

// current extension is .tsx, so we need to import the default export
const VerifyEmail = require("../emails/VerifyEmail").default;

const resend = new Resend(process.env.RESEND_API_KEY);
console.log("IDIOT DONT FORGET TO DELETE THE RESEND API BEFORE COMMITING")

const BASE_URL =
  process.env.BASE_URL || "http://localhost:5000";

async function sendVerificationEmail(to, token, username) {
  const verificationLink = `${BASE_URL}/auth/verify-email?token=${token}`;

  // render React email → HTML
  const emailHtml = await render(
    React.createElement(VerifyEmail, {
      verificationLink,
      username,
    })
  );

  //console.log(typeof emailHtml);
  //console.log(emailHtml);

  await resend.emails.send({
    from: "ARS <noreply@balamserver.top>",
    to,
    subject: "Verifica tu correo electrónico",
    html: emailHtml,
  });
  
}

module.exports = {
  sendVerificationEmail,
};