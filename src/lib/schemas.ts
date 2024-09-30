import { z } from "zod";

export const signInFormSchema = z.object({
  username: z.string().min(1),
  password: z.string().min(1),
});

export const signUpFormSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  username: z.string().min(1),
  password: z.string().min(1),
});

export const recipeFormSchema = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  image: z.string().min(1),
  category: z.string().min(1),
  ingredients: z.array(
    z.object({
      value: z.string(),
    })
  ),
  instructions: z.array(
    z.object({
      value: z.string(),
    })
  ),
  username: z.string(),
});
