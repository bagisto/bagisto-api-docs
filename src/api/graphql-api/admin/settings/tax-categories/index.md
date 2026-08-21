---
outline: false
---

# Tax Categories

A **tax category** is a named group of tax rates. It is the bridge between your products and the individual tax rates that determine how much tax they're charged: each product is assigned a tax category, and the category carries the set of tax rates that apply. This menu mirrors the admin **Settings → Taxes → Tax Categories** screen.

## How tax categories fit together

Tax rates (under [Settings → Taxes → Tax Rates](../tax-rates/)) are the individual rate rows — each one is a percentage that applies under certain conditions (country, state, zip, etc.). A tax category bundles one or more of those rates under a single name. You then assign the category to a product, and at checkout the right rate from the category is applied to that product.

So the relationship is: **products → tax category → tax rates**. Editing a category changes which rates apply to every product that uses it.

## Fields

| Field | Meaning |
|-------|---------|
| `code` | A unique machine code identifying the category (used internally and when assigning the category to products). |
| `name` | The human-readable display name shown in the admin. |
| `description` | A free-text description of what the category is for. |
| `taxRates` | The tax rates attached to this category, exposed as a **field-selectable connection** — select `taxRates { edges { node { _id identifier taxRate } } }`. Each node carries the rate's `_id`, `identifier`, and `taxRate` (the percentage). This connection is **detail-only** — it resolves on the single-category query but has empty `edges` on the listing. |

## Creating, updating, and deleting

- **Create** — supply `code`, `name`, `description`, and a non-empty `taxrates` list of existing tax-rate ids. A tax category cannot be created without at least one rate attached.
- **Update** — re-syncs the category. The `taxrates` list you send **replaces** the current set (rates not in the list are detached, new ones are attached). It is required and must be non-empty.
- **Delete** — removes the category, but only if it has **no tax rates attached**. A category that still has rates attached is refused. Because both create and update require a non-empty `taxrates` list, a category becomes deletable only once it has no attached rates.

### Delete guard

You can't delete a tax category that still has tax rates attached — the request is refused. The category must be empty of rates before it can be removed.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List tax categories](./list.md) | `adminSettingsTaxCategories` query |
| [Get a tax category](./detail.md) | `adminSettingsTaxCategory(id:)` query |
| [Create a tax category](./create.md) | `createAdminSettingsTaxCategory` mutation |
| [Update a tax category](./update.md) | `updateAdminSettingsTaxCategory` mutation |
| [Delete a tax category](./delete.md) | `deleteAdminSettingsTaxCategory` mutation |

Permissions: `settings.taxes.tax_categories.create` / `.edit` / `.delete`.
