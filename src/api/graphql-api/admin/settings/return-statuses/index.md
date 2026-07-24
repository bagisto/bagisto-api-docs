---
outline: false
---

# Return Statuses

The **Return Statuses** menu is part of the store's **RMA (Returns) settings**. Custom return statuses used to track a return through your workflow. Each status has a title, a `color` badge and an active flag. Built-in (`default`) statuses cannot be deleted.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List]( ./queries/list ) | `adminRmaStatuses` query |
| [Get]( ./queries/get ) | `adminRmaStatus(id:)` query |
| [Create]( ./mutations/create ) | `createAdminRmaStatus` mutation |
| [Update]( ./mutations/update ) | `updateAdminRmaStatus` mutation |
| [Delete]( ./mutations/delete ) | `deleteAdminRmaStatus` mutation |
| [Mass delete]( ./mutations/mass-delete ) | `createAdminRmaStatusMassDelete` mutation |
| [Mass update status]( ./mutations/mass-update-status ) | `createAdminRmaStatusMassUpdateStatus` mutation |

List queries are cursor-paginated Relay connections.

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The status label. |
| `status` | `1` active, `0` inactive. |
| `color` | Hex color of the status badge (e.g. `#FDB022`). |
| `default` | `1` for a built-in system status (cannot be deleted), `0` for a custom one. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

Select `_id` for the numeric id; `id` is the resource IRI.

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.statuses.create` |
| Update / mass update status | `sales.rma.statuses.edit` |
| Delete / mass delete | `sales.rma.statuses.delete` |

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
