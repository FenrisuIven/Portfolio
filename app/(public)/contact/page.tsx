import type { Metadata } from "next";
import { submitContactAction } from "@/features/contact/actions";

export const metadata: Metadata = {
  title: "Contact",
  description: "TODO: replace with a real description of the contact page.",
};

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ sent?: string }>;
}) {
  const { sent } = await searchParams;

  if (sent === "1") {
    return <p>Thanks! Your message has been sent.</p>;
  }

  return (
    <form action={submitContactAction}>
      <label>
        Name
        <input type="text" name="name" required />
      </label>
      <label>
        Email
        <input type="email" name="email" required />
      </label>
      <label>
        Discord username
        <input type="text" name="discord" />
      </label>
      <label>
        Idea
        <textarea name="idea" required />
      </label>
      <label>
        Reference images
        <input type="file" name="images" accept="image/*" multiple />
      </label>
      <button type="submit">Send</button>
    </form>
  );
}
