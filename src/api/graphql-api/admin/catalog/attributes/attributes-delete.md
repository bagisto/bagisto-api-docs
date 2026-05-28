---
outline: false
examples:
  - id: admin-catalog-attribute-delete
    title: Delete Attribute
    description: Deletes a user-defined attribute. Mirrors DELETE /api/admin/catalog/attributes/{id}.
    query: |
      mutation DeleteAttribute($input: deleteAdminAttributeInput!) {
        deleteAdminAttribute(input: $input) {
          adminAttribute { id }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/attributes/50" }
      }
    response: |
      {
        "data": {
          "deleteAdminAttribute": {
            "adminAttribute": { "id": "/api/admin/attributes/50" }
          }
        }
      }
---

# Catalog Attribute — Delete

Deletes a user-defined attribute. Equivalent to
[`DELETE /api/admin/catalog/attributes/{id}`](/api/rest-api/admin/catalog/attributes/attributes-delete).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a attribute that exists in your store — use the [`adminAttributes`](./attributes-listing.md) query to discover valid ids.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminAttribute` | Mutation | Delete a user-defined attribute |

## Errors

Each failure returns an `errors[]` entry:

| Condition | Message |
|-----------|---------|
| System attribute (`is_user_defined = 0`) | `System attributes cannot be deleted.` |
| Attribute is referenced by one or more attribute families | `Attribute is part of one or more attribute families. Remove it from those families first.` |
| Unknown id | `Attribute not found.` |

For bulk deletion, use [`createAdminAttributeMassDelete`](/api/graphql-api/admin/catalog/attributes/attributes-mass-delete).
