"use server";

import connectDB from "@/app/lib/mongdb";
import { createSession } from "@/app/lib/session";
import User from "@/app/models/User";
import bcrypt from 'bcryptjs';
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email({ message: "Invalid email address" }).trim(),
  password: z.string().min(8, { message: "password must be at least 8 characters" }).trim()
});

// export async function login(prevState: any, formData: FormData) {
//   const result = loginSchema.safeParse(Object.fromEntries(formData));

//   if (!result.success) {
//     return {
//       error: result.error.flatten().fieldErrors,
//     }
//   }

//   const { email, password } = result.data;

//   if (email !== testUser.email || password !== testUser.password) {
//     return {
//       errors: {
//         email: ["Invalid email or password"],
//         password: ["Invalid email or password"]
//       }
//     }
//   }

//   await createSession(testUser.id);

//   redirect("/");
// }

export async function login(formData: FormData) {
  try {
    await connectDB();

    const validData = loginSchema.parse(FormData);
    const { email, password } = validData;

    const user = await User.findOne({ email }).select("+password");

    if (!user) {
      return { error: "this email or password is not right" }
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password);

    if (!isPasswordMatch) {
      return { error: "this email or password is not right" };
    }

    await createSession(user.id);

    return {
      success: "login success",
      user: { name: user.name, email: user.email }
    }
  } catch (error: any) {
    return { error: error.message || "error occurred from login " }
  }
}

export async function logout() {

}

