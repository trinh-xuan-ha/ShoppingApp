import express from 'express';
import dotenv from 'dotenv';
import mongoose from "mongoose";
import userRouter from './src/routers/user'
import cors from 'cors'
import storageRouter from './src/routers/storage'
import {verifyToken} from "./src/middlewares/verifyToken";
import SupplierRouter from './src/routers/supplier'

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3002
const dbURL = `mongodb+srv://${process.env.DATABASE_USERNAME}:${process.env.DATABASE_PASSWORD}@trinhxuanha.6aaiz.mongodb.net/?retryWrites=true&w=majority&appName=trinhxuanha`
app.use(express.json());
app.use(cors())
app.use('/auth', userRouter)
app.use(verifyToken)
app.use('/storage', storageRouter)
app.use('/supplier', SupplierRouter)

const connectDB = async () => {
    try {
        await mongoose.connect(dbURL);
        console.log("Connected to MongoDB...");

    } catch (error) {
        console.log(`Error connecting to MongoDB...${error}`);
        process.exit(1);
    }
}
connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Listening on port ${process.env.PORT}`);
    })
    console.log("hello world 2");

}).catch((error) => {
    console.log(error);
})