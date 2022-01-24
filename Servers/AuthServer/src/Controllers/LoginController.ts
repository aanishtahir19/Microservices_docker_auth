import { Request, Response } from "express";
import * as Errors from '../Errors/Index';

export default function MainController(req:Request, res:Response){
    res.send("Login")
}