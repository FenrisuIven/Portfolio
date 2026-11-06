import Link from "next/link";
import { getAllProjects } from "@/features/projects/queries";
import { getAllArtPieces } from "@/features/art/queries";

export default async function AdminHomePage() {
  const [projects, artPieces] = await Promise.all([
    getAllProjects(),
    getAllArtPieces(),
  ]);

  return (
    <>
      <section>
        <h2>Projects</h2>
        <Link href="/admin/projects/new">New project</Link>
        <ul>
          {projects.map((project) => (
            <li key={project.id}>
              {project.title} ({project.status})
              <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Art</h2>
        <Link href="/admin/art/new">New art piece</Link>
        <ul>
          {artPieces.map((piece) => (
            <li key={piece.id}>
              {piece.title} ({piece.status})
              <Link href={`/admin/art/${piece.id}/edit`}>Edit</Link>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
