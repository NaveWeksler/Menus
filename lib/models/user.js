import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            trim: true,
            required: true,
        },
        lastName: {
            type: String,
            trim: true,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
            unique: false,
        },
        orders: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Order' }],
            required: true,
        },
        permissions: {
            type: [Number],
            required: true,
        },
        salt: String,
        sessionToken: String,
        sessionTokenExpMs: Number,
        emailToken: String,
        emailTokenExpMs: Number,
        state: { type: Number, default: 2, required: true, index: true }, // 2 is temp. 1 is suspanded. 0 is active
        // createdAt: { type: Date, required: true, default: Date.now },
    },
    { timestamps: { createdAt: true, updatedAt: false } }
);

userSchema.index(
    { createdAt: 1 },
    {
        expireAfterSeconds: 120,
        partialFilterExpression: { state: 2 },
    } //
); // auto delete after 2 minutes if account has not been verified

export default mongoose.models.User || mongoose.model('User', userSchema);
mongoose.models.User.syncIndexes();
