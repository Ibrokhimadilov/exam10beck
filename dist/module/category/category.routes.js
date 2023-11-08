"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRoutes = void 0;
const express_1 = require("express");
const category_controller_1 = __importDefault(require("./category.controller"));
const router = (0, express_1.Router)();
exports.categoryRoutes = router
    .get('/category', category_controller_1.default.GET_CATEGORYES)
    .get('/category/products', category_controller_1.default.GET_CATEGORY_WITH_PRODUCTS)
    .get('/category/:id', category_controller_1.default.GET_ONE_CATEGORY)
    .post('/category', category_controller_1.default.CREATE_CATEGORY)
    .patch('/category/:id', category_controller_1.default.PATCH_CATEGORY)
    .delete('/category/:id', category_controller_1.default.DELETE_CATEGORY);
