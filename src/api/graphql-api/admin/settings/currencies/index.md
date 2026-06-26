---
outline: false
---

# Currencies

The Currencies menu is the store-wide list of every currency the store can price and display amounts in, plus the actions you can take on a single currency. It mirrors the admin **Settings → Currencies** screen.

## What this menu controls

Each currency defines two things:

1. **Identity** — its ISO `code` (e.g. `USD`) and display `name` (e.g. `US Dollar`).
2. **Formatting** — how a monetary amount is rendered in that currency: the `symbol`, the number of decimal places, the thousands/decimal separators, and where the symbol sits relative to the amount.

A currency must exist here before a channel can use it as a base or display currency, and before exchange rates can be defined against it.

## When a row appears here

A currency row exists once it has been **created** — either seeded with the store (the default `USD`) or added via the [Create](./create.md) mutation. There is no automatic creation; currencies are configured by an admin.

## Field meanings

| Field | Meaning |
|-------|---------|
| `code` | 3-letter ISO currency code, stored uppercase and unique. |
| `name` | Human-readable display name. |
| `symbol` | The symbol shown with amounts (e.g. `$`, `€`). May be `null`. |
| `decimal` | Number of decimal places to render (e.g. `2` → `10.00`). |
| `groupSeparator` | Character that groups thousands (e.g. `,` → `1,000`). |
| `decimalSeparator` | Character before the decimal portion (e.g. `.` → `10.50`). |
| `currencyPosition` | `left` or `right` — whether the symbol is a prefix (`$10`) or suffix (`10$`). May be `null`. |

## Create / update / delete behaviour

- **Create** requires `code` + `name`; the formatting fields are optional.
- **Update** changes the name and formatting fields. **`code` is immutable** — it is not part of the update input type, so it can never be changed after creation.
- **Delete** removes a single currency; **Mass delete** removes several by id.

## Delete guards

A currency cannot be deleted if either of these is true:

- It is the **last remaining currency** — the store always needs at least one.
- It is set as a **channel's base currency** — remove or reassign it on the channel first.

Both the single [Delete](./delete.md) and [Mass delete](./mass-delete.md) operations enforce these guards.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List currencies](./list.md) | `adminSettingsCurrencies` query |
| [Get a single currency](./detail.md) | `adminSettingsCurrency(id:)` query |
| [Create a currency](./create.md) | `createAdminSettingsCurrency` mutation |
| [Update a currency](./update.md) | `updateAdminSettingsCurrency` mutation |
| [Delete a currency](./delete.md) | `deleteAdminSettingsCurrency` mutation |
| [Mass delete currencies](./mass-delete.md) | `createAdminSettingsCurrencyMassDelete` mutation |

Permissions: `settings.currencies.create` / `.edit` / `.delete`.

All operations require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
