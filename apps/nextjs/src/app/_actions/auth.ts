"use server";

import type { SignInSchemaType, SignUpSchemaType } from "@nourish/validators";
import { SignInSchema, SignUpSchema } from "@nourish/validators";

export const signIn = async (values: SignInSchemaType) => {
  const validatedFields = SignInSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", error: { message: "Invalid input fields" } };
  }

  return { status: "success", data: { message: "Confirmation email sent!" } };
};

export const signUp = async (values: SignUpSchemaType) => {
  const validatedFields = SignUpSchema.safeParse(values);

  if (!validatedFields.success) {
    return { status: "error", error: { message: "Invalid input fields" } };
  }

  return { status: "success", data: { message: "Confirmation email sent!" } };
};
