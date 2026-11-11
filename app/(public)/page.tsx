import Link from "next/link";
import { getPublishedProjects } from "@/features/projects/queries";
import { getPublishedArtPieces } from "@/features/art/queries";

export default async function PublicHomePage() {
  const [projects, artPieces] = await Promise.all([
    getPublishedProjects(),
    getPublishedArtPieces(),
  ]);

  const featuredProjects = projects.filter((p) => p.featured);
  const featuredArt = artPieces.filter((p) => p.featured);

  return (
    <>
      <section>
        <h2>Featured projects</h2>
        <ul>
          {featuredProjects.map((project) => (
            <li key={project.id}>
              <Link href={`/projects/${project.slug}`}>{project.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Featured art</h2>
        <ul>
          {featuredArt.map((piece) => (
            <li key={piece.id}>
              <Link href={`/art/${piece.slug}`}>{piece.title}</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
