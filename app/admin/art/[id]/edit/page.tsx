import { notFound } from "next/navigation";
import { getArtPieceById } from "@/features/art/queries";
import { updateArtPieceAction, deleteArtPieceAction } from "@/features/art/actions";
import ImageUploadField from "@/components/admin/image-upload-field";

export default async function EditArtPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const piece = await getArtPieceById(id);

  if (!piece) notFound();

  const updateAction = updateArtPieceAction.bind(null, id);
  const deleteAction = deleteArtPieceAction.bind(null, id);

  return (
    <>
      <form action={updateAction}>
        <label>
          Slug
          <input type="text" name="slug" defaultValue={piece.slug} required />
        </label>
        <label>
          Title
          <input type="text" name="title" defaultValue={piece.title} required />
        </label>
        <label>
          Description
          <textarea name="description" defaultValue={piece.description} required />
        </label>
        <label>
          Image
          <ImageUploadField name="image_url" defaultValue={piece.image_url} />
        </label>
        <label>
          Gallery URLs (comma separated)
          <input
            type="text"
            name="gallery_urls"
            defaultValue={(piece.gallery_urls ?? []).join(", ")}
          />
        </label>
        <label>
          Tags (comma separated)
          <input type="text" name="tags" defaultValue={(piece.tags ?? []).join(", ")} />
        </label>
        <label>
          Time spent
          <input type="text" name="time_spent" defaultValue={piece.time_spent ?? ""} />
        </label>
        <label>
          Character owner
          <input
            type="text"
            name="character_owner"
            defaultValue={piece.character_owner ?? ""}
          />
        </label>
        <label>
          Character reference URL
          <input
            type="text"
            name="character_url"
            defaultValue={piece.character_url ?? ""}
          />
        </label>
        <label>
          Featured
          <input type="checkbox" name="featured" defaultChecked={piece.featured ?? false} />
        </label>
        <label>
          Status
          <select name="status" defaultValue={piece.status ?? "draft"}>
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </label>
        <button type="submit">Save changes</button>
      </form>

      <form action={deleteAction}>
        <button type="submit">Delete art piece</button>
      </form>
    </>
  );
}
