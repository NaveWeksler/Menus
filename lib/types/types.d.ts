import {UserModel} from "lib/types/user";

import { NextApiRequest, NextApiResponse } from 'next';

export type nextFunction = (req: NextApiRequest, res: NextApiResponse) => any;
export type authRequest = NextApiRequest & {user: User};
