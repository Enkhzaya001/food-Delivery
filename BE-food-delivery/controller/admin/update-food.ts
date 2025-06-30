import { Request, response, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const updateFoods = async (req: Request, res: Response) => {
  const { foodName, _id } = req.body;
  try {
    const updateData = await FoodModel.findByIdAndUpdate(
      { _id: _id },
      {
        foodName: foodName,
      },
      { new: true }
    );
    if (!updateData) {
      res.status(404).send("Food is not found");
    }
    res.status(200).send(updateData);
  } catch (err) {
    res.status(500).send("Failed to update food");
  }
};

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
