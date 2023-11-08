import type { Request, Response, NextFunction } from "express";
import { CategoryModel, ProductModel } from "../../model/relationship"
import { resolve } from "path";
import { UploadedFile } from 'express-fileupload'
import { Op } from "sequelize";

export default {
    GET_PRODUCTS: async (_: Request, res: Response, next: NextFunction) => {
        try{
        const productList = await ProductModel.findAll()
        res.json(productList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    GET_OWNER_PRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const userId = req.body.id

            const products = await ProductModel.findAll({
                where: {
                    userId,
                }
            })

            res.json(products)
            return
        }catch(err){
            res.status(500).json({ message: "Internal server error" });
            return 
        }
    },
    GET_LIMITED_PRODUCTS: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const offset = Number(req.params.offset)
        const limit = Number(req.params.limit)

        if (isNaN(offset) || isNaN(limit)) {
            res.status(400).json({ message: 'Invalid offset or limit' });
            return
        }

        const productList = await ProductModel.findAll({
            offset: offset * limit,
            limit: limit,
            });
        res.json(productList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    GET_PRODUCTS_WITH_CATEGORY: async (_: Request, res: Response, next: NextFunction) => {
        try{
            const productList = await ProductModel.findAll({
            include: {
                model: CategoryModel
            }
        })
        res.json(productList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    SEARCH_PRODUCT_BY_TITLE: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const title = req.params.title;
        
            const products = await ProductModel.findAll({
              where: {
                title: {
                  [Op.iLike]: `%${title}%`,
                },
              },
            });
        
            res.json(products)
            return
          } catch (error) {
            res.status(500).json({ message: "Internal server error" });
            return
          }
    },
    GET_ONE_PRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try{
            const product = await ProductModel.findByPk(req.params.id, {
            include: CategoryModel
        });

        if (!product) {
            res.status(404).json({ message: 'Product not found' })
            return
        }
        res.json(product)
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    CREATE_PRODUCT: async (req: Request, res: Response, next: NextFunction) => {

        try{
        const userId = req.body.id
        const { title, price, description, categoryId } = req.body
        const file: any = req.files?.file as UploadedFile
        const category = await CategoryModel.findByPk(categoryId)
        if(!category) {
            res.status(404).json({ message: 'Category not found' })
            return
        }
        if (!file) {
            res.status(400).json({ message: "No file uploaded" });
            return
        }

        var fileName = await file?.name;
        const mainFile = Date.now() + "-" + fileName.replace(/\s/g, "");
        file.mv(resolve("uploads", mainFile));
        

        const { dataValues: {id} } = await ProductModel.create({
            title: title,
            price: price,
            image: `/uploads/${mainFile}`,
            description: description,
            categoryId: categoryId,
            userId: userId
          }, {
            include: CategoryModel,
            returning: ["id"]
          })
          
        res.json({
            message: "Sucessfully created",
            productId: id
        })
        return
        }catch(err){
            console.log(err);
            
            res.status(500).json({ message: "Internal server error" });
            return
        }
    },
    PATCH_PRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const content = req.body
        const updatingProduct = await ProductModel.findByPk(req.params.id)
        if (!updatingProduct) {
            res.status(404).json({ message: 'Product not found' })
            return
        }
        if(req.files?.file){
        const file: any = req.files?.file as UploadedFile
        var fileName = await file?.name;
        const mainFile = Date.now() + "-" + fileName.replace(/\s/g, "");
        file.mv(resolve( "uploads", mainFile))

        const [updated] = await ProductModel.update({
            content,
            image: `/uploads/${mainFile}`
        }, {
            where: { id: req.params.id },
        })
        res.json(updatingProduct)
        return
        }

        console.log(req.params.id);
        
        const [updated] = await ProductModel.update(content, {
            where: { id: req.params.id },
        })
        res.json(updatingProduct);
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    DELETE_PRODUCT: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const deleteProduct : any = await ProductModel.findByPk(req.params.id);
        if (!deleteProduct) {
            res.status(404).json({ message: 'Product not found' })
            return
        }
        if (deleteProduct.userId != req.body.id) {
            res.status(403).json({message: 'You do not have permission to delete this product'})
            return
        }
        const deleted = await ProductModel.destroy({
            where: { id: req.params.id },
        })
        res.status(204).json({message: "DELETED"})
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
}