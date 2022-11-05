import mongoose from 'mongoose';

interface Order {
    items: mongoose.Types.ObjectId[],
    menu: mongoose.Types.ObjectId,
    time: Date,
}

const orderSchema = new mongoose.Schema<Order>({
    items: {
        type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem' }],
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

export default mongoose.models.Order as mongoose.Model<Order> || mongoose.model('Order', orderSchema);
