---
outline: false
apiType: rest
examples:
  - id: admin-customer-gdpr-download-data
    title: Download GDPR Data Export
    description: Ad-hoc data dump (not bound to a GDPR request). Returns every table referencing the customer's id.
    query: |
      curl -X POST "https://your-domain.com/api/admin/customers/14/gdpr-download-data" \
        -H "Authorization: Bearer <token>"
    response: |
      {
        "customerId": 14,
        "customerEmail": "jane@example.com",
        "generatedAt": "2026-06-24T10:15:00+00:00",
        "data": {
          "customer": {
            "id": 14,
            "firstName": "Jane",
            "lastName": "Doe",
            "email": "jane@example.com"
          },
          "addresses": [
            { "id": 31, "city": "Mountain View", "country": "US", "postcode": "94043" }
          ],
          "orders": [
            { "id": 1042, "incrementId": "1042", "grandTotal": 4000, "status": "completed" }
          ],
          "reviews": [
            { "id": 21, "productId": 2358, "rating": 5, "status": "approved" }
          ],
          "wishlist": [
            { "id": 88, "productId": 2358 }
          ],
          "notes": [
            { "id": 7, "note": "Called the customer about delivery." }
          ]
        }
      }
---

# Download GDPR Data Export

Returns an ad-hoc data dump (not bound to a GDPR request) of everything stored for the customer.

See the [GDPR Requests overview](/api/rest-api/admin/customers/gdpr/) for the full feature flow.

| Endpoint | Method |
|----------|--------|
| `/api/admin/customers/{customerId}/gdpr-download-data` | POST |

## Response fields

| Field | Type | Notes |
|-------|------|-------|
| `customerId` | integer | The exported customer. |
| `customerEmail` | string | |
| `generatedAt` | string | When the export was produced. |
| `data.customer` | object | Profile fields. `password` and `remember_token` are never included. |
| `data.addresses` | array | The customer's saved addresses. |
| `data.orders` | array | Orders (with items, addresses, payment). |
| `data.reviews` | array | Product reviews authored by the customer. |
| `data.wishlist` | array | Wishlist entries. |
| `data.notes` | array | Admin notes recorded on the customer. |

### Full GDPR export

This covers addresses, orders, reviews, wishlist, and notes. A sub-section that has no rows returns an empty array.

Permission: `customers.gdpr_requests.view`.
