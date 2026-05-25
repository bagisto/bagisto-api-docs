---
outline: false
examples:
  - id: admin-catalog-attribute-mass-delete
    title: Mass Delete Attributes
    description: Delete a batch of user-defined attributes. The whole batch is pre-validated — if any id is a system attribute, no row is deleted. Mirrors POST /api/admin/catalog/attributes/mass-delete.
    query: |
      mutation MassDeleteAttributes($input: createAdminAttributeMassDeleteInput!) {
        createAdminAttributeMassDelete(input: $input) {
          adminAttributeMassDelete { id deleted message }
        }
      }
    variables: |
      {
        "input": { "indices": [24, 31] }
      }
    response: |
      {
        "data": {
          "createAdminAttributeMassDelete": {
            "adminAttributeMassDelete": {
              "id": "/api/admin/attribute_mass_deletes/1",
              "deleted": [24, 31],
              "message": "Attributes deleted successfully."
            }
          }
        }
      }
---

# Catalog Attribute — Mass Delete

Bulk-deletes a batch of user-defined attributes in a single mutation.
Equivalent to
[`POST /api/admin/catalog/attributes/mass-delete`](/api/rest-api/admin/catalog/attributes/attributes-mass-delete).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminAttributeMassDelete` | Mutation | Delete multiple user-defined attributes at once |

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | `[Int!]!` | Attribute ids to delete |

## Notes

- **All-or-nothing.** If any id is a system attribute, the whole batch fails with an `errors[]` entry `System attributes cannot be deleted.` — no row is touched.
- Unknown ids are silently skipped — they do not appear in `deleted`.
