"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.wishlistRoutes = void 0;
const express_1 = require("express");
const wishlist_controller_1 = __importDefault(require("./wishlist.controller"));
const token_verify_midlware_1 = __importDefault(require("../../midlwares/token-verify.midlware"));
const router = (0, express_1.Router)();
exports.wishlistRoutes = router
    .get('/wishlist', token_verify_midlware_1.default, wishlist_controller_1.default.GET_WISHLIST)
    .post('/wishlist', token_verify_midlware_1.default, wishlist_controller_1.default.POST_WISHLIST)
    .delete('/wishlist/:id', token_verify_midlware_1.default, wishlist_controller_1.default.DELETE_WISHLIST);
