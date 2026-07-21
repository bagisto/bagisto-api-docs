---
outline: false
---

# Return Statuses

The **Return Statuses** menu is part of the store's **RMA (Returns) settings**. Custom return statuses used to track a return through your workflow. Each status has a title, a `color` badge and an active flag. Built-in (`default`) statuses cannot be deleted.

## Endpoints

| Action | Method &amp; path |
|--------|-------------------|
| [List]( ./list ) | `GET /api/admin/rma/statuses` |
| [Get]( ./get ) | `GET /api/admin/rma/statuses/{id}` |
| [Create]( ./create ) | `POST /api/admin/rma/statuses` |
| [Update]( ./update ) | `PUT /api/admin/rma/statuses/{id}` |
| [Delete]( ./delete ) | `DELETE /api/admin/rma/statuses/{id}` |
| [Mass delete]( ./mass-delete ) | `POST /api/admin/rma/statuses/mass-delete` |
| [Mass update status]( ./mass-update-status ) | `POST /api/admin/rma/statuses/mass-update-status` |

List responses are wrapped in the standard `{ data, meta }` envelope.

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The status label. |
| `status` | `1` active, `0` inactive. |
| `color` | Hex color of the status badge (e.g. `#FDB022`). |
| `default` | `1` for a built-in system status (cannot be deleted), `0` for a custom one. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.statuses.create` |
| Update / mass update status | `sales.rma.statuses.edit` |
| Delete / mass delete | `sales.rma.statuses.delete` |

All endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
