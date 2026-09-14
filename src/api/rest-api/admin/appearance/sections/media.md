---
outline: false
apiType: rest
examples:
  - id: rest
    title: Upload Media
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/12/media" \
        -H "Authorization: Bearer <token>" \
        -F "file=@banner.webp"
    response: |
      {
        "sectionId": 12,
        "path": "storage/theme/12/8f2c1d4b.webp",
        "type": "image",
        "message": "Media uploaded successfully."
      }
  - id: rest-video
    title: Upload a Video
    query: |
      curl -X POST "https://your-domain.com/api/admin/appearance/sections/12/media" \
        -H "Authorization: Bearer <token>" \
        -F "file=@promo.mp4"
    response: |
      {
        "sectionId": 12,
        "path": "storage/theme/12/1a9e77c0.mp4",
        "type": "video",
        "message": "Media uploaded successfully."
      }
---

# Upload Media

Stores one image or video against a section and returns the path to record in its options. This endpoint is REST only — a binary upload cannot be carried over GraphQL.

Uploading does not change what the section shows. The file becomes part of the section when its path appears in the options sent to [Stage edits](/api/rest-api/admin/appearance/sections/draft) or [Update section](/api/rest-api/admin/appearance/sections/update).

## Endpoint

| Method | Path | Purpose |
|--------|------|---------|
| `POST` | `/api/admin/appearance/sections/{id}/media` | Upload media for a section |

Send as `multipart/form-data`.

## Path parameters

| Parameter | Description |
|-----------|-------------|
| `id` | Section the media belongs to. |

## Request body

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `file` | binary | Yes | The image or video to store. |

## Response fields

| Field | Type | Description |
|-------|------|-------------|
| `sectionId` | integer | Section the file was stored against. |
| `path` | string | Stored path to record in the section's options. |
| `type` | string | `image` or `video`, decided from the file itself. |
| `message` | string | Confirmation text. |

## Use cases

- **Add a slide to an image carousel** — upload, then stage options carrying the returned `path` alongside the slide's link and title.

## Best practices

- **Record the returned `path` verbatim.** It is the value the storefront resolves; rewriting or re-hosting it breaks the image.
- **Files nothing points at are cleaned up.** An upload whose path never reaches the section's published or staged options is removed when the section is next saved, so upload as part of an edit rather than in advance.
- **`type` is derived from the file, not from the section.** A video uploaded to an image carousel still returns `video`; it is up to the client to put the path in a field that accepts it.

## Errors

| Status | When |
|--------|------|
| `404` | No section with this ID. |
| `422` | No `file` part in the request. |

## Permissions

Requires `appearance.sections.edit`.
