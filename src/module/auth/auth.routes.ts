import { Router } from "express";
import authController from "./auth.controller";

const router = Router()

export const authRoutes = router
    .post('/sign-up', authController.SIGN_UP)
    .post('/sign-in', authController.SIGN_IN)