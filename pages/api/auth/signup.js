const { withDB, rest } = require('lib/util/middleware');
import User from 'lib/models/user';
import { validUser } from 'lib/auth/userValidator';
import { storePsw } from 'lib/auth/pswStorage';
import { randomBytes } from 'crypto';
const debug = require('debug')('menus:signup');

const handler = rest.post(
    withDB(async (req, res) => {
        //test
        const { username, password, name, familyName } = req.body;

        if (!validUser(username, password, name, familyName))
            return res.status(400).end();

        debug('valid user. hash');

        const salt = randomBytes(16).toString('base64');
        const hashPsw = await storePsw(password, salt); // need to fix. storePsw might reject in which case an error will be thrown

        debug(
            'query: username %s full name: %s %s',
            username,
            name,
            familyName
        );

        const status = await User.updateOne(
            { username },
            {
                $setOnInsert: {
                    username,
                    password: hashPsw,
                    name,
                    familyName,
                    salt,
                },
            },
            { upsert: true }
        ).exec();

        debug('status: %o', status);
        if (status.upsertedCount !== 1) {
            return res.status(409).end();
        }
        res.redirect('/login', 201);
    })
);

export default handler;
