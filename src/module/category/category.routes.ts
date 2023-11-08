import { Router } from "express";
import categoryController from "./category.controller";

const router = Router()

export const categoryRoutes = router
    .get('/category', categoryController.GET_CATEGORYES)
    .get('/category/products', categoryController.GET_CATEGORY_WITH_PRODUCTS)
    .get('/category/:id', categoryController.GET_ONE_CATEGORY)
    .post('/category', categoryController.CREATE_CATEGORY)
    .patch('/category/:id', categoryController.PATCH_CATEGORY)
    .delete('/category/:id', categoryController.DELETE_CATEGORY)