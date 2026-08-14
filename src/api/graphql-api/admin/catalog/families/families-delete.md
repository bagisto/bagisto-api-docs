---
outline: false
examples:
  - id: admin-catalog-family-delete
    title: Delete Attribute Family
    description: Delete a family. Refused if it is the last family in the store or any product still uses it.
    query: |
      mutation DeleteAdminAttributeFamily($input: deleteAdminAttributeFamilyInput!) {
        deleteAdminAttributeFamily(input: $input) {
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
          "id": "/api/admin/catalog/families/4"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminAttributeFamily": {
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

# Attribute Family — Delete (GraphQL)

Deletes an attribute family. The `id` argument is the family IRI (`/api/admin/catalog/families/{id}`). The mutation returns a snapshot of the deleted family.

Two rules block the delete: the store must always keep at least one family, and a family that any product still belongs to cannot be removed. Reassign or remove those products first.

See the [Attribute Families overview](/api/graphql-api/admin/catalog/families/) for how this menu works.

| Condition | Message |
|-----------|---------|
| Family is the last one in the store | `At least one attribute family is required.` |
| One or more products still use the family | `Cannot delete — attribute family is in use by N product(s).` |
| Unknown id | `Attribute family not found.` |
