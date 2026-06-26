---
outline: false
---

# Tax Rates

The Tax Rates menu is the store-wide list of tax rates and the actions you can take on them. It mirrors the admin **Settings → Taxes → Tax Rates** screen.

## What a tax rate is

A **tax rate** is a single rule that defines the tax **percentage** for a location. Each rate targets a `country` (and optionally a `state`) plus a zip — either a **single** zip code or a zip-code **range**. On its own a rate does nothing to a product; rates are grouped into **Tax Categories**, and a tax category is then assigned to a product. At checkout, the rate whose location matches the customer's address determines the tax applied.

## Fields

| Field | Meaning |
|-------|---------|
| `identifier` | A unique label for the rate. |
| `isZip` | `true` = the rate targets a **zip range** (`zipFrom`–`zipTo`); `false` = it targets a **single** `zipCode`. |
| `zipCode` | The single zip code, set only when `isZip` is `false`. |
| `zipFrom` / `zipTo` | The start/end of the zip range, set only when `isZip` is `true`. |
| `state` / `country` | The location the rate applies to. `country` is a two-letter ISO code. |
| `taxRate` | The tax **percentage** (a number from 0 to 100). |

## Conditional zip rules

When you **create** or **update** a rate, the zip fields you must supply depend on `isZip`:

| `isZip` | Required zip fields | Targets |
|---------|---------------------|---------|
| `false` | `zipCode` | A single zip code |
| `true` | `zipFrom` **and** `zipTo` | A zip-code range |

Supplying `isZip: true` without `zipFrom`/`zipTo`, or `isZip: false` without `zipCode`, is rejected with a validation error. On update the rule is re-checked after your change is merged onto the existing rate — so if you flip `isZip` you must also send the matching zip field(s) in the same request.

## Create, update, delete

- **Create** adds a new rate. `identifier` must be unique, `country` is a two-letter ISO code, and `taxRate` is 0–100.
- **Update** is partial — send only the fields you want to change; omitted fields keep their current value. The conditional zip rules above are re-validated.
- **Delete** removes the rate permanently. Any tax categories that referenced it keep working; only the rate itself is removed.

There is **no mass-delete** and **no export** for tax rates over GraphQL — rates are deleted one at a time.

## Relationship to Tax Categories

Tax rates are the building blocks of **Tax Categories**. A tax category bundles one or more tax rates together; products are assigned a tax category, not individual rates. To change which rates a product taxes by, edit its tax category's rate list — see the [Tax Categories](/api/graphql-api/admin/settings/tax-categories/) menu.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List tax rates](./list) | `adminSettingsTaxRates` query |
| [Get a single tax rate](./detail) | `adminSettingsTaxRate(id:)` query |
| [Create a tax rate](./create) | `createAdminSettingsTaxRate` mutation |
| [Update a tax rate](./update) | `updateAdminSettingsTaxRate` mutation |
| [Delete a tax rate](./delete) | `deleteAdminSettingsTaxRate` mutation |

Permissions: `settings.taxes.tax_rates.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
