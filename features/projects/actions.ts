"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { programmingProjectsTable } from "@/db/schema";
import { projectSchema } from "./validation";

export async function createProject(input: unknown) {
  const data = projectSchema.parse(input);

  await db.insert(programmingProjectsTable).values(data);

  revalidatePath("/projects");
}

export async function updateProject(id: string, input: unknown) {
  const data = projectSchema.parse(input);

  await db
    .update(programmingProjectsTable)
    .set({ ...data, updated_at: new Date() })
    .where(eq(programmingProjectsTable.id, id));

  revalidatePath("/projects");
  revalidatePath(`/projects/${data.slug}`);
}

export async function deleteProject(id: string) {
  await db
    .delete(programmingProjectsTable)
    .where(eq(programmingProjectsTable.id, id));

  revalidatePath("/projects");
}
