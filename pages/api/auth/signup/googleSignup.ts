import { withDB } from '@lib/api/util/middleware';
import verify from '@lib/api/auth/googleVerify';
import User from '@lib/api/models/user';
const debug = require('debug')('menus:googleLogin');

/**
 *  login with google button
 * for now, requires user to verify email with google. maybe add our verification as anohter option.
 * */

export default withDB(async (req, res) => {
	console.log(req.cookies, req.body);
	if (
		!(
			req.cookies.g_csrf_token &&
			req.body.g_csrf_token &&
			req.body.g_csrf_token == req.cookies.g_csrf_token
		)
	)
		return res.status(406).end();

	const userData = await verify(req.body.credential);
	console.log('GOOGLE DATA: ', userData);
	if (!userData) return res.status(401).end();
	const email = userData.email as string; // we require email in permission. (IMPORTANT)
	if (!userData.email_verified) {
		debug('email not verified');
		return res.status(401);
	}

	await User.create({
		email,
		state: 0,
		firstName: userData.given_name,
		familyName: userData.family_name,
	});
	res.redirect(200, '/auth/login');
});
