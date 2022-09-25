import { rest, withDB } from "lib/util/middleware";
import User from "lib/models/user";
import { getCSRFToken, getSessionToken, getSessionExpireMs } from "lib/tokenHandler";
import {checkUser} from "lib/userValidator";
const debug = require("debug")("menus:accountLogin");

const handler = rest.post(withDB(async (req, res) => {
    debug("BODY: %O", req.body);
    const {username, password} = req.body;

    if (!username || !password || !checkUser(username, password)) {
        return res.status(400).end();
    }


    const sessionToken = getSessionToken(), sessionTokenExpMs = getSessionExpireMs();
    const csrfToken = getCSRFToken();

    debug("query for account and set session");
    const status = await User.updateOne(
        {username: username, password: password},
         {sessionToken, sessionTokenExpMs}).exec();
         
    debug("account found status: %O", status);
    if (status.matchedCount !== 1) {
        return res.status(401).end();
    }

    res.setHeader("set-cookie", [
        "sessionToken=" + sessionToken + "; path=/;  samesite=strict; httponly; secure;",
         "csrfToken=" + csrfToken + "; path=/;  samesite=strict; httponly; secure;"]);

    res.status(200).json({csrfToken});

}));

export default handler;