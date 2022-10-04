import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: {
        type: [
            {
                name: String,
                price: String,
                quantity: Number,
                additions: {
                    type: Map,
                    of: String,
                },
            },
        ],
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    menu: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu',
        required: true,
    },
    time: {
        type: Date,
        default: Date.now,
    },
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
