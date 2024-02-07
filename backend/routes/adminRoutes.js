import express from "express";
import {
  authAdmin,
  login,
  logout,
  signUp,
} from "../controllers/adminController.js";
import { verifyAdmin } from "../middleware/AuthAdmin.js";

const adminRouter = express.Router();

adminRouter.post("/signup", signUp);
adminRouter.post("/login", login);
adminRouter.delete("/logout",logout);
adminRouter.post("/authAdminSessionEverytime",authAdmin);

export default adminRouter;
