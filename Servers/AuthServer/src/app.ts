import express from 'express';
import ErrorHandler from './Middleware/CustomErrorHandler';
import AuthRoute from './Routes/AuthRoute';
require('express-async-errors');
const app = express();
import connectdb from './db/Connect';
import { config } from 'dotenv';
import cookieParser from 'cookie-parser';
config();
app.use(express.json());
app.use(cookieParser());
app.use("/", AuthRoute);
app.use(ErrorHandler);
app.listen(3000, async()=> {
    await connectdb()
    console.log(`Server Running on Port 3000`)
    }
)