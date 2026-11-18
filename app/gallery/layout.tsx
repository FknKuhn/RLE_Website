import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Gallery",
  description: "Photos of RLE Enterprises equipment and projects.",
};

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full">
      {children}
    </section>
  );
}
