---
outline: false
examples:
  - id: admin-customer-group-mass-delete-gql
    title: Mass Delete Customer Groups
    query: |
      mutation MassDelete($input: createAdminCustomerGroupMassDeleteInput!) {
        createAdminCustomerGroupMassDelete(input: $input) { adminCustomerGroupMassDelete { deleted skipped message } }
      }
    variables: |
      { "input": { "indices": [4, 5, 1] } }
    response: |
      { "data": { "createAdminCustomerGroupMassDelete": { "adminCustomerGroupMassDelete": { "deleted": [5], "skipped": [{ "id": 1, "reason": "System group cannot be deleted" }, { "id": 4, "reason": "Group has customers attached" }], "message": "Customer groups processed." } } } }
---

# Mass Delete Customer Groups (GraphQL)

Permission: `customers.groups.delete`.
