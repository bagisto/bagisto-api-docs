---
outline: false
examples:
  - id: admin-catalog-family-create
    title: Create Attribute Family
    description: Create an attribute family with optional nested groups and per-group custom attributes.
    query: |
      mutation CreateAdminAttributeFamily($input: createAdminAttributeFamilyInput!) {
        createAdminAttributeFamily(input: $input) {
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
          "code": "shirts",
          "name": "Shirts",
          "attributeGroups": [
            {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "customAttributes": [
                { "id": 1 },
                { "id": 2 }
              ]
            }
          ]
        }
      }
    response: |
      {
        "data": {
          "createAdminAttributeFamily": {
            "adminAttributeFamily": {
              "id": "/api/admin/catalog/families/4",
              "_id": 4,
              "code": "shirts",
              "name": "Shirts"
            }
          }
        }
      }
---

# Attribute Family — Create (GraphQL)

Creates a new attribute family. A family is the set of attribute groups (and the attributes within each group) that a product of that family is edited against. You may seed the family's structure inline by passing `attributeGroups`, where each group may carry `customAttributes` to attach existing attributes to it. `code` must be unique.

::: tip
See the [Attribute Families overview](/api/graphql-api/admin/catalog/families/) for how families relate to attributes and products.
:::

The mutation payload returns the new family's scalar fields. The `attributeGroups` connection is not resolved on the mutation result — re-query [`adminAttributeFamily`](/api/graphql-api/admin/catalog/families/families-detail) to read the full structure back.

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
