"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relationship_1 = require("../../model/relationship");
const path_1 = require("path");
const sequelize_1 = require("sequelize");
exports.default = {
    GET_PRODUCTS: async (_, res, next) => {
        try {
            const productList = await relationship_1.ProductModel.findAll();
            res.json(productList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_OWNER_PRODUCT: async (req, res, next) => {
        try {
            const userId = req.body.id;
            const products = await relationship_1.ProductModel.findAll({
                where: {
                    userId,
                }
            });
            res.json(products);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_LIMITED_PRODUCTS: async (req, res, next) => {
        try {
            const offset = Number(req.params.offset);
            const limit = Number(req.params.limit);
            if (isNaN(offset) || isNaN(limit)) {
                res.status(400).json({ message: 'Invalid offset or limit' });
                return;
            }
            const productList = await relationship_1.ProductModel.findAll({
                offset: offset * limit,
                limit: limit,
            });
            res.json(productList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_PRODUCTS_WITH_CATEGORY: async (_, res, next) => {
        try {
            const productList = await relationship_1.ProductModel.findAll({
                include: {
                    model: relationship_1.CategoryModel
                }
            });
            res.json(productList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    SEARCH_PRODUCT_BY_TITLE: async (req, res, next) => {
        try {
            const title = req.params.title;
            const products = await relationship_1.ProductModel.findAll({
                where: {
                    title: {
                        [sequelize_1.Op.iLike]: `%${title}%`,
                    },
                },
            });
            res.json(products);
            return;
        }
        catch (error) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_ONE_PRODUCT: async (req, res, next) => {
        try {
            const product = await relationship_1.ProductModel.findByPk(req.params.id, {
                include: relationship_1.CategoryModel
            });
            if (!product) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            res.json(product);
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    CREATE_PRODUCT: async (req, res, next) => {
        try {
            const userId = req.body.id;
            const { title, price, description, categoryId } = req.body;
            const file = req.files?.file;
            const category = await relationship_1.CategoryModel.findByPk(categoryId);
            if (!category) {
                res.status(404).json({ message: 'Category not found' });
                return;
            }
            if (!file) {
                res.status(400).json({ message: "No file uploaded" });
                return;
            }
            var fileName = await file?.name;
            const mainFile = Date.now() + "-" + fileName.replace(/\s/g, "");
            file.mv((0, path_1.resolve)("uploads", mainFile));
            const { dataValues: { id } } = await relationship_1.ProductModel.create({
                title: title,
                price: price,
                image: `/uploads/${mainFile}`,
                description: description,
                categoryId: categoryId,
                userId: userId
            }, {
                include: relationship_1.CategoryModel,
                returning: ["id"]
            });
            res.json({
                message: "Sucessfully created",
                productId: id
            });
            return;
        }
        catch (err) {
            console.log(err);
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    PATCH_PRODUCT: async (req, res, next) => {
        try {
            const content = req.body;
            const updatingProduct = await relationship_1.ProductModel.findByPk(req.params.id);
            if (!updatingProduct) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            if (req.files?.file) {
                const file = req.files?.file;
                var fileName = await file?.name;
                const mainFile = Date.now() + "-" + fileName.replace(/\s/g, "");
                file.mv((0, path_1.resolve)("uploads", mainFile));
                const [updated] = await relationship_1.ProductModel.update({
                    content,
                    image: `/uploads/${mainFile}`
                }, {
                    where: { id: req.params.id },
                });
                res.json(updatingProduct);
                return;
            }
            console.log(req.params.id);
            const [updated] = await relationship_1.ProductModel.update(content, {
                where: { id: req.params.id },
            });
            res.json(updatingProduct);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    DELETE_PRODUCT: async (req, res, next) => {
        try {
            const deleteProduct = await relationship_1.ProductModel.findByPk(req.params.id);
            if (!deleteProduct) {
                res.status(404).json({ message: 'Product not found' });
                return;
            }
            if (deleteProduct.userId != req.body.id) {
                res.status(403).json({ message: 'You do not have permission to delete this product' });
                return;
            }
            const deleted = await relationship_1.ProductModel.destroy({
                where: { id: req.params.id },
            });
            res.status(204).json({ message: "DELETED" });
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
};
