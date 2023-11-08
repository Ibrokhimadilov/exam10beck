"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const relationship_1 = require("../../model/relationship");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function generateAccessToken(user) {
    return jsonwebtoken_1.default.sign(user, "vmd21$wkm5ldm");
}
exports.default = {
    SIGN_UP: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await relationship_1.UserModel.findOne({
                where: {
                    username,
                    password
                }
            });
            if (JSON.stringify(user?.toJSON())) {
                res.status(401).json({
                    message: 'User already exist'
                });
                return;
            }
            const { dataValues: { id } } = await relationship_1.UserModel.create({ username, password }, {
                returning: ["id"]
            });
            const access_token = generateAccessToken(id);
            res.json({ message: access_token });
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    SIGN_IN: async (req, res, next) => {
        try {
            const { username, password } = req.body;
            const user = await relationship_1.UserModel.findOne({
                where: {
                    username,
                    password
                }
            });
            if (!user) {
                res.status(401).json({
                    message: 'User not found'
                });
                return;
            }
            const access_token = generateAccessToken(user.id);
            res.json({ message: access_token });
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    }
};
