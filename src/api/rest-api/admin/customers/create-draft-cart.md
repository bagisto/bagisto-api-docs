---
outline: false
apiType: rest
examples:
  - id: admin-customer-create-draft-cart
    title: Create Draft Cart
    description: Bootstrap an empty admin draft cart (`is_active = false`) for the given customer. Returns the `cartId` the admin uses for the rest of the Create-Order flow.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/7/draft-carts" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json"
    variables: |
      {}
    response: |
      {
        "cartId": 412,
        "customerId": 7,
        "success": true,
        "message": "Draft cart created."
      }
    commonErrors:
      - error: Not Found (404)
        cause: customerId in the URL does not match any customer
        solution: Verify the customer exists before calling this endpoint
      - error: Unprocessable Entity (422)
        cause: The underlying Cart::createCart facade refused (e.g. inactive channel)
        solution: Confirm a default channel + valid customer; review the error message
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Create Draft Cart

Starts a fresh Create-Order session by spawning an empty draft cart
(`is_active = false`) bound to the given customer. This is the customer-nested
counterpart to the `POST /api/admin/orders/{id}/reorder` action (which builds
the cart from an existing order). Both flows produce the same kind of draft
cart and end up at the cart-keyed write endpoints
(`POST /api/admin/carts/{id}/items`, addresses, shipping, payment).

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/draft-carts` | POST |

The customer is taken from the URL — the request body is empty.

## Response Fields

| Field | Type | Description |
|-------|------|-------------|
| `cartId` | integer | The new draft cart's ID — use it for the rest of the Create-Order flow. |
| `customerId` | integer | The customer the cart belongs to. |
| `success` | boolean | Whether the cart was created. |
| `message` | string | Result message. |

## Why a separate endpoint and not just one cart-create route

The customer-nested URL keeps fresh Create-Order distinct from Reorder, which
is important because the two have completely different inputs and side-effects.
Reorder consumes an existing order id; this endpoint only needs the customer.

::: tip
For how the Create-Order helper panels fit together, see the [Create-Order Helpers overview](./create-order-helpers/index.md).
:::
