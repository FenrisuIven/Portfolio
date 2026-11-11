"use server";

import { redirect } from "next/navigation";
import { uploadImage } from "@/lib/cloudinary";
import { sendContactEmail } from "@/lib/email";
import { contactSchema } from "./validation";

export async function submitContactAction(formData: FormData) {
  const data = contactSchema.parse({
    name: formData.get("name"),
    email: formData.get("email"),
    discord: formData.get("discord"),
    idea: formData.get("idea"),
  });

  const files = formData
    .getAll("images")
    .filter((f): f is File => f instanceof File && f.size > 0);

  const imageUrls = await Promise.all(
    files.map(async (file) => {
      const buffer = Buffer.from(await file.arrayBuffer());
      return uploadImage(buffer);
    })
  );

  await sendContactEmail({ ...data, imageUrls });

  redirect("/contact?sent=1");
}
