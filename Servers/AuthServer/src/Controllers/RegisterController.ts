import { Request, Response } from "express";
import * as Errors from '../Errors/Index';

export default function RegisterController(req:Request, res:Response){
    res.send("Register")
}