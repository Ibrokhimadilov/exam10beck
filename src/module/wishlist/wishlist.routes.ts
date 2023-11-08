import { Router } from "express";
import wishlistController from "./wishlist.controller";
import verifyToken from "../../midlwares/token-verify.midlware"

const router = Router()

export const wishlistRoutes = router
    .get('/wishlist', verifyToken, wishlistController.GET_WISHLIST)
    .post('/wishlist', verifyToken, wishlistController.POST_WISHLIST)
    .delete('/wishlist/:id', verifyToken, wishlistController.DELETE_WISHLIST)