---
outline: false
examples:
  - id: admin-catalog-family-update
    title: Update Attribute Family
    description: Update a family, optionally restructuring its attribute groups.
    query: |
      mutation UpdateAdminAttributeFamily($input: updateAdminAttributeFamilyInput!) {
        updateAdminAttributeFamily(input: $input) {
          adminAttributeFamily {
            id
            _id
            code
            name
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/families/4",
          "code": "shirts",
          "name": "Shirts (updated)",
          "attributeGroups": {
            "11": {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "customAttributes": [
                { "id": 1, "position": 1 }
              ]
            },
            "group_new_1": {
              "code": "pricing",
              "name": "Pricing",
              "column": 2,
              "position": 2,
              "customAttributes": [
                { "id": 11, "position": 1 }
              ]
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttributeFamily": {
            "adminAttributeFamily": {
              "id": "/api/admin/catalog/families/4",
              "_id": 4,
              "code": "shirts",
              "name": "Shirts (updated)"
            }
          }
        }
      }
---

# Attribute Family — Update (GraphQL)

Updates an existing attribute family. The `id` argument is the family IRI (`/api/admin/catalog/families/{id}`).

The `attributeGroups` field is an **object** keyed by group id: a numeric key (e.g. `"11"`) updates an existing group, while a `group_*` key creates a new group. Existing groups that are omitted from the payload are deleted. Each group value carries `code`, `name`, `column`, `position`, and `customAttributes` (each `{ id, position }`) to attach attributes to it.

::: tip
See the [Attribute Families overview](/api/graphql-api/admin/catalog/families/) for how families relate to attributes and products.
:::

The mutation payload returns the family's scalar fields. The `attributeGroups` connection is not resolved on the mutation result — re-query [`adminAttributeFamily`](/api/graphql-api/admin/catalog/families/families-detail) to read the updated structure back.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
