"use server";

import * as z from "zod";
import bcrypt from "bcryptjs";

import { db } from "@/lib/db";
import { RegisterSchema } from "@/schemas";
import { getUserByEmail } from "@/data/user";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validateFields = RegisterSchema.safeParse(values);

  if (!validateFields.success) {
    return {
      error: "Invalid field!",
    };
  }

  const { email, password, name } = validateFields.data;

  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);

  // Instead of this
  // const existingUser = await db.user.findUnique({
  //   where: { email },
  // });

  //  We can use this
  const existingUser = await getUserByEmail(email);

  if (existingUser) return { error: "Email already in use!" };

  await db.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  // TODO: Send Verification token email

  return { success: "User created!" };
};
