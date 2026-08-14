---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-create-simple
    title: Create — Simple
    description: Step-1 create for a simple product. Only sku, attribute_family_id and type are submitted; everything else (name, price, inventory, images) is added later via the Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
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
  - id: admin-catalog-product-create-virtual
    title: Create — Virtual
    description: Step-1 create for a virtual (non-shippable) product. Same minimal body as a simple product.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "vr-001",
          "attribute_family_id": 1,
          "type": "virtual"
        }'
    variables: |
      {
        "sku": "vr-001",
        "attribute_family_id": 1,
        "type": "virtual"
      }
    response: |
      {
        "id": 44,
        "sku": "vr-001",
        "type": "virtual",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null
      }
  - id: admin-catalog-product-create-downloadable
    title: Create — Downloadable
    description: Step-1 create for a downloadable product. The download links and samples are configured later via the Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "dl-001",
          "attribute_family_id": 1,
          "type": "downloadable"
        }'
    variables: |
      {
        "sku": "dl-001",
        "attribute_family_id": 1,
        "type": "downloadable"
      }
    response: |
      {
        "id": 45,
        "sku": "dl-001",
        "type": "downloadable",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null
      }
  - id: admin-catalog-product-create-grouped
    title: Create — Grouped
    description: Step-1 create for a grouped product. The associated/linked products are added later via the Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "gr-001",
          "attribute_family_id": 1,
          "type": "grouped"
        }'
    variables: |
      {
        "sku": "gr-001",
        "attribute_family_id": 1,
        "type": "grouped"
      }
    response: |
      {
        "id": 46,
        "sku": "gr-001",
        "type": "grouped",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null
      }
  - id: admin-catalog-product-create-bundle
    title: Create — Bundle
    description: Step-1 create for a bundle product. The bundle option groups are configured later via the Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "bn-001",
          "attribute_family_id": 1,
          "type": "bundle"
        }'
    variables: |
      {
        "sku": "bn-001",
        "attribute_family_id": 1,
        "type": "bundle"
      }
    response: |
      {
        "id": 47,
        "sku": "bn-001",
        "type": "bundle",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null
      }
  - id: admin-catalog-product-create-configurable
    title: Create — Configurable
    description: Step-1 create for a configurable product. super_attributes is REQUIRED — a map of attribute code (or id) to a list of option ids. The store generates the cartesian product of variants from these options.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "cf-001",
          "attribute_family_id": 1,
          "type": "configurable",
          "super_attributes": {
            "color": [1, 2],
            "size": [6, 7]
          }
        }'
    variables: |
      {
        "sku": "cf-001",
        "attribute_family_id": 1,
        "type": "configurable",
        "super_attributes": {
          "color": [1, 2],
          "size": [6, 7]
        }
      }
    response: |
      {
        "id": 48,
        "sku": "cf-001",
        "type": "configurable",
        "attributeFamilyId": 1,
        "attributeFamilyName": "Default",
        "name": null,
        "status": null,
        "price": null,
        "variants": [
          { "id": 49, "sku": "cf-001-variant-1" },
          { "id": 50, "sku": "cf-001-variant-2" },
          { "id": 51, "sku": "cf-001-variant-3" },
          { "id": 52, "sku": "cf-001-variant-4" }
        ]
      }
  - id: admin-catalog-product-create-booking
    title: Create — Booking
    description: Step-1 create for a booking product. The booking sub-type (default / appointment / event / rental / table) and its slots/tickets are configured later via the Update endpoint.
    query: |
      curl -X POST "https://your-domain.com/api/admin/catalog/products" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "sku": "bk-001",
          "attribute_family_id": 1,
          "type": "booking"
        }'
    variables: |
      {
        "sku": "bk-001",
        "attribute_family_id": 1,
        "type": "booking"
      }
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
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
        solution: Send a non-empty map of attribute code (or id) to option ids
---

# Catalog Product — Create (step 1)

Creates a new catalog product — mirrors the Bagisto admin Create-Product
wizard step 1. Only the bare-minimum fields are accepted at this step;
everything else (name, description, price, inventories, images, variants,
booking slots, etc.) is added through the
[Update endpoint](/api/rest-api/admin/catalog/products/update).

Configurable products are created in a single call here, unlike the admin panel's two-screen flow: pass `super_attributes` with the create and the store generates the full cartesian product of variants from the option ids you supply.

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
| `super_attributes` | object | conditional | **Required when `type=configurable`**. Map of attribute code (or id) → non-empty list of option ids. e.g. `{ "color": [1, 2], "size": [6, 7] }`. |

For every type except `configurable`, the body is just `sku` +
`attribute_family_id` + `type`. Configurable additionally requires
`super_attributes`.

### Booking products

`type=booking` creates the parent booking product. The 5 sub-types
(`default` / `appointment` / `event` / `rental` / `table`) and their slots or
tickets are configured during the
[Update](/api/rest-api/admin/catalog/products/update) call.

## Response

`201 Created`, returning the **same 55-key payload as [Product Detail](/api/rest-api/admin/catalog/products/products-detail)** — not a slim confirmation object. The examples on this page are trimmed to the fields that carry a value; everything else comes back `null` because only `sku`, `type`, and `attribute_family_id` exist yet.

For `configurable`, the generated `variants` are already populated, so you can read each variant id straight out of the create response when filling in per-variant pricing.

## Errors

| HTTP | Detail |
|------|--------|
| `401` | `Unauthenticated.` |
| `403` | `You do not have permission to manage products.` — the token lacks `catalog.products.create` |
| `422` | `The sku field is required.` |
| `422` | `The sku has already been taken.` |
| `422` | `Product type "nope" is not supported by this API. Allowed types: simple, virtual, downloadable, grouped, bundle, configurable, booking.` |
| `422` | `The super_attributes field is required when type=configurable. …` |

Validation stops at the first failure, so a body with two problems reports only one.

## After Creating

The product exists but is unusable — it has no name, no price, and `status: null`, so it will not appear on the storefront. Follow with `PUT /api/admin/catalog/products/{id}` to populate the rest; see [Update](/api/rest-api/admin/catalog/products/update) for the per-type structure payloads (variants, bundle options, links, booking slots and tickets).
