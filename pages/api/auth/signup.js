const { withDB, rest } = require("lib/util/middleware");
import User from "lib/models/user";
import {validUser} from "lib/userValidator";
const debug = require("debug")("menus:signup");


const handler = rest.post(withDB(async (req, res) => { //test
    const {username, password, name, familyName} = req.body;

    if (!validUser(username, password, name, familyName)) return res.status(400).end();
        
    debug("query: username %s full name: %s %s", username, name, familyName);
    const status = await User.updateOne({username}, {$setOnInsert: {username, password, name, familyName}}, {upsert: true}).exec();
    debug("status: %o", status);
    if (status.upsertedCount !== 1) {
        return res.status(409).end();
    }
    res.redirect("/login", 201);
}));

export default handler;