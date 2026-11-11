import { notFound } from "next/navigation";
import { getPublishedProjectBySlug } from "@/features/projects/queries";

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getPublishedProjectBySlug(slug);

  if (!project) notFound();

  return (
    <article>
      <h1>{project.title}</h1>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={project.cover_image_url} alt={project.title} />

      <p>{project.description}</p>

      <ul>
        {project.tech_tags.map((tag) => (
          <li key={tag}>{tag}</li>
        ))}
      </ul>

      {project.gallery_urls && project.gallery_urls.length > 0 && (
        <div>
          {project.gallery_urls.map((url) => (
            // eslint-disable-next-line @next/next/no-img-element
            <img key={url} src={url} alt="" />
          ))}
        </div>
      )}

      <section>
        <h2>What I learned</h2>
        <p>{project.what_i_learned}</p>
      </section>

      <nav>
        {project.github_url && <a href={project.github_url}>GitHub</a>}
        {project.live_url && <a href={project.live_url}>Live demo</a>}
      </nav>
    </article>
  );
}
