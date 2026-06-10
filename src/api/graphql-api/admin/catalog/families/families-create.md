---
outline: false
examples:
  - id: admin-catalog-family-create
    title: Create Attribute Family
    description: Create an attribute family with optional nested groups and per-group custom_attributes. Mirrors POST /api/admin/catalog/families.
    query: |
      mutation CreateFamily($input: createAdminAttributeFamilyInput!) {
        createAdminAttributeFamily(input: $input) {
          adminAttributeFamily { id _id }
        }
      }
    variables: |
      {
        "input": {
          "code": "electronics",
          "name": "Electronics",
          "attributeGroups": [
            {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "customAttributes": [ { "id": 1 }, { "id": 2 } ]
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminAttributeFamily": {
            "adminAttributeFamily": { "id": "/api/admin/catalog/families/4", "_id": 4 }
          }
        }
      }
---

# Attribute Family — Create

Creates a new attribute family. Equivalent to
[`POST /api/admin/catalog/families`](/api/rest-api/admin/catalog/families/families-create).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminAttributeFamily` | Mutation | Create a new attribute family |

## Input

| Field | Notes |
|-------|-------|
| `code` | Snake_case identifier, unique. |
| `name` | Display name. |
| `attribute_groups` | Optional array of `{ code, name, column, position, custom_attributes }`. |

See the [REST page](/api/rest-api/admin/catalog/families/families-create) for
full field semantics.

## Notes

- Follow up with the [`adminAttributeFamily`](/api/graphql-api/admin/catalog/families/families-detail) query to load the refreshed detail.
- Same `code` validation rules as the REST endpoint.
