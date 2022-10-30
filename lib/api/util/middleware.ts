import connect from 'lib/api/mongoHandler';
import { NextApiRequest, NextApiResponse } from 'next';
import {AuthRequest, nextFunction} from "lib/api/types/types";
import z from "zod";

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


export const withContract = <Input, Output, Request extends NextApiRequest = NextApiRequest>(next: (req: Omit<Request, "body"> & {body: z.infer<typeof bodyValidator>}, res: NextApiResponse<Output>) => any, bodyValidator: z.Schema<Input>) =>
 (req: NextApiRequest | AuthRequest, res: NextApiResponse ) => {
    
    if (req.method === "post" && !bodyValidator.safeParse(req.body).success) return res.status(400).end();

    return next(req as (Omit<Request, "body"> & {body:  z.infer<typeof bodyValidator>}), res as NextApiResponse<Output>)
}

