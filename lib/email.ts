import { Resend } from "resend";

export async function sendContactEmail({
  name,
  email,
  discord,
  idea,
  imageUrls,
}: {
  name: string;
  email: string;
  discord?: string;
  idea: string;
  imageUrls: string[];
}) {
  const resend = new Resend(process.env.RESEND_API_KEY);

  const imagesHtml = imageUrls
    .map((url) => `<img src="${url}" style="max-width: 400px; display: block; margin-bottom: 8px;" />`)
    .join("");

  await resend.emails.send({
    from: "Portfolio Contact Form <onboarding@resend.dev>",
    to: process.env.CONTACT_TO_EMAIL as string,
    replyTo: email,
    subject: `New contact request from ${name}`,
    html: `
      <p><strong>From:</strong> ${name} (${email})</p>
      ${discord ? `<p><strong>Discord:</strong> ${discord}</p>` : ""}
      <p>${idea}</p>
      ${imagesHtml}
    `,
  });
}
