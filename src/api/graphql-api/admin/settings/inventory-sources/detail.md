---
outline: false
examples:
  - id: admin-inventory-source-detail-gql
    title: Inventory Source Detail
    description: Fetch a single inventory source by its IRI id. Returns every field.
    query: |
      query AdminSettingsInventorySource($id: ID!) {
        adminSettingsInventorySource(id: $id) {
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
    variables: |
      {
        "id": "/api/admin/settings/inventory-sources/1"
      }
    response: |
      {
        "data": {
          "adminSettingsInventorySource": {
            "id": "/api/admin/settings/inventory-sources/1",
            "_id": 1,
            "code": "default",
            "name": "Default",
            "description": null,
            "contactName": "Detroit Warehouse",
            "contactEmail": "warehouse@example.com",
            "contactNumber": "1234567899",
            "contactFax": null,
            "country": "US",
            "state": "MI",
            "city": "Detroit",
            "street": "12th Street",
            "postcode": "48127",
            "priority": 0,
            "latitude": null,
            "longitude": null,
            "status": 1,
            "createdAt": null,
            "updatedAt": null
          }
        }
      }
---

# Inventory Source Detail

Fetches a single inventory source by its IRI `id`. Returns every field for the source.

For field meanings and the delete guards, see the [Inventory Sources overview](/api/graphql-api/admin/settings/inventory-sources/).

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `adminSettingsInventorySource(id: ID!)` | Query | Fetch one inventory source |

The `id` is the resource IRI (`/api/admin/settings/inventory-sources/{id}`); `_id` is the numeric id. Use the [`adminSettingsInventorySources`](./list.md) query to discover valid ids. An unknown id returns an error (equivalent to HTTP 404 on REST).

### Empty timestamps

The seeded `default` source may report `createdAt` / `updatedAt` as `null` — that's a real stored-empty value, not the API withholding data. Sources created through the API carry timestamps.
