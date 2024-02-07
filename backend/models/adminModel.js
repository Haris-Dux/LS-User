import mongoose from "mongoose";

const schema = new mongoose.Schema({
    email:{
        type:String,
        required:[true,"Please provide a email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"Please provide a password"],
    }
},{ timestamps: true });

export const Admin = mongoose.model("Admins", schema);