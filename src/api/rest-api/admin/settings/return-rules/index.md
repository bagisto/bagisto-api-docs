---
outline: false
---

# Return Rules

The **Return Rules** menu is part of the store's **RMA (Returns) settings**. Return rules set the **return window** (in days) for matching products. Each rule has a name, description, active status and a `returnPeriod` — the number of days after purchase a customer may still open a return.

## Endpoints

| Action | Method &amp; path |
|--------|-------------------|
| [List]( ./list ) | `GET /api/admin/rma/rules` |
| [Get]( ./get ) | `GET /api/admin/rma/rules/{id}` |
| [Create]( ./create ) | `POST /api/admin/rma/rules` |
| [Update]( ./update ) | `PUT /api/admin/rma/rules/{id}` |
| [Delete]( ./delete ) | `DELETE /api/admin/rma/rules/{id}` |
| [Mass delete]( ./mass-delete ) | `POST /api/admin/rma/rules/mass-delete` |
| [Mass update status]( ./mass-update-status ) | `POST /api/admin/rma/rules/mass-update-status` |

List responses are wrapped in the standard `{ data, meta }` envelope.

## Fields

| Field | Meaning |
|-------|---------|
| `name` | The rule label. |
| `description` | Free-text description of the rule. |
| `status` | `1` active, `0` inactive. |
| `returnPeriod` | The return window in **days** for products this rule matches. |
| `default` | `1` if this is the default rule, `0` otherwise. |
| `message` | `null` on create / update / read; populated only on the delete confirmation. |

## How RMA settings fit together

Reasons, statuses and custom fields shape the **returns form** the customer fills in when opening a return; **rules** set the **return window** that decides whether a product is still eligible. Together they make up the store's RMA (Returns) settings.

## Permissions

| Action | Permission |
|--------|-----------|
| Create | `sales.rma.rules.create` |
| Update / mass update status | `sales.rma.rules.edit` |
| Delete / mass delete | `sales.rma.rules.delete` |
