"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userRoutes = void 0;
const express_1 = require("express");
const user_controller_1 = __importDefault(require("./user.controller"));
const router = (0, express_1.Router)();
exports.userRoutes = router
    .get('/user', user_controller_1.default.GET_USERS)
    .get('/user/:id', user_controller_1.default.GET_ONE_USERS)
    .patch('/user/:id', user_controller_1.default.PATCH_USERS)
    .delete('/user/:id', user_controller_1.default.DELETE_USERS);
