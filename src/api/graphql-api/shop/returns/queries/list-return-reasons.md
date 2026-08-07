---
outline: false
examples:
  - id: list-return-reasons
    title: List Return Reasons
    description: List the active reasons a customer can pick when raising a return, filtered by resolution type.
    query: |
      query ReturnReasons($resolutionType: String!) {
        returnReasons(resolutionType: $resolutionType) {
          _id
          title
          position
        }
      }
    variables: |
      {
        "resolutionType": "return"
      }
    response: |
      {
        "data": {
          "returnReasons": [
            {
              "_id": 2,
              "title": "Damaged product",
              "position": 1
            },
            {
              "_id": 3,
              "title": "Wrong item delivered",
              "position": 2
            },
            {
              "_id": 4,
              "title": "No longer needed",
              "position": 3
            }
          ]
        }
      }
    commonErrors:
      - error: resolutionType required
        cause: The resolutionType argument is missing or not one of return / cancel_items
        solution: Provide a valid resolutionType — either "return" or "cancel_items"
      - error: UNAUTHENTICATED
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
---

# List Return Reasons

## About

The `returnReasons` query lists the active reasons a customer can pick when raising a return, filtered by the resolution type. Use a reason's `_id` as the `rmaReasonId` when calling [`createCustomerReturn`](/api/graphql-api/shop/returns/mutations/create-return).

## Authentication

This query requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/graphql-api/authentication) page.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `resolutionType` | `String!` | ✅ Yes | The resolution the reasons apply to — `return` or `cancel_items`. |

## Possible Returns

The query returns a plain list of reasons, not a cursor connection — there is no `edges`, `pageInfo`, or `totalCount` to select, and no pagination arguments. Every active reason for the resolution type comes back in one response.

| Field | Type | Description |
|-------|------|-------------|
| `_id` | `Int!` | Numeric reason id — use as `rmaReasonId` when raising a return. |
| `title` | `String!` | Reason label, e.g. `Damaged product`. |
| `position` | `Int!` | Display order position. |

## Related Resources

- [List Returnable Items](/api/graphql-api/shop/returns/queries/list-returnable-items)
- [Raise a Return](/api/graphql-api/shop/returns/mutations/create-return)
- [Returns Overview](/api/graphql-api/shop/returns/)
