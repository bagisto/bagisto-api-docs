---
outline: false
apiType: rest
examples:
  - id: admin-customer-compare
    title: Get Customer's Compare Items
    description: The customer's compare list — the right-sidebar "Compare Items" panel on the Create-Order screen.
    query: |
      curl -X GET "https://your-domain.com/api/admin/customers/19/compare-items" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "data": [
          {
            "id": 12, "productId": 2358, "sku": "test65",
            "name": "Classic Watch Hand",
            "price": 4000, "formattedPrice": "$4,000.00",
            "productImage": "http://localhost:8000/storage/product/2358/example.webp"
          }
        ],
        "meta": { "currentPage": 1, "perPage": 1, "lastPage": 1, "total": 1, "from": 1, "to": 1 }
      }
---

# Customer Compare Items

The products the customer has added to their compare list. Right-sidebar panel on the Create-Order screen.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/compare-items` | GET |

## Response Fields

Returns the standard `{ data, meta }` envelope. Each row in `data`:

| Field | Type | Description |
|-------|------|-------------|
| `id` | integer | Compare item ID. |
| `productId` | integer | The product. |
| `sku` | string | Product SKU. |
| `name` | string | Product name. |
| `price` | number | Unit price. |
| `formattedPrice` | string | Currency-formatted unit price. |
| `productImage` | string \| null | Product thumbnail URL for the badge. |

Requires an admin Bearer token.

::: tip
For how the Create-Order helper panels fit together, see the [Customers overview](/api/rest-api/admin/customers/).
:::
