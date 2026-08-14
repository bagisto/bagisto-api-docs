---
outline: false
examples:
  - id: admin-inventory-source-update-gql
    title: Update Inventory Source
    description: Partial update — send the id plus only the fields you want to change. Returns the full source.
    query: |
      mutation UpdateAdminSettingsInventorySource($input: updateAdminSettingsInventorySourceInput!) {
        updateAdminSettingsInventorySource(input: $input) {
          adminSettingsInventorySource {
            id
            _id
            code
            name
            description
            contactName
            contactEmail
            contactNumber
            contactFax
            country
            state
            city
            street
            postcode
            priority
            latitude
            longitude
            status
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/settings/inventory-sources/58",
          "name": "East Coast (NY)",
          "priority": 5,
          "status": 0
        }
      }
    response: |
      {
        "data": {
          "updateAdminSettingsInventorySource": {
            "adminSettingsInventorySource": {
              "id": "/api/admin/settings/inventory-sources/58",
              "_id": 58,
              "code": "warehouse-east",
              "name": "East Coast (NY)",
              "description": null,
              "contactName": "Ops Team",
              "contactEmail": "ops.east@example.com",
              "contactNumber": "+15551112222",
              "contactFax": null,
              "country": "US",
              "state": "NY",
              "city": "Brooklyn",
              "street": "123 Front St",
              "postcode": "11201",
              "priority": 5,
              "latitude": null,
              "longitude": null,
              "status": 0,
              "createdAt": "2026-06-19T17:39:03+05:30",
              "updatedAt": "2026-06-19T17:39:31+05:30"
            }
          }
        }
      }
---

# Update Inventory Source

Partial update — send the `id` plus only the fields you want to change. Omitted fields keep their existing value. Returns the full updated source.

For field meanings and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `updateAdminSettingsInventorySource(input:)` | Mutation | Update an inventory source |

The `input.id` is the resource IRI. If you change `code`, the new value must remain unique. Use the [`adminSettingsInventorySources`](./list.md) query to discover valid ids.

Permission: `settings.inventory_sources.edit`.
