"use client";

import { useState, useTransition } from "react";

import type { SignUpSchemaType } from "@nourish/validators";
import { Button } from "@nourish/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  useForm,
} from "@nourish/ui/form";
import { Input } from "@nourish/ui/input";
import { SignUpSchema } from "@nourish/validators";

import { signUp } from "~/app/_actions/auth";
import { FormError } from "~/app/(app)/(auth)/_components/form-error";
import { FormSuccess } from "~/app/(app)/(auth)/_components/form-success";

export const SignUpForm = () => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm({
    schema: SignUpSchema,
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: SignUpSchemaType) => {
    setError("");
    setSuccess("");

    startTransition(async () => {
      const response = await signUp(values);

      if (response.status === "error") {
        setError(response?.error?.message);
      } else {
        setSuccess(response?.data?.message);
      }
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Email address"
                    type="email"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    disabled={isPending}
                    placeholder="Password"
                    type="password"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormSuccess message={success} />
        <FormError message={error} />

        <Button disabled={isPending} type="submit" className="w-full">
          Continue with Email
        </Button>
      </form>
    </Form>
  );
};
