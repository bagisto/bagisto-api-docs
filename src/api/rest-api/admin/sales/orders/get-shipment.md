---
outline: false
apiType: rest
examples:
  - id: admin-get-shipment
    title: Get Shipment
    description: Fetch a single shipment with totals and embedded line items.
    query: |
      curl -X GET "https://your-domain.com/api/admin/shipments/55" \
        -H "Authorization: Bearer <token>"
    variables: |
      {}
    response: |
      {
        "id": 55,
        "orderId": 2392,
        "status": "1",
        "totalQty": 3,
        "totalWeight": 1.2,
        "carrierCode": null,
        "carrierTitle": "UPS",
        "trackNumber": "1Z999AA1",
        "emailSent": false,
        "inventorySourceId": 1,
        "inventorySourceName": "Default",
        "createdAt": "2026-05-21 11:02:18",
        "updatedAt": "2026-05-21 11:02:18",
        "items": [
          {
            "id": 401,
            "orderItemId": 42,
            "sku": "WS-12-S",
            "name": "Argus All-Weather Tank-S",
            "qty": 3
          }
        ]
      }
    commonErrors:
      - error: Not Found (404)
        cause: Unknown shipment ID
        solution: Verify the shipment ID
      - error: Unauthorized (401)
        cause: Missing or invalid admin Bearer token
        solution: Send a valid admin Bearer token (Integration token) in the Authorization header. See the Authentication page.
---

# Get Shipment

Returns a single shipment with totals and embedded line items.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/shipments/{id}` | GET |
