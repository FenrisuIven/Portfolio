import type { InferSelectModel, InferInsertModel } from "drizzle-orm";
import { artPiecesTable } from "@/db/schema";

export type ArtPiece = InferSelectModel<typeof artPiecesTable>;
export type NewArtPiece = InferInsertModel<typeof artPiecesTable>;
