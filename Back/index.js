import express from "express";
import cors from "cors";
import { connectDB } from "./connection/Db.js";
import "dotenv/config";
import profile from "./models/profileModel.js";
import profileRouter from "./routes/profileRouter.js";

const port = process.env.PORT;
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}))


const corsOptions={
    origin:process.env.FRONTEND_URL,
    credentials:true,
    methods:["GET","POST","PUT","DELETE"],
};
app.use(cors(corsOptions));



connectDB();

app.use("/profile",profileRouter)

app.listen(port, () => {
  console.log("Server started at " + port);
});
