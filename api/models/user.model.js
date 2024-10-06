import mongosoe, { Schema, model } from "mongoose";

const userSchema=new Schema({
    username:{
        type:String,
        required:true,
        min:4,
        unique:true
    },
    password:{
        type:String,
        required:true,
        min:4
    }
},{timestamps:true})

export const User=model("User",userSchema);

