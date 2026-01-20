"use server";

import { createSession } from "@/app/lib/session";
import { redirect } from "next/navigation";
import User from "@/models/User";
import bcrypt from "bcryptjs";
import { RegisterSchema } from "@/validators/auth"
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "password must be at least 8 characters" }).trim()
});

export async function login(prevState: any, formData: FormData) {
  const result = loginSchema.safeParse(Object.fromEntries(formData));

  if (!result.success) {
    return {
      error: result.error.flatten().fieldErrors,
    }
  }

  const { email, password } = result.data;

  if (email !== testUser.email || password !== testUser.password) {
    return {
      errors: {
        email: ["Invalid email or password"],
        password:["Invalid email or password"]
      }
    }
  }

  await createSession(testUser.id);

  redirect("/");
}

export async function logout() {

}