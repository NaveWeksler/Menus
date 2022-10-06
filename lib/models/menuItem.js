import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    menu: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    image: String,
    additions: {
        type: Map,
        of: [String],
    },
    description: String,
});

export default mongoose.models.MenuItem ||
    mongoose.model('MenuItem', menuItemSchema);
