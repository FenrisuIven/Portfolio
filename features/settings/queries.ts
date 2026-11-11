import { db } from "@/db";
import { siteSettingsTable } from "@/db/schema";

export async function getSiteSettings() {
  const [settings] = await db.select().from(siteSettingsTable).limit(1);
  return settings;
}
