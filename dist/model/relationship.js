"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = exports.ProductModel = exports.CategoryModel = exports.UserModel = void 0;
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "UserModel", { enumerable: true, get: function () { return user_model_1.UserModel; } });
const category_model_1 = require("./category.model");
Object.defineProperty(exports, "CategoryModel", { enumerable: true, get: function () { return category_model_1.CategoryModel; } });
const product_model_1 = require("./product.model");
Object.defineProperty(exports, "ProductModel", { enumerable: true, get: function () { return product_model_1.ProductModel; } });
const wishlist_model_1 = require("./wishlist.model");
Object.defineProperty(exports, "WishListModel", { enumerable: true, get: function () { return wishlist_model_1.WishListModel; } });
user_model_1.UserModel.hasMany(product_model_1.ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
category_model_1.CategoryModel.hasMany(product_model_1.ProductModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
user_model_1.UserModel.hasMany(wishlist_model_1.WishListModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
product_model_1.ProductModel.hasMany(wishlist_model_1.WishListModel, {
    onDelete: 'CASCADE',
    onUpdate: 'NO ACTION'
});
product_model_1.ProductModel.belongsTo(category_model_1.CategoryModel);
product_model_1.ProductModel.belongsTo(user_model_1.UserModel);
wishlist_model_1.WishListModel.belongsTo(user_model_1.UserModel);
wishlist_model_1.WishListModel.belongsTo(product_model_1.ProductModel);
