---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-delete
    title: Delete a Catalog Product
    description: Deletes a catalog product. For configurable products, all variants cascade. No "refuse if in non-completed order" guard — mirrors Bagisto admin behaviour.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/catalog/products/42" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      <empty body — HTTP 204>
    commonErrors:
      - error: Not Found (404)
        cause: Product not found
        solution: Verify the `{id}` exists
      - error: Forbidden (403)
        cause: Admin role lacks `catalog.products.delete`
        solution: Grant the permission to the admin role
---

# Catalog Product — Delete

Deletes a catalog product. Fires `catalog.product.delete.before` /
`catalog.product.delete.after`.


## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{id}` | DELETE |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | integer | yes | Product ID. |

## Response

`204 No Content`, with an empty body — there is nothing to read back. Capture anything you need from [Product Detail](/api/rest-api/admin/catalog/products/products-detail) before deleting.

## What Deletion Does

- **Configurable variants cascade.** Deleting the parent removes its variants; there is no separate call.
- **Orders are unaffected.** Order items keep their snapshot of the product, so historic orders still render after the product is gone.
- **No in-order guard.** A product that appears in open orders deletes without complaint, matching the admin panel. If you need referential integrity, enforce it before calling.

## Errors

| HTTP | Detail |
|------|--------|
| `401` | `Unauthenticated.` |
| `403` | `You do not have permission to manage products.` — token lacks `catalog.products.delete` |
| `404` | `Product not found.` |
