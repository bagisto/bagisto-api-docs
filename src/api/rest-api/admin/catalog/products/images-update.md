---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-image-update
    title: Update a Product Image
    description: Edit the alt text and the position of an already-uploaded image.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/12/images/47" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "alt_text": "Blue running shoe, side view",
          "position": 2
        }'
    variables: |
      {
        "alt_text": "Blue running shoe, side view",
        "position": 2
      }
    response: |
      {
        "id": 47,
        "productId": 12,
        "path": "product/12/abc123.webp",
        "position": 2,
        "url": "/storage/product/12/abc123.webp",
        "altText": "Blue running shoe, side view"
      }
    commonErrors:
      - error: Validation (422)
        cause: Neither an alt text nor a position was sent
        solution: Send at least one of the two fields
      - error: Not Found (404)
        cause: The image does not belong to `{productId}`, or the product does not exist
        solution: Verify both ids
---

# Product Images — Update

Edits what is stored alongside an uploaded image: its alt text and its position.

The file itself is fixed once uploaded — to replace the picture, [upload](/api/rest-api/admin/catalog/products/images-upload) a new one and [delete](/api/rest-api/admin/catalog/products/images-delete) this one.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{productId}/images/{id}` | PUT |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `alt_text` | string | no | Description of the image, stored for every locale the request covers. Send an empty string to clear it. |
| `position` | integer | no | Sort position within the product's gallery. |

At least one of the two is required — a request carrying neither is rejected.

## Alt text and locales

Alt text is translated: it is written for every locale the request covers, and read back for the locale the request is made in. The storefront returns it as `altText` on the product's images, and falls back to the product name where an image has none, so an image is never rendered without a description.

## Position and gallery order

Images are returned in position order, so this is what decides which picture is the product's main image — the lowest position wins, and that is the one the listing and the product card show. To rearrange several at once, use [reorder](/api/rest-api/admin/catalog/products/images-reorder) instead.

## Response

`200 OK`

| Field | Type | Notes |
|-------|------|-------|
| `id` | integer | Image id. |
| `productId` | integer | Parent product id. |
| `path` | string | Storage-relative file path. |
| `position` | integer | Sort position. |
| `url` | string | Public URL. |
| `altText` | string | Alt text stored for the current locale, or `null`. |

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found, or the image does not belong to it. |
| `422 Unprocessable Entity` | Neither an alt text nor a position was sent. |
