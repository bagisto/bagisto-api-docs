---
outline: false
examples:
  - id: admin-settings-tax-category-detail
    title: Get a Tax Category
    description: Fetch a single tax category by id, including the full list of attached tax rates (each with its identifier and percentage rate).
    query: |
      query AdminSettingsTaxCategory($id: ID!) {
        adminSettingsTaxCategory(id: $id) {
          id
          _id
          code
          name
          description
          taxRates {
            edges {
              node {
                _id
                identifier
                taxRate
              }
            }
          }
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/tax-categories/4"
      }
    response: |
      {
        "data": {
          "adminSettingsTaxCategory": {
            "id": "/api/admin/settings/tax-categories/4",
            "_id": 4,
            "code": "doc-demo-tc",
            "name": "Documentation Demo Tax Category",
            "description": "Demo for docs examples",
            "taxRates": {
              "edges": [
                {
                  "node": {
                    "_id": 6,
                    "identifier": "us-ca-sf",
                    "taxRate": 8.5
                  }
                }
              ]
            },
            "createdAt": "2026-06-19T17:47:49+05:30",
            "updatedAt": "2026-06-19T17:48:10+05:30"
          }
        }
      }
---

# Get a Tax Category

Returns a single tax category by id, with its attached tax rates inlined. This is the only operation that resolves the `taxRates` list — on the [listing](./list.md) it is always `null`.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsTaxCategory(id: ID!)` | Query | Fetch one tax category with its attached rates |

## Fields

| Field | Meaning |
|-------|---------|
| `_id` | Numeric tax-category id. |
| `id` | The category's resource path — pass this as the `$id` variable. |
| `code` | Unique machine code. |
| `name` | Display name. |
| `description` | Free-text description. |
| `taxRates` | The attached tax rates, returned as a **connection** — select `taxRates { edges { node { _id identifier taxRate } } }`. Each node carries the rate's `_id`, `identifier`, and `taxRate` (the percentage). Empty `edges` means no rates are currently attached. |
| `createdAt` / `updatedAt` | ISO 8601 timestamps. |

### TaxRates is a field-selectable connection

`taxRates` is a Relay connection, not an opaque value — sub-select the fields you need via `taxRates { edges { node { _id identifier taxRate } } }`.

Use the [`adminSettingsTaxCategories`](./list.md) query to discover valid ids. Pass the category's resource path (`/api/admin/settings/tax-categories/{id}`) as `$id`.
