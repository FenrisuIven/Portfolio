import { z } from "zod";

export const artPieceSchema = z.object({
  slug: z
    .string()
    .min(1)
    .regex(/^[a-z0-9]+(-[a-z0-9]+)*$/, "slug must be lowercase, hyphen-separated"),
  title: z.string().min(1),
  description: z.string().min(1),
  image_url: z.string().min(1),
  gallery_urls: z.array(z.string()).default([]),
  tags: z.array(z.string()).default([]),
  time_spent: z.string().optional(),
  character_owner: z.string().optional(),
  character_url: z.union([z.string().url(), z.literal("")]).optional(),
  featured: z.boolean().default(false),
  status: z.enum(["draft", "published"]).default("draft"),
});

export type ArtPieceInput = z.infer<typeof artPieceSchema>;
