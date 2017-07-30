'use strict';
const ejs = require('ejs');
const nodemailer = require('nodemailer');
const Config = require('../../config')
const Promise = require('bluebird');

const ejsRender = Promise.promisify(ejs.renderFile)

// create reusable transporter object using the default SMTP transport
let transporter = nodemailer.createTransport({
    host: Config.smtpRelay,
    port: 587,
    secure: false, // secure:true for port 465, secure:false for port 587
    auth: {
        user: Config.smtpUsername,
        pass: Config.smtpPassword
    }
});

async function sendMail(options, template) {
  const mailOptions = {
    from: options.from, // sender address
    to: options.to, // list of receivers
    subject: options.subject,
    html: await ejsRender(__dirname + `/templates/${template}.ejs`),
  }

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
    console.log('Message %s sent: %s', info.messageId, info.response);
  });
}

module.exports = {
  sendMail
}
