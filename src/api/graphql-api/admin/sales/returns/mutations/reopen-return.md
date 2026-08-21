---
outline: false
examples:
  - id: admin-return-reopen-gql
    title: Reopen Return
    description: Reopen a declined or canceled RMA back to pending when store settings allow it (otherwise the mutation returns an error).
    query: |
      mutation ReopenReturn($input: reopenAdminReturnInput!) {
        reopenAdminReturn(input: $input) {
          adminReturn {
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
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/rma/requests/12"
        }
      }
    response: |
      {
        "data": {
          "reopenAdminReturn": {
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
              "images": [],
              "availableStatuses": [
                { "id": 2, "title": "Accept" },
                { "id": 3, "title": "Declined" }
              ],
              "messagesCount": 3,
              "createdAt": "2026-07-20T10:15:30+00:00",
              "updatedAt": "2026-07-20T11:20:00+00:00"
            }
          }
        }
      }
---

# Reopen Return (GraphQL)

Reopens a declined or canceled RMA request back to **Pending**. The `canReopen` flag on the request detail tells you whether reopening is currently possible; when store settings disallow it the mutation returns an error in `errors[]`.

## Input

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | `ID` | yes | The return IRI (`/api/admin/rma/requests/{id}`). |

See the [Returns overview](/api/graphql-api/admin/sales/returns/) for the status workflow.

Permission: `sales.rma.requests`.
