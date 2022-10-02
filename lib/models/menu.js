import mongoose from 'mongoose';
import './menuItem';

const menuSchema = new mongoose.Schema({
    owner: {
        // the user who owns this menu
        type: { type: mongoose.Schema.Types.ObjectId, ref: 'ShopOwner' },
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    items: {
        // example: { 'meat': [...], 'drinks': [...] }
        type: {
            type: Map,
            of: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
        },
        required: true,
    },
});

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);
