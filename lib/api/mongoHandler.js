// source nextjs.org examples https://github.com/vercel/next.js/blob/canary/examples/with-mongodb-mongoose/lib/dbConnect.js

import mongoose from 'mongoose';

import './models/menu';
import './models/menuItem';
import './models/user';
import './models/order';

/**
 * DEVELOPMENT CODE - REMOVE IN PRODUCTION
 * throw error if mongo uri is not defined
 */
if (!process.env.MONGODB_URI) {
    throw new Error('No Mongo URI in .env. add MONGODB_URI field to env file');
}

/**
 * DEVELOPMENT CODE - REMOVE IN PRODUCTION
 * cach connection for reloads in devlopment.
 */
let cached = global.mongoose;
if (!cached) {
    cached = { conn: null, promise: null };
    global.mongoose = cached;
}

const connectMongoose = () => {
    return mongoose.connect(process.env.MONGODB_URI);
};

const connect = async () => {
    if (cached.conn) return cached.conn;

    if (!cached.promise) {
        connectMongoose().then((mon) => {
            return mon;
        });
    }

    cached.conn = await cached.promise;
    return cached.conn;
};

export default connect;
