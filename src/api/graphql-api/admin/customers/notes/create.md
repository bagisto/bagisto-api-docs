---
outline: false
examples:
  - id: admin-customer-note-create-gql
    title: Add Note to Customer
    query: |
      mutation CreateNote($input: createAdminCustomerNoteInput!) {
        createAdminCustomerNote(input: $input) { adminCustomerNote { id _id customerId note customerNotified createdAt } }
      }
    variables: |
      { "input": { "customerId": 14, "note": "Followed up about return RMA-1023", "customerNotified": false } }
    response: |
      { "data": { "createAdminCustomerNote": { "adminCustomerNote": { "id": "/api/admin/customer_notes/5", "_id": 5, "customerId": 14, "note": "Followed up about return RMA-1023", "customerNotified": false, "createdAt": "2026-05-25 10:00:00" } } } }
---

# Add Customer Note (GraphQL)

Append-only. Permission: `customers.customers.edit`.
