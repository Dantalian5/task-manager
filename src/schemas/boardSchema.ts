import { z } from 'zod';

export const boardSchema = z.object({
  title: z.string().min(1, 'Board name is required'),
  columns: z.array(z.string()).default([]),
});

export type BoardSchema = z.infer<typeof boardSchema>;
