import mongoose from 'mongoose';
import User from './user';

const shopOwnerSchema = new mongoose.Schema({
    menus: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Menu' }],
        required: true,
    },
    sales: {
        // everything the shop owner sold
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
        required: true,
    },
});

export default mongoose.models.ShopOwner ||
    User.discriminator('ShopOwner', shopOwnerSchema);
