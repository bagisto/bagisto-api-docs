---
outline: false
examples:
  - id: delete
    title: Delete Cart Rule
    description: Delete a cart rule by id. A successful delete returns no errors; the rule is removed.
    query: |
      mutation DeleteAdminMarketingCartRule(
        $input: deleteAdminMarketingCartRuleInput!
      ) {
        deleteAdminMarketingCartRule(input: $input) {
          adminMarketingCartRule {
            _id
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/marketing/cart-rules/47"
        }
      }
    response: |
      {
        "data": {
          "deleteAdminMarketingCartRule": {
            "adminMarketingCartRule": null
          }
        }
      }
---

# Delete Cart Rule

Deletes a cart rule — the **Delete** row action on the admin
**Marketing → Promotions → Cart Rules** screen.

::: tip
New here? Read the [Cart Rules overview](/api/graphql-api/admin/marketing/promotions/cart-rules/) for what a cart rule does and how its fields behave.
:::

## Operation

| Operation | Type | Purpose |
|-----------|------|---------|
| `deleteAdminMarketingCartRule` | Mutation | Delete a cart rule |

## Details

- Requires an admin Bearer token and the `marketing.promotions.cart_rules.delete`
  permission.
- Pass the rule's IRI as `id`. Use the
  [list](/api/graphql-api/admin/marketing/promotions/cart-rules-list) query to
  discover valid ids.

::: warning Confirm success via the absence of `errors`
The delete mutation returns a success acknowledgement, not the deleted rule's
data — `adminMarketingCartRule` resolves to `null` on the payload. **Treat a
response with no `errors[]` as a successful delete.** If you need a confirmation
message in the body, use the REST endpoint
(`DELETE /api/admin/marketing/cart-rules/{id}`), which returns
`{ "message": "Cart rule deleted." }`.
:::

## Input fields

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | ID | Yes | The rule's IRI |
