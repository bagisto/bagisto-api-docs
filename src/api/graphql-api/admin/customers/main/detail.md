---
outline: false
examples:
  - id: admin-customer-detail-gql
    title: Customer Detail
    description: Single customer with the linked group as a nested object and the detail-only counters resolved.
    query: |
      query AdminCustomer($id: ID!) {
        adminCustomer(id: $id) {
          id
          _id
          firstName
          lastName
          email
          phone
          gender
          status
          dateOfBirth
          channelId
          totalAddresses
          totalOrders
          totalAmountSpent
          createdAt
          updatedAt
          group {
            id
            code
            name
          }
        }
      }
    variables: |
      {
        "id": "/api/admin/customers/14"
      }
    response: |
      {
        "data": {
          "adminCustomer": {
            "id": "/api/admin/customers/14",
            "_id": 14,
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane@example.com",
            "phone": "+1-202-555-0148",
            "gender": "Female",
            "status": 1,
            "dateOfBirth": "1990-01-01",
            "channelId": 1,
            "totalAddresses": 2,
            "totalOrders": 5,
            "totalAmountSpent": 1240.5,
            "createdAt": "2026-05-20 12:00:00",
            "updatedAt": "2026-06-20 14:30:00",
            "group": {
              "id": 2,
              "code": "wholesale",
              "name": "Wholesale"
            }
          }
        }
      }
---

# Customer Detail

Returns a single customer by IRI. The linked group is a nested `group` object (`id` / `code` / `name`). This query additionally resolves the detail-only counters `totalAddresses`, `totalOrders` and `totalAmountSpent`, which are not populated on the listing.

The `id` argument is the customer IRI (`/api/admin/customers/{id}`).

::: tip
See the [Customers overview](/api/graphql-api/admin/customers/main/) for how the menu works.
:::

All admin operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
