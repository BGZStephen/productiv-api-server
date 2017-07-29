'use strict';
const nodemailer = require('nodemailer');
const Config = require('../config')

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

// setup email data with unicode symbols
let mailOptions = {
    from: '"Stephen Wright 👻" <sjw948@gmail.com>', // sender address
    to: 'sjw948@gmail.com', // list of receivers
    subject: 'Hello ✔', // Subject line
    text: 'Hello world ?', // plain text body
    html: '<b>Hello world ?</b>' // html body
};

// send mail with defined transport object
// transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//         return console.log(error);
//     }
//     console.log('Message %s sent: %s', info.messageId, info.response);
// });
