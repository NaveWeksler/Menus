import { withDB } from './middleware';
import User from 'lib/models/user';
const debug = require('debug')('menus:auth');

/**
 * Permission Guide
 * each api route has ID as a number (starting from 0)
 * every user has an array of numbers which are IDs of api routes.
 * Example:  show owner permission is just [1, 3] (and more in the future)
 *
 * Route Ids:
 *
 * 1 editMenu route
 * 2 orders SSR page
 * 3 create Menu route
 *
 */

/**
 *
 * @param {Int} routeID the number associated with the route. (used for authorization)
 * @param {*} next route to call when done with authentication
 *
 * any rest request is allowed. CSRF check is required unless GET request
 * IMPORTANT - uses withDB by default.
 */
const withAuth = (routeID, next) =>
    withDB(async (req, res) => {
        const sessionToken = req.cookies['sessionToken'];
        const csrfCookie = req.cookies['csrfToken'];
        const csrfBody = req.body?.csrfToken;

        if (!sessionToken) {
            debug('Session Token Missing');
            return res.redirect(400, '/auth/login');
        }

        // check for csrf
        if (req.method !== 'GET' && csrfCookie !== csrfBody) {
            debug('csrf tokens are different');
            return res.redirect(401, '/auth/login');
        }

        debug('check db for session');

        // get old user and change user session
        debug('query for user');
        const user = await User.findOne({ sessionToken }).lean().exec();
        console.log(user);
        debug('got user. check authorized');
        if (!user || new Date().getTime() > user.sessionTokenExpMs) {
            debug('cannot auth with non valid session');
            return res.redirect(401, '/auth/login');
        }

        // valid user
        debug('authenticated user');
        if (!user.permissions.includes(routeID)) {
            debug(
                'user permission',
                user.permission,
                ', required',
                permissions
            );
            return res.redirect(403, '/');
        }
        debug('authorized user. next');
        req.user = user;
        return next(req, res);
    });

/**
 *
 * @param {Int} routeID the number associated with the route. (used for authorization)
 * @param {*} next the original 'getServerSideProps' function
 */
export const withAuthSSR = (routeID, next) => (context) => {
    const { req, res } = context;
    console.log(req.cookies);

    res.redirect = (_, to) => ({
        redirect: {
            //ignore status if its possible to add status change it.
            destination: to,
            permanent: false,
        },
    });

    return withAuth(routeID, () => {
        return next(context);
    })(req, res);
};

export default withAuth;
