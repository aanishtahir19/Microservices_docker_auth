import express from 'express';
import ErrorHandler from './Middleware/CustomErrorHandler';
import AuthRoute from './Routes/AuthRoute';
require('express-async-errors');
import cors from 'cors';
const app = express();
import connectdb from './db/Connect';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
import morgan from 'morgan';
config();
app.options('/', cors({ credentials: true, origin: '*' }));
app.use(cors({ credentials: true }));
app.use(express.json());
app.use(cookieParser());
app.use(morgan('dev'));
app.use('/auth', AuthRoute);

app.use(ErrorHandler);
app.listen(3000, async () => {
  await connectdb();
  console.log(`Server Running on Port 3000`);
});
