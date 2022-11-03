import { rest, withDB, withContract } from 'lib/api/util/middleware';
import User from 'lib/api/models/user';
import {
    getSessionToken,
    getSessionExpireMs,
} from 'lib/api/auth/tokenHandler';
import { checkUser } from 'lib/api/auth/userValidator';
import { comparePsw } from 'lib/api/auth/pswStorage';
import { Input, Output, validator } from 'lib/contract/accountLogin';

const debug = require('debug')('menus:accountLogin');

const maxAgeSec = parseInt(process.env.SESSION_EXP_MS) / 1000;

const handler = rest.post(
    withDB(withContract<Input, Output>(async (req, res) => {
        const { email, password } = req.body;
        
        if (!email || !password || !checkUser(email, password)) {
            return res.status(400).end();
        }

        res.setHeader('Cache-Control', 'no-store'); // prevent cache response
        debug('query for account');
        const userToAuth = await User.findOne({ email })
            .select('password salt')
            .lean();

        debug('account found. compare with request');

        if (
            !userToAuth ||
            !(await comparePsw(password, userToAuth.password, userToAuth.salt))
        ) {
            return res.status(401).end();
        }
        debug('valid request, update session');

        const sessionToken = getSessionToken(),
            sessionTokenExpMs = getSessionExpireMs();

        const status = await User.updateOne(
            { _id: userToAuth._id },
            { sessionToken, sessionTokenExpMs }
        ).exec();
        debug('updated status: %o', status);

        res.setHeader('set-cookie', [
            'sessionToken=' +
                sessionToken +
                '; path=/;  samesite=strict; httponly; secure; Max-Age=' +
                maxAgeSec +
                ';'
        ]);

        return res.status(200).end();
    }, validator)));

export default handler;
