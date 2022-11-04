
import mongoose from 'mongoose';

export interface IMenuItem {
    menu: mongoose.Schema.Types.ObjectId,
    name: string,
    price: number,
    image: string,
    additions?: {[key: string]: [string]},
    description: string 
}

const menuItemSchema = new mongoose.Schema<IMenuItem>({
    menu: { type: mongoose.Schema.Types.ObjectId, required: true },
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    image: String,
    additions: {
        type: Map,
        of: [String],
    },
    description: {type: String, default: ""},
});

export default mongoose.models.MenuItem as mongoose.Model<IMenuItem> ||
    mongoose.model('MenuItem', menuItemSchema);
