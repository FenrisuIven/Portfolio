"use client";

import { useState } from "react";

export default function ImageUploadField({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue?: string;
}) {
  const [url, setUrl] = useState(defaultValue ?? "");
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append("file", file);

      const res = await fetch("/api/upload", { method: "POST", body: formData });
      const data = await res.json();

      if (!res.ok || !data.url) {
        setError(data.error ?? "Upload failed");
      } else {
        setUrl(data.url);
      }
    } catch {
      setError("Upload failed");
    } finally {
      setUploading(false);
    }
  }

  return (
    <div>
      <input type="hidden" name={name} value={url} />
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {uploading && <span>Uploading...</span>}
      {error && <span>{error}</span>}
      {url && !uploading && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={url} alt="" style={{ maxWidth: 200, display: "block" }} />
      )}
    </div>
  );
}
