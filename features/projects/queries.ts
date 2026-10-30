import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { programmingProjectsTable } from "@/db/schema";

export function getAllProjects() {
  return db
    .select()
    .from(programmingProjectsTable)
    .orderBy(asc(programmingProjectsTable.sort_order));
}

export function getPublishedProjects() {
  return db
    .select()
    .from(programmingProjectsTable)
    .where(eq(programmingProjectsTable.status, "published"))
    .orderBy(asc(programmingProjectsTable.sort_order));
}

export async function getProjectById(id: string) {
  const [project] = await db
    .select()
    .from(programmingProjectsTable)
    .where(eq(programmingProjectsTable.id, id));

  return project;
}

export async function getPublishedProjectBySlug(slug: string) {
  const [project] = await db
    .select()
    .from(programmingProjectsTable)
    .where(eq(programmingProjectsTable.slug, slug));

  if (!project || project.status !== "published") return undefined;
  return project;
}
