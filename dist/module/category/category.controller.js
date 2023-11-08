"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const relationship_1 = require("../../model/relationship");
exports.default = {
    GET_CATEGORYES: async (_, res, next) => {
        try {
            const categoryList = await relationship_1.CategoryModel.findAll();
            res.json(categoryList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_CATEGORY_WITH_PRODUCTS: async (_, res, next) => {
        try {
            const categoryList = await relationship_1.CategoryModel.findAll({
                include: {
                    model: relationship_1.ProductModel
                }
            });
            res.json(categoryList);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    GET_ONE_CATEGORY: async (req, res, next) => {
        try {
            const category = await relationship_1.CategoryModel.findByPk(req.params.id, {
                include: relationship_1.ProductModel
            });
            if (!category) {
                res.status(404).json({ message: 'category not found' });
                return;
            }
            res.json(category);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    CREATE_CATEGORY: async (req, res, next) => {
        try {
            const { name } = req.body;
            const category = await relationship_1.CategoryModel.findOne({
                where: {
                    name
                }
            });
            if (category) {
                res.status(409).json({ message: 'Category already exist' });
                return;
            }
            const newCategory = await relationship_1.CategoryModel.create(req.body, {
                include: {
                    model: relationship_1.ProductModel
                }
            });
            res.json(newCategory);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    PATCH_CATEGORY: async (req, res, next) => {
        try {
            const updatingCategory = await relationship_1.CategoryModel.findByPk(req.params.id);
            if (!updatingCategory) {
                res.status(404).json({ message: 'Category not found' });
                return;
            }
            const [updated] = await relationship_1.CategoryModel.update(req.body, {
                where: { id: req.params.id },
            });
            res.json(updatingCategory);
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
    DELETE_CATEGORY: async (req, res, next) => {
        try {
            const deleteCategory = await relationship_1.CategoryModel.findByPk(req.params.id);
            if (!deleteCategory) {
                res.status(404).json({ message: 'Category not found' });
                return;
            }
            const deleted = await relationship_1.CategoryModel.destroy({
                where: { id: req.params.id },
            });
            res.status(204).json({ message: "DELETE" });
            return;
        }
        catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return;
        }
    },
};
