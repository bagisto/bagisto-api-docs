---
outline: false
examples:
  - id: admin-catalog-product-create-simple
    title: Create — Simple
    description: Step-1 create for a simple product. Only sku, attributeFamilyId and type are submitted; everything else is added later via the Update mutation.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "sp-001",
          "attributeFamilyId": 1,
          "type": "simple"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/43",
              "sku": "sp-001",
              "type": "simple"
            }
          }
        }
      }
  - id: admin-catalog-product-create-virtual
    title: Create — Virtual
    description: Step-1 create for a virtual (non-shippable) product. Same minimal input as a simple product.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "vr-001",
          "attributeFamilyId": 1,
          "type": "virtual"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/44",
              "sku": "vr-001",
              "type": "virtual"
            }
          }
        }
      }
  - id: admin-catalog-product-create-downloadable
    title: Create — Downloadable
    description: Step-1 create for a downloadable product. The download links and samples are configured later via the Update mutation.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "dl-001",
          "attributeFamilyId": 1,
          "type": "downloadable"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/45",
              "sku": "dl-001",
              "type": "downloadable"
            }
          }
        }
      }
  - id: admin-catalog-product-create-grouped
    title: Create — Grouped
    description: Step-1 create for a grouped product. The associated/linked products are added later via the Update mutation.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "gr-001",
          "attributeFamilyId": 1,
          "type": "grouped"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/46",
              "sku": "gr-001",
              "type": "grouped"
            }
          }
        }
      }
  - id: admin-catalog-product-create-bundle
    title: Create — Bundle
    description: Step-1 create for a bundle product. The bundle option groups are configured later via the Update mutation.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "bn-001",
          "attributeFamilyId": 1,
          "type": "bundle"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/47",
              "sku": "bn-001",
              "type": "bundle"
            }
          }
        }
      }
  - id: admin-catalog-product-create-configurable
    title: Create — Configurable
    description: Step-1 create for a configurable product. superAttributes is REQUIRED — a map of attribute code (or id) to a list of option ids. The store generates the cartesian product of variants from these options.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "cf-001",
          "attributeFamilyId": 1,
          "type": "configurable",
          "superAttributes": {
            "color": [1, 2],
            "size": [6, 7]
          }
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/48",
              "sku": "cf-001",
              "type": "configurable"
            }
          }
        }
      }
  - id: admin-catalog-product-create-booking
    title: Create — Booking
    description: Step-1 create for a booking product. The booking sub-type (default / appointment / event / rental / table) and its slots/tickets are configured later via the Update mutation.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "sku": "bk-001",
          "attributeFamilyId": 1,
          "type": "booking"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
---

# Catalog Product — Create

Equivalent to [`POST /api/admin/catalog/products`](/api/rest-api/admin/catalog/products/create).

Step-1 create — mirrors the Bagisto admin Create-Product wizard step 1. Only
the bare-minimum fields are accepted at this step; everything else (name,
description, price, variants, booking slots, etc.) is added through the
[Update mutation](/api/graphql-api/admin/catalog/products/update).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProduct` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sku` | `String!` | yes | Must be unique. |
| `attributeFamilyId` | `Int!` | yes | Existing family ID. |
| `type` | `String!` | yes | One of `simple`, `virtual`, `downloadable`, `grouped`, `bundle`, `configurable`, `booking`. |
| `superAttributes` | `Object` | conditional | **Required when `type=configurable`** — map of attribute code (or id) → non-empty list of option ids. e.g. `{ "color": [1, 2], "size": [6, 7] }`. |

For every type except `configurable`, the input is just `sku` +
`attributeFamilyId` + `type`. Configurable additionally requires
`superAttributes`, from which the store generates the cartesian product of
variants.

## Notes

- Step-1 only: name, description, price, etc. are added via the
  [Update mutation](/api/graphql-api/admin/catalog/products/update).
- Booking sub-type (`default` / `appointment` / `event` / `rental` / `table`) and its slots/tickets are set in step 2.
- See [Update](/api/graphql-api/admin/catalog/products/update) for the per-type structure payloads (variants, bundle options, links, booking slots/tickets).
