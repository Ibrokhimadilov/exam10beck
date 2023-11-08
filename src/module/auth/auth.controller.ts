import type { Request, Response, NextFunction } from "express";
import type { AuthSignUPRequest, AuthSignUPResponse } from "./interfaces/auth.sign-up.interfaces";
import { UserModel } from "../../model/relationship";
import jwt from 'jsonwebtoken'

function generateAccessToken(user) {
    return jwt.sign(user, "vmd21$wkm5ldm");
}

export default {
    SIGN_UP: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const { username, password } = req.body as AuthSignUPRequest

        const user = await UserModel.findOne({
            where:{
                username,
                password
            }
        })

        if(JSON.stringify(user?.toJSON())){
            res.status(401).json({
                message: 'User already exist'
            })
            return
        }

        const { dataValues: {id} } = await UserModel.create({username, password}, {
            returning: [ "id" ]
        })

        const access_token = generateAccessToken(id)

        res.json({message: access_token})
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    SIGN_IN: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const { username, password } = req.body as AuthSignUPRequest
        
        const user: any = await UserModel.findOne({
            where:{
                username,
                password
            }
        })
        
        if(!user){
            res.status(401).json({
                message: 'User not found'
            })
            return
        }

        const access_token: any = generateAccessToken(user.id)

        res.json({message: access_token})
        return
        }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
        }
    }
}