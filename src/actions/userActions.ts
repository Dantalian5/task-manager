'use server';

import { auth } from '@/auth';
import prisma from '@/lib/prismaDB';
import { ZodError } from 'zod';
import { hash, compare } from 'bcryptjs';
import {
  registerUserSchema,
  type RegisterUserSchema,
  updateUserData,
  type UpdateUserData,
  updateUserPass,
  type UpdateUserPass,
} from '@/schemas/userSchema';
import { Settings } from '@/types/global';

export async function addUserToDb(user: RegisterUserSchema) {
  try {
    const { name, email, password } = registerUserSchema.parse(user);
    const hashedPassword = await hash(password, 12);
    const newUser = await prisma.user.create({
      data: {
        name: name,
        email: email,
        password: hashedPassword,
        settings: {
          create: {
            boardSortBy: 'dateNewest',
            columnSortBy: 'dateNewest',
            taskSortBy: 'dateNewest',
          },
        },
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
    return { status: 500, message: 'Internal Server Error' };
  }
}
export async function updateUser(data: UpdateUserData) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.id) throw new Error('User not found');
    const { name, email } = updateUserData.parse(data);
    const updatedUser = await prisma.user.update({
      where: { id: Number(user.id) },
      data: { name: name, email: email },
    });
    return { status: 201, user: updatedUser };
  } catch (error: any) {
    if (error instanceof ZodError) {
      return { status: 400, errorList: error.errors };
    }
    if (error.code === 'P2002') {
      return { status: 409 };
    }
    return { status: 500, message: 'Internal Server Error' };
  }
}
export async function updateUserPassword(data: UpdateUserPass) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.id) return { status: 404, message: 'User not found' };

    const currentUser = await prisma.user.findUnique({
      where: { id: Number(user?.id) },
    });

    if (!currentUser) return { status: 404, message: 'User not found' };

    const { oldPassword, newPassword } = updateUserPass.parse(data);

    const isPasswordValid = await compare(oldPassword, currentUser.password);

    if (!isPasswordValid) {
      return { status: 401, message: 'Old password is incorrect' };
    }
    const hashedPassword = await hash(newPassword, 12);
    const updatedUser = await prisma.user.update({
      where: { id: Number(user.id) },
      data: { password: hashedPassword },
    });

    return { status: 200, message: 'Change successful' };
  } catch (error: any) {
    return { status: 500, message: 'Internal Server Error' };
  }
}
export async function deleteUser() {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.id) return { status: 404, message: 'User not found' };
    if (Number(user?.id) === 1) return { status: 401, message: 'Unauthorized' };
    const deletedUser = await prisma.user.delete({
      where: { id: Number(user?.id) },
    });
    return { status: 200, message: 'User Deleted' };
  } catch (error: any) {
    return { status: 500, message: 'Internal Server Error' };
  }
}
export async function getUserSettings() {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.id) return { status: 404, message: 'User not found' };
    const settings = await prisma.setting.findUnique({
      where: { userId: Number(user.id) },
      select: {
        boardSortBy: true,
        columnSortBy: true,
        taskSortBy: true,
      },
    });
    return { status: 200, settings: settings };
  } catch (error: any) {
    return { status: 500, message: 'Internal Server Error' };
  }
}
export async function putUserSettings(data: Settings) {
  try {
    const session = await auth();
    const user = session?.user;
    if (!user?.id) return { status: 404, message: 'User not found' };
    const settings = await prisma.setting.update({
      where: { userId: Number(user.id) },
      data: {
        boardSortBy: data.boardSortBy,
        columnSortBy: data.columnSortBy,
        taskSortBy: data.taskSortBy,
      },
    });
    return { status: 200, settings: settings };
  } catch (error: any) {
    return { status: 500, message: 'Internal Server Error' };
  }
}
