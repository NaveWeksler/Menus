import debug from 'debug';
import MenuItem from 'lib/models/menuItem';

export const toMenuItems = async (menu, items) => {
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

const handleImage = (image) => {
    console.log(image);
    return '/images/hamburger.png';
};
