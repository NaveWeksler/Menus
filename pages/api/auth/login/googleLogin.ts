import {withDB} from "@lib/api/util/middleware";
import verify from "@lib/api/auth/googleVerify";
import User from "@lib/api/models/user";
import {getSessionToken, getSessionExpireMs} from "@lib/api/auth/tokenHandler"
const debug = require("debug")("menus:googleLogin");

const maxAgeSec = parseInt(process.env.SESSION_EXP_MS) / 1000;

/**
 *  login with google. if no account, create one.
 * for now, requires user to verify email with google. maybe add our verification as anohter option.
 */
export default withDB(async (req, res) => {
	
	if (!(
			req.cookies.g_csrf_token &&
			req.body.g_csrf_token &&
			req.body.g_csrf_token == req.cookies.g_csrf_token
		)) return res.status(406).end();

    const userData = await verify(req.body.credential);

    debug("data: ", userData);

    if (!userData) return res.status(401).end();

	const email = userData.email as string; // we require email in permission. (IMPORTANT)

    const sessionToken = getSessionToken(),
            sessionTokenExpMs = getSessionExpireMs();

	
    const status = await User.updateOne(
            { email, status: 0 },
            {$set: {sessionToken, sessionTokenExpMs} },
    ).exec();

    if (status.modifiedCount !== 1) {
        await User.create(
            {
                firstName: userData.name?.split(" ")[0],
                lastName: userData.family_name,
                email,
                status: 0,
                sessionToken,
                sessionTokenExpMs
            }
        );
    }

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
