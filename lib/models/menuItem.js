import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    additions: {
        type: Map,
        of: [String],
        required: true,
    },
    description: String,
    image: String,
});

export default mongoose.models.MenuItem ||
    mongoose.model('MenuItem', menuItemSchema);
