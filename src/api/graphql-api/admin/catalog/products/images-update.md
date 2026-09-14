---
outline: false
examples:
  - id: admin-catalog-product-image-update
    title: Update a Product Image
    description: Edit the alt text and the position of an already-uploaded image.
    query: |
      mutation UpdateImage($input: updateAdminCatalogProductImageInput!) {
        updateAdminCatalogProductImage(input: $input) {
          adminCatalogProductImage {
            _id
            productId
            path
            position
            url
            altText
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/12/images/47",
          "productId": 12,
          "imageId": 47,
          "altText": "Blue running shoe, side view",
          "position": 2
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProductImage": {
            "adminCatalogProductImage": {
              "_id": 47,
              "productId": 12,
              "path": "product/12/abc123.webp",
              "position": 2,
              "url": "/storage/product/12/abc123.webp",
              "altText": "Blue running shoe, side view",
              "success": true,
              "message": "Product image updated successfully."
            }
          }
        }
      }
---

# Product Images — Update

Equivalent to [`PUT /api/admin/catalog/products/{productId}/images/{id}`](/api/rest-api/admin/catalog/products/images-update).

Edits what is stored alongside an uploaded image: its alt text and its position. The file itself is fixed once uploaded — to replace the picture, upload a new one (REST only) and delete this one.

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProductImage` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | `ID!` | yes | The image's IRI, e.g. `/api/admin/catalog/products/12/images/47`. |
| `productId` | `Int` | no | Parent product id. Taken from the image when omitted. |
| `imageId` | `Int` | no | Image id. Taken from `id` when omitted. |
| `altText` | `String` | no | Description of the image, stored for every locale the request covers. Send an empty string to clear it. |
| `position` | `Int` | no | Sort position within the product's gallery. |

At least one of `altText` and `position` is required — a mutation carrying neither is rejected.

## Alt text and locales

Alt text is translated: it is written for every locale the request covers, and read back for the locale the request is made in. The storefront returns it as `altText` on the product's images, and falls back to the product name where an image has none, so an image is never rendered without a description.

## Position and gallery order

Images resolve in position order, so this is what decides which picture is the product's main image — the lowest position wins, and that is the one the listing and the product card show. To rearrange several at once, use [reorder](/api/graphql-api/admin/catalog/products/images-reorder) instead.

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `_id` | `Int` | Image id. |
| `productId` | `Int` | Parent product id. |
| `path` | `String` | Storage-relative file path. |
| `position` | `Int` | Sort position. |
| `url` | `String` | Public URL. |
| `altText` | `String` | Alt text stored for the current locale, or `null`. |
| `success` | `Boolean` | Whether the edit was applied. |
| `message` | `String` | Human-readable result message. |
