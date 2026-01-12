import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function GET() {
  try {
    // Fetch all images (remove prefix to get all images, or specify a folder if needed)
    const result = await cloudinary.api.resources({
      type: "upload",
      // prefix: "test-gallery", // Uncomment and set if images are in a specific folder
      max_results: 500, // Adjust as needed
    });

    // Extract the public IDs and other useful info
    const images = result.resources.map((resource: any) => ({
      id: resource.public_id,
      url: resource.secure_url,
      width: resource.width,
      height: resource.height,
      format: resource.format,
    }));

    return NextResponse.json({ images });
  } catch (error) {
    console.error("Error fetching images from Cloudinary:", error);
    return NextResponse.json(
      { error: "Failed to fetch images" },
      { status: 500 }
    );
  }
}
