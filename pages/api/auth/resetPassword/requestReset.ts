import { rest, withDB } from 'lib/api/util/middleware';
import sendHTML from 'lib/api/util/emailHandler';
import { randomBytes } from 'crypto';
import User from 'lib/api/models/user';
const debug = require('debug')('menus:requestReset');

// reset password. send email with token to reset password

const handler = rest.post(
    withDB(async (req, res) => {
        const email = req.body.email;
        if (!email) return res.status(400).end();

        res.setHeader('Cache-Control', 'no-store'); // prevent cache response

        const token = randomBytes(3).toString('hex');

        sendHTML(
            'Reset Your Menus Password',
            `
        <h1>Reset Password</h1>
        <p>
            Enter this token to change your password.
            <strong>
                ${token.split('').join(' ')}
            </strong>
        </p>
        <p><strong>If you did not request a password reset you dont need to do anything</strong></p>
    `,
            email
        );
        debug('new request, set token in db');
        const status = await User.updateOne(
            { email, state: { $ne: 2 } },
            {
                $set: {
                    emailToken: token,
                    emailTokenExpMs:
                        new Date().getTime() +
                        (parseInt(process.env.RESET_PSW_EXP_MS) | 0),
                },
            }
        ).exec();
        debug('status: %o', status);
        if (status.modifiedCount != 1) return res.status(404).end();
        res.status(200).end();
    })
);

export default handler;
