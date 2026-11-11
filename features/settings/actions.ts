"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { siteSettingsTable } from "@/db/schema";
import { getSiteSettings } from "./queries";

export async function updateResumeUrlAction(formData: FormData) {
  const resumeUrl = String(formData.get("resume_url") ?? "");

  const existing = await getSiteSettings();

  if (existing) {
    await db
      .update(siteSettingsTable)
      .set({ resume_url: resumeUrl, updated_at: new Date() })
      .where(eq(siteSettingsTable.id, existing.id));
  } else {
    await db.insert(siteSettingsTable).values({ resume_url: resumeUrl });
  }

  revalidatePath("/resume");
  redirect("/admin");
}
