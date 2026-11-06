"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { db } from "@/db";
import { artPiecesTable } from "@/db/schema";
import { artPieceSchema } from "./validation";

export async function createArtPiece(input: unknown) {
  const data = artPieceSchema.parse(input);

  await db.insert(artPiecesTable).values(data);

  revalidatePath("/art");
}

export async function updateArtPiece(id: string, input: unknown) {
  const data = artPieceSchema.parse(input);

  await db
    .update(artPiecesTable)
    .set({ ...data, updated_at: new Date() })
    .where(eq(artPiecesTable.id, id));

  revalidatePath("/art");
  revalidatePath(`/art/${data.slug}`);
}

export async function deleteArtPiece(id: string) {
  await db.delete(artPiecesTable).where(eq(artPiecesTable.id, id));

  revalidatePath("/art");
}

function parseArtPieceFormData(formData: FormData) {
  return {
    slug: String(formData.get("slug") ?? ""),
    title: String(formData.get("title") ?? ""),
    description: String(formData.get("description") ?? ""),
    image_url: String(formData.get("image_url") ?? ""),
    gallery_urls: String(formData.get("gallery_urls") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    tags: String(formData.get("tags") ?? "")
      .split(",")
      .map((t) => t.trim())
      .filter(Boolean),
    time_spent: String(formData.get("time_spent") ?? ""),
    character_owner: String(formData.get("character_owner") ?? ""),
    character_url: String(formData.get("character_url") ?? ""),
    featured: formData.get("featured") === "on",
    status: String(formData.get("status") ?? "draft"),
  };
}

export async function createArtPieceAction(formData: FormData) {
  await createArtPiece(parseArtPieceFormData(formData));
  redirect("/admin");
}

export async function updateArtPieceAction(id: string, formData: FormData) {
  await updateArtPiece(id, parseArtPieceFormData(formData));
  redirect("/admin");
}

export async function deleteArtPieceAction(id: string) {
  await deleteArtPiece(id);
  redirect("/admin");
}
