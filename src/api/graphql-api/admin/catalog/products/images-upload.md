---
outline: false
examples:
  - id: admin-catalog-product-image-upload
    title: Upload a Product Image (REST only)
    description: GraphQL upload is NOT supported — binary file parts are not transportable over JSON GraphQL. Use the REST endpoint.
    query: |
      # Image upload is REST-only — binary uploads are not transportable
      # over JSON GraphQL. Use the REST endpoint:
      #
      #   POST /api/admin/catalog/products/{productId}/images
      #   Content-Type: multipart/form-data
      #   Body:        image=<binary>; position=<optional int>
      #
      # Example curl:
      #   curl -X POST "https://your-domain.com/api/admin/catalog/products/12/images" \
      #        -H "Authorization: Bearer <token>" \
      #        -F "image=@/path/to/photo.webp"
    variables: |
      {}
    response: |
      <REST 201 — see REST docs>
---

# Product Images — Upload

Image upload is **REST-only**. A binary file part cannot be carried in a JSON GraphQL request, so `createAdminCatalogProductImage` exists in the schema as a placeholder and rejects any call — it will not accept a file.

Upload through [`POST /api/admin/catalog/products/{productId}/images`](/api/rest-api/admin/catalog/products/images-upload) instead. Reordering and deleting images, which carry no binary payload, do work over GraphQL.

## See also

- [Reorder Images (GraphQL)](/api/graphql-api/admin/catalog/products/images-reorder)
- [Delete Image (GraphQL)](/api/graphql-api/admin/catalog/products/images-delete)
