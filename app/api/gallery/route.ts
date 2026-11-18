import { NextRequest, NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

import { getClientIp, rateLimit, tooManyRequests } from "@/lib/rate-limit";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface GalleryImage {
  id: string;
  url: string;
  width: number;
  height: number;
  format: string;
  alt: string | null;
}

// Cloudinary's Admin API is limited (~500 calls/hour), so the image list is
// fetched at most once per CACHE_TTL_MS and shared by every visitor.
const CACHE_TTL_MS = 10 * 60 * 1000;
let cache: { images: GalleryImage[]; fetchedAt: number } | null = null;
let inFlight: Promise<GalleryImage[]> | null = null;

async function fetchImages(): Promise<GalleryImage[]> {
  const result = await cloudinary.api.resources({
    type: "upload",
    // prefix: "test-gallery", // Uncomment and set if images are in a specific folder
    max_results: 500, // Adjust as needed
    context: true, // includes the "Description (alt)" set in the Cloudinary Media Library
  });

  return result.resources.map((resource: any) => ({
    id: resource.public_id,
    url: resource.secure_url,
    width: resource.width,
    height: resource.height,
    format: resource.format,
    alt: resource.context?.custom?.alt || resource.context?.custom?.caption || null,
  }));
}

async function getImages(): Promise<GalleryImage[]> {
  if (cache && Date.now() - cache.fetchedAt < CACHE_TTL_MS) return cache.images;

  // Several visitors arriving at once share a single Cloudinary call
  inFlight ??= fetchImages()
    .then((images) => {
      cache = { images, fetchedAt: Date.now() };

      return images;
    })
    .finally(() => {
      inFlight = null;
    });

  try {
    return await inFlight;
  } catch (error) {
    // If Cloudinary is down or rate limited, keep serving the last good list
    if (cache) {
      console.warn("Cloudinary fetch failed, serving cached gallery:", error);

      return cache.images;
    }
    throw error;
  }
}

export async function GET(request: NextRequest) {
  const limit = rateLimit(
    { name: "gallery-ip", limit: 30, windowMs: 60 * 1000 },
    getClientIp(request),
  );

  if (!limit.ok) return tooManyRequests(limit.retryAfter);

  try {
    const images = await getImages();

    return NextResponse.json(
      { images },
      { headers: { "Cache-Control": "public, max-age=300, s-maxage=600" } },
    );
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);

    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
