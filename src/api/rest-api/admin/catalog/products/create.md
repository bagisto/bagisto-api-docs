---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-create
    title: Create a Catalog Product (step 1 — all 7 types)
    description: Mirrors the Bagisto admin Create-Product wizard step 1. Only `sku` + `attribute_family_id` + `type` are submitted (plus `super_attributes` when type is `configurable`). Name, description, price, inventories, etc. are added via the step-2 Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "X-Admin-Key: <your-admin-api-key>" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "sp-001",
          "attribute_family_id": 1,
          "type": "simple"
        }'
    variables: |
      {
        "sku": "sp-001",
        "attribute_family_id": 1,
        "type": "simple"
      }
    response: |
      {
        "id": 43,
        "sku": "sp-001",
        "type": "simple",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null
      }
    commonErrors:
      - error: Validation (422)
        cause: Missing sku/family, unsupported type, duplicate SKU, invalid slug, or unknown family
        solution: Send a unique SKU and a valid attribute_family_id
      - error: Validation (422)
        cause: Type is `configurable` but `super_attributes` is missing or empty
        solution: Send a non-empty map of attribute code (or id) to option_ids
---

# Catalog Product — Create (step 1)

Creates a new catalog product **stub** — mirrors the Bagisto admin
Create-Product wizard step 1. Only the bare-minimum fields are accepted at
this step; everything else (name, description, price, inventories, images,
etc.) is added through the step-2 [Update endpoint](/api/rest-api/admin/catalog/products/update).

::: tip Single-step configurable create
Unlike the monolith (which does configurable create in two POSTs — first the
parent stub, then a separate `super_attributes` save), this endpoint accepts
`super_attributes` in the same request. The core repository then generates the
full Cartesian-product of variants from the option_ids you pass.
:::

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products` | POST |

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sku` | string | yes | Unique product SKU. Slug-validated. |
| `attribute_family_id` | integer | yes | Existing attribute family ID. |
| `type` | string | yes | One of `simple`, `virtual`, `downloadable`, `grouped`, `bundle`, `configurable`, `booking`. |
| `super_attributes` | object | conditional | **Required when `type=configurable`**. Map of attribute code (or id) → non-empty list of option_ids. e.g. `{ "color": [1, 2], "size": [4, 5] }`. |

### Booking products

`type=booking` creates the parent booking product stub. The 5 sub-types
(`default` / `appointment` / `event` / `rental` / `table`) are configured
during the step-2 Update call.

## Response

`201 Created` returning the full `AdminCatalogProduct` payload — most fields
will be `null` because only `sku`, `type`, and `attribute_family_id` are
populated at this point.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.create`. |
| `422 Unprocessable Entity` | Validation failed — missing sku/family, unsupported type, duplicate SKU, invalid slug, unknown family, missing/invalid `super_attributes` for configurable. |

## Notes

- Fires `catalog.product.create.before` and `catalog.product.create.after`.
- The next call is typically `PUT /api/admin/catalog/products/{id}` to populate the rest of the fields.
