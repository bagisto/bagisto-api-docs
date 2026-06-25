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
            _id
            code
            name
            description
            message
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
              "_id": 33,
              "code": "throwaway-del-tc",
              "name": "Throwaway Del TC",
              "description": "tmp",
              "message": "Tax category deleted successfully."
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

## Guards

The delete is refused (returns an `errors[]` entry, no record removed) when:

- The category still has **one or more tax rates attached** — *"This tax category still has tax rates attached and cannot be deleted."* You cannot detach rates through the update mutation either (it requires a non-empty `taxrates` list). A category becomes deletable only once it has no attached rates (for example, after the underlying tax rates themselves are removed).

## Notes

- The returned node is an in-memory snapshot of the just-deleted record — its scalar fields (`_id`, `code`, `name`, `description`) still resolve so you can confirm what was removed.
- Select **`message`** for the success confirmation — it resolves to `"Tax category deleted successfully."` on a successful delete. `message` is `null` on read / list / create / update; a failed delete returns a top-level `errors[]` entry instead.
- Do **not** select the node's IRI `id` field on this mutation — the IRI cannot be generated for a deleted record and the field resolves with an `errors[]` entry. Select `_id` instead, as shown.
- Use the [`adminSettingsTaxCategories`](./list.md) query to discover valid ids.

Permissions: `settings.taxes.tax_categories.delete`. See the [Tax Categories overview](./) for behaviour.
