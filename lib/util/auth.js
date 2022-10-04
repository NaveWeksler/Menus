import { withDB, rest } from './middleware';
import User from 'lib/models/user';
//import { getCSRFToken } from 'lib/tokenHandler';
const debug = require('deubg')('menus:auth');

/**
 *
 * @param {*} permission the max permisson required to continue
 * @param {*} next route to call when done with authentication
 *
 * IMPORTANT:
 * uses withDB by default.
 */
const withAuth = (permission, next) =>
    rest.post(
        withDB(async (req, res) => {
            const sessionToken = req.cookies['sessionToken'],
                csrfCookie = req.cookies['csrfToken'];
            const csrfBody = req.body?.csrfToken;

            if (!sessionToken) {
                debug('Token Missing');
                return res
                    .status(400)
                    .json({ error: 'Some Cookies Are Missing. Login Again' });
            }

            // check for csrf
            if (req.method !== 'GET' && csrfCookie !== csrfBody) {
                debug('csrf tokens are different');
                return res.sendStatus(401);
            }

            debug('check db for session');

            // get old user and change user session
            const user = await User.findOne({ sessionToken }).exec();

            if (!user || new Date().getTime() > user.sessionTokenExpMs) {
                debug('cannot auth with non valid session');
                return res.status(401).json({ error: 'Session Not Valid' });
            }

            // valid user
            debug('authenticated user');
            if (user.permission > permission) {
                debug(
                    'user permission',
                    user.permission,
                    ' required',
                    permission
                );
                res.status(403);
                return res.sendAuthData();
            }

            debug('autherized user');
            req.user = user;
            next(req, res);
        })
    );

export default withAuth;
