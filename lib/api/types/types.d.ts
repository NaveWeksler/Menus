import { UserModel } from 'lib/api/types/user';

import { NextApiRequest, NextApiResponse } from 'next';

export type nextFunction = (req: NextApiRequest, res: NextApiResponse) => any;
export type AuthRequest = NextApiRequest & { user: UserModel };
