---
outline: false
examples:
  - id: admin-catalog-family-delete
    title: Delete Attribute Family
    description: Refused if the family is the last one in the store or if any product is using it. Mirrors DELETE /api/admin/catalog/families/{id}.
    query: |
      mutation DeleteFamily($input: deleteAdminAttributeFamilyInput!) {
        deleteAdminAttributeFamily(input: $input) {
          adminAttributeFamily { id }
        }
      }
    variables: |
      {
        "input": { "id": "/api/admin/catalog/families/4" }
      }
    response: |
      {
        "data": {
          "deleteAdminAttributeFamily": {
            "adminAttributeFamily": { "id": "/api/admin/catalog/families/4" }
          }
        }
      }
---

# Attribute Family — Delete

Deletes an attribute family. Equivalent to
[`DELETE /api/admin/catalog/families/{id}`](/api/rest-api/admin/catalog/families/families-delete).

::: tip Prerequisites
The example uses an illustrative `id` value. Replace it with the id of a attribute family that exists in your store — use the [`adminAttributeFamilies`](./families-listing.md) query to discover valid ids.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminAttributeFamily` | Mutation | Delete an attribute family |

## Errors

| Condition | Message |
|-----------|---------|
| Family is the last one in the store | `At least one attribute family is required.` |
| One or more products still use the family | `Cannot delete — attribute family is in use by N product(s).` |
| Unknown id | `Attribute family not found.` |
