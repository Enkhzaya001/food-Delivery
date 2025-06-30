"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export const UploadImage = () => {
  const [file, setFile] = useState();
  const [url, setUrl] = useState("");

  const imageUpload = async () => {
    if (!file) {
      return null;
    }
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "foodDelivery");

    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dryhqirib/image/upload",
        {
          method: "POST",
          body: formData,
        }
      );
      const result = await response.json();
      console.log(result.secure_url);
    } catch (error: unknown) {
      return { error: "failed to upload image" };
    }
  };
  const fileHandler = (event: any) => {
    setFile(event.target.files[0]);
    const url = URL.createObjectURL(event.target.files[0]);
    setUrl(url);
  };
  return (
    <div>
      home page
      <input type="file" onChange={fileHandler} />
      <Button onClick={imageUpload}>Upload</Button>
      <Image
        src="https://res.cloudinary.com/dryhqirib/image/upload/v1750066957/r8irqwzt8d4but2yjcrs.png"
        alt="image"
        width={200}
        height={200}
      />
    </div>
  );
};
