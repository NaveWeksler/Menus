import connect from "@lib/api/mongoHandler";
import mongoose from "mongoose";

global.beforeAll(() => {
    connect();
})

global.beforeEach(() => {
    jest.clearAllMocks();
});

global.afterAll(() => {
    mongoose.connection.close();
})