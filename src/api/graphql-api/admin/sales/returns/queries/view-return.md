---
outline: false
examples:
  - id: admin-return-detail-gql
    title: Return Detail
    description: Full detail of a single return request — the returned item, images, status, order/customer context, whether it can be reopened, and the status transitions the admin may set next.
    query: |
      query AdminReturn($id: ID!) {
        adminReturn(id: $id) {
          id
          _id
          orderId
          orderIncrementId
          orderStatus
          customerName
          customerEmail
          isGuest
          statusId
          statusTitle
          statusColor
          packageCondition
          information
          canReopen
          item
          images
          availableStatuses
          messagesCount
          createdAt
          updatedAt
        }
      }
    variables: |
      {
        "id": "/api/admin/rma/requests/12"
      }
    response: |
      {
        "data": {
          "adminReturn": {
            "id": "/api/admin/rma/requests/12",
            "_id": 12,
            "orderId": 45,
            "orderIncrementId": "000000045",
            "orderStatus": "processing",
            "customerName": "Jane Doe",
            "customerEmail": "jane@example.com",
            "isGuest": 0,
            "statusId": 1,
            "statusTitle": "Pending",
            "statusColor": "#FDB022",
            "packageCondition": "opened",
            "information": "Customer reported a defect.",
            "canReopen": false,
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
            "images": [
              {
                "id": 5,
                "path": "rma/12/damage-front.png",
                "url": "https://example.com/storage/rma/12/damage-front.png"
              }
            ],
            "availableStatuses": [
              { "id": 2, "title": "Accept" },
              { "id": 3, "title": "Declined" }
            ],
            "messagesCount": 2,
            "createdAt": "2026-07-20T10:15:30+00:00",
            "updatedAt": "2026-07-20T10:15:30+00:00"
          }
        }
      }
---

# Return Detail (GraphQL)

Returns a single RMA request by IRI, with the returned item, proof images, status, order/customer context, the `canReopen` flag, and the `availableStatuses` transitions the admin may set next.

The `id` argument is the request IRI (`/api/admin/rma/requests/{id}`).

## Field notes

- `item` is the returned line: `id`, `order_item_id`, `sku`, `name`, `quantity`, `resolution` (`return` or `cancel_items`), `reason_id`, `reason`, and `variant_id`. Select it bare (it is a JSON value).
- `images` is a list of `{ id, path, url }`.
- `availableStatuses` is a list of `{ id, title }` — the status ids you may pass to [Update Status](../mutations/update-status.md).

See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the status workflow and action semantics.

Permission: `sales.rma.requests`.
