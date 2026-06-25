---
outline: false
examples:
  - id: admin-customer-note-create-gql
    title: Add Note to Customer
    query: |
      mutation CreateNote($input: createAdminCustomerNoteInput!) {
        createAdminCustomerNote(input: $input) {
          adminCustomerNote {
            id
            _id
            customerId
            note
            customerNotified
            createdAt
          }
        }
      }
    variables: |
      {
        "input": {
          "customerId": 14,
          "note": "Followed up about return RMA-1023",
          "customerNotified": false
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerNote": {
            "adminCustomerNote": {
              "id": "/api/admin/customer_notes/5",
              "_id": 5,
              "customerId": 14,
              "note": "Followed up about return RMA-1023",
              "customerNotified": false,
              "createdAt": "2026-05-25 10:00:00"
            }
          }
        }
      }
---

# Add Customer Note (GraphQL)

Appends a note to a customer's timeline. Notes are append-only — each call adds a new row and never overwrites an existing one. Set `customerNotified` to `true` to record that the customer was informed.

Permission: `customers.customers.edit`.

::: tip Menu overview
See the [Customer Notes overview](/api/graphql-api/admin/customers/) for how notes appear on the customer screen.
:::
