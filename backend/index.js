
import express from "express";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import session from "express-session";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import adminRouter from "./routes/adminRoutes.js";
import  MongoDBStore  from "connect-mongodb-session";
import betRouter from "./routes/betRoutes.js";
import accountRouter from "./routes/accountRoutes.js";
import { updateBackupAccount } from "./middleware/BackUpAcntTimers.js";
import cron from "node-cron";


dotenv.config();
const app = express();
app.use(cookieParser());
app.use(bodyParser.json({ limit: "50mb" }));
 

app.use(cors({
  credentials:true,
  methods: ["GET", "POST", "PUT", "DELETE"],
  //origin:['http://localhost:5173']
}
));

app.use(express.json({ limit: "50mb" }));

const root = path.resolve();
app.use(express.static(path.join(root, 'dist')));

app.get("*", (req, res) => {
  res.sendFile(path.join(root, 'dist/index.html'));
});

const MongoDBStoreSession = MongoDBStore(session);

const store = new MongoDBStoreSession({
  uri: process.env.MONGODB_URI,
  collection: 'sessions'
});

app.use(session({
  secret: process.env.SESSSION_SECRET,
  resave:false,
  saveUninitialized:false,
  store:store,
  cookie:{
    secure: 'auto',
    maxAge:1000 * 60 * 60 * 24,
  }
}));


app.use("/api/admin",adminRouter);
app.use("/api/bets",betRouter);
app.use("/api/accounts",accountRouter)

cron.schedule("10 0 * * *", async () => {
  console.log("Running backup account job");
  await updateBackupAccount();
}, {
  timezone: "Asia/Karachi" 
});


mongoose
.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("Database Connected");
    app.listen(process.env.PORT,console.log(`Server is running on http://localhost:${process.env.PORT}`))
})
.catch((error)=>{
    console.log(error)
});



