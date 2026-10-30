import { z } from "zod";

export const projectSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase, hyphen-separated"),
  title: z.string().min(1),
  summary: z.string().min(1),
  description: z.string().min(1),
  what_i_learned: z.string().min(1),
  tech_tags: z.array(z.string()).default([]),
  github_url: z.union([z.string().url(), z.literal("")]).optional(),
  live_url: z.union([z.string().url(), z.literal("")]).optional(),
  cover_image_url: z.string().min(1),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type ProjectInput = z.infer<typeof projectSchema>;
