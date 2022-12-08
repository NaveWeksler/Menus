import type { IMenuItem } from 'lib/api/models/menuItem';
import Menu from 'lib/api/models/menu';
import connect from 'lib/api/mongoHandler';

/**
 * @returns Array of all the menus id's.
 */
export const getMenusIds = async () => {
	await connect();
	const ids = await Menu.find().select('_id');

	return ids.map(({ _id }) => _id.toString());
};

/**
 *
 * @param {String} id The id.
 * @returns The specific menu associated with the id.
 */
export const getMenuData = async (id: string) => {
	await connect();

	const menu = await Menu.findById(id)
		.select('-_id -__v -owner') // unnecessary fields
		.populate<{ items: Omit<IMenuItem & { _id: string }, '__v' | 'owner'>[] }>({
			path: 'items',
			select: '-__v -menu',
			options: { lean: true },
		}) // populating the array of items
		.lean(); // required for serializing in 'getStaticProps'
	if (!menu) throw Error('menu:' + id + 'is null');
	menu.items.forEach((item) => (item._id = item._id.toString())); // maybe mongoose can do it
	return menu;
};
