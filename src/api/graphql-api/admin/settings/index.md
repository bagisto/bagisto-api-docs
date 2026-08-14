---
outline: false
---

# Settings

The Settings section is where you configure the store itself — the languages and currencies it speaks, the storefronts it runs, the people who manage it, how tax is calculated, the look of the storefront, and bulk data import. These are the foundational records most other parts of the admin depend on: a product needs a tax category, an order needs a channel and a currency, an admin needs a role.

## Menus

| Menu | What it's for |
|------|----------------|
| [Locales](/api/graphql-api/admin/settings/locales/) | The languages (locale code, name, text direction, optional flag) the storefront can be shown in. Channels pick which locales they offer. |
| [Currencies](/api/graphql-api/admin/settings/currencies/) | The currencies the store can price and display in, plus each one's formatting — symbol, decimal places, separators, symbol position. |
| [Exchange Rates](/api/graphql-api/admin/settings/exchange-rates/) | The conversion rate from the base currency to each target currency, used to show prices in other currencies. Includes a one-click auto-sync from an external rate provider. |
| [Inventory Sources](/api/graphql-api/admin/settings/inventory-sources/) | The stock locations products draw quantity from. Channels are served from sources, and shipments ship from a chosen source. |
| [Channels](/api/graphql-api/admin/settings/channels/) | The storefronts — each with its own hostname, theme, default + allowed locales, base + allowed currencies, inventory sources, root category, and SEO / maintenance settings. |
| [Admin Users](/api/graphql-api/admin/settings/users/) | The back-office accounts that sign into the admin panel, each assigned a Role that grants their permissions. |
| [Roles](/api/graphql-api/admin/settings/roles/) | Named permission sets assigned to admin users — they decide what each admin can see and do. |
| [Themes](/api/graphql-api/admin/settings/themes/) | Per-channel storefront content blocks — carousels, static content, footer links, service blocks — and their per-locale content. (Not installable themes.) |
| [Tax Categories](/api/graphql-api/admin/settings/tax-categories/) | Named groups of tax rates that get assigned to products — the bridge between a product and the rates that apply to it. |
| [Tax Rates](/api/graphql-api/admin/settings/tax-rates/) | The individual rate rules — a percentage for a country / state and a zip or zip range — that tax categories are built from. |
| [Data Transfer Imports](/api/graphql-api/admin/settings/data-transfer-imports/overview) | Bulk-import products, customers, tax rates and more from CSV / XLSX, with a validate → start → link → index pipeline you drive step by step. |

## How these records relate

- A **Channel** is assembled from other Settings records: it picks its **Locales**, its **Currencies** (one of them the base), its **Inventory Sources**, and a root **Category**. **Exchange Rates** convert the base currency into the channel's other currencies for display.
- An **Admin User** is granted access through its **Role**. A role with permission type *custom* carries an explicit list of permission keys; *all* grants everything.
- A product's tax is decided by the **Tax Category** assigned to it, which is a group of **Tax Rates** (each rate matching a country/state + zip).

## Conventions across the Settings API

A few behaviours are common to every Settings menu over GraphQL:

- **Listings are cursor connections.** Every list query returns `edges { cursor node { … } } pageInfo { hasNextPage hasPreviousPage startCursor endCursor } totalCount`. Page with `first` + `after`.
- **Delete returns a snapshot of what was removed.** A delete mutation returns the just-deleted record, so you can select `id`, `_id` and its fields to confirm exactly what was deleted.
- **Mass-delete returns a plain id list.** A mass-delete (or mass-update-status) returns `deleted` / `skipped` / `updated` as plain integer arrays, plus a `message` string.
- **Some fields are JSON, queried bare.** Fields like a channel's `homeSeo` (or a translation node's per-locale `homeSeo`) are returned as whole JSON values — select them by name with **no** sub-selection. A channel's `locales` / `currencies` / `inventorySources` / `translations`, by contrast, are object connections — sub-select `{ edges { node { … } } }`.
