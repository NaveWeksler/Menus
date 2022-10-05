import withAuth from 'lib/util/auth';
import { toMenuItems } from 'lib/menu/menuHandler';
import { validateItems, validateTitle } from 'lib/menu/menuValidator';
import Menu from 'lib/models/menu';
import { Types } from 'mongoose';
const debug = require('debug')('menus:createMenu');

const createMenu = withAuth(1, async (req, res) => {
    const { title, items } = req.body;

    if (!validateItems(items) || !validateTitle(title))
        return res.status(400).end();

    debug('valid data. generate items');

    const menuId = new Types.ObjectId(); // generate menu id for refrencing by the items.
    const ids = await toMenuItems(menuId, items);

    debug('add menu');

    const status = await Menu.updateOne(
        { title },
        { $setOnInsert: { _id: menuId, title, items: ids } },
        { upsert: true }
    ).exec();
    debug('status: %o', status);

    res.status(201).end();
});

export default createMenu;
