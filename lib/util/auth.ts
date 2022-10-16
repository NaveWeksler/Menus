import { withDB } from './middleware';
import User from 'lib/models/user';
const debug = require('debug')('menus:auth');
import {authRequest} from "lib/types/types"
import { NextApiResponse, GetServerSideProps, NextApiRequest } from 'next';

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
const withAuth = (routeID: number, next: (req: authRequest, res: NextApiResponse) => any) =>
    withDB(async (req: authRequest, res) => {
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

        res.setHeader('Cache-Control', 'private'); // after login should add private to prevent leaking private info.
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

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
                user.permissions,
                ', required',
                routeID
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
export const withAuthSSR = (routeID: number, next: GetServerSideProps ): GetServerSideProps => (context) => {
    const req = context.req;
    const res = context.res as typeof context.res & {redirect: (status: number, to: string) => any};

    res.redirect = (_, to: string) => ({
        redirect: {
            //ignore status if its possible to add status change it.
            destination: to,
            permanent: false,
        },
    });

    return withAuth(routeID, () => {
        return next(context);
    })(req as NextApiRequest, res as NextApiResponse);
};

export default withAuth;
