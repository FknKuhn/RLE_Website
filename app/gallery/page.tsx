"use client";
import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/modal";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

interface CloudinaryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
  alt: string | null;
}

// Falls back to a generic description when no alt text was set in Cloudinary
const describe = (image: CloudinaryImage, index: number) =>
  image.alt || `RLE Enterprises project photo ${index + 1}`;

export default function GalleryPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selected, setSelected] = useState<{ image: CloudinaryImage; alt: string } | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) throw new Error("Failed to fetch images");
        const data = await response.json();
        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : "An error occurred");
      } finally {
        setLoading(false);
      }
    }
    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="w-full px-4 py-8" aria-busy="true">
        <h1 className="text-4xl font-bold mb-8 text-center">Our Work</h1>
        <p className="sr-only" role="status">Loading photos…</p>
        <div aria-hidden="true" className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="break-inside-avoid mb-4 animate-pulse bg-[var(--bg-light)] rounded-xl"
              style={{ height: `${[220, 300, 260, 200, 340, 280, 220, 300, 260, 200, 340, 280][i]}px` }}
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <h1 className="text-4xl font-bold mb-4">Our Work</h1>
        <p className="mt-4 text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8">
      <h1 className="text-4xl font-bold mb-8 text-center">Our Work</h1>

      {images.length === 0 ? (
        <p className="text-center text-foreground/80">No images found in the gallery.</p>
      ) : (
        <div className="columns-1 sm:columns-2 lg:columns-3 xl:columns-4 gap-4">
          {images.map((image, i) => (
            <button
              key={image.id}
              type="button"
              aria-label={`View larger: ${describe(image, i)}`}
              className="block w-full break-inside-avoid mb-4 cursor-pointer group rounded-xl overflow-hidden focus:outline-none focus-visible:ring-4 focus-visible:ring-danger focus-visible:ring-offset-2"
              onClick={() => setSelected({ image, alt: describe(image, i) })}
            >
              <CldImage
                width="800"
                height="600"
                src={image.id}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                alt=""
                className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-105 rounded-xl"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      <Modal
        isOpen={!!selected}
        onClose={() => setSelected(null)}
        size="5xl"
        backdrop="blur"
        classNames={{
          base: "bg-[var(--bg-dark)]",
          closeButton: "text-foreground hover:bg-[var(--bg-light)]",
        }}
      >
        <ModalContent>
          <ModalHeader className="sr-only">{selected?.alt ?? "Photo"}</ModalHeader>
          <ModalBody className="p-2 flex items-center justify-center">
            {selected && (
              <CldImage
                width={selected.image.width || 1200}
                height={selected.image.height || 900}
                src={selected.image.id}
                alt={selected.alt}
                className="w-full h-auto max-h-[85vh] object-contain rounded-lg"
              />
            )}
          </ModalBody>
        </ModalContent>
      </Modal>
    </div>
  );
}
