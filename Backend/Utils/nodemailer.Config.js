require('dotenv').config();

const nodemailer = require('nodemailer')

const sendEmail = async ({ to, subject, html }) => {
  let testAccount = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_SENDER,
    port: process.env.EMAIL_PORT,
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

  return transporter.sendMail({
    from: '"The Kitchen Food" <kitchen.food.B32@gmail.com>', // sender address
    to,
    subject,
    html,
  });
};

module.exports = sendEmail;