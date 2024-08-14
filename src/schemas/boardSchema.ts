import { z } from 'zod';

export const boardSchema = z.object({
  title: z.string().min(1, 'Board name is required'),
  columns: z
    .array(
      z.object({
        id: z.number().optional(),
        name: z.string().min(1, 'Column name is required'),
      })
    )
    .default([]),
});

export type BoardSchema = z.infer<typeof boardSchema>;
