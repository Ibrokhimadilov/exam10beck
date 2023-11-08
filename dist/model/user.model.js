"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = void 0;
const sequelize_1 = require("sequelize");
const sequelize_2 = require("../sequelize/sequelize");
exports.UserModel = sequelize_2.sequelize.define('users', {
    id: {
        type: sequelize_1.DataTypes.UUID,
        defaultValue: sequelize_1.DataTypes.UUIDV4,
        allowNull: false,
        primaryKey: true,
    },
    username: {
        type: sequelize_1.DataTypes.STRING({ length: 32 }),
        allowNull: false
    },
    password: {
        type: sequelize_1.DataTypes.STRING({ length: 256 })
    }
}, {
    timestamps: true,
});
