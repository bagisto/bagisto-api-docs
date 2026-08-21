---
outline: false
examples:
  - id: admin-catalog-attribute-mass-delete
    title: Mass Delete Attributes
    description: Delete a batch of user-defined attributes in one mutation. The whole batch is pre-validated — if any id is a system attribute, nothing is deleted.
    query: |
      mutation MassDeleteAttributes($input: createAdminAttributeMassDeleteInput!) {
        createAdminAttributeMassDelete(input: $input) {
          adminAttributeMassDelete {
            id
            deleted
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [24, 31]
        }
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

# Catalog Attribute — Mass Delete (GraphQL)

Bulk-deletes a batch of user-defined attributes in a single mutation. `indices` is the list of attribute ids to delete. The batch is pre-validated: if any id belongs to a system attribute (`isUserDefined = 0`), the entire batch is rejected and nothing is deleted. Non-existent ids are silently skipped and do not appear in `deleted`.

See the [Attributes overview](/api/graphql-api/admin/catalog/attributes/) for how attributes, options, and families fit together.

## Input

| Field | Type | Notes |
|-------|------|-------|
| `indices` | `[Int!]!` | Attribute ids to delete |

A batch containing a system attribute returns an `errors[]` entry `System attributes cannot be deleted.` and no row is touched.
