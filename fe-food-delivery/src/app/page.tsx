"use client";

import axios from "axios";
import { useEffect, useState } from "react";
import { CardContainer } from "./_components/CardContainer";
import { Footer } from "./_components/Footer";
import { Header } from "./_components/Header";
import { UploadImage } from "./_components/UploadImage";
import { Hero } from "./signup/_Components/Hero";
import { FoodProps } from "./_components/CardContainer"; // reuse type from CardContainer

export type Foods = {
  [key: string]: FoodProps[];
};

export default function Home() {
  const [foods, setFoods] = useState<Foods | null>(null);

  useEffect(() => {
    const datafetch = async () => {
      try {
        const result = await axios.get("http://localhost:8000/foods");
        setFoods(result.data.foods as Foods); // Cast to correct type
        console.log(result.data.foods);
      } catch (error) {
        console.error("Failed to fetch foods:", error);
      }
    };

    datafetch();
  }, []);

  if (!foods)
    return <div className="text-center mt-10 text-gray-400">Loading...</div>;

  return (
    <div>
      <Header />
      <Hero />
      <CardContainer foods={foods} />
      <Footer />
      {/* <UploadImage /> */}
    </div>
  );
}

// "use client";
// import axios from "axios";
// import { CardContainer } from "./_components/CardContainer";
// import { Footer } from "./_components/Footer";
// import { Header } from "./_components/Header";
// import { UploadImage } from "./_components/UploadImage";
// import { Hero } from "./signup/_Components/Hero";
// import { Container, Foods } from "./_components/Container";
// import { useEffect, useState } from "react";

// export default function Home() {
//   const [foods, setFoods] = useState<Foods | null>(null);
//   useEffect(() => {
//     const datafetch = async () => {
//       const result = await axios.get("http://localhost:8000/foods");
//       setFoods(result.data.foods);
//       console.log(result.data.foods);
//     };

//     datafetch();
//   }, []);
//   if (!foods) return;

//   return (
//     <div>
//       <Header />
//       <Hero />
//       <CardContainer foods={foods} />
//       <Footer />
//       {/* <UploadImage /> */}
//       {/* <Container /> */}
//     </div>
//   );
// }
