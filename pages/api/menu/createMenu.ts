import withAuth from 'lib/api/util/auth';

import { validateTitle } from 'lib/api/menu/menuValidator';
import Menu from 'lib/api/models/menu';
import {withContract} from "lib/api/util/middleware";
import {validator, type Input, type Output} from 'lib/contract/createMenu';
const debug = require('debug')('menus:createMenu');

const createMenu = withAuth(3, withContract<Input, Output>(async (req, res) => {
        const owner = req.cookies["owner"], title = req.body.title;
        if (!owner || !validateTitle(title)) return res.status(400).end();
        debug("query and create menu");
        const doc = await Menu.findOneAndUpdate({
            owner,
            title,
        }, {
            $setOnInsert: {
                owner,
                title
            }
        }, {
            upsert: true
        }).select("_id").exec();    
        debug("query status: %o", doc);
        
        if (!doc) return res.status(403).end();

        res.status(201).json({id: doc._id.toString()});
        
    }, validator
));



/**
 * const { title, items } = req.body;

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
 */
export default createMenu;
