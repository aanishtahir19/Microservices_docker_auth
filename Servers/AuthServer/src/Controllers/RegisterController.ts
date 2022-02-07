import { Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
export default async function RegisterController(req: Request, res: Response) {
  try {
    // Email and Password Validation
    const { email, password } = req.body;
    if (!email || !password) {
      throw new Errors.BadRequestError('Email or Password not Found');
    }
    // Checking If User Already Exists
    const userExists = await UserModel.findOne({ email });
    if (userExists)
      throw new Errors.BadRequestError('User with this email already exists');
    // Creating Refresh Token
    const refresh_token = jwt.sign(
      { email: email },
      process.env.REFRESH_TOKEN_SECRET,
      { expiresIn: process.env.REFRESH_TOKEN_EXPIRY }
    );
    // Creating Access Token
    const access_token = jwt.sign(
      { email: email },
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    // Saving User to DB
    const data = await UserModel.create({
      email,
      password,
      refreshTokens: [
        {
          token: refresh_token,
          expiresIn: Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY),
        },
      ],
    });
    // Senidng Response to the Client
    res
      .status(200)
      .cookie('refreshToken', refresh_token, {
        secure: true,
        httpOnly: true,
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
      })
      .json({ accessToken: access_token });
  } catch (error) {
    console.error(error);
    res.status(500).send(error.message);
  }
}
