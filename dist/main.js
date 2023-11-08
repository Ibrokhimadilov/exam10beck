"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app_config_1 = require("./config/app.config");
const sequelize_1 = require("./sequelize/sequelize");
const routes_1 = require("./routes/routes");
const express_fileupload_1 = __importDefault(require("express-fileupload"));
const path_1 = require("path");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.set('env', app_config_1.appConfig);
const { port: PORT } = app.get('env');
app.use(express_1.default.json());
app.use((0, express_fileupload_1.default)({
    limits: { fileSize: 50 * 1024 * 1024 },
}));
app.use('/api/v1', routes_1.routes);
app.use('/uploads', express_1.default.static((0, path_1.resolve)('uploads')));
// app.use((req, res, next) => {
//   (req as any).uploads = upload;
//   next();
// })
sequelize_1.sequelize
    .authenticate()
    .catch((err) => {
    console.log(err);
    return undefined;
});
sequelize_1.sequelize.sync({ alter: true })
    .catch((err) => {
    console.log(err);
    return undefined;
});
app.listen(PORT, () => {
    console.log(PORT);
});
