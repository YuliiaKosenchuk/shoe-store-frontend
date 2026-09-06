import NextImage, { type ImageProps } from "next/image";

/**
 * Temporary drop-in replacement for next/image for local /public assets.
 *
 * Vercel's Image Optimization quota (Hobby plan) is exhausted, so any
 * requested width/format combo that isn't already cached at the Edge
 * returns 402 instead of the image — this was originally only noticed on
 * Cloudinary-sourced images (see CloudinaryImage.tsx) but affects local
 * /public images through the same metered pipeline just as much.
 *
 * This wrapper forces `unoptimized`, so these images are served directly
 * from /public without going through `/_next/image` at all — no resizing
 * or format conversion, but also no dependency on Vercel's quota.
 *
 * Revert: once the Vercel quota resets (or the plan changes), swap the
 * `{ UnoptimizedImage as Image }` import back to `next/image` in the files
 * that use this. See CLOUDINARY_IMAGE_OPTIMIZATION.md for the full list.
 */
export function UnoptimizedImage(props: ImageProps) {
  return <NextImage {...props} unoptimized />;
}
