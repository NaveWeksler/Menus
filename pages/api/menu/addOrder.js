import withAuth from 'lib/util/auth';
import Order from 'lib/models/order';
import MenuItem from 'components/MenuItem';
const debug = require('debug')('menus:addOrder');

const handler = withAuth(4, async (req, res) => {
    const { menu, order } = req.body;
    if (!menu || !order || order.length == 0) return res.status(400).end();
    // NOTE: order is an array of objectIds. each item user added will be added as an objectId for the menuItem

    // check if all ids in order are valid, 'menu' is the menu they belong to.
    debug('check if all orders are valid');
    const exsiting =
        (
            await MenuItem.find({ _id: { $in: order }, menu })
                .select('')
                .exec()
        ).length === order.length;
    debug('orders query status: ', exsiting);
    if (!exsiting)
        return res
            .status(400)
            .json('One or more of the order items is not available');

    debug('add order');
    const status = await Order.insertOne({ menu: menu, items: order });
    debug('add order status: %o', status);

    return res.status(200).end();
});

export default handler;