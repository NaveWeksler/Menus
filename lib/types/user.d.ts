import mongoose from "mongoose";

interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    orders: [Schema.Types.ObjectId],
    permissions: [number],

    salt?: string,
    sessionToken?: string,
    sessionTokenExpMs?: number,
    emailToken?: string,
    emailTokenExpMs?: number,
    state?: number,
}

type UserModel = User & {_id: mongoose.Types.ObjectId};

export const UserModel;
export default User;