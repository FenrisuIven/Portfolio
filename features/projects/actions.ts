"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { programmingProjectsTable } from "@/db/schema";
import { projectSchema } from "./validation";
import { getAllProjects } from "./queries";

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

function parseProjectFormData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    summary: String(formData.get("summary") ?? ""),
    description: String(formData.get("description") ?? ""),
    what_i_learned: String(formData.get("what_i_learned") ?? ""),
    tech_tags: String(formData.get("tech_tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    github_url: String(formData.get("github_url") ?? ""),
    live_url: String(formData.get("live_url") ?? ""),
    cover_image_url: String(formData.get("cover_image_url") ?? ""),
    featured: formData.get("featured") === "on",
    status: String(formData.get("status") ?? "draft"),
  };
}

export async function createProjectAction(formData: FormData) {
  await createProject(parseProjectFormData(formData));
  redirect("/admin");
}

export async function updateProjectAction(id: string, formData: FormData) {
  await updateProject(id, parseProjectFormData(formData));
  redirect("/admin");
}

export async function deleteProjectAction(id: string) {
  await deleteProject(id);
  redirect("/admin");
}

export async function moveProjectAction(id: string, direction: "up" | "down") {
  const projects = await getAllProjects();
  const index = projects.findIndex((p) => p.id === id);
  if (index === -1) return;

  const swapIndex = direction === "up" ? index - 1 : index + 1;
  if (swapIndex < 0 || swapIndex >= projects.length) return;

  const reordered = [...projects];
  [reordered[index], reordered[swapIndex]] = [reordered[swapIndex], reordered[index]];

  await Promise.all(
    reordered.map((project, i) =>
      db
        .update(programmingProjectsTable)
        .set({ sort_order: i })
        .where(eq(programmingProjectsTable.id, project.id))
    )
  );

  revalidatePath("/admin");
  revalidatePath("/projects");
}
