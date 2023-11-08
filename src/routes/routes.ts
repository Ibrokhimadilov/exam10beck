import { Router } from "express";
import { authRoutes } from "../module/auth/auth.routes";
import { userRoutes } from '../module/users/user.routes'
import { categoryRoutes } from "../module/category/category.routes";
import { productRoutes } from "../module/product/product.routes";
import { wishlistRoutes } from '../module/wishlist/wishlist.routes'

const router = Router()

export const routes = router
    .use(authRoutes)
    .use(userRoutes)
    .use(categoryRoutes)
    .use(productRoutes)
    .use(wishlistRoutes)