import { randomBytes } from 'crypto';
import nodemailer from 'nodemailer';
const debug = require('debug')('menus:signupEmailValidator');

const validateEmail = (email) => {
    const transporter = nodemailer.createTransport({
        service: 'Gmail',
        auth: {
            user: process.env.EMAIL,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const validateEmailToken = randomBytes(3).toString('hex');
    const mail = {
        from: process.env.EMAIL,
        to: email,
        subject: 'Validate Email For Menus',
        html: `<div><h1>Thank You For Registering a Menus Account</h1><p>Use this code to validate your email: <strong>${validateEmailToken
            .split('')
            .join(
                ' '
            )}</strong></p><p>Didnt register an account? dont worry you dont have to do anything.</p></div>`,
    };

    transporter.sendMail(mail, (error, info) => {
        if (error) return debug('Error: %o', error);
        debug('Sent Successfully, %o', info);
    });
    return validateEmailToken;
};

export default validateEmail;
