import { z } from 'zod';

export const subTaskSchema = z.object({
  id: z.number().int().positive().nullable(),
  title: z.string().min(1),
});

export const taskSchema = z.object({
  id: z.number().int().positive(),
  title: z.string().min(1),
  description: z.string(),
  status: z.string().min(1),
  subTasks: z.array(subTaskSchema),
});

export type SubTaskSchema = z.infer<typeof subTaskSchema>;
export type TaskSchema = z.infer<typeof taskSchema>;
