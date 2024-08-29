import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  username: z.string().min(1, 'Username is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});
export type UserSchema = z.infer<typeof userSchema>;

export const registerUserSchema = z
  .object({
    name: z.string().min(1, 'Name is required'),
    email: z.string().min(1, 'Email is required').email('Invalid email'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(4, 'Password must be more than 4 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Passwords do not match',
  });
export type RegisterUserSchema = z.infer<typeof registerUserSchema>;

export const loginUserSchema = z.object({
  email: z.string().min(1, 'Email is required').email('Invalid email'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(4, 'Password must be more than 4 characters'),
});
export type LoginUserSchema = z.infer<typeof loginUserSchema>;

export const updateUserData = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().min(1, 'Email is required').email('Invalid email'),
});
export type UpdateUserData = z.infer<typeof updateUserData>;

export const updateUserPass = z
  .object({
    oldPassword: z.string().min(1, 'Old password is required'),
    newPassword: z
      .string()
      .min(1, 'New Password is required')
      .min(4, 'Password must be more than 4 characters')
      .max(32, 'Password must be less than 32 characters'),
    confirmNewPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmNewPassword, {
    path: ['confirmNewPassword'],
    message: 'Passwords do not match',
  });
export type UpdateUserPass = z.infer<typeof updateUserPass>;

export enum SortOrder {
  AlphaAsc = 'alphaAsc',
  AlphaDesc = 'alphaDesc',
  DateNewest = 'dateNewest',
  DateOldest = 'dateOldest',
  UpdatedNewest = 'updatedNewest',
  UpdatedOldest = 'updatedOldest',
}
const SortOrderEnum = z.nativeEnum(SortOrder);
export const updateUserSettings = z.object({
  boardSortBy: SortOrderEnum,
  columnSortBy: SortOrderEnum,
  taskSortBy: SortOrderEnum,
});
export type UpdateUserSettings = z.infer<typeof updateUserSettings>;
