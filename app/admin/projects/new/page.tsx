import { createProjectAction } from "@/features/projects/actions";

export default function NewProjectPage() {
  return (
    <form action={createProjectAction}>
      <label>
        Slug
        <input type="text" name="slug" required />
      </label>
      <label>
        Title
        <input type="text" name="title" required />
      </label>
      <label>
        Summary
        <textarea name="summary" required />
      </label>
      <label>
        Description
        <textarea name="description" required />
      </label>
      <label>
        What I learned
        <textarea name="what_i_learned" required />
      </label>
      <label>
        Tech tags (comma separated)
        <input type="text" name="tech_tags" />
      </label>
      <label>
        GitHub URL
        <input type="text" name="github_url" />
      </label>
      <label>
        Live URL
        <input type="text" name="live_url" />
      </label>
      <label>
        Cover image URL
        <input type="text" name="cover_image_url" required />
      </label>
      <label>
        Featured
        <input type="checkbox" name="featured" />
      </label>
      <label>
        Status
        <select name="status" defaultValue="draft">
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
      </label>
      <button type="submit">Create project</button>
    </form>
  );
}
