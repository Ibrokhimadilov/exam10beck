"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.productRoutes = void 0;
const express_1 = require("express");
const product_controller_1 = __importDefault(require("./product.controller"));
const token_verify_midlware_1 = __importDefault(require("../../midlwares/token-verify.midlware"));
const router = (0, express_1.Router)();
exports.productRoutes = router
    .get('/product', product_controller_1.default.GET_PRODUCTS)
    .get('/myproducts', token_verify_midlware_1.default, product_controller_1.default.GET_OWNER_PRODUCT)
    .get('/product/category', product_controller_1.default.GET_PRODUCTS_WITH_CATEGORY)
    .get('/search/product/:title', product_controller_1.default.SEARCH_PRODUCT_BY_TITLE)
    .get('/product/:id', product_controller_1.default.GET_ONE_PRODUCT)
    .get('/product/:offset/:limit', product_controller_1.default.GET_LIMITED_PRODUCTS)
    .post('/product', token_verify_midlware_1.default, product_controller_1.default.CREATE_PRODUCT)
    .patch('/product/:id', token_verify_midlware_1.default, product_controller_1.default.PATCH_PRODUCT)
    .delete('/product/:id', token_verify_midlware_1.default, product_controller_1.default.DELETE_PRODUCT);
