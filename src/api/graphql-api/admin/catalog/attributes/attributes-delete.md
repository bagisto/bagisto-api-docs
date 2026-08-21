---
outline: false
examples:
  - id: admin-catalog-attribute-delete
    title: Delete Attribute
    description: Deletes a user-defined attribute and returns the deleted snapshot. Refused for system attributes and attributes still attached to families.
    query: |
      mutation DeleteAttribute($input: deleteAdminAttributeInput!) {
        deleteAdminAttribute(input: $input) {
          adminAttribute {
            id
            _id
            code
            type
            adminName
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/attributes/50"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminAttribute": {
            "adminAttribute": {
              "id": "/api/admin/catalog/attributes/50",
              "_id": 50,
              "code": "color",
              "type": "select",
              "adminName": "Color"
            }
          }
        }
      }
---

# Catalog Attribute — Delete (GraphQL)

Deletes a user-defined attribute. `id` is the attribute IRI (`/api/admin/catalog/attributes/{id}`). The mutation returns a snapshot of the deleted attribute.

A system attribute (`isUserDefined = 0`) cannot be deleted (`403`), and an attribute still attached to one or more attribute families is refused until it is removed from those families (`409`).

See the [Attributes overview](/api/graphql-api/admin/catalog/attributes/) for how attributes, options, and families fit together.

Each failure returns an `errors[]` entry:

| Condition | Message |
|-----------|---------|
| System attribute (`isUserDefined = 0`) | `System attributes cannot be deleted.` |
| Attribute is referenced by one or more attribute families | `Attribute is part of one or more attribute families (group IDs: 12, 20, 28). Remove it from those families first.` — the message names the blocking group ids |
| Unknown id | `Attribute not found.` |

For bulk deletion, use [`createAdminAttributeMassDelete`](/api/graphql-api/admin/catalog/attributes/attributes-mass-delete).
