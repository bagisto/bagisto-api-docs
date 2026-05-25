---
outline: false
examples:
  - id: admin-catalog-product-image-upload
    title: Upload a Product Image (REST only)
    description: GraphQL upload is NOT supported — binary file parts are not transportable over JSON GraphQL. Use the REST endpoint.
    query: |
      # Use the REST endpoint:
      curl -X POST "https://your-domain.com/api/admin/catalog/products/12/images" \
        -H "Authorization: Bearer <token>" \
        -F "image=@/path/to/photo.webp"
    variables: |
      multipart/form-data:
        image: <binary>
    response: |
      <REST 201 — see REST docs>
---

# Product Images — Upload

::: warning REST only — GraphQL upload not supported
Binary uploads are not transportable over JSON GraphQL. The
`createAdminCatalogProductImage` mutation exists as a placeholder only and
will not accept a file.

Use [`POST /api/admin/catalog/products/{productId}/images`](/api/rest-api/admin/catalog/products/images-upload) instead.
:::

## See also

- [Reorder Images (GraphQL)](/api/graphql-api/admin/catalog/products/images-reorder)
- [Delete Image (GraphQL)](/api/graphql-api/admin/catalog/products/images-delete)
