---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-video-upload
    title: Upload a Product Video
    description: Multipart upload of a single product video. Allowed types — mp4, webm, ogg, mov.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/videos" \
        -H "Authorization: Bearer <token>" \
        -F "video=@/path/to/clip.mp4" \
        -F "position=1"
    variables: |
      multipart/form-data:
        video: <binary file>
        position: 1
    response: |
      {
        "id": 8,
        "productId": 12,
        "path": "product/12/xyz789.mp4",
        "position": 1,
        "url": "/storage/product/12/xyz789.mp4"
      }
---

# Product Videos — Upload

Uploads a new video for the given product.

::: warning REST only — GraphQL upload not supported
Binary file parts are **not transportable over JSON GraphQL.** The GraphQL `createAdminCatalogProductVideo` mutation exists as a placeholder only and rejects with 422. Use this REST endpoint for video upload.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/videos` | POST |

## Content type

`multipart/form-data` — required.

## Form fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `video` | file | yes | One of mp4, webm, ogg, mov (max 100 MB). |
| `position` | integer | no | Sort position; appended to the end if omitted. |

## Response

`201 Created`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | New `product_videos.id`. |
| `productId` | integer | Parent product ID (echoed). |
| `path` | string | Storage-relative file path. |
| `position` | integer | Sort position. |
| `url` | string | Public URL. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Missing file, invalid type, or oversized payload. |
