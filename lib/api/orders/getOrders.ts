import Order from "@models/order";
import type { ObjectId } from "mongodb";

export const getOrdersById = (id: ObjectId) => {
    return Order.find({user: id}).populate("items", {lean: true}).select("time items _id").lean().exec();
}