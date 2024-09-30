export interface Recipe {
  category: string;
  createdAt: string;
  description: string;
  id: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  title: string;
  user: User;
}

export interface User {
  avatar: string;
  createdAt: string;
  firstName: string;
  id: string;
  lastName: string;
  username: string;
}

export interface Cook extends User {
  recipes: Recipe[];
}

export interface Search {
  users: User[];
  recipes: Recipe[];
}

export interface Params {
  username: string;
  title: string;
  description: string;
  image: string;
  ingredients: string[];
  instructions: string[];
  category: string;
}
