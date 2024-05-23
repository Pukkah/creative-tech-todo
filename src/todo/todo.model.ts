import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.enum(["done", "completed"]).nullable(),
});

export type Todo = z.infer<typeof todoSchema>;
