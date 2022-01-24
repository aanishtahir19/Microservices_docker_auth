import { NextFunction, Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
export default async function LoginController(req: Request, res: Response, next:NextFunction) {
  try {
    const { email, password } = req.body;
    const data = await UserModel.findOne({ email });
    if (!data) throw new Errors.BadRequestError('Email not registered');
    if(!data.validatePassword(password)) throw new Errors.BadRequestError("Wrong Password");
    
    console.log(data);
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    next(error)
  }
}
