import express from 'express';
import ErrorHandler from './Middleware/CustomErrorHandler';
import MainRoute from './Routes/MainRoute'
const app = express();
import connectdb from './db/Connect';
import { config } from 'dotenv';
config();
app.use(express.json());
app.get("/", (req, res)=>{
    res.send("Authentication Server")
})
app.use("/api", MainRoute);
app.use(ErrorHandler); // Customr Error Handler Middleware
app.listen(3000, async()=> {
    await connectdb()
    console.log(`Server Running on Port 3000`)
    }
)