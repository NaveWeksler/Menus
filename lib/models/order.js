import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: [
        {
            item: {
                type: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' },
                required: true,
            },
            quantity: {
                type: Number,
                required: true,
            },
        },
    ],
});

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
