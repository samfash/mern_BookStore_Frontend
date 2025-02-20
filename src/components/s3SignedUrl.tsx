import React, { useState, useEffect } from "react";
import { getSignedUrl } from "../services/bookService.ts"; // Function to fetch signed URLs

interface SignedImageProps {
  s3Url: string; // The URL or key from S3
  alt?: string; // Optional alt text for the image
  className?: string; // Optional CSS classes for styling
}

const SignedImage: React.FC<SignedImageProps> = ({ s3Url, alt, className }) => {
  const [signedUrl, setSignedUrl] = useState<string | null>(null); // Signed URL state
  const [isLoading, setIsLoading] = useState<boolean>(true); // Loading state
  const [hasError, setHasError] = useState<boolean>(false); // Error state

  useEffect(() => {
    const fetchSignedUrl = async () => {
      try {
        setIsLoading(true);
        setHasError(false);

        const fileKey = s3Url.split("/").pop(); // Extract key from URL
        if (!fileKey) throw new Error("Invalid S3 URL format.");

        const url = await getSignedUrl(fileKey); // Fetch signed URL
        setSignedUrl(url); // Update signed URL state
      } catch (error) {
        console.error("Error fetching signed URL:", error);
        setHasError(true); // Set error state if fetch fails
      } finally {
        setIsLoading(false); // Reset loading state
      }
    };

    fetchSignedUrl();
  }, [s3Url]); // Re-run if `s3Url` changes

  if (isLoading) {
    return <div className="skeleton-loader">Loading...</div>; // Placeholder during loading
  }

  if (hasError) {
    return <div className="error-text">Failed to load image</div>; // Show error message
  }

  return (
    <img
      src={signedUrl || ""}
      alt={alt || "Signed Image"}
      className={className || "w-full h-auto"}
    />
  );
};

export default SignedImage;
