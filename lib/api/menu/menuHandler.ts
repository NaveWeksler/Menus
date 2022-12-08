import MenuItem from 'lib/api/models/menuItem';
import mongoose from 'mongoose';

export const toMenuItems: (
	menu: string,
	items: [
		{
			name: string;
			description: string;
			price: string;
			image: string;
			menu: string;
		}
	]
) => Promise<mongoose.Types.ObjectId[]> = async (menu, items) => {
	// each item has price, name, description. if image is given, add it to public.
	//TODO: add checks for additions.
	const validItems = items.map((item) => {
		const imagePath = item.image ? handleImage(item.image) : undefined; // if user added image process it. if not dont add the field to the document
		return {
			name: item.name,
			description: item.description,
			price: item.price,
			image: imagePath,
			menu: menu,
		};
	});

	const dbItems = await MenuItem.insertMany(validItems, { lean: true });
	return dbItems.map((obj) => obj._id);
};

const handleImage = (image: string) => {
	console.log(image);
	return '/images/hamburger.png';
};
