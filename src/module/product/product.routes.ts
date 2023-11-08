import { Router } from "express";
import productController from "./product.controller";
import verifyToken from "../../midlwares/token-verify.midlware"

const router = Router()

export const productRoutes = router
    .get('/product', productController.GET_PRODUCTS)
    .get('/myproducts', verifyToken, productController.GET_OWNER_PRODUCT)
    .get('/product/category', productController.GET_PRODUCTS_WITH_CATEGORY)
    .get('/search/product/:title', productController.SEARCH_PRODUCT_BY_TITLE)
    .get('/product/:id', productController.GET_ONE_PRODUCT)
    .get('/product/:offset/:limit', productController.GET_LIMITED_PRODUCTS)
    .post('/product', verifyToken, productController.CREATE_PRODUCT)
    .patch('/product/:id', verifyToken, productController.PATCH_PRODUCT)
    .delete('/product/:id', verifyToken, productController.DELETE_PRODUCT)