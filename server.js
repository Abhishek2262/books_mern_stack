import dotenv from 'dotenv';
dotenv.config({ path: '.env' });
import express, { request, response } from "express";
// import { PORT, mongoDBURL } from "./config.js";
import mongoose, { mongo } from "mongoose";
import bookRoute from './routes/bookRoute.js';
import cors from 'cors';

const app = express();
// midleware for parsing request body

app.use(express.json());

// mildeware fro handling cors policy  
// option 1: allow all origins with default of cors(*)
app.use(cors());
// opt 2 c: Allow custom origins 
// app.use(
//     cors({
//         origin: 'http://localhost:3000', 
//         methods:['GET', 'POST', 'PUT', 'DELETE'],
//         allowedHeaders: ['Content-Type'],
//     })
// );


app.get('/',(req, res)=>{
    console.log(req)
    return res.status(234).send('welcome to mern stack')
});

app.use('/books', bookRoute);


mongoose
 .connect(process.env.mongoDBURL)
 .then(()=>{
    console.log('App connectedc to database');
    app.listen(process.env.PORT,()=>{
    console.log(`App is listening to port: ${process.env.PORT}`);
    });
 })
 .catch((error)=>{
    console.log(error);
 });
