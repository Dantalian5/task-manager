import { z } from 'zod';

export const subTaskSchema = z.object({
  id: z.number().int().positive().nullable(),
  title: z.string().min(1),
  isCompleted: z.boolean().optional(),
});

export const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string(),
  columnId: z.number().int('Column ID must be an integer'),
  subTasks: z.array(subTaskSchema).default([]),
});

export type SubTaskSchema = z.infer<typeof subTaskSchema>;
export type TaskSchema = z.infer<typeof taskSchema>;
