---
outline: false
examples:
  - id: gql
    title: Role Detail
    query: |
      query RoleDetail($id: ID!) {
        adminSettingsRole(id: $id) {
          id
          _id
          name
          description
          permissionType
          permissions
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/settings/roles/2"
      }
    response: |
      {
        "data": {
          "adminSettingsRole": {
            "id": "/api/admin/settings/roles/2",
            "_id": 2,
            "name": "Sales",
            "description": "For Admin who we want only sales then we can provide this role to them",
            "permissionType": "custom",
            "permissions": [
              "sales",
              "sales.orders",
              "sales.orders.create",
              "sales.orders.view",
              "sales.orders.cancel",
              "sales.invoices",
              "sales.invoices.view",
              "sales.invoices.create",
              "sales.shipments",
              "sales.shipments.view",
              "sales.shipments.create",
              "sales.refunds",
              "sales.refunds.view",
              "sales.refunds.create",
              "sales.transactions",
              "sales.transactions.view"
            ],
            "createdAt": "2026-05-06T15:39:34+05:30",
            "updatedAt": "2026-05-06T15:39:34+05:30"
          }
        }
      }
---

# Role Detail (GraphQL)

Fetches a single role by its IRI id, returning its full permission set.

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsRole(id:)` | Query | Fetch one role with all fields |

## Quirks

- `id` is the IRI form (`/api/admin/settings/roles/{id}`); `_id` is the numeric id.
- For a `custom` role, `permissions` is the full **string array** of granted permission keys.
- For an `all` role, `permissions` is `null` — the role has full access with no explicit key list.

