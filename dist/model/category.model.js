"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize/sequelize");
exports.CategoryModel = sequelize_2.sequelize.define('category', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    }
});
