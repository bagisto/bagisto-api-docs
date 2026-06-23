---
outline: false
examples:
  - id: admin-settings-tax-category-delete
    title: Delete a Tax Category
    description: Delete a tax category. The category must have no tax rates attached, otherwise the request is refused. The deleted category is returned in the response.
    query: |
      mutation DeleteAdminSettingsTaxCategory($input: deleteAdminSettingsTaxCategoryInput!) {
        deleteAdminSettingsTaxCategory(input: $input) {
          adminSettingsTaxCategory {
            id
            _id
            code
            name
            description
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/tax-categories/33"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminSettingsTaxCategory": {
            "adminSettingsTaxCategory": {
              "id": "/api/admin/settings/tax-categories/33",
              "_id": 33,
              "code": "throwaway-del-tc",
              "name": "Throwaway Del TC",
              "description": "tmp"
            }
          }
        }
      }
---

# Delete a Tax Category

Permanently deletes a tax category. The category must have **no tax rates attached** — attached rates block the deletion.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminSettingsTaxCategory(input:)` | Mutation | Delete a tax category with no attached rates |

## Input

| Field | Required | Meaning |
|-------|----------|---------|
| `id` | yes | Resource path of the category to delete. |

::: warning Cannot delete a category with attached tax rates
If the category still has any tax rates attached, the request is refused with *"This tax category still has tax rates attached and cannot be deleted."* You cannot detach rates through the update mutation either — it requires a non-empty `taxrates` list. A category becomes deletable only once it has no attached rates (for example, after the underlying tax rates themselves are removed).
:::

On success the response returns the deleted category — its `id`, `_id`, `code`, `name`, and `description` resolve to the values it held just before removal, and no `errors` are present. A category must have no tax rates attached before it can be deleted.
