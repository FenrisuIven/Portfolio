import { asc, eq } from "drizzle-orm";
import { db } from "@/db";
import { artPiecesTable } from "@/db/schema";

export function getAllArtPieces() {
  return db
    .select()
    .from(artPiecesTable)
    .orderBy(asc(artPiecesTable.sort_order));
}

export function getPublishedArtPieces() {
  return db
    .select()
    .from(artPiecesTable)
    .where(eq(artPiecesTable.status, "published"))
    .orderBy(asc(artPiecesTable.sort_order));
}

export async function getArtPieceById(id: string) {
  const [piece] = await db
    .select()
    .from(artPiecesTable)
    .where(eq(artPiecesTable.id, id));

  return piece;
}

export async function getPublishedArtPieceBySlug(slug: string) {
  const [piece] = await db
    .select()
    .from(artPiecesTable)
    .where(eq(artPiecesTable.slug, slug));

  if (!piece || piece.status !== "published") return undefined;
  return piece;
}
