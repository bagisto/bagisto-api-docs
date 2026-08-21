---
outline: false
examples:
  - id: admin-customer-group-create-gql
    title: Create Customer Group
    query: |
      mutation Create($input: createAdminCustomerGroupInput!) {
        createAdminCustomerGroup(input: $input) {
          adminCustomerGroup {
            id
            _id
            code
            name
            isUserDefined
            customersCount
            createdAt
            updatedAt
          }
        }
      }
    variables: |
      {
        "input": {
          "code": "vip",
          "name": "VIP"
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerGroup": {
            "adminCustomerGroup": {
              "id": "/api/admin/customers/groups/5",
              "_id": 5,
              "code": "vip",
              "name": "VIP",
              "isUserDefined": 1,
              "customersCount": null,
              "createdAt": "2026-06-24 10:15:00",
              "updatedAt": "2026-06-24 10:15:00"
            }
          }
        }
      }
---

# Create Customer Group (GraphQL)

Creates a new customer group. API-created groups are always user-defined (`isUserDefined: 1`) — the three built-in system groups cannot be created through the API.

Permission: `customers.groups.create`.

See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
