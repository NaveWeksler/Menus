const { withDB, rest } = require('lib/util/middleware');
import User from 'lib/models/user';
import { validUser } from 'lib/auth/userValidator';
import { storePsw } from 'lib/auth/pswStorage';
import { randomBytes } from 'crypto';
import sendHTML from 'lib/util/emailHandler';
const debug = require('debug')('menus:signup');

const handler = rest.post(
    withDB(async (req, res) => {
        //test
        const { email, password, name, lastName } = req.body;

        if (!validUser(email, password, name, lastName))
            return res.status(400).end();

        debug('valid user. hash');

        const salt = randomBytes(16).toString('base64');
        const hashPsw = await storePsw(password, salt); // need to fix. storePsw might reject in which case an error will be thrown
        const emailToken = randomBytes(3).toString('hex');

        sendHTML(
            'Validate Email For Menus',
            `<div><h1>Thank You For Registering a Menus Account</h1><p>Use this code to validate your email: <strong>${emailToken
                .split('')
                .join(
                    ' '
                )}</strong></p><p>If you did not registerd an account you dont need to do anything</p></div>`,
            email
        );

        res.setHeader('Cache-Control', 'no-store'); // prevent cache response

        debug('query: email %s full name: %s %s', email, name, lastName);

        const status = await User.updateOne(
            { email },
            {
                $setOnInsert: {
                    email,
                    password: hashPsw,
                    firstName: name,
                    lastName,
                    salt,
                    emailToken,
                },
            },
            { upsert: true }
        ).exec();

        debug('status: %o', status);
        if (status.upsertedCount !== 1) {
            return res.status(409).end();
        }

        res.redirect(201, 'auth/signup/validate?email=' + email);
    };)
);

export default handler;
