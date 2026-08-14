---
outline: false
examples:
  - id: admin-customer-group-mass-delete-gql
    title: Mass Delete Customer Groups
    query: |
      mutation MassDelete($input: createAdminCustomerGroupMassDeleteInput!) {
        createAdminCustomerGroupMassDelete(input: $input) {
          adminCustomerGroupMassDelete {
            deleted
            skipped {
              id
              reason
            }
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "indices": [4, 5, 1]
        }
      }
    response: |
      {
        "data": {
          "createAdminCustomerGroupMassDelete": {
            "adminCustomerGroupMassDelete": {
              "deleted": [5],
              "skipped": [
                {
                  "id": 1,
                  "reason": "System group cannot be deleted"
                },
                {
                  "id": 4,
                  "reason": "Group has customers attached"
                }
              ],
              "message": "Customer groups processed."
            }
          }
        }
      }
---

# Mass Delete Customer Groups (GraphQL)

Deletes several customer groups in one call. Each id is checked individually — system groups and groups with customers attached are skipped with a reason instead of aborting the whole batch. `deleted` lists the ids that were removed, `skipped` lists the ones that were left in place.

Permission: `customers.groups.delete`.

See the [Customer Groups overview](/api/graphql-api/admin/customers/groups/) for what customer groups do and how they relate to the rest of the store.
