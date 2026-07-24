---
outline: false
examples:
  - id: create-return
    title: Raise a Return
    description: Raise a new return (RMA) request for one item of one of the authenticated customer's orders.
    request: |
      POST /api/shop/returns
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy
      Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

      {
        "order_id": 45,
        "order_item_id": 78,
        "rma_qty": 1,
        "resolution_type": "return",
        "rma_reason_id": 2,
        "information": "Item arrived damaged.",
        "package_condition": "opened",
        "agreement": true
      }
    response: |
      {
        "id": 12,
        "orderId": 45,
        "orderIncrementId": "000000045",
        "statusId": 1,
        "statusTitle": "Pending",
        "statusColor": "#FDB022",
        "packageCondition": "opened",
        "information": "Item arrived damaged.",
        "canClose": true,
        "canReopen": false,
        "isExpired": false,
        "item": {
          "id": 30,
          "order_item_id": 78,
          "sku": "COASTALBREEZEMENSHOODIE",
          "name": "Coastal Breeze Men's Blue Zipper Hoodie",
          "quantity": 1,
          "resolution": "return",
          "reason_id": 2,
          "reason": "Damaged product",
          "variant_id": null
        },
        "images": [],
        "messagesCount": 0,
        "createdAt": "2026-07-20T10:15:30.000000Z",
        "updatedAt": "2026-07-20T10:15:30.000000Z"
      }
    commonErrors:
      - error: 400 Bad Request
        cause: The item is outside its return window / already returned, the quantity is invalid, or agreement was not true
        solution: Query returnable-items first and send an eligible item, a valid quantity and agreement as true
      - error: 401 Unauthorized
        cause: Missing or invalid customer Bearer token
        solution: Log in and provide a valid customer authentication token
      - error: 403 Forbidden
        cause: Storefront key is missing or invalid
        solution: Provide a valid X-STOREFRONT-KEY header
      - error: 404 Not Found
        cause: The order does not exist or is not owned by the authenticated customer
        solution: Only order IDs belonging to the logged-in customer can be used
---

# Raise a Return

Raise a new return (RMA) request for one item of one of the customer's orders. The item must be return-eligible — check it with [`GET /api/shop/returnable-items`](/api/rest-api/shop/returns/list-returnable-items) first. The requested quantity (`rma_qty`) is capped server-side by the quantity the customer is actually allowed to return. The return starts in a `Pending` status.

## Endpoint

```
POST /api/shop/returns
```

## Authentication

This endpoint requires an authenticated customer — send the storefront key and a customer Bearer token. See the [Authentication](/api/rest-api/authentication) page.

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |
| `Authorization` | Yes | Bearer token (customer login required) |

## Request Body

```json
{
  "order_id": 45,
  "order_item_id": 78,
  "rma_qty": 1,
  "resolution_type": "return",
  "rma_reason_id": 2,
  "information": "Item arrived damaged.",
  "package_condition": "opened",
  "agreement": true
}
```

## Request Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| `order_id` | integer | Yes | Id of the order the item belongs to. |
| `order_item_id` | integer | Yes | Id of the order item being returned — from `returnable-items`. |
| `rma_qty` | integer | Yes | Quantity to return. Capped server-side by the returnable quantity. |
| `resolution_type` | string | Yes | `return` or `cancel_items`. |
| `rma_reason_id` | integer | Yes | Id of the chosen return reason — from `return-reasons`. |
| `information` | string | No | Free-text note about the return. |
| `package_condition` | string | No | Reported package condition, e.g. `opened`. |
| `agreement` | boolean | Yes | Must be `true` to confirm the return terms. |

::: tip Image attachments
Optional image files can be attached to the return by sending the request as `multipart/form-data` with an `images[]` field alongside the fields above.
:::

## Response Fields (201 Created)

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Return ID. |
| `orderId` | integer | Id of the order the item belongs to. |
| `orderIncrementId` | string | Human-readable order number. |
| `statusId` | integer | Numeric status id — `1` (Pending) for a fresh return. |
| `statusTitle` | string | Status label. |
| `statusColor` | string | Hex color for the status badge. |
| `packageCondition` | string | Reported package condition. |
| `information` | string | The note supplied when raising the return. |
| `canClose` | boolean | Whether the return can be closed. |
| `canReopen` | boolean | Whether the return can be reopened. |
| `isExpired` | boolean | Whether the return is past its action window. |
| `item` | object | The returned item — `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution`, `reason_id`, `reason`, `variant_id`. |
| `images` | array | Attached images (`id`, `path`, `url`). Empty when no files were sent. |
| `messagesCount` | integer | Number of conversation messages — `0` for a fresh return. |
| `createdAt` | string | ISO 8601 creation timestamp. |
| `updatedAt` | string | ISO 8601 last update timestamp. |

## Status Codes

| Status | Meaning |
|--------|---------|
| `201 Created` | Return raised; status is `Pending`. |
| `400 Bad Request` | Item not eligible, invalid quantity, or `agreement` not `true`. |
| `401 Unauthorized` | Missing or invalid customer Bearer token. |
| `403 Forbidden` | Missing or invalid storefront key. |
| `404 Not Found` | The order does not exist or is not the customer's. |

## Related Resources

- [List Returnable Items](/api/rest-api/shop/returns/list-returnable-items)
- [List Return Reasons](/api/rest-api/shop/returns/list-return-reasons)
- [Cancel a Return](/api/rest-api/shop/returns/cancel-return)
- [Returns Overview](/api/rest-api/shop/returns/)
