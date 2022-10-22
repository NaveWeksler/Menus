import withAuth from 'lib/util/auth';
import Menu from 'lib/models/menu';
import { validateTitle } from 'lib/menu/menuValidator';
import menuItem from 'lib/models/menuItem';
const debug = require('debug')('menus:editMenu');

const handler = withAuth(1, async (req, res) => {
    // two cases. 1. user changes text, 2. user changes images. 1 and 2 wont be in same request.
    if (req.headers['content-type'] !== 'application/json') {
        return res.status(400).json({ error: 'Expected application/json' });
    }

    if (!req.body || !req.body.menu) return res.status(400).end();

    if (!req.user.permissions.includes(-1)) {
        debug('user is not admin. query for user menu');
        const exists = await Menu.exists({
            owner: req.user._id.toString(),
            _id: req.body.menu,
        });
        debug('found matching menu: ', exists);
        if (!exists) return res.status(403).end();
    }
    debug('valid. check for edits');
    if (validateTitle(req.body.title)) {
        debug('edit title');
        const status = await Menu.updateOne(
            { _id: req.body.menu },
            { $set: { title: req.body.title } }
        ).exec();
        debug('edit query status: %o', status);
    }

    if (req.body.items) {
        debug('edit items');
        const updates = req.body.items
            .filter(
                (item) =>
                    item._id &&
                    (item.name || item.price || item.description || item.image)
            )
            .map((item) => ({
                updateOne: {
                    filter: { _id: item._id, menu: req.body.menu },
                    update: {
                        $set: {
                            // ...(expression) && {object} adds property only if (expression) is true.
                            ...(item.name && { name: item.name }),
                            ...(item.description && {
                                description: item.description,
                            }),
                            ...(item.price && { price: item.price }),
                        },
                    },
                },
            }));
        debug('items: %O', updates, 'query to change');
        const status = await menuItem.bulkWrite(updates);
        debug('change items status: %o', status);
    }

    res.status(200).end();
});

export default handler;
