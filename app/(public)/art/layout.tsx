import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Fenrisuiven",
  },
};

export default function ArtLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
