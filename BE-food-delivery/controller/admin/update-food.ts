import { Request, response, Response } from "express";
import { FoodModel } from "../../model/food.model";

export const updateFoods = async (
  req: Request,
  res: Response
): Promise<void> => {
  const { foodName, ingredients, price, _id } = req.body;

  if (!_id) {
    res.status(400).send("Missing food ID");
    return;
  }
  try {
    const updatedFood = await FoodModel.findByIdAndUpdate(
      _id,
      { foodName, ingredients, price },
      { new: true, runValidators: true }
    );

    if (!updatedFood) {
      res.status(404).send("Food not found");
      return;
    }

    res.status(200).send(updatedFood);
  } catch (err) {
    console.error("Update error:", err);
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
