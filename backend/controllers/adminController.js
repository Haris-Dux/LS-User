import bcrypt from "bcrypt";
import { Admin } from "../models/adminModel.js";
import mongoose from "mongoose";

export const signUp = async (req, res, next) => {
  try {
    const {email, password } = req.body;
    const user = await Admin.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    await Admin.create({
      email,
      password: hashedPassword,
    });
    res.status(201).json({ msg: "Admin Registerd SuccessFully" });
  } catch (error) {
    console.log(error);
    res.status(400).json({ msg: error.message });
  }
};

export const login = async (req, res, next) => {
  try {
    let { email, password } = req.body;
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ msg: "Invalid Credentials" });
    }
   
    const isMatched = await bcrypt.compareSync(password, admin.password);
    if (!isMatched) {
      return res.status(403).json({ msg: "Invalid Credentials" });
    }
    req.session.adminId = admin.id;

   const { id, name  } = admin;
  res.status(200).json({ login: true, id, name, email : admin.email, });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

export const logout = async (req, res, next) => {
  try {
    req.session.destroy((error) => {
      if (error) return res.status(400).json({ msg: "Logout Unsuccessfull" });
      res.clearCookie("connect.sid");
      res.status(200).json({ msg: "Logout Successfull" });
    });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const authAdmin = async (req, res , next) => {
  if (!req.session.adminId) {
  
    return res.status(403).json({ msg: "Please Login Again" });
  }
  const admin = await Admin.findById({
    _id: req.session.adminId,
  });
  if (!admin) {
    res.status(404).json({ msg: "Invalid Credentials" });
  }
  const { id, name,  email } = admin;
  res.status(200).json({ login: true, id, name, email, });
 
};













