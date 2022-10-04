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
    image: {
        type: String,
        required: true,
    },
    additions: {
        type: Map,
        of: [String],
    },
    description: String,
});

export default mongoose.models.MenuItem ||
    mongoose.model('MenuItem', menuItemSchema);
