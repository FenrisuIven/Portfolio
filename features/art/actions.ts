"use server";

import { eq } from "drizzle-orm";
import { revalidatePath } from "next/cache";
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
