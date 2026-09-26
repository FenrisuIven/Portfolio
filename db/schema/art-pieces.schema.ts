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

export const artPiecesTable = pgTable("artPieces", {
  id: uuid().primaryKey().defaultRandom(),
  slug: text().unique().notNull(),
  title: text().notNull(),
  description: text().notNull(),
  image_url: text().notNull(),
  gallery_urls: text().array().default(sql`'{}'::text[]`),
  tags: text().array().default(sql`'{}'::text[]`),
  time_spent: text(),
  character_owner: text(),
  character_url: text(),
  featured: boolean().default(true),
  status: projectStatusEnum().default('draft'),
  sort_order: integer().default(0),
  created_at: timestamp().defaultNow(),
  updated_at: timestamp()
});
