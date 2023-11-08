"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize/sequelize");
exports.ProductModel = sequelize_2.sequelize.define('products', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    title: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    image: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    price: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.STRING({ length: 512 }),
        allowNull: false
    }
});
