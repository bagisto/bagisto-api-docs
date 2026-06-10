---
outline: false
examples:
  - id: admin-customer-group-create-gql
    title: Create Customer Group
    query: |
      mutation Create($input: createAdminCustomerGroupInput!) {
        createAdminCustomerGroup(input: $input) { adminCustomerGroup { id _id code name isUserDefined } }
      }
    variables: |
      { "input": { "code": "vip", "name": "VIP" } }
    response: |
      { "data": { "createAdminCustomerGroup": { "adminCustomerGroup": { "id": "/api/admin/customers/groups/5", "_id": 5, "code": "vip", "name": "VIP", "isUserDefined": 1 } } } }
---

# Create Customer Group (GraphQL)

Always `is_user_defined=1`. Permission: `customers.groups.create`.
