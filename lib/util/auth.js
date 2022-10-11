import { withDB } from './middleware';
import User from 'lib/models/users/user';
const debug = require('debug')('menus:auth');

/**
 * enum of permissions to use when calling 'withAuth'
 */
export const Permissions = {
    Client: 'Client',
    ShopOwner: 'ShopOwner',
};

/**
 *
 * @param {String} permission the type of user allowed to enter the page
 * @param {*} next route to call when done with authentication
 *
 * any rest request is allowed. CSRF check is required unless GET request
 * IMPORTANT - uses withDB by default.
 */
const withAuth = (permissions, next) =>
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
        if (!permissions.includes(user.permission)) {
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
 * @param {String} permission the type of user allowed to enter the page
 * @param {*} next the original 'getServerSideProps' function
 */
export const withAuthSSR = (permissions, next) => (context) => {
    const { req, res } = context;
    console.log(req.cookies);

    res.redirect = (_, to) => ({
        redirect: {
            //ignore status if its possible to add status change it.
            destination: to,
            permanent: false,
        },
    });

    return withAuth(permissions, () => {
        return next(context);
    })(req, res);
};

export default withAuth;

