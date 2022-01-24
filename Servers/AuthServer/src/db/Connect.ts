import mongoose from 'mongoose';

export default async function connectdb(){
    await mongoose.connect('mongodb://auth_mongo:27017/Auth');
    console.log("Connected To DB")
}