import { v2 as cloudinary } from "cloudinary";
import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { GalleryCreateTypeInput } from "@/lib/types";
import { createGallery, getGallery } from "@/db/models/gallery";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const limit = limitParam ? parseInt(limitParam, 10) : undefined;

    if (limit && isNaN(limit)) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }

    const galleries = await getGallery(limit);

    return NextResponse.json({
      message: "Galleries fetched successfully",
      data: galleries,
    });
  } catch (error) {
    console.error("Error fetching galleries:", error);
    return NextResponse.json(
      { error: "Failed to fetch galleries" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
  const gallerySchema = z.object({
    title: z.string().min(1, "Title is required"),
    description: z.string().min(1, "Description is required"),
    location: z.string().min(1, "Location is required"),
    imageFiles: z
      .array(z.instanceof(File))
      .nonempty("At least one image is required"),
  });
  try {
    const formData = await request.formData();

    const title = formData.get("title")?.toString() ?? "";
    const description = formData.get("description")?.toString() ?? "";
    const location = formData.get("location")?.toString() ?? "";
    const imageFiles: File[] = Array.from(formData.getAll("images")) as File[];

    // Validate input using Zod
    const validationResult = gallerySchema.safeParse({
      title,
      description,
      location,
      imageFiles,
    });

    if (!validationResult.success) {
      const errors = validationResult.error.format();
      console.log("Validation errors:", errors);
      return NextResponse.json(
        { error: "Validation failed", details: errors },
        { status: 400 }
      );
    }

    // Upload images to Cloudinary
    const imageUploadPromises = imageFiles.map(async (file) => {
      const arrayBuffer = await file.arrayBuffer();
      const buffer = Buffer.from(arrayBuffer);

      return new Promise<string>((resolve, reject) => {
        const uploadStream = cloudinary.uploader.upload_stream(
          { folder: "gallery" },
          (error, result) => {
            if (error) reject(error);
            if (result) resolve(result.secure_url);
          }
        );

        const stream = require("stream");
        const readableStream = new stream.PassThrough();
        readableStream.end(buffer);
        readableStream.pipe(uploadStream);
      });
    });

    const uploadedImages = await Promise.all(imageUploadPromises);

    // Create gallery record in the database
    const galleryData: GalleryCreateTypeInput = {
      title,
      description,
      location,
      image: uploadedImages,
      thumbnail: uploadedImages[0], // Use the first image as the thumbnail
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    const result = await createGallery(galleryData);

    return NextResponse.json({
      message: "Gallery created successfully",
      result,
    });
  } catch (error) {
    console.error(error);
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    } else {
      return NextResponse.json(
        { error: "Internal Server Error" },
        { status: 500 }
      );
    }
  }
}
