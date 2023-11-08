import type { Request, Response, NextFunction } from "express";
import { WishListModel, UserModel, ProductModel } from "../../model/relationship"

export default {
    GET_WISHLIST: async (req: Request, res: Response, next: NextFunction) => {
        try {
            const userId = req.body.id

            const WishList = await WishListModel.findAll({
                where:{
                    userId,
                },
                include: [
                    {
                        model: UserModel
                    },
                    {
                        model: ProductModel
                    }
                ]
            })
            res.json(WishList)
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return
        }
    },
    POST_WISHLIST: async (req: Request, res: Response, next: NextFunction) => {
        try {
            
            console.log(req.body.id, "+", req.body.id, "😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋😊💕💕😊💕💕😒😒😋😒😒😒😒😋");
            const { productId } = req.body
            const userId = req.body.id
            console.log(userId, productId)
            
            const wishlist = await WishListModel.findOne({
                where:{
                    userId,
                    productId
                }
            })
    
            if(wishlist) {
                res.status(409).json({ message: 'Wishlist already exist' })
                return
            }

            const product = await ProductModel.findByPk(productId)

            if (!product) {
                res.status(404).json({message: 'Product not found'})
                return
            }

            const newWishlist = await WishListModel.create({userId, productId}, {
                include: [
                    {
                        model: ProductModel
                    },
                    {
                        model: UserModel
                    }
                ]
            })
            res.json(newWishlist)
            return
        } catch (err) {
            res.status(500).json({ message: "Internal server error" });
            return
        }
    },
    DELETE_WISHLIST: async (req: Request, res: Response, next: NextFunction) => {
        try{   
            const wishlist : any = await WishListModel.findOne({
                where: {
                    productId: req.params.id
                }
            });
            const ownerId = req.body.id            
        
            if (!wishlist) {
                res.status(404).json({ message: 'Wishlist not found' })
                return
            }

            if (ownerId != wishlist.dataValues.userId) {
                res.status(403).json({message: 'You do not have permission to delete this product'})
                return
            }

            const deleted = await WishListModel.destroy({
                where: {id: wishlist.id},
            })
            res.status(204).json({message: "DELETE"})
            return
        }catch(err){
            res.status(500).json({ message: "Internal server error" });
            console.log(err);
            return
        }
    }
}