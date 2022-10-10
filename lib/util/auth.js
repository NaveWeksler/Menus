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
 * any rest request is allowed. CSRF check is required unless GET request
 * IMPORTANT - uses withDB by default.
 */
const withAuth = (permission, next) =>
    withDB(async (req, res) => {
        const sessionToken = req.cookies['sessionToken'],
            csrfCookie = req.cookies['csrfToken'];
        const csrfBody = req.body?.csrfToken;

        if (!sessionToken) {
            debug('Session Token Missing');
            return res.redirect(400, 'auth/login');
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
            return res.redirect(401, 'auth/login');
        }

        // valid user
        debug('authenticated user');
        if (user.permission > permission) {
            debug('user permission', user.permission, ' required', permission);
            return res.redirect(403, '/');
        }
        debug('authorized user. next');
        req.user = user;
        return next(req, res);
    });

export const withSSRAuth = (permission, next) => async (context) => {
    // a bit messy but shortest way I can think of doing it.
    context.res.redirect = (_, to) => ({
        redirect: {
            //ignore status if its possible to add status change it.
            destination: to,
            permanent: false,
        },
    });
    return await withAuth(permission, () => next(context))(
        context.req,
        context.res
    );
};

export default withAuth;
