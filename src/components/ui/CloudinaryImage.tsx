import NextImage, { type ImageLoaderProps, type ImageProps } from "next/image";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

/**
 * Cloudinary is used purely as file storage in this project — resizing and
 * format conversion should happen on Cloudinary's side, not through Vercel's
 * Image Optimization (which is metered on the Hobby plan). This loader turns
 * every requested width into a Cloudinary transformation URL instead of
 * letting next/image proxy the request through `/_next/image`.
 *
 * Handles both shapes seen in this codebase:
 *  - a full `secure_url` with a version segment, e.g.
 *    https://res.cloudinary.com/<cloud>/image/upload/v1784.../name.png
 *  - a bare `public_id`, e.g. "name" or "folder/name"
 */
function cloudinaryLoader({ src, width, quality }: ImageLoaderProps): string {
  const q = quality ? `q_${quality}` : "q_auto";
  const transforms = `f_auto,${q},c_limit,w_${width}`;

  if (src.includes("res.cloudinary.com") && src.includes("/upload/")) {
    return src.replace("/upload/", `/upload/${transforms}/`);
  }

  // Bare public_id — build the URL from scratch using the configured cloud name.
  const publicId = src.replace(/^\/+/, "");
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/${transforms}/${publicId}`;
}

/**
 * Drop-in replacement for next/image for any <Image> whose src comes from
 * Cloudinary. Keeps all normal next/image props (width, height, fill, sizes,
 * priority, className, ...) — only the loader changes, so no Vercel Image
 * Optimization transformations are consumed.
 */
export function CloudinaryImage(props: ImageProps) {
  return <NextImage {...props} loader={cloudinaryLoader} />;
}
