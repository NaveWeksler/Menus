import mongoose from 'mongoose';

const orderSchema = new mongoose.Schema(
    {
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
            type: { type: mongoose.Schema.Types.ObjectId, ref: 'Menu' },
            required: true,
        },
    },
    { timestamps: true }
);

export default mongoose.models.Order || mongoose.model('Order', orderSchema);
