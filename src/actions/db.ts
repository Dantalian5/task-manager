'use server';
import prisma from '@/lib/prismaDB';
import { ZodError } from 'zod';
import { hash, compare } from 'bcryptjs';
import {
  registerUserSchema,
  type RegisterUserSchema,
  type UserSchema,
  type UpdateUserPass,
} from '@/schemas/userSchema';

export async function addUserToDb(user: RegisterUserSchema) {
  try {
    const { name, email, password } = registerUserSchema.parse(user);
    const hashedPassword = await hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
      },
    });
    return { status: 201, user: newUser };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { status: 400, errorList: error.errors };
    }
    if (error.code === 'P2002') {
      return { status: 409 };
    }
    return { status: 500 };
  }
}
