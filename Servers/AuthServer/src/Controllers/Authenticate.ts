import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
export default function Authenticate(req: Request, res: Response) {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split(' ')[1];
    if (token) {
      jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
        if (err) {
          console.log(err);
          res.status(401).json({
            success: false,
            message: 'Failed to authenticate token.',
          });
        } else {
          res.status(200).json(decoded);
        }
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'No token provided.',
      });
    }
  } else {
    res.status(401).json({
      success: false,
      message: 'No token provided.',
    });
  }
}
