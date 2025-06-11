import express, { request, Request, response, Response } from "express";
import mongoose, { Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import cors from "cors";
import jwt from "jsonwebtoken";

const dataBaseConnection = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://enhzaya0111:to9jHSJfU2VaJ1yI@food-delivery.jfs9mpb.mongodb.net/food-delivery"
    );
  } catch (err) {
    console.log(err);
  }
};

const Users = new Schema({
  email: { type: String, require: true },
  password: { type: String, required: true },
  createdAt: { type: Date, defualt: Date.now, immutable: true },
  updated: { type: Date, defualt: Date.now },
});
const UserModel = model("Users", Users);

const app = express();
app.use(express.json());
app.use(cors()); // бүх origin зөвшөөрнө

// эсвэл зөвхөн тодорхой origin зөвшөөрөх
// app.use(cors({ origin: 'http://localhost:8000' }));

dataBaseConnection();

app.get("/", async (_request: Request, response: Response) => {
  response.send("hello world");
});

app.post("/signup", async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });

  if (!isEmailExisted) {
    const hashedPassword = await bcrypt.hashSync(password, 10);
    await UserModel.create({ email, password: hashedPassword });
    response.status(200).send({ messsage: "Successfully registered" });
    return;
  }
  response.status(400).send({ messsage: "User already existed" });
});

app.post("/login", async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.status(400).send({ message: "User doesn't existed" });
    return;
  } else {
    const hashedPassword = await bcrypt.compare(
      password,
      isEmailExisted.password!
    );
    const tokenPassword = "foodDelivery";
    if (hashedPassword) {
      const token = jwt.sign({ userId: isEmailExisted._id }, tokenPassword, {
        expiresIn: "3s",
      });
      response.status(200).send({ message: "Successfully logged in", token });
      return;
    } else {
      response.status(401).send({ message: "Wrong password, try again" });
      return;
    }
  }
});

app.post("/verify", async (request: Request, response: Response) => {
  const { token } = request.body;
  const tokenPassword = "foodDelivery";
  try {
    const isValid = jwt.verify(token, tokenPassword);
    if (isValid) {
      const destructToken = jwt.decode(token);
      response.send({ destructToken });
      return;
    } else {
      response.status(401).send({ message: "token is not valid" });
      return;
    }
  } catch (err) {
    response.status(401).send({ message: "token is not valid" });
  }
});

app.put("/forget", async (request: Request, response: Response) => {
  const { email, password } = request.body;
  const isEmailExisted = await UserModel.findOne({ email });
  if (!isEmailExisted) {
    response.status(400).send({ message: "User doesn't existed" });
  } else {
    const hashedPassword = bcrypt.hashSync(password, 10);
    await UserModel.updateOne({ email }, { email, password: hashedPassword });
    response.status(200).send("Success");
  }
});

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
