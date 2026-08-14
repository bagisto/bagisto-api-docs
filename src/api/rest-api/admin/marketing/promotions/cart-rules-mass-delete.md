---
outline: false
apiType: rest
examples:
  - id: mass-delete
    title: Mass Delete Cart Rules
    description: Delete several cart rules in one call. Non-existent ids are silently skipped.
    query: |
      curl -X POST "https://your-domain.com/api/admin/marketing/cart-rules/mass-delete" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "indices": [12, 18]
        }'
    variables: |
      {}
    response: |
      {
        "deleted": [12, 18],
        "skipped": [],
        "message": "Cart rules deleted."
      }
---

# Mass Delete Cart Rules

Deletes several cart rules in one call — the **Mass Delete** action on the admin
**Marketing → Promotions → Cart Rules** datagrid.

New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/mass-delete` | POST |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Non-existent ids are **silently skipped** (returned in `skipped`); the ids
  actually removed are returned in `deleted`.
- An empty or missing `indices` list returns a `422` error.

## Request body

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `indices` | int[] | yes | Non-empty list of numeric rule ids to delete |
