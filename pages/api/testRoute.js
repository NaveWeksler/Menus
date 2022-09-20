import { withDB, rest } from "util/middleware";
import Menu from "lib/models/menu";

export default rest.post(withDB(async (req, res) => {
    const dbData = await Menu.find({}).exec();
    console.debug("server test route", dbData);

    res.status(200).json({data: dbData});

}));