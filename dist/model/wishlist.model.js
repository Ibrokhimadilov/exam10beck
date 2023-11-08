"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WishListModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize/sequelize");
exports.WishListModel = sequelize_2.sequelize.define('wishlist', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    }
});
