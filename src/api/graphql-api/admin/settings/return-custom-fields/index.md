---
outline: false
---

# Return Custom Fields

The **Return Custom Fields** menu is part of the store's **RMA (Returns) settings**. Extra fields the return form collects from the customer (for example a preferred-resolution dropdown). Each field has a `code`, `label`, input `type`, required flag, position and — for `select` / `multiselect` / `checkbox` / `radio` types — a list of `options`.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List]( ./queries/list ) | `adminRmaCustomFields` query |
| [Get]( ./queries/get ) | `adminRmaCustomField(id:)` query |
| [Create]( ./mutations/create ) | `createAdminRmaCustomField` mutation |
| [Update]( ./mutations/update ) | `updateAdminRmaCustomField` mutation |
| [Delete]( ./mutations/delete ) | `deleteAdminRmaCustomField` mutation |
| [Mass delete]( ./mutations/mass-delete ) | `createAdminRmaCustomFieldMassDelete` mutation |
| [Mass update status]( ./mutations/mass-update-status ) | `createAdminRmaCustomFieldMassUpdateStatus` mutation |

List queries are cursor-paginated Relay connections.

## Fields

| Field | Meaning |
|-------|---------|
| `code` | Unique machine code for the field. |
| `label` | The field label shown to the customer. |
| `type` | Input type: `text`, `textarea`, `select`, `multiselect`, `checkbox`, `radio`. |
| `isRequired` | `1` if the customer must fill it in, `0` otherwise. |
| `position` | Sort order in the returns form. |
| `inputValidation` | Optional validation rule name; `null` when none. |
| `status` | `1` active, `0` inactive. |
| `options` | Choice list for `select` / `multiselect` / `checkbox` / `radio` types — an array of `{ id, name, value }`. Empty/absent for `text` / `textarea`. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

Select `_id` for the numeric id; `id` is the resource IRI.

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.custom-fields.create` |
| Update / mass update status | `sales.rma.custom-fields.edit` |
| Delete / mass delete | `sales.rma.custom-fields.delete` |
