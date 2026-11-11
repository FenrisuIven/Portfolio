import { z } from "zod";

export const contactSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  discord: z.string().optional(),
  idea: z.string().min(1),
});

export type ContactInput = z.infer<typeof contactSchema>;
