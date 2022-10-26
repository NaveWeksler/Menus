import connect from 'lib/api/mongoHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {nextFunction} from "lib/api/types/types";

export const withDB = (next: nextFunction) => async (req: NextApiRequest, res: NextApiResponse) => {
    await connect();
    return next(req, res);
};

const expectMethod = (next: nextFunction, type: string) => (req: NextApiRequest, res: NextApiResponse ) => {
    if (req.method !== type) {
        res.status(400).json({ error: `Expected ${type} Request` });
        return;
    }
    next(req, res);
};

/**
 * expect request type like GET or POST.
 * example:
 * const somePostRoute = rest.post((req, res) => {
 *  // post request only
 * })
 */
export const rest: {[key: string]: (next: nextFunction) => any} = {
    post: (next) => expectMethod(next, 'POST'),
    get: (next) => expectMethod(next, 'GET'),
};
