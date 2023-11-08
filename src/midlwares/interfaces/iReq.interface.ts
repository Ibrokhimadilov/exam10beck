import { Request } from "express";

export interface iReq extends Request {
    user: any
  }