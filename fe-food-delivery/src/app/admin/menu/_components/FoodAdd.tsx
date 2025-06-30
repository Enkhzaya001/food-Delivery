"use client";

import { useState } from "react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Plus } from "lucide-react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import axios from "axios";
import { FoodProps } from "./MenuSection";

interface Props {
  categoryName: string;
}

export function FoodAdd({ categoryName }: Props) {
  const [open, setOpen] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>("");

  const FoodSchema = yup.object().shape({
    foodName: yup.string().required("Food name is required"),
    price: yup
      .number()
      .typeError("Must be a number")
      .required("Price is required"),
    ingredients: yup.string().required("Ingredients are required"),
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const uploadImageToCloudinary = async (file: File): Promise<string> => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "foodDelivery");

    const response = await fetch(
      "https://api.cloudinary.com/v1_1/dryhqirib/image/upload",
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();
    if (!response.ok) throw new Error(data.error?.message || "Upload failed");

    return data.secure_url;
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <div className="cursor-pointer border border-dashed border-red-400 rounded-xl flex flex-col items-center justify-center p-6 bg-white hover:bg-red-50 transition">
          <div className="w-10 h-10 rounded-full bg-red-500 flex items-center justify-center text-white mb-2">
            <Plus size={20} />
          </div>
          <p className="text-sm text-center text-gray-600">
            Add new Dish to
            <span className="font-medium text-black">{categoryName}</span>
          </p>
        </div>
      </DialogTrigger>

      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Add new Dish to {categoryName}</DialogTitle>
        </DialogHeader>

        <Formik
          initialValues={{ foodName: "", price: "", ingredients: "" }}
          validationSchema={FoodSchema}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              const imageUrl = await uploadImageToCloudinary(imageFile as File);
              if (!imageUrl) {
                return;
              }
              const token = localStorage.getItem("token");
              if (!token) {
                alert("Log in hiine uu!");
                return;
              }
              console.log(values, imageUrl);
              const res = await axios.post(
                "https://food-delivery-be-food-delivery.onrender.com/addFood",
                {
                  foodName: values.foodName,
                  price: Number(values.price),
                  image: imageUrl,
                  ingredients: values.ingredients,
                  category: categoryName,
                },
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              resetForm();
              setImageFile(null);
              setImagePreview("");
              setOpen(false);
            } catch (err: any) {
              alert(err.response?.data?.message || "Failed to create food");
            } finally {
              setSubmitting(false);
            }
          }}
        >
          {({ isSubmitting, isValid, dirty }) => (
            <Form className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-sm font-medium">Food name</label>
                  <Field
                    name="foodName"
                    as={Input}
                    placeholder="Type food name"
                  />
                  <ErrorMessage
                    name="foodName"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-sm font-medium">Food price</label>
                  <Field name="price" as={Input} placeholder="Enter price..." />
                  <ErrorMessage
                    name="price"
                    component="div"
                    className="text-red-500 text-sm"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Ingredients</label>
                <Field
                  name="ingredients"
                  as={Textarea}
                  placeholder="List ingredients..."
                />
                <ErrorMessage
                  name="ingredients"
                  component="div"
                  className="text-red-500 text-sm"
                />
              </div>

              <div className="space-y-1">
                <label className="text-sm font-medium">Food image</label>
                <div className="border-2 border-dashed border-gray-300 p-4 rounded-lg bg-gray-50 text-center">
                  {imagePreview ? (
                    <img
                      src={imagePreview}
                      alt="Preview"
                      className="mx-auto max-h-48 object-contain rounded"
                    />
                  ) : (
                    <p className="text-gray-500">
                      {/* Choose a file or drag & drop it here */}
                    </p>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={handleImageChange}
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  className="bg-black text-white"
                  disabled={!isValid || !dirty || isSubmitting}
                >
                  {isSubmitting ? "Saving..." : "Add Dish"}
                </Button>
              </DialogFooter>
            </Form>
          )}
        </Formik>
      </DialogContent>
    </Dialog>
  );
}
