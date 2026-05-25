---
outline: false
examples:
  - id: admin-catalog-family-update
    title: Update Attribute Family
    description: Update a family, optionally restructuring its attribute groups. Mirrors PUT /api/admin/catalog/families/{id}.
    query: |
      mutation UpdateFamily($input: updateAdminAttributeFamilyInput!) {
        updateAdminAttributeFamily(input: $input) {
          adminAttributeFamily { id _id }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/attribute_families/4",
          "code": "electronics",
          "name": "Electronics (updated)",
          "attribute_groups": {
            "11": {
              "code": "general",
              "name": "General",
              "column": 1,
              "position": 1,
              "custom_attributes": [ { "id": 1, "position": 1 } ]
            },
            "group_new_1": {
              "code": "pricing",
              "name": "Pricing",
              "column": 2,
              "position": 2,
              "custom_attributes": [ { "id": 11, "position": 1 } ]
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminAttributeFamily": {
            "adminAttributeFamily": { "id": "/api/admin/attribute_families/4", "_id": 4 }
          }
        }
      }
---

# Attribute Family — Update

Updates an existing attribute family. Equivalent to
[`PUT /api/admin/catalog/families/{id}`](/api/rest-api/admin/catalog/families/families-update).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminAttributeFamily` | Mutation | Update an existing attribute family |

## `attribute_groups` semantics

The `attribute_groups` field is an **object** keyed by numeric group ids (to
update existing groups) or `group_*` placeholders (to create new groups).
Existing ids that are omitted from the payload are deleted. Each value
carries `code`, `name`, `column`, `position`, and `custom_attributes` as
documented on the [REST page](/api/rest-api/admin/catalog/families/families-update).
