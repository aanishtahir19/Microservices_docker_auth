import { NextFunction, Request, Response } from 'express';
import * as Errors from '../Errors/Index';
import UserModel from '../Models/UserModel';
import jwt from 'jsonwebtoken';
interface JwtPayload {
  email: string;
  given_name: string;
  family_name: string;
  picture: string;
}
export default async function LoginGoogleController(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    console.log(req.body);
    const { id_token } = req.body;
    if (!id_token) throw new Errors.BadRequestError('id_token is required');
    const decodedToken = (await jwt.decode(id_token)) as JwtPayload;
    // console.log('decodedToken', decodedToken);
    if (!decodedToken) throw new Errors.BadRequestError('Invalid id_token');
    const { email, given_name, family_name, picture } = decodedToken;
    const user = await UserModel.findOne({ email });
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
    if (!user) {
      // Saving User to DB
      const data = await UserModel.create({
        email,
        signin_method: 'google',
        role: ['user'],
        refreshTokens: [
          {
            token: refresh_token,
            expiresIn: Date.now() + Number(process.env.REFRESH_TOKEN_EXPIRY),
          },
        ],
      });
    } else {
      // Remove expired Refresh Tokens
      await UserModel.updateMany(
        { email },
        { $pull: { refreshTokens: { expiresIn: { $lt: Date.now() } } } },
        { upsert: false, multi: true }
      );
      //  Add Refresh token to user data

      const doc = await UserModel.findOneAndUpdate(
        { email },
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
    }
    // Senidng Response to the Client
    res
      .status(200)
      .cookie('refreshToken', refresh_token, {
        secure: true,
        httpOnly: true,
        maxAge: Number(process.env.REFRESH_TOKEN_EXPIRY),
      })
      .json({ accessToken: access_token });
    // res.send({ email, firstName: given_name, lastName: family_name, picture });
  } catch (error) {
    console.log(error);
    next(error);
  }
}
