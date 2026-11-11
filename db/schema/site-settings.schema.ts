import {
  pgTable,
  uuid,
  text,
  timestamp,
} from "drizzle-orm/pg-core";

export const siteSettingsTable = pgTable("siteSettings", {
  id: uuid().primaryKey().defaultRandom(),
  resume_url: text(),
  updated_at: timestamp().defaultNow(),
});
