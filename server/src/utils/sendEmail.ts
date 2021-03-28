'use strict';
const nodemailer = require('nodemailer');

// async..await is not allowed in global scope, must use a wrapper
export async function sendEmail(to: string, html: string) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let transporter = nodemailer.createTransport({
    name: 'example.com',
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: `${process.env.NODEMAILER_EMAIL}`,
      pass: `${process.env.NODEMAILER_PASSWORD}`,
    },
  });

  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>',
    to,
    subject: 'Hello ✔',
    html,
  });

  console.log('Message sent: %s', info.messageId);
  console.log('Info: ', info);
  console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
}
