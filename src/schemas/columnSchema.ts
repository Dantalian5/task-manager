import { z } from 'zod';

export const columnSchema = z.object({
  name: z.string().min(1, 'Column Name is required'),
  boardId: z.number().int('Board id required'),
});

export type ColumnSchema = z.infer<typeof columnSchema>;
