import mongoose from 'mongoose';

const menuSchema = new mongoose.Schema({
    owner: {
        // the user who owns this menu
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
        required: true,
    },
});

export default mongoose.models.Menu || mongoose.model('Menu', menuSchema);
