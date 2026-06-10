---
outline: false
examples:
  - id: gql
    title: Copy Cart Rule
    query: |
      mutation Copy($input: copyAdminMarketingCartRuleInput!) {
        copyAdminMarketingCartRule(input: $input) {
          adminMarketingCartRule {
            id
            _id
            name
            status
            channels
            customerGroups
          }
        }
      }
    variables: |
      { "input": { "id": "/api/admin/marketing/cart-rules/17" } }
    response: |
      { "data": { "copyAdminMarketingCartRule": { "adminMarketingCartRule": { "id": "/api/admin/marketing/cart-rules/42", "_id": 42, "name": "Copy of 10% off summer", "status": 0, "channels": [1], "customerGroups": [1, 2, 3] } } } }
---

# Copy Cart Rule (GraphQL)

Mutation: `copyAdminMarketingCartRule`. Duplicates an existing cart rule into a brand-new rule (the API equivalent of the listing's **Copy** action).

The `input.id` takes the **source** rule's IRI (e.g. `/api/admin/marketing/cart-rules/17`). The mutation returns the full detail of the newly created rule.

## What gets copied

| Field | Behaviour |
|-------|-----------|
| `name` | Prefixed with `Copy of `. |
| `status` | Forced to `0` (the copy starts inactive). |
| `channels` | Copied from the source rule. |
| `customerGroups` | Copied from the source rule. |
| Coupons | **Not** copied — the new rule has no coupons. |

An unknown source id returns an error in `errors[]`.

Permission: `marketing.promotions.cart_rules.create`.
