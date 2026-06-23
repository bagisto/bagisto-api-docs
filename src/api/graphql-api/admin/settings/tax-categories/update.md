---
outline: false
examples:
  - id: admin-settings-tax-category-update
    title: Update a Tax Category
    description: Update a tax category's details and re-sync its attached tax rates. The taxrates list you send fully replaces the current set.
    query: |
      mutation UpdateAdminSettingsTaxCategory($input: updateAdminSettingsTaxCategoryInput!) {
        updateAdminSettingsTaxCategory(input: $input) {
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
          "id": "/api/admin/settings/tax-categories/32",
          "code": "doc-demo-tc",
          "name": "Documentation Demo Tax Category (Updated)",
          "description": "Updated for docs examples",
          "taxrates": [10, 6, 3]
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsTaxCategory": {
            "adminSettingsTaxCategory": {
              "id": "/api/admin/settings/tax-categories/32",
              "_id": 32,
              "code": "doc-demo-tc",
              "name": "Documentation Demo Tax Category (Updated)",
              "description": "Updated for docs examples",
              "createdAt": "2026-06-19T17:47:49+05:30",
              "updatedAt": "2026-06-19T17:48:10+05:30"
            }
          }
        }
      }
---

# Update a Tax Category

Updates a tax category's details and re-syncs the tax rates attached to it.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsTaxCategory(input:)` | Mutation | Update a tax category and re-sync its tax rates |

## Input

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | yes | Resource path of the category to update. |
| `code` | yes | Unique machine code. |
| `name` | yes | Display name. |
| `description` | yes | Free-text description. |
| `taxrates` | yes | A non-empty list of tax-rate ids. **Replaces** the current set — rates not in the list are detached, and new ones are attached. |

::: warning taxrates re-syncs the whole set
The `taxrates` you send becomes the category's complete rate list — it is a full replacement, not an append. It is also required and must be non-empty; an empty array fails with *"The taxrates field is required."*
:::

::: tip Finding ids
Use the [`adminSettingsTaxCategories`](./list.md) query to find the category id, and [`adminSettingsTaxRates`](../tax-rates/list.md) to find tax-rate ids.
:::

The mutation response returns the updated category's scalar fields. The re-synced `taxRates` connection is **not** resolved in the mutation payload — re-query [`adminSettingsTaxCategory`](./detail.md) and select `taxRates { edges { node { _id identifier taxRate } } }` to read them back.
