---
outline: false
apiType: rest
examples:
  - id: delete
    title: Delete Cart Rule
    description: Delete a cart rule by id.
    query: |
      curl -X DELETE "https://your-domain.com/api/admin/marketing/cart-rules/47" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "message": "Cart rule deleted."
      }
---

# Delete Cart Rule

Deletes a cart rule — the **Delete** row action on the admin **Marketing →
Promotions → Cart Rules** screen.

New here? Read the [Cart Rules overview](/api/rest-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/marketing/cart-rules/{id}` | DELETE |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Returns a success message on completion.
- An unknown id returns a `404`.
