# Danzig Family Resource Center — Media Organization

Place new authentic Danzig community media in the folders below:

- **Photos & Video Posters**: `public/media/images/`
  - Referenced in code as `/media/images/<filename>`
  - Recommended formats: WebP or JPEG (keep dimensions reasonable, e.g., ≤ 1600px on the longest edge, to ensure fast loading)
- **Videos**: `public/media/videos/`
  - Referenced in code as `/media/videos/<filename>`
  - Recommended format: MP4 (H.264/AAC) with `faststart` web optimization
  - Provide a matching poster image in `public/media/images/` whenever available so the gallery grid loads a lightweight optimized thumbnail instead of fetching video data upfront

## Backward Compatibility

Existing authentic Danzig photos in `public/images/` remain fully supported and do not need to be moved.

## Adding Items to the Gallery

Add new image or video entries to `GALLERY_ITEMS` in `src/data/site-data.ts`:

```ts
// Photo item
{
  type: "image",
  src: "/media/images/example-photo.jpg",
  alt: "Descriptive accessible alt text",
  width: 1600,
  height: 1200,
  caption: "Optional caption shown in the lightbox",
}

// Video item
{
  type: "video",
  src: "/media/videos/example-video.mp4",
  poster: "/media/images/example-video-poster.jpg", // optional but recommended
  title: "Community Event Highlight",
  caption: "Optional caption shown in the lightbox",
}
```
