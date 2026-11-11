import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getPublishedArtPieceBySlug } from "@/features/art/queries";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const piece = await getPublishedArtPieceBySlug(slug);

  if (!piece) return {};

  return {
    title: { absolute: `${piece.title} — Fenrisuiven` },
    description: piece.description,
    openGraph: {
      title: `${piece.title} — Fenrisuiven`,
      description: piece.description,
      images: [piece.image_url],
    },
  };
}

export default async function ArtPiecePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const piece = await getPublishedArtPieceBySlug(slug);

  if (!piece) notFound();

  return (
    <article>
      <h1>{piece.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={piece.image_url} alt={piece.title} />

      <p>{piece.description}</p>

      {piece.gallery_urls && piece.gallery_urls.length > 0 && (
        <div>
          {piece.gallery_urls.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="" />
          ))}
        </div>
      )}

      <ul>
        {(piece.tags ?? []).map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      {piece.time_spent && <p>Time spent: {piece.time_spent}</p>}

      {piece.character_owner && (
        <p>
          Character owned by: {piece.character_owner}
          {piece.character_url && <a href={piece.character_url}> (reference)</a>}
        </p>
      )}
    </article>
  );
}
