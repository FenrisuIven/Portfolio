import type { Metadata } from "next";
import { getSiteSettings } from "@/features/settings/queries";
import { toEmbeddableUrl } from "@/lib/drive-embed";

export const metadata: Metadata = {
  title: "Resume",
  description: "TODO: replace with a real description of the resume page.",
};

export default async function ResumePage() {
  const settings = await getSiteSettings();
  const resumeUrl = settings?.resume_url;

  if (!resumeUrl) {
    return <p>Resume not set up yet.</p>;
  }

  return (
    <>
      <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
        Open resume
      </a>
      <iframe
        src={toEmbeddableUrl(resumeUrl)}
        title="Resume"
        style={{ width: "100%", height: "100vh", border: "none" }}
      />
    </>
  );
}
