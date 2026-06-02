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

::: warning No "in-order" delete guard (parity with monolith)
Bagisto admin does **not** refuse to delete a product that appears in
non-completed orders. This endpoint matches that behaviour — order items
preserve their snapshot data after the product row is gone. If you need
referential integrity, add the guard at the application layer.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{id}` | DELETE |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | integer | yes | Product ID. |

## Response

`204 No Content` on success.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.delete`. |
| `404 Not Found` | Product not found. |

## Notes

- For configurable products, all variants cascade automatically.
