import {  Admin } from "../models/adminModel.js";

export const verifyAdmin = async (req, res, next) =>{
  if(!req.session.userId){
      return res.status(401).json({msg: "Please Login Again"});
  }
  const user = await Admin.findOne({_id:req.session.userId });
  if(!user) return res.status(404).json({msg: "Admin Not Found"});
  req.userId = user.id;
  req.superAdmin = user.superAdmin; 
  next();
};
