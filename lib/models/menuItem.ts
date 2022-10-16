
import mongoose from 'mongoose';

interface IMenuItem {
    menu: mongoose.Schema.Types.ObjectId,
    name: string,
    price: string,
    image: string,
    additions?: {[key: string]: [string]},
    description?: string 
}

const menuItemSchema = new mongoose.Schema<IMenuItem>({
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

export default mongoose.models.MenuItem as mongoose.Model<IMenuItem> ||
    mongoose.model('MenuItem', menuItemSchema);
