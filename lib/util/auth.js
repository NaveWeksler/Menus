import { withDB, rest } from './middleware';
import User from 'lib/models/user';
const debug = require('debug')('menus:auth');
//import { getCSRFToken } from 'lib/tokenHandler';
// const debug = require('deubg')('menus:auth');

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
                debug('Session Token Missing');
                return res.redirect('/login', 400);
            }

            // check for csrf
            if (req.method !== 'GET' && csrfCookie !== csrfBody) {
                debug('csrf tokens are different');
                return res.status(401).end();
            }

            debug('check db for session');

            // get old user and change user session
            debug('query for user');
            const user = await User.findOne({ sessionToken }).lean().exec();
            debug('got user. check authorized');
            if (!user || new Date().getTime() > user.sessionTokenExpMs) {
                debug('cannot auth with non valid session');
                return res.redirect('/login', 401);
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
                res.redirect('/', 403);
            }
            debug('authorized user. next');
            req.user = user;
            next(req, res);
        })
    );

export default withAuth;
