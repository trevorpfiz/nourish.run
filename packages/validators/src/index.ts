import { z } from "zod";

// track
export const SearchFoodItemSchema = z.object({
  name: z.string().min(1),
});
export type SearchFoodItem = z.infer<typeof SearchFoodItemSchema>;

export const ReviewFoodItemSchema = z.object({
  size: z.string().min(1),
  quantity: z.number().min(1),
});
export type ReviewFoodItem = z.infer<typeof ReviewFoodItemSchema>;
export const ReviewFoodsFormSchema = z.object({
  foods: z.array(ReviewFoodItemSchema),
});
export type ReviewFoodsForm = z.infer<typeof ReviewFoodsFormSchema>;

// auth
export const SignInSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1, {
    message: "Password is required",
  }),
});
export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, {
    message: "Password must be at least 6 characters",
  }),
});
export type SignUpSchemaType = z.infer<typeof SignUpSchema>;
