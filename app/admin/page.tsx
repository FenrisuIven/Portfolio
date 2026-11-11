import Link from "next/link";
import { getAllProjects } from "@/features/projects/queries";
import { getAllArtPieces } from "@/features/art/queries";
import { moveProjectAction } from "@/features/projects/actions";
import { moveArtPieceAction } from "@/features/art/actions";

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
          {projects.map((project, i) => (
            <li key={project.id}>
              {project.title} ({project.status})
              <Link href={`/admin/projects/${project.id}/edit`}>Edit</Link>
              <form action={moveProjectAction.bind(null, project.id, "up")} style={{ display: "inline" }}>
                <button type="submit" disabled={i === 0}>Up</button>
              </form>
              <form action={moveProjectAction.bind(null, project.id, "down")} style={{ display: "inline" }}>
                <button type="submit" disabled={i === projects.length - 1}>Down</button>
              </form>
            </li>
          ))}
        </ul>
      </section>

      <section>
        <h2>Art</h2>
        <Link href="/admin/art/new">New art piece</Link>
        <ul>
          {artPieces.map((piece, i) => (
            <li key={piece.id}>
              {piece.title} ({piece.status})
              <Link href={`/admin/art/${piece.id}/edit`}>Edit</Link>
              <form action={moveArtPieceAction.bind(null, piece.id, "up")} style={{ display: "inline" }}>
                <button type="submit" disabled={i === 0}>Up</button>
              </form>
              <form action={moveArtPieceAction.bind(null, piece.id, "down")} style={{ display: "inline" }}>
                <button type="submit" disabled={i === artPieces.length - 1}>Down</button>
              </form>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
