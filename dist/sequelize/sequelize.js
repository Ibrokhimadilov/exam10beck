"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
exports.sequelize = new sequelize_1.Sequelize({
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: "+998946129238",
    database: "exam10",
    logging: true,
    retry: {
        max: 5,
        timeout: 5000
    },
    dialect: "postgres"
});
