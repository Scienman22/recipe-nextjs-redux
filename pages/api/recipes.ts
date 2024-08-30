// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { RecipeSlice } from "@/redux/slices/recipes-slice";
import type { NextApiRequest, NextApiResponse } from "next";

const initialRecipes = [{
  id: 1,
  title: "Paella",
  description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, 
              ranging across all continents except Antarctica`,
  ingredients: "",
  instructions: "",
  favourite: false,
  image: "/images/paella.jpg",
  author: {
      name: "Irwin",
      email: "test@email.com"
  },
  date_added: "August 28, 2024"
}, {
  id: 2,
  title: `Adobo`,
  description: `Lizards are a widespread group of squamate reptiles, with over 6,000 species, 
              ranging across all continents except Antarctica`,
  ingredients: "",
  instructions: "",
  favourite: false,
  image: "/images/paella.jpg",
  author: {
      name: "Ian",
      email: "example@email.com"
  },
  date_added: "August 28, 2024"
}]

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<RecipeSlice[]>,
) {
  res.status(200).json(initialRecipes);
}
