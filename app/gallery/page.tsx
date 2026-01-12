"use client";
import { title } from "@/components/primitives";
import { Card, CardBody } from "@heroui/react";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

interface CloudinaryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
}

export default function GalleryPage() {
  const [images, setImages] = useState<CloudinaryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const response = await fetch("/api/gallery");
        if (!response.ok) {
          throw new Error("Failed to fetch images");
        }
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
      <div className="w-full px-4 py-8 text-center">
        <h1 className={title()}></h1>
        <p className="mt-4">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full px-4 py-8 text-center">
        <h1 className={title()}></h1>
        <p className="mt-4 text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="w-full px-4 py-8 text-center">
      <h1 className={title()}></h1>

      {images.length === 0 ? (
        <p className="mt-4">No images found in the gallery.</p>
      ) : (
        <div className="grid w-full grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-8">
          {images.map((image) => (
            <Card
              key={image.id}
              isPressable
              isHoverable
              className="w-full aspect-square"
            >
              <CardBody className="p-0 overflow-hidden w-full h-full">
                <CldImage
                  width="960"
                  height="600"
                  src={image.id}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  alt={`Gallery image ${image.id}`}
                  className="w-full h-full object-cover transition-transform hover:scale-105"
                />
              </CardBody>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
