import { sql } from 'drizzle-orm';
import {
  pgTable,
  uuid,
  text,
  boolean,
  integer,
  timestamp,
} from "drizzle-orm/pg-core";

import { projectStatusEnum } from './project-status.enum';

export const programmingProjectsTable = pgTable("programmingProjects", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().unique().notNull(),
  title: text().notNull(),
  summary: text().notNull(),
  description: text().notNull(),
  what_i_learned: text().notNull(),
  tech_tags: text().array().notNull().default(sql`'{}'::text[]`),
  github_url: text(),
  live_url: text(),
  cover_image_url: text().notNull(),
  gallery_urls: text().array().default(sql`'{}'::text[]`),
  featured: boolean().default(true),
  status: projectStatusEnum().default('draft'),
  sort_order: integer().default(0),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp(),
});
