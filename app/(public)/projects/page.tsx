import type { Metadata } from "next";
import Link from "next/link";
import { getPublishedProjects } from "@/features/projects/queries";

export const metadata: Metadata = {
  title: "Projects",
  description: "TODO: replace with a real description of the projects section.",
};

export default async function ProjectsPage() {
  const projects = await getPublishedProjects();

  return (
    <ul>
      {projects.map((project) => (
        <li key={project.id}>
          <Link href={`/projects/${project.slug}`}>
            <h2>{project.title}</h2>
            <p>{project.summary}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
