import express, { Request, Response } from "express";
import mongoose, { ObjectId, Schema, model } from "mongoose";
import cors from "cors";
import { UserRouter } from "./router/user.router";
import { foodCategoryRouter } from "./router/foodCategory.router";
import { foodRouter } from "./router/food.router";

const crypto = require("crypto");
const dataBaseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://enhzaya0111:to9jHSJfU2VaJ1yI@food-delivery.jfs9mpb.mongodb.net/food-delivery"
    );
  } catch (err) {
    console.log(err);
  }
};

const app = express();
app.use(express.json());
app.use(cors()); // бүх origin зөвшөөрнө
// эсвэл зөвхөн тодорхой origin зөвшөөрөх
// app.use(cors({ origin: 'http://localhost:8000' }));

dataBaseConnection();

app.use(UserRouter);
app.use(foodCategoryRouter);
app.use(foodRouter);

app.listen(8000, () => {
  console.log(`running on http://localhost:8000`);
});

// app.get("/users", async (_request:Request, response:Response)=>{
//     const users = await UserModel.find()
//     response.send(users);
// });
// app.get("/user", async (_request:Request, response:Response)=>{
//     const user = await UserModel.findOne({email:"hhe@.com"});
//     response.send(user);
// });

// app.post("/adduser", async (request:Request, response:Response)=>{
//     const {email, password} =request.body;
//     const result = await UserModel.create({email, password});
//     response.send(result)
// });

// app.put("/update", async (request:Request, response:Response)=>{
//     const {id,email,password } = request.body;
//     const updateData= await UserModel.findByIdAndUpdate({_id:id},{
//         email: email,
//         password:password,
//     },
//     {new:true}
//  )
//  response.send(updateData)
// })

// app.delete ("/delete", async (request:Request, response:Response)=>{
//     const {id } = request.body;
//     const deleteData = await UserModel.findByIdAndDelete({_id:id})
//     response.send(deleteData)
// } )
