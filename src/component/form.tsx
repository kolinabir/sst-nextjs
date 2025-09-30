"use client";

import { useState } from "react";
import styles from "./form.module.css";

export default function Form({ url }: { url: string }) {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadComplete, setUploadComplete] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUploading(true);
    setUploadComplete(false);

    const file = (e.target as HTMLFormElement).file.files?.[0];

    if (!file) {
      setIsUploading(false);
      return;
    }

    if (!url) {
      console.error("No pre-signed URL provided");
      setIsUploading(false);
      return;
    }

    console.log("Starting upload...");
    console.log("Pre-signed URL:", url);
    console.log("File:", file.name, file.size, file.type);

    try {
      const response = await fetch(url, {
        body: file,
        method: "PUT",
        headers: {
          "Content-Type": file.type,
          "Content-Disposition": `attachment; filename="${file.name}"`,
        },
      });

      console.log("Upload response status:", response.status);
      console.log("Upload response headers:", response.headers);

      if (response.ok) {
        setUploadComplete(true);
        console.log("Upload successful!");

        // Refresh the page after a short delay to show the new image
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        console.error("Upload failed with status:", response.status);
        setIsUploading(false);
      }
    } catch (error) {
      console.error("Upload failed:", error);
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* File Input */}
        <div className="relative">
          <input
            name="file"
            type="file"
            accept="image/png,image/jpeg,image/gif,image/webp"
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-3 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 transition-colors"
            required
          />
        </div>

        {/* Upload Button */}
        <button
          type="submit"
          disabled={isUploading}
          className={`w-full py-4 px-6 rounded-xl font-semibold text-white text-lg transition-all duration-300 ${
            isUploading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:shadow-lg transform hover:scale-105"
          }`}
        >
          {isUploading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-3"></div>
              Uploading...
            </div>
          ) : (
            "🚀 Upload Image"
          )}
        </button>

        {/* Success Message */}
        {uploadComplete && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center">
            ✅ Upload successful! Refreshing...
          </div>
        )}

        {/* File Requirements */}
        <div className="text-center text-sm text-gray-500">
          <p>Supported formats: PNG, JPEG, GIF, WebP</p>
          <p>Maximum file size: 10MB</p>
        </div>
      </form>
    </div>
  );
}
