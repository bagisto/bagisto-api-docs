---
outline: false
examples:
  - id: admin-catalog-attribute-update
    title: Update Attribute
    description: Update an existing attribute. `code` is immutable; `type` cannot change while product attribute values reference the attribute. Mirrors PUT /api/admin/catalog/attributes/{id}.
    query: |
      mutation UpdateAttribute($input: updateAdminAttributeInput!) {
        updateAdminAttribute(input: $input) {
          adminAttribute { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/attributes/50",
          "code": "material",
          "adminName": "Material (updated)",
          "type": "select",
          "isFilterable": true,
          "translations": { "en": { "name": "Material (updated)" } }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttribute": {
            "adminAttribute": { "id": "/api/admin/attributes/50", "_id": 50 }
          }
        }
      }
---

# Catalog Attribute — Update

Updates an existing attribute. Equivalent to
[`PUT /api/admin/catalog/attributes/{id}`](/api/rest-api/admin/catalog/attributes/attributes-update).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminAttribute` | Mutation | Update an attribute |

## Input fields

Same field set as the REST request body plus the resource IRI `id`. See the
[REST page](/api/rest-api/admin/catalog/attributes/attributes-update) for the
full list and immutable-field caveats.

## Notes

- The mutation returns the IRI of the updated attribute. Follow up with the [`adminAttribute`](/api/graphql-api/admin/catalog/attributes/attributes-detail) query to load the refreshed detail.
- `code` is immutable. Supplying a different code raises an `errors[]` entry with `Attribute code cannot be changed.`
- Supplying `options` performs a full-set replacement (insert/update/delete) — same semantics as REST.
