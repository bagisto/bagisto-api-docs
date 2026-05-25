---
outline: false
examples:
  - id: admin-catalog-product-create
    title: Create a Catalog Product
    description: GraphQL step-1 create (all 7 types). For configurable, pass `superAttributes` as a map of attribute code (or id) to non-empty list of option_ids.
    query: |
      mutation CreateCatalogProduct($input: createAdminCatalogProductInput!) {
        createAdminCatalogProduct(input: $input) {
          adminCatalogProduct { id _id sku type attributeFamilyId attributeFamilyName }
        }
      }
    variables: |
      {
        "input": {
          "sku": "sp-001",
          "attribute_family_id": 1,
          "type": "simple"
        }
      }
    response: |
      {
        "data": {
          "createAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog_products/43",
              "_id": 43,
              "sku": "sp-001",
              "type": "simple",
              "attributeFamilyId": 1,
              "attributeFamilyName": "Default"
            }
          }
        }
      }
---

# Catalog Product — Create

Equivalent to [`POST /api/admin/catalog/products`](/api/rest-api/admin/catalog/products/create).

## Operation

| Operation | Type |
|-----------|------|
| `createAdminCatalogProduct` | Mutation |

## Input

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `sku` | `String!` | yes | Must be unique. |
| `attribute_family_id` | `Int!` | yes | Existing family ID. |
| `type` | `String!` | yes | One of `simple`, `virtual`, `downloadable`, `grouped`, `bundle`, `configurable`, `booking`. |
| `super_attributes` | `Object` | conditional | Required when `type=configurable` — map of attribute code (or id) to non-empty list of option_ids. |

## Notes

- Step-1 only: name, description, price, etc. are added via the
  [Update mutation](/api/graphql-api/admin/catalog/products/update).
- Booking sub-type (`default`/`appointment`/`event`/`rental`/`table`) is set in step 2.
