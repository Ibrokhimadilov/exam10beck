"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = require("express");
const auth_controller_1 = __importDefault(require("./auth.controller"));
const router = (0, express_1.Router)();
exports.authRoutes = router
    .post('/sign-up', auth_controller_1.default.SIGN_UP)
    .post('/sign-in', auth_controller_1.default.SIGN_IN);
