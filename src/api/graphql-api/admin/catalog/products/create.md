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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 43,
              "sku": "sp-001",
              "type": "simple",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 44,
              "sku": "vr-001",
              "type": "virtual",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 45,
              "sku": "dl-001",
              "type": "downloadable",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 46,
              "sku": "gr-001",
              "type": "grouped",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 47,
              "sku": "bn-001",
              "type": "bundle",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 48,
              "sku": "cf-001",
              "type": "configurable",
              "attributeFamilyId": 1
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
            _id
            sku
            type
            attributeFamilyId
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
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "attributeFamilyId": 1
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
| `sku` | String | Yes | Must be unique, and slug-shaped. |
| `attributeFamilyId` | Int | Yes | An existing attribute family id. |
| `type` | String | Yes | One of `simple`, `virtual`, `downloadable`, `grouped`, `bundle`, `configurable`, `booking`. |
| `superAttributes` | Iterable | Conditional | **Required when `type` is `configurable`** — a map of attribute code (or id) to a non-empty list of option ids, `{ "color": [1, 2], "size": [6, 7] }`. |
| `clientMutationId` | String | No | Echoed back untouched, for correlating a response with its request. |

Every field is declared **nullable in the schema**, including `sku` and `type`. Requiredness is enforced by the API, not by GraphQL validation, so omitting `sku` is not a schema error — it comes back as a `The sku field is required.` entry in `errors[]`.

For every type except `configurable`, the input is just `sku`, `attributeFamilyId`, and `type`. Configurable additionally requires `superAttributes`, from which the store generates the cartesian product of variants in the same call.

## Reading the Payload

The payload is the product itself, so `id` is its real IRI (`/api/admin/catalog/products/<id>`), `_id` its numeric id, and connections resolve against this product — a product created with no images returns `images: { edges: [] }`.

A freshly created product has almost nothing on it, so most fields come back `null`. Configurable is the exception: its variants are generated during the create, so `variants { edges { node { _id sku } } }` is populated straight away.

## Errors

Failures come back as HTTP `200` with the message in `errors[]` and `null` data:

| Message | Cause |
|---------|-------|
| `The sku field is required.` | `sku` omitted |
| `The sku has already been taken.` | Duplicate SKU |
| `Product type "…" is not supported by this API. Allowed types: simple, virtual, downloadable, grouped, bundle, configurable, booking.` | Unrecognised `type` |
| `The super_attributes field is required when type=configurable. …` | Configurable without options |
| `You do not have permission to manage products.` | Token lacks `catalog.products.create` |

Validation stops at the first failure, so an input with two problems reports only one.

## After Creating

The product exists but is unusable — no name, no price, `status: null` — so it will not appear on the storefront. Follow with [Update](/api/graphql-api/admin/catalog/products/update), which also carries the per-type structure payloads: variants, bundle options, grouped links, downloadable links and samples, and the booking sub-type (`default`, `appointment`, `event`, `rental`, or `table`) with its slots or tickets.
