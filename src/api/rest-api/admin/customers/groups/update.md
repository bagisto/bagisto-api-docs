---
outline: false
apiType: rest
examples:
  - id: admin-customer-group-update
    title: Update Customer Group
    query: |
      curl -X PUT "https://your-domain.com/api/admin/customers/groups/4" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{ "name": "Wholesale Tier A" }'
    response: |
      {
        "id": 4,
        "code": "wholesale",
        "name": "Wholesale Tier A",
        "isUserDefined": 1,
        "customersCount": null,
        "createdAt": "2026-05-20 12:00:00",
        "updatedAt": "2026-06-24 10:15:00"
      }
---

# Update Customer Group

Edits a customer group. The update is partial — send only the fields you want to change. The response is the updated group.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/groups/{id}` | PUT |

`code` uniqueness excludes self.

### System group restrictions

For system groups (`is_user_defined=0`), attempting to change `code` or `is_user_defined` returns 422. Only `name` is editable.

Permission: `customers.groups.edit`.

For what customer groups are and the system-group rules, see the [Customer Groups overview](./index.md).
