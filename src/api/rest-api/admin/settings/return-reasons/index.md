---
outline: false
---

# Return Reasons

The **Return Reasons** menu is part of the store's **RMA (Returns) settings**. Return / cancel reasons the RMA form offers a customer when they open a return. Each reason has a title, a display position, an active status, an `isAdmin` flag, and a `resolutionType` — the set of return actions the reason allows.

## Endpoints

| Action | Method &amp; path |
|--------|-------------------|
| [List]( ./list ) | `GET /api/admin/rma/reasons` |
| [Get]( ./get ) | `GET /api/admin/rma/reasons/{id}` |
| [Create]( ./create ) | `POST /api/admin/rma/reasons` |
| [Update]( ./update ) | `PUT /api/admin/rma/reasons/{id}` |
| [Delete]( ./delete ) | `DELETE /api/admin/rma/reasons/{id}` |
| [Mass delete]( ./mass-delete ) | `POST /api/admin/rma/reasons/mass-delete` |
| [Mass update status]( ./mass-update-status ) | `POST /api/admin/rma/reasons/mass-update-status` |

List responses are wrapped in the standard `{ data, meta }` envelope.

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The reason label shown to the customer. |
| `status` | `1` active, `0` inactive. |
| `position` | Sort order in the returns form. |
| `isAdmin` | `1` if the reason was created by an admin, `0` if it is a seeded reason. |
| `resolutionType` | The return actions this reason allows — an array of `return` and/or `cancel_items`. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.reasons.create` |
| Update / mass update status | `sales.rma.reasons.edit` |
| Delete / mass delete | `sales.rma.reasons.delete` |
