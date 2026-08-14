---
outline: false
examples:
  - id: admin-inventory-source-create-gql
    title: Create Inventory Source
    description: Register a new inventory source. The create mutation returns the full source.
    query: |
      mutation CreateAdminSettingsInventorySource($input: createAdminSettingsInventorySourceInput!) {
        createAdminSettingsInventorySource(input: $input) {
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
          "code": "warehouse-west",
          "name": "West Coast Warehouse",
          "description": "Secondary fulfillment hub",
          "contactName": "Ops Team",
          "contactEmail": "ops.west@example.com",
          "contactNumber": "+15553334444",
          "contactFax": "+15553335555",
          "country": "US",
          "state": "CA",
          "city": "Oakland",
          "street": "500 Harbor Blvd",
          "postcode": "94607",
          "priority": 3,
          "status": 1
        }
      }
    response: |
      {
        "data": {
          "createAdminSettingsInventorySource": {
            "adminSettingsInventorySource": {
              "id": "/api/admin/settings/inventory-sources/59",
              "_id": 59,
              "code": "warehouse-west",
              "name": "West Coast Warehouse",
              "description": "Secondary fulfillment hub",
              "contactName": "Ops Team",
              "contactEmail": "ops.west@example.com",
              "contactNumber": "+15553334444",
              "contactFax": "+15553335555",
              "country": "US",
              "state": "CA",
              "city": "Oakland",
              "street": "500 Harbor Blvd",
              "postcode": "94607",
              "priority": 3,
              "latitude": null,
              "longitude": null,
              "status": 1,
              "createdAt": "2026-06-19T17:39:22+05:30",
              "updatedAt": "2026-06-19T17:39:22+05:30"
            }
          }
        }
      }
---

# Create Inventory Source

Registers a new inventory source and returns the full created source.

For field meanings and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `createAdminSettingsInventorySource(input:)` | Mutation | Create an inventory source |

`code`, `name`, the contact fields (`contactName`, `contactEmail`, `contactNumber`) and the address fields (`country`, `state`, `city`, `street`, `postcode`) are required. `description`, `contactFax`, `priority`, `latitude`, `longitude` and `status` are optional. `code` must be unique; a duplicate is rejected (equivalent to HTTP 422 on REST).

Permission: `settings.inventory_sources.create`.
