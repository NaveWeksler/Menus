import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema({
    items: {
        type: [{ type: monoogse.Schema.Types.ObjectId, ref: 'MenuItem' }],
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
