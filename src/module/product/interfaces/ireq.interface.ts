import { Request } from "express"

export interface IReq extends Request {
    file: Express.Multer.File;
    mv: (path: string, callback: (err: any) => void) => void;
}