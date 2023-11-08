import { Router } from "express";
import userController from "./user.controller";

const router = Router()

export const userRoutes = router
    .get('/user', userController.GET_USERS)
    .get('/user/:id', userController.GET_ONE_USERS)
    .patch('/user/:id', userController.PATCH_USERS)
    .delete('/user/:id', userController.DELETE_USERS)