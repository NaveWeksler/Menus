import mongoose from "mongoose";

interface User {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    orders: [mongoose.Types.ObjectId],
    permissions: [number],

    salt?: string,
    sessionToken?: string,
    sessionTokenExpMs?: number,
    emailToken?: string,
    emailTokenExpMs?: number,
    state?: number,
}



export type UserModel = mongoose.LeanDocument<User & {_id: mongoose.Types.ObjectId}>;
export default User;