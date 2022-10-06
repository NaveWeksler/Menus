import { rest, withDB } from 'lib/util/middleware';
import User from 'lib/models/user';
import {
    getCSRFToken,
    getSessionToken,
    getSessionExpireMs,
} from 'lib/auth/tokenHandler';
import { checkUser } from 'lib/auth/userValidator';
import { comparePsw } from 'lib/auth/pswStorage';
const debug = require('debug')('menus:accountLogin');

const handler = rest.post(
    withDB(async (req, res) => {
        debug('BODY: %O', req.body);
        const { email, password } = req.body;

        if (!email || !password || !checkUser(email, password)) {
            return res.status(400).end();
        }

        debug('query for account');
        const userToAuth = await User.findOne({ email })
            .select('password salt')
            .lean();
        debug('account found. compare with request');
        if (!comparePsw(password, userToAuth.password, userToAuth.salt)) {
            return res.status(401).end();
        }
        debug('valid request, update session');

        const sessionToken = getSessionToken(),
            sessionTokenExpMs = getSessionExpireMs(),
            csrfToken = getCSRFToken();

        const status = await User.updateOne(
            { _id: userToAuth._id },
            { sessionToken, sessionTokenExpMs }
        ).exec();
        debug('updated status: %o', status);

        res.setHeader('set-cookie', [
            'sessionToken=' +
                sessionToken +
                '; path=/;  samesite=strict; httponly; secure;',
            'csrfToken=' +
                csrfToken +
                '; path=/;  samesite=strict; httponly; secure;',
        ]);

        res.status(200).json({ csrfToken });
    })
);

export default handler;
