//https://stackoverflow.com/questions/61640829/how-can-i-test-express-server-with-supertest-in-next-js

// import {createServer} from "http";
// import { apiResolver } from "";
// //packages/
// import request from "supertest";

const { createServer } = require('http');
const { apiResolver } = require('next/dist/server/api-utils/node.js');
const request = require('supertest');

module.exports = (handler) => {
    const listener = (req, res) =>
        apiResolver(
            req,
            res,
            undefined,
            handler,
            {
                previewModeEncryptionKey: '',
                previewModeId: '',
                previewModeSigningKey: '',
            },
            false
        );
    const server = createServer(listener);
    return request.agent(server);
};
