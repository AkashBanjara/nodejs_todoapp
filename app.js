import express from "express";
import userRouter from "./routes/user.js"
import taskRouter from "./routes/tasks.js"
import {config} from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path:"./data/config.env",
});

export const app = express();


//using middleware to access data from req.. url encoded for access data from form.
app.use(express.json());
app.use(cookieParser());
app.use(cors({
  origin: [process.env.FRONTEND_URL],
  methods : ["GET", "POST", "PUT", "DELETE"],
  credentials: true,
}))

//using routes
app.use("/api/v1/users" ,userRouter);
app.use("/api/v1/task" ,taskRouter);


app.get("/", (req, res) => {
  res.send("Nice working");
});


//using error middleware 
app.use(errorMiddleware); 


//try to use dynamic route at the end because  if we use this rourter at start the "/special" route will be consider as id.
