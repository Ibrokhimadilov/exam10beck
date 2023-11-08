"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.appConfig = void 0;
exports.appConfig = {
    port: process.env.APP_PORT ? parseInt(process.env.APP_PORT) : 9090
};
