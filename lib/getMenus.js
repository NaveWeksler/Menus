import Menu from './models/menu';
import connect from './mongoHandler';
const debug = require('debug')('menus:getMenus');

/**
 * @returns Array of all the menus id's.
 */
export const getMenusIds = async () => {
    await connect();
    debug('query menus ids');
    const ids = await Menu.find().select('_id');
    debug('return menus ids');
    return ids.map(({ _id }) => _id.toString());
};

/**
 *
 * @param {String} id The id.
 * @returns The specific menu associated with the id.
 */
export const getMenuData = async (id) => {
    await connect();

    debug('query for menu data'); // log query time

    const menu = await Menu.findById(id)
        .select('-_id -__v') // unnecessary fields
        .populate([{ path: 'items', select: '-_id -__v' }]) // populating the array of items
        .lean(); // required for serializing in 'getStaticProps'

    debug('return menu data'); // log query time

    return menu;
};
