import { NextFunction, Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
type Mypayload = { email:string}
export default async function LoginController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {

    const refreshToken = req.cookies.refreshToken
    if(!refreshToken) throw new Errors.BadRequestError("No Refresh token found");
    const validtoken = jwt.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET) as Mypayload;
    if(!validtoken) throw new Errors.UnAuthorizedError("Invalid Refresh Token")
    console.log(validtoken)
    // Generate New Access Token
    const access_token = jwt.sign(
      { email: validtoken.email},
      process.env.ACCESS_TOKEN_SECRET,
      { expiresIn: process.env.ACCESS_TOKEN_EXPIRY }
    );
    res.status(200).json({accessToken:access_token})
  } catch (error) {
    console.log(error);
    next(error);
  }
}
