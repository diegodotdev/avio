import { Recipe } from "../pages/root";

export interface Recipe {
  category: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  title: string;
  userId: string;
}

export interface User {
  avatar: string;
  clerkId: string;
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
}

export interface Cook extends User {
  recipes: Recipe[];
}

export interface Search {
  users: User[];
  recipes: Recipe[];
}
