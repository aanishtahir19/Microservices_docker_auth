import { Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
export default async function RegisterController(req: Request, res: Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password){
        throw new Errors.BadRequestError('Email or Password not Found');
    }
    const userExists = await UserModel.findOne({email});
    if(userExists)throw new Errors.BadRequestError("User with this email already exists")
    const data = await UserModel.create({ email, password });
    console.log(data);
    res.status(200).json({ email: data.email });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
