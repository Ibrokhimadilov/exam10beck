"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relationship_1 = require("../../model/relationship");
exports.default = {
    GET_WISHLIST: async (req, res, next) => {
        try {
            const userId = req.body.id;
            const WishList = await relationship_1.WishListModel.findAll({
                where: {
                    userId,
                },
                include: [
                    {
                        model: relationship_1.UserModel
                    },
                    {
                        model: relationship_1.ProductModel
                    }
                ]
            });
            res.json(WishList);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    POST_WISHLIST: async (req, res, next) => {
        try {
            console.log(req.body.id, "+", req.body.id, "😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋");
            const { productId } = req.body;
            const userId = req.body.id;
            console.log(userId, productId);
            const wishlist = await relationship_1.WishListModel.findOne({
                where: {
                    userId,
                    productId
                }
            });
            if (wishlist) {
                res.status(409).json({ message: 'Wishlist already exist' });
                return;
            }
            const product = await relationship_1.ProductModel.findByPk(productId);
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            const newWishlist = await relationship_1.WishListModel.create({ userId, productId }, {
                include: [
                    {
                        model: relationship_1.ProductModel
                    },
                    {
                        model: relationship_1.UserModel
                    }
                ]
            });
            res.json(newWishlist);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    DELETE_WISHLIST: async (req, res, next) => {
        try {
            const wishlist = await relationship_1.WishListModel.findOne({
                where: {
                    productId: req.params.id
                }
            });
            const ownerId = req.body.id;
            if (!wishlist) {
                res.status(404).json({ message: 'Wishlist not found' });
                return;
            }
            if (ownerId != wishlist.dataValues.userId) {
                res.status(403).json({ message: 'You do not have permission to delete this product' });
                return;
            }
            const deleted = await relationship_1.WishListModel.destroy({
                where: { id: wishlist.id },
            });
            res.status(204).json({ message: "DELETE" });
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return;
        }
    }
};
