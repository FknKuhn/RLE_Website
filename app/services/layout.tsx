import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Services",
  description: "Trucking, hauling, excavation, crane, oil & gas, towing, dumpster and pilot car services from RLE Enterprises.",
};

export default function DocsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
      <div className="w-full text-center justify-center">
        {children}
      </div>
    </section>
  );
}
