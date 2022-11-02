import User from 'lib/api/models/user';
import { rest, withDB, withContract } from 'lib/api/util/middleware';
import {Input, Output, validator} from "lib/contract/verifyEmail";
const debug = require('debug')('menus:verifyEmail');

const handler = rest.post(withDB(withContract<Input, Output>(
    async (req, res) => {
        const { email, token } = req.body;
        debug(email, token, req.body, typeof req.body);
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
    }, validator)));

export default handler;
