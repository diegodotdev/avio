const BASE_URL = import.meta.env.VITE_BASE_URL;
import { type Search, type Cook, type Recipe, type User } from "../types";

export const getRecipes = async (): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/recipes`);
  const result = await response.json();
  return result;
};

export const getRecipe = async (id: string): Promise<Recipe> => {
  const response = await fetch(`${BASE_URL}/recipes/${id}`);
  const result = await response.json();
  return result;
};

export const getRecipesByCategory = async (
  category: string
): Promise<Recipe[]> => {
  const response = await fetch(`${BASE_URL}/categories/${category}`);
  const result = await response.json();
  return result;
};

export const getCooks = async (): Promise<User[]> => {
  const response = await fetch(`${BASE_URL}/users`);
  const result = await response.json();
  return result;
};

export const getCook = async (id: string): Promise<Cook> => {
  const response = await fetch(`${BASE_URL}/users/${id}`);
  const result = await response.json();
  return result;
};

export const getSearch = async (query: string): Promise<Search> => {
  const response = await fetch(`${BASE_URL}/search?query=${query}`);
  const result = await response.json();
  return result;
};
