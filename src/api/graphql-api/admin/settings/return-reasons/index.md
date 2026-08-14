---
outline: false
---

# Return Reasons

The **Return Reasons** menu is part of the store's **RMA (Returns) settings**. Return / cancel reasons the RMA form offers a customer when they open a return. Each reason has a title, a display position, an active status, an `isAdmin` flag, and a `resolutionType` — the set of return actions the reason allows.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List]( ./queries/list ) | `adminRmaReasons` query |
| [Get]( ./queries/get ) | `adminRmaReason(id:)` query |
| [Create]( ./mutations/create ) | `createAdminRmaReason` mutation |
| [Update]( ./mutations/update ) | `updateAdminRmaReason` mutation |
| [Delete]( ./mutations/delete ) | `deleteAdminRmaReason` mutation |
| [Mass delete]( ./mutations/mass-delete ) | `createAdminRmaReasonMassDelete` mutation |
| [Mass update status]( ./mutations/mass-update-status ) | `createAdminRmaReasonMassUpdateStatus` mutation |

List queries are cursor-paginated Relay connections.

## Fields

| Field | Meaning |
|-------|---------|
| `title` | The reason label shown to the customer. |
| `status` | `1` active, `0` inactive. |
| `position` | Sort order in the returns form. |
| `isAdmin` | `1` if the reason was created by an admin, `0` if it is a seeded reason. |
| `resolutionType` | The return actions this reason allows — an array of `return` and/or `cancel_items`. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

Select `_id` for the numeric id; `id` is the resource IRI.

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.reasons.create` |
| Update / mass update status | `sales.rma.reasons.edit` |
| Delete / mass delete | `sales.rma.reasons.delete` |
