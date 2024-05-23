import { z } from "zod";

export const todoSchema = z.object({
  id: z.number(),
  title: z.string(),
  status: z.literal("completed").nullable(),
});

export type Todo = z.infer<typeof todoSchema>;
