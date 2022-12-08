import User from 'lib/api/models/user';
import { storePsw } from 'lib/api/auth/pswStorage';
import { checkUser } from 'lib/api/auth/userValidator';
import { rest, withDB } from 'lib/api/util/middleware';
import { randomBytes } from 'crypto';
const debug = require('debug')('menus:changePassword');

const handler = rest.post(
	withDB(async (req, res) => {
		const { token, email, newPassword } = req.body; // include email to prevent same token on two accounts
		if (!token || !newPassword || !email || !checkUser(email, newPassword))
			return res.status(400).end();

		res.setHeader('Cache-Control', 'no-store'); // prevent cache response

		const salt = randomBytes(16).toString('base64');
		const hashedPassword = await storePsw(newPassword, salt); // need to fix. storePsw might reject in which case an error will be thrown

		debug('query to update password');
		const status = await User.updateOne(
			// update account if token is valid.
			{
				emailToken: token,
				email,
				emailTokenExpMs: { $gt: new Date().getTime() },
			},
			{
				$set: { password: hashedPassword, salt },
				$unset: { emailToken: '', emailTokenExpMs: '' }, // remove uncessery fields
			}
		).exec();
		debug('status: %o', status);

		if (status.modifiedCount != 1) return res.status(401).end();
		res.redirect(200, 'auth/login');
	})
);

export default handler;
