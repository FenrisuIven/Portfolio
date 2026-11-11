/**
 * Converts a normal Google Drive share link (e.g. the "Anyone with the
 * link" URL from Drive's share dialog) into its /preview embed URL, which
 * is the format Drive actually supports inside an <iframe>. Non-Drive URLs
 * are returned unchanged.
 */
export function toEmbeddableUrl(url: string): string {
  const match = url.match(/drive\.google\.com\/(?:file\/d\/|open\?id=)([a-zA-Z0-9_-]+)/);
  if (!match) return url;

  const fileId = match[1];
  return `https://drive.google.com/file/d/${fileId}/preview`;
}
