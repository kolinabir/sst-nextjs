import { Resource } from "sst";
import Form from "@/component/form";
import ImageGallery from "@/component/image-gallery";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import {
  S3Client,
  PutObjectCommand,
  ListObjectsV2Command,
  GetObjectCommand,
} from "@aws-sdk/client-s3";

export const dynamic = "force-dynamic";

export default async function Home() {
  const command = new PutObjectCommand({
    Key: crypto.randomUUID(),
    Bucket: Resource.MyBucket.name,
  });

  let url: string;
  try {
    url = await getSignedUrl(new S3Client({}), command);
    console.log("Generated pre-signed URL:", url);
  } catch (error) {
    console.error("Failed to generate pre-signed URL:", error);
    throw error;
  }

  // List existing images in the bucket and generate signed URLs
  const listCommand = new ListObjectsV2Command({
    Bucket: Resource.MyBucket.name,
  });

  let imagesWithUrls = [];
  try {
    const s3Client = new S3Client({});
    const response = await s3Client.send(listCommand);
    const imageObjects =
      response.Contents?.filter(
        (obj) => obj.Key && /\.(jpg|jpeg|png|gif|webp)$/i.test(obj.Key)
      ).slice(0, 20) || []; // Show last 20 images

    // Generate signed URLs for each image
    imagesWithUrls = await Promise.all(
      imageObjects.map(async (obj) => {
        const getCommand = new GetObjectCommand({
          Bucket: Resource.MyBucket.name,
          Key: obj.Key,
        });
        const imageUrl = await getSignedUrl(s3Client, getCommand, {
          expiresIn: 3600, // URL expires in 1 hour
        });

        return {
          key: obj.Key,
          url: imageUrl,
          size: obj.Size,
          lastModified: obj.LastModified,
        };
      })
    );
  } catch (error) {
    console.error("Error listing images:", error);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            📸 Image Gallery
          </h1>
          <p className="text-gray-600 text-lg">
            Upload and share your images instantly
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-12">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🚀 Upload New Image
          </h2>
          <Form url={url} />
        </div>

        {/* Gallery Section */}
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
            🖼️ Your Images ({imagesWithUrls.length})
          </h2>
          <ImageGallery images={imagesWithUrls} />
        </div>
      </div>
    </div>
  );
}
