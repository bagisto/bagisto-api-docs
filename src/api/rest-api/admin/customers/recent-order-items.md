---
outline: false
apiType: rest
examples:
  - id: admin-customer-recent-items
    title: Get Customer's Recent Order Items
    description: Up to 5 most-recent distinct items the customer has ordered. Right-sidebar panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/recent-order-items" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 2694, "productId": 2358, "sku": "test65",
            "type": "simple", "name": "Classic Watch Hand",
            "price": 4000, "formattedPrice": "$4,000.00",
            "productImage": "http://localhost:8000/storage/product/2358/example.webp",
            "additional": { "quantity": 1 }
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Recent Order Items

Up to **5 most-recent distinct products** the customer has ordered — the
right-sidebar "Recent Order Items" panel on the Create-Order screen.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/recent-order-items` | GET |

## Response Fields

Returns the standard `{ data, meta }` envelope. Each row in `data`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Order item ID. |
| `productId` | integer | The product. |
| `sku` | string | Product SKU. |
| `type` | string | Product type — lets the client render type-specific UI. |
| `name` | string | Product name. |
| `price` | number | Unit price. |
| `formattedPrice` | string | Currency-formatted unit price. |
| `productImage` | string \| null | Product thumbnail URL. |
| `additional` | object \| null | Extra item attributes. |

The list is the most-recently ordered products, distinct by product, newest
first, limited to 5. Requires an admin Bearer token.

For how the Create-Order helper panels fit together, see the [Create-Order Helpers overview](./create-order-helpers/index.md).
