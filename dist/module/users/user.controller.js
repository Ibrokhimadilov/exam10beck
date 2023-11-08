"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relationship_1 = require("../../model/relationship");
exports.default = {
    GET_USERS: async (_, res, next) => {
        try {
            const userList = await relationship_1.UserModel.findAll();
            res.json(userList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_ONE_USERS: async (req, res, next) => {
        try {
            const user = await relationship_1.UserModel.findByPk(req.params.id);
            if (!user) {
                res.status(404).json({ message: 'user not found' });
                return;
            }
            res.json(user);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    PATCH_USERS: async (req, res, next) => {
        try {
            const updatingUser = await relationship_1.UserModel.findByPk(req.params.id);
            if (!updatingUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const [updated] = await relationship_1.UserModel.update(req.body, {
                where: { id: req.params.id },
            });
            res.json(updatingUser);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    DELETE_USERS: async (req, res, next) => {
        try {
            const deletedUser = await relationship_1.UserModel.findByPk(req.params.id);
            if (!deletedUser) {
                res.status(404).json({ message: 'User not found' });
                return;
            }
            const deleted = await relationship_1.UserModel.destroy({
                where: { id: req.params.id },
            });
            res.status(204).json({ message: "DELETE" });
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
};
