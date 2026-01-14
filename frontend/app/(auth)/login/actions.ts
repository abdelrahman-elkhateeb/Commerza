"use server";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "password must be at least 8 characters" }).trim()
});

export async function login(prevState: any, formData: FormData) {

}

export async function logout() {

}