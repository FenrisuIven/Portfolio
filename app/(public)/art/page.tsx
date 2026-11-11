import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedArtPieces } from "@/features/art/queries";

export const metadata: Metadata = {
  title: { absolute: "Art — Fenrisuiven" },
  description: "TODO: replace with a real description of the art section.",
};

export default async function ArtHomePage() {
  const artPieces = await getPublishedArtPieces();

  return (
    <ul>
      {artPieces.map((piece) => (
        <li key={piece.id}>
          <Link href={`/art/${piece.slug}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={piece.image_url} alt={piece.title} />
            <h2>{piece.title}</h2>
          </Link>
        </li>
      ))}
    </ul>
  );
}
