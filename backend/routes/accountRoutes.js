import express from "express";
import {
  createAccount,
  deleteAccount,
  getAllAccounts,
  getFilterdAccounts,
  updateAccountLimit,
} from "../controllers/accountController.js";

const accountRouter = express.Router();

accountRouter.post("/createAccount", createAccount);
accountRouter.post("/deleteAccount", deleteAccount);
accountRouter.post("/getFilterdAccounts", getFilterdAccounts);
accountRouter.post("/getAllAccounts", getAllAccounts);
accountRouter.post("/updateAccountLimit", updateAccountLimit);

export default accountRouter;
