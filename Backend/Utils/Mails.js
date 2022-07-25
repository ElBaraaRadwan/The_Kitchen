const agent = require("../modules/users/Model/user.model");
const user = require("../modules/users/Model/user.model");
const sendEmail = require("./nodemailer.Config");

const sendResetPassswordEmail = async ({ name, email, token, origin }) => {
  const resetURL = `${origin}/user/reset-password?token=${token}&email=${email}`;
  const message = `<p>Please reset password by clicking on the following link : 
  <a href="${resetURL}">Reset Password</a></p>`;

  return sendEmail({
    to: email,
    subject: "Reset Password",
    html: `<h4>Hello, ${name}</h4>
   ${message}
   `,
  });
};

const sendVerificationEmail = async ({
  name,
  email,
  verificationToken,
  origin,
}) => {
  const verifyEmail = `${origin}/user/verify-email?token=${verificationToken}&email=${email}`;

  const message = `<p>Please confirm your email by clicking on the following link : 
  <a href="${verifyEmail}">Verify Email</a> </p>`;

  return sendEmail({
    to: email,
    subject: "Email Confirmation",
    html: `<h4> Hello, ${name}</h4>
    ${message}
    `,
  });
};

const sendTicketConfirmation = async ({ name, email, ticketID }) => {
  const message = `<p>Thank you for using and trusting our service. Please remember your ticket id so you can track it process, and you will receive a reply in day or two</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: "Your ticket have been saved",
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  });
};

const sendTicketDely = async ({ name, email, ticketID }) => {
  const message = `<p>We're very sorry for taking so long to respond to your problem, since their were solutions found. We updated your ticket to the highest level of priorty so that can be solve as soon as passable.</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: "Your ticket have been saved",
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  });
};

const sendTicketDelyToAdmin = async ({ name, email, ticketID }) => {
  const message = `<p>There has been ticket that toke more than the days without a solution, please look in to it as soon as passible to provide a solution to the problem</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: "Your ticket have been saved",
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  });
};

const sendTicketUpdation = async ({ name, email, ticketID }) => {
  const message = `<p>The ticket you have been working on got an update, please check it in the website</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: `ticket ID:${ticketID} has an upadate`,
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  }).catch((err) => console.log(err));
};

const sendTicketAssgin = async ({ name, email, ticketID }) => {
  const message = `<p>This ticket has been assign to you, please solve it in a day or two</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: `NEW TICKET`,
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  }).catch((err) => console.log(err));
};

const sendTicketSolution = async ({ name, email, ticketID }) => {
  const message = `<p>their has been a reply to your problem, please check the ticket in our website</p>
  <br /><p>${ticketID}</p>`;

  return sendEmail({
    to: email,
    subject: `Your ticket ${ticketID} has a reply`,
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  }).catch((err) => console.log(err));
};

const sendReport = async ({ name, email, reportID }) => {
  const message = `<p>their is a new report, please check it</p>
  <br /><p>${reportID}</p>`;

  return sendEmail({
    to: email,
    subject: `NEW REPORT`,
    html: `<h2>Hello ${name}</h2>
   ${message}
   `,
  }).catch((err) => console.log(err));
};

module.exports = {
  sendTicketConfirmation,
  sendTicketUpdation,
  sendTicketAssgin,
  sendTicketSolution,
  sendReport,
  sendResetPassswordEmail,
  sendVerificationEmail,
  sendTicketDely,
  sendTicketDelyToAdmin
};
