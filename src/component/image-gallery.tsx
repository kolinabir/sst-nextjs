"use client";

import { useState } from "react";

interface ImageObject {
  key?: string;
  url?: string;
  size?: number;
  lastModified?: Date;
}

interface ImageGalleryProps {
  images: ImageObject[];
}

export default function ImageGallery({ images }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState<ImageObject | null>(null);

  if (images.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-6xl mb-4">📷</div>
        <p className="text-gray-500 text-lg">No images uploaded yet</p>
        <p className="text-gray-400 text-sm mt-2">
          Upload your first image above!
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {images.map((image, index) => (
          <div
            key={image.key || index}
            className="group relative bg-gray-100 rounded-lg overflow-hidden cursor-pointer hover:shadow-lg transition-all duration-300 hover:scale-105"
            onClick={() => setSelectedImage(image)}
          >
            {/* Actual image */}
            {image.url ? (
              <img
                src={image.url}
                alt={image.key?.split("/").pop() || "Uploaded image"}
                className="w-full h-48 object-cover"
                onError={(e) => {
                  // Fallback to placeholder if image fails to load
                  (e.target as HTMLImageElement).style.display = "none";
                  (
                    e.target as HTMLImageElement
                  ).nextElementSibling?.classList.remove("hidden");
                }}
              />
            ) : null}

            {/* Fallback placeholder */}
            <div
              className={`aspect-square bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center ${
                image.url ? "hidden" : ""
              }`}
            >
              <div className="text-white text-4xl">🖼️</div>
            </div>

            {/* Overlay with filename */}
            <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-end">
              <div className="p-3 w-full">
                <p className="text-white text-sm font-medium truncate opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.key?.split("/").pop()}
                </p>
                <p className="text-white text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {image.size ? (image.size / 1024 / 1024).toFixed(2) : 0} MB
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Modal for selected image */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4"
          onClick={() => setSelectedImage(null)}
        >
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">
                Image Details
              </h3>
              <button
                onClick={() => setSelectedImage(null)}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ×
              </button>
            </div>

            <div className="mb-4">
              {selectedImage.url ? (
                <img
                  src={selectedImage.url}
                  alt={selectedImage.key?.split("/").pop()}
                  className="w-full max-h-96 object-contain rounded-lg"
                />
              ) : (
                <div className="bg-gray-100 rounded-lg p-8 text-center">
                  <div className="text-6xl mb-4">🖼️</div>
                  <p className="text-gray-600 font-medium">
                    {selectedImage.key?.split("/").pop()}
                  </p>
                </div>
              )}
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                className="bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors"
                onClick={() => {
                  if (selectedImage.url) {
                    window.open(selectedImage.url, "_blank");
                  }
                }}
              >
                View Full Size
              </button>
              <button
                className="bg-gray-200 text-gray-800 py-3 px-4 rounded-lg hover:bg-gray-300 transition-colors"
                onClick={() => {
                  if (selectedImage.url) {
                    navigator.clipboard.writeText(selectedImage.url);
                    // You could add a toast notification here
                  }
                }}
              >
                Copy URL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
