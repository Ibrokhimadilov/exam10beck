"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const express_1 = require("express");
const auth_routes_1 = require("../module/auth/auth.routes");
const user_routes_1 = require("../module/users/user.routes");
const category_routes_1 = require("../module/category/category.routes");
const product_routes_1 = require("../module/product/product.routes");
const wishlist_routes_1 = require("../module/wishlist/wishlist.routes");
const router = (0, express_1.Router)();
exports.routes = router
    .use(auth_routes_1.authRoutes)
    .use(user_routes_1.userRoutes)
    .use(category_routes_1.categoryRoutes)
    .use(product_routes_1.productRoutes)
    .use(wishlist_routes_1.wishlistRoutes);
