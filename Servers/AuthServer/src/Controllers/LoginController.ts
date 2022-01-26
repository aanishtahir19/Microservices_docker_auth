import { NextFunction, Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
export default async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, password } = req.body;
    const data = await UserModel.findOne({ email });
    if (!data) throw new Errors.BadRequestError('Email not registered');
    if (!data.validatePassword(password))
      throw new Errors.BadRequestError('Wrong Password');
    const refresh_token = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    const filter = { email };
    const doc = await UserModel.findOneAndUpdate(
      filter,
      { $push: { refreshTokens: {token:refresh_token,  expiresIn: Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY) } } },
      { new: true }
    );
    const access_token = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res
      .status(200)
      .cookie('refreshToken', refresh_token, {
        // secure:true,
        // httpOnly:true,
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
      })
      .json({ accessToken: access_token });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
