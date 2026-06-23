---
outline: false
examples:
  - id: admin-settings-tax-category-create
    title: Create a Tax Category
    description: Create a new tax category and attach one or more existing tax rates to it. The taxrates input is required and must list at least one valid tax-rate id.
    query: |
      mutation CreateAdminSettingsTaxCategory($input: createAdminSettingsTaxCategoryInput!) {
        createAdminSettingsTaxCategory(input: $input) {
          adminSettingsTaxCategory {
            id
            _id
            code
            name
            description
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "code": "doc-demo-tc",
          "name": "Documentation Demo Tax Category",
          "description": "Created for docs examples",
          "taxrates": [10, 6]
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsTaxCategory": {
            "adminSettingsTaxCategory": {
              "id": "/api/admin/settings/tax-categories/32",
              "_id": 32,
              "code": "doc-demo-tc",
              "name": "Documentation Demo Tax Category",
              "description": "Created for docs examples",
              "createdAt": "2026-06-19T17:47:49+05:30",
              "updatedAt": "2026-06-19T17:47:49+05:30"
            }
          }
        }
      }
---

# Create a Tax Category

Creates a new tax category and attaches the supplied tax rates to it.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsTaxCategory(input:)` | Mutation | Create a tax category and attach tax rates |

## Input

| Field | Required | Meaning |
|-------|----------|---------|
| `code` | yes | Unique machine code for the category. |
| `name` | yes | Display name. |
| `description` | yes | Free-text description. |
| `taxrates` | yes | A non-empty list of existing tax-rate ids to attach. Each id must already exist. |

::: warning taxrates is required and must be non-empty
A tax category cannot be created without at least one tax rate. Passing an empty `taxrates` array (or omitting it) fails with *"The taxrates field is required."* Discover valid tax-rate ids with the [`adminSettingsTaxRates`](../tax-rates/list.md) query.
:::

The mutation response returns the created category's scalar fields. The attached `taxRates` connection is **not** resolved in the mutation payload — re-query [`adminSettingsTaxCategory`](./detail.md) and select `taxRates { edges { node { _id identifier taxRate } } }` to read them back.
