import User from 'lib/models/user';
import { rest, withDB } from 'lib/util/middleware';
const debug = require('debug')('menus:verifyEmail');

const handler = rest.post(withDB(
    async (req, res) => {
        const { email, token } = req.body;
        debug(email, token);
        if (!email || !token) return res.status(400).end();

        res.setHeader('Cache-Control', 'no-store'); // prevent cache response

        debug('query for account');
        const status = await User.updateOne(
            { email, emailToken: token },
            { $set: { state: 0 } }
        );
        debug('status: %o', status);

        if (status.modifiedCount !== 1) return res.status(401).end();

        res.redirect(200, 'auth/login');
    }));

export default handler;
