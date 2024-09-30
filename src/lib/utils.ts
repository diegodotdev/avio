import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { type Params } from "../types";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export async function createRecipe(params: Params) {
  const response = await fetch(
    `${import.meta.env.VITE_BASE_URL}/recipes/post`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(params),
    }
  );
  const result = await response.json();
  return result;
}
