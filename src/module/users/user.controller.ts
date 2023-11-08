import type { Request, Response, NextFunction } from "express";
import type { UserGetResponse } from "./interfaces/user.get.interface";
import { UserModel } from "../../model/relationship";


export default {
    GET_USERS: async (_: Request, res: Response, next: NextFunction) => {
        try{
        const userList = await UserModel.findAll()
        res.json(userList)
        return
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    GET_ONE_USERS: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const user = await UserModel.findByPk(req.params.id);

        if (!user) {
            res.status(404).json({ message: 'user not found' })
            return
        }
        res.json(user)
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    PATCH_USERS: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const updatingUser = await UserModel.findByPk(req.params.id)
        if (!updatingUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        const [updated] = await UserModel.update(req.body, {
            where: { id: req.params.id },
        })
        res.json(updatingUser)
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
    DELETE_USERS: async (req: Request, res: Response, next: NextFunction) => {
        try{
        const deletedUser = await UserModel.findByPk(req.params.id);
        if (!deletedUser) {
            res.status(404).json({ message: 'User not found' })
            return
        }
        const deleted = await UserModel.destroy({
            where: { id: req.params.id },
        })
        res.status(204).json({message: "DELETE"})
    }catch(err){
        res.status(500).json({ message: "Internal server error" });
        return
    }
    },
}