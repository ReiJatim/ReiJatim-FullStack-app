import { v4 as uuidv4 } from "uuid";
import { v2 as cloudinary } from "cloudinary";

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Cache for uploaded image URLs
const uploadCache = new Map<string, string>();

// Function to upload a base64 image to Cloudinary
const uploadBase64Image = async (base64String: string): Promise<string> => {
  try {
    // Check if the image has already been uploaded
    if (uploadCache.has(base64String)) {
      return uploadCache.get(base64String)!;
    }

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(base64String, {
      folder: "editor_images",
      public_id: `image_${uuidv4()}`,
      transformation: [{ width: 800, height: 600, crop: "limit" }], // Resize to limit dimensions
    });

    // Cache the result
    uploadCache.set(base64String, result.secure_url);

    return result.secure_url;
  } catch (error) {
    console.error("Cloudinary upload error:", error);
    throw new Error("Failed to upload image to Cloudinary");
  }
};

// Function to process content and replace base64 images with Cloudinary URLs
export const processContent = async (content: any[]): Promise<void> => {
  const uploadPromises: Promise<void>[] = [];

  const traverseAndProcess = (nodes: any[]) => {
    for (const node of nodes) {
      if (node.type === "image" && node.attrs?.src?.startsWith("data:image")) {
        // Add an upload promise to the array
        uploadPromises.push(
          (async () => {
            const imageUrl = await uploadBase64Image(node.attrs.src);
            node.attrs.src = imageUrl; // Replace base64 src with Cloudinary URL
          })()
        );
      }

      if (node.content && Array.isArray(node.content)) {
        traverseAndProcess(node.content); // Traverse child nodes
      }
    }
  };

  traverseAndProcess(content);
  await Promise.all(uploadPromises); // Wait for all uploads to complete
};
