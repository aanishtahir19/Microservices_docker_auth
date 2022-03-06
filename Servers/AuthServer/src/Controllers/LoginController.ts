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
    //   Validate if req has email and passwordk
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Errors.BadRequestError('Email or Password not Found');
    }
    const data = await UserModel.findOne({ email });
    if (!data) throw new Errors.BadRequestError('Email not registered');
    //  Validate if password is correct
    if (!data.validatePassword(password))
      throw new Errors.BadRequestError('Wrong Password');
    //  Generate Refresh token
    const refresh_token = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    const filter = { email };
    // Remove expired Refresh Tokens
    await UserModel.updateMany(
      filter,
      { $pull: { refreshTokens: { expiresIn: { $lt: Date.now() } } } },
      { upsert: false, multi: true }
    );
    //  Add Refresh token to user data

    const doc = await UserModel.findOneAndUpdate(
      filter,
      {
        $push: {
          refreshTokens: {
            token: refresh_token,
            expiresIn: Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY),
          },
        },
      },
      { new: true }
    );
    // Generate access token
    const access_token = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    //  Send response to client with refresh token in cookie and access token in body
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
