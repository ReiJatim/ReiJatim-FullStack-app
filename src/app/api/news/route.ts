import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import {
  createNews,
  deleteNews,
  getNews,
  getRecentNews,
  getTrendingNews,
} from "@/db/models/News";
import { processContent } from "@/lib/processContent";

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const limitParam = searchParams.get("limit");
    const typeParam = searchParams.get("type"); // Get the "type" parameter
    const limit = limitParam ? parseInt(limitParam, 10) : 50;

    // Validate the limit parameter
    if (limitParam && (isNaN(limit) || limit < 0)) {
      return NextResponse.json(
        { error: "Invalid limit parameter" },
        { status: 400 }
      );
    }
    
    // Determine which news-fetching function to use based on the "type" parameter
    let news;
    if (typeParam === "recent") {
      news = await getRecentNews(limit);
    } else if (typeParam === "trending") {
      news = await getTrendingNews(limit);
    } else {
      news = await getNews(limit); // Default to general news fetching
    }

    return NextResponse.json({
      message: "News fetched successfully",
      data: news,
    });
  } catch (error) {
    console.error("Error fetching news:", error);
    return NextResponse.json(
      { error: "Failed to fetch news" },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Normalize `content` and process `tags`
    const normalizedContent =
      body.content?.type === "doc" && Array.isArray(body.content.content)
        ? body.content.content
        : [];
    const tags =
      typeof body.tag === "string"
        ? body.tag
            .split(",")
            .map((tag: string) => tag.trim())
            .filter(Boolean)
        : [];

    // Define validation schema
    const contentNodeSchema = z.object({
      type: z.string(),
      attrs: z.record(z.any()).optional(),
      content: z.array(z.any()).optional(),
    });

    const schema = z.object({
      title: z.string().min(1, "Title is required"),
      description: z.string().min(1, "Description is required"),
      content: z.array(contentNodeSchema).min(1, "Content cannot be empty"),
      tag: z.array(z.string()).optional(),
    });

    // Validate incoming data
    const validatedData = schema.parse({
      title: body.title,
      description: body.description,
      content: normalizedContent,
      tag: tags,
    });

    const { title, description, content } = validatedData;

    // Find the first image URL from the content
    let thumbnail: string | undefined;
    for (const node of content) {
      if (node.type === "image" && node.attrs?.src) {
        thumbnail = node.attrs.src; // Take the first image as the thumbnail
        break;
      }
    }

    // Fallback for thumbnail if no image is present
    if (!thumbnail) {
      thumbnail = "https://via.placeholder.com/300"; // Replace with your fallback thumbnail URL
    }

    // Process content nodes and save news entry concurrently
    await Promise.all([
      processContent(content), // Upload images and replace content
      createNews({ title, description, tag: tags, content, thumbnail }), // Save to DB
    ]);

    // Respond with success
    return NextResponse.json({
      success: true,
      message: "News created successfully",
      data: { title, description, tag: tags, content, thumbnail },
    });
  } catch (error) {
    console.error("Error creating news:", error);

    // Handle validation errors
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation failed", details: error.flatten() },
        { status: 400 }
      );
    }

    if (error instanceof Error)
      return NextResponse.json(
        {
          error: "Internal server error",
          details: error.message || "Unknown error",
        },
        { status: 500 }
      );
  }
}

export async function DELETE(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json(
      { message: 'Slug parameter is required' },
      { status: 400 }
    );
  }

  try {
    const result = await deleteNews(slug);

    if (!result) {
      return NextResponse.json(
        { message: 'News not found or deletion failed' },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { message: 'Successfully deleted the news' },
      { status: 200 }
    );
  } catch (error) {
    if(error instanceof Error)
    return NextResponse.json(
      { message: 'An error occurred while deleting the news', error: error.message },
      { status: 500 }
    );
  }
}
