import {withDB} from "@lib/api/util/middleware";
import verify from "@lib/api/auth/googleVerify";
import User from "@lib/api/models/user";
import {getSessionToken, getSessionExpireMs} from "@lib/api/auth/tokenHandler"
const debug = require("debug")("menus:googleLogin");

const maxAgeSec = parseInt(process.env.SESSION_EXP_MS) / 1000;

/**
 *  login with google button
 * for now, requires user to verify email with google. maybe add our verification as anohter option.
 * */
export default withDB(async (req, res) => {
	console.log(req.cookies, req.body)
	if (!(
			req.cookies.g_csrf_token &&
			req.body.g_csrf_token &&
			req.body.g_csrf_token == req.cookies.g_csrf_token
		)) return res.status(406).end();

    const userData = await verify(req.body.credential);
    debug("data: ", userData);
    if (!userData) return res.status(401).end();

	const email = userData.email as string; // we require email in permission. (IMPORTANT)
	const user = await User.findOne({email, status: 0}).exec();

	if (!user) return res.status(404);

	 const sessionToken = getSessionToken(),
            sessionTokenExpMs = getSessionExpireMs();

    const status = await User.updateOne(
            { _id: user._id },
            { sessionToken, sessionTokenExpMs }
    ).exec();

    debug('updated, status: %o', status);

    res.setHeader('set-cookie', [
        'sessionToken=' +
            sessionToken +
            '; path=/;  samesite=strict; httponly; secure; Max-Age=' +
            maxAgeSec +
            ';'
    ]);

    return res.status(200).end();
});
