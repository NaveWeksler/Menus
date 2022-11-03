import { withDB } from './middleware';
import User from 'lib/api/models/user';
const debug = require('debug')('menus:auth');
import {AuthRequest} from "lib/api/types/types"
import { NextApiResponse, GetServerSideProps, NextApiRequest, GetServerSidePropsContext } from 'next';

/**
 * Permission Guide:
 * each api route has ID as a number (starting from 0)
 * special permissions are negetive (for example edit all menus is -1)
 * every user has an array of numbers which are IDs of api routes.
 * Example:  show owner permission is just [1, 3] (and more in the future)
 *
 * Route Ids:
 *
 * 1 editMenu route
 * 2 orders SSR page
 * 3 create Menu route
 *
 * special:
 * -1 edit all menus
 */

const ROUTESID: {[key: string]: number} = { // only routes
    "/api/menu/editMenu": 1,
    "/orders": 2,
    "/api/createMenu": 3,
};
Object.freeze(ROUTESID);

/**
 *
 * @param {Int} routeID the number associated with the route. (used for authorization)
 * @param {*} next route to call when done with authentication
 *
 * any rest request is allowed. CSRF check is required unless GET request
 * IMPORTANT - uses withDB by default.
 */
const withAuth = (next: (req: AuthRequest, res: NextApiResponse) => any) =>
    withDB(async (req, res) => {
        console.log(req.url, );
        const sessionToken = req.cookies['sessionToken'];
        // const csrfCookie = req.cookies['csrfToken'];
        // const csrfBody = req.body?.csrfToken;
        if (!req.url) return res.status(500).end();

        if (!sessionToken) {
            debug('Session Token Missing');
            return res.redirect(400, '/auth/login');
        }

        // check for csrf
        if (req.method !== 'GET' && req.headers.csrf !== "true") {
            debug('csrf header not found');
            return res.redirect(401, '/auth/login');
        }

        res.setHeader('Cache-Control', 'private'); // after login should add private to prevent leaking private info.
        // https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Cache-Control

        // get old user and change user session
        debug('query for user');
        const user = await User.findOne({ sessionToken }).lean().exec();
        console.log(user);
        debug('got user. check authorized');
        if (!user || !user.sessionTokenExpMs || new Date().getTime() > user.sessionTokenExpMs) {
            debug('cannot auth with non valid session');
            return res.redirect(401, '/auth/login');
        }

        
        // valid user
        debug('authenticated user');
        const requestUrl = req.url.split("?")[0]; // get url pathname (http://localhost:3000/abc/d?a=b ==> abc/d)
        if (!user.permissions.includes(ROUTESID[requestUrl])) {
            debug(
                'user permission',
                user.permissions,
                ', required',
                requestUrl
            );
            return res.redirect(403, '/');
        }
        debug('authorized user. next');
        
        const authReq = {...req, user} as AuthRequest
        return next(authReq, res);
    });

/**
 *
 * @param {Int} routeID the number associated with the route. (used for authorization)
 * @param {*} next the original 'getServerSideProps' function
 */
export const withSSRAuth = <GetServerSidePropsType extends { [key: string]: any; }>(next: GetServerSideProps ): GetServerSideProps<GetServerSidePropsType> => async (context: GetServerSidePropsContext) => {
    const req = context.req;
    const res = context.res as typeof context.res & {redirect: (status: number, to: string) => any};

    res.redirect = (_, to: string) => ({
        redirect: {
            //ignore status if its possible to add status change it.
            destination: to,
            permanent: false,
        },
    });

    return withAuth(() => {
        return next(context);
    })(req as NextApiRequest, res as NextApiResponse);
};

export default withAuth;
