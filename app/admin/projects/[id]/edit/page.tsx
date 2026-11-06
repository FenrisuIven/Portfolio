import { notFound } from "next/navigation";
import { getProjectById } from "@/features/projects/queries";
import { updateProjectAction, deleteProjectAction } from "@/features/projects/actions";

export default async function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const project = await getProjectById(id);

  if (!project) notFound();

  const updateAction = updateProjectAction.bind(null, id);
  const deleteAction = deleteProjectAction.bind(null, id);

  return (
    <>
      <form action={updateAction}>
        <label>
          Slug
          <input type="text" name="slug" defaultValue={project.slug} required />
        </label>
        <label>
          Title
          <input type="text" name="title" defaultValue={project.title} required />
        </label>
        <label>
          Summary
          <textarea name="summary" defaultValue={project.summary} required />
        </label>
        <label>
          Description
          <textarea name="description" defaultValue={project.description} required />
        </label>
        <label>
          What I learned
          <textarea
            name="what_i_learned"
            defaultValue={project.what_i_learned}
            required
          />
        </label>
        <label>
          Tech tags (comma separated)
          <input
            type="text"
            name="tech_tags"
            defaultValue={project.tech_tags.join(", ")}
          />
        </label>
        <label>
          GitHub URL
          <input type="text" name="github_url" defaultValue={project.github_url ?? ""} />
        </label>
        <label>
          Live URL
          <input type="text" name="live_url" defaultValue={project.live_url ?? ""} />
        </label>
        <label>
          Cover image URL
          <input
            type="text"
            name="cover_image_url"
            defaultValue={project.cover_image_url}
            required
          />
        </label>
        <label>
          Featured
          <input type="checkbox" name="featured" defaultChecked={project.featured ?? false} />
        </label>
        <label>
          Status
          <select name="status" defaultValue={project.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <button type="submit">Save changes</button>
      </form>

      <form action={deleteAction}>
        <button type="submit">Delete project</button>
      </form>
    </>
  );
}
