import { createArtPieceAction } from "@/features/art/actions";
import ImageUploadField from "@/components/admin/image-upload-field";

export default function NewArtPage() {
  return (
    <form action={createArtPieceAction}>
      <label>
        Slug
        <input type="text" name="slug" required />
      </label>
      <label>
        Title
        <input type="text" name="title" required />
      </label>
      <label>
        Description
        <textarea name="description" required />
      </label>
      <label>
        Image
        <ImageUploadField name="image_url" />
      </label>
      <label>
        Gallery URLs (comma separated)
        <input type="text" name="gallery_urls" />
      </label>
      <label>
        Tags (comma separated)
        <input type="text" name="tags" />
      </label>
      <label>
        Time spent
        <input type="text" name="time_spent" />
      </label>
      <label>
        Character owner
        <input type="text" name="character_owner" />
      </label>
      <label>
        Character reference URL
        <input type="text" name="character_url" />
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
      <button type="submit">Create art piece</button>
    </form>
  );
}
