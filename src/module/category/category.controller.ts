import type { Request, Response, NextFunction } from "express";
import { ProductModel, CategoryModel } from "../../model/relationship";


export default {
    GET_CATEGORYES: async (_: Request, res: Response, next: NextFunction) => {
        try{
        const categoryList = await CategoryModel.findAll()
        res.json(categoryList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    GET_CATEGORY_WITH_PRODUCTS: async (_: Request, res: Response, next: NextFunction) => {
        try{
            const categoryList = await CategoryModel.findAll({
            include: {
                model: ProductModel
            }
        })
        res.json(categoryList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    GET_ONE_CATEGORY: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const category = await CategoryModel.findByPk(req.params.id, {
            include: ProductModel
        });

        if (!category) {
            res.status(404).json({ message: 'category not found' })
            return
        }
        res.json(category)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    CREATE_CATEGORY: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const { name } = req.body

        const category = await CategoryModel.findOne({
            where:{
                name
            }
        })

        if(category) {
            res.status(409).json({ message: 'Category already exist' })
            return
        }
        const newCategory = await CategoryModel.create(req.body, {
            include: {
                model: ProductModel
            }
        })

        res.json(newCategory)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    PATCH_CATEGORY: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const updatingCategory = await CategoryModel.findByPk(req.params.id)
        if (!updatingCategory) {
            res.status(404).json({ message: 'Category not found' })
            return
        }
        const [updated] = await CategoryModel.update(req.body, {
            where: { id: req.params.id },
        })
        res.json(updatingCategory)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    DELETE_CATEGORY: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const deleteCategory = await CategoryModel.findByPk(req.params.id);
        
        if (!deleteCategory) {
            res.status(404).json({ message: 'Category not found' })
            return
        }
        const deleted = await CategoryModel.destroy({
            where: { id: req.params.id },
        })
        res.status(204).json({message: "DELETE"})
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
}