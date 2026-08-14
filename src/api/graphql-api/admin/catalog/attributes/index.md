---
outline: false
---

# Attributes

Attributes are the fields a product can carry — `name`, `price`, `color`, `material`, and so on. The Attributes menu lists, creates, edits, and deletes them, and manages the selectable options of dropdown-style attributes. It mirrors the admin **Catalog → Attributes** screen.

## Attribute types

The `type` (fixed at creation) decides how the field is captured and stored:

| Type | Notes |
|------|-------|
| `text` / `textarea` | Free text / multi-line text. |
| `price` / `boolean` | A decimal price / a yes-no flag. |
| `date` / `datetime` | A date / a date-and-time. |
| `image` / `file` | An uploaded image / file. |
| `select` / `multiselect` / `checkbox` | A pick-list — these have **options** (see below). |

## Options (for select / multiselect / checkbox)

Only `select`, `multiselect`, and `checkbox` attributes have options (e.g. a `color` attribute's Red / Green / Blue). Options are managed through their own mutations under the attribute, and each option carries its own per-locale translations. A `select` attribute can also drive **swatches** (`swatchType` = dropdown / color / image) used on the storefront.

## Configurable, filterable, system

- **`isConfigurable`** — whether the attribute can be used as a variant-defining attribute for configurable products (e.g. colour × size). Only `select`-type attributes qualify.
- **`isFilterable`** — whether it appears in storefront layered navigation.
- **`isRequired` / `isUnique`** — validation on the product form.
- **`valuePerLocale` / `valuePerChannel`** — whether the value can differ per locale / per channel.
- **System attributes** (`isUserDefined = false`) are the built-in fields (sku, name, price, …). Their `code` and `type` are immutable and they cannot be deleted.

## Nested data is returned whole

On the single-attribute query, `translations` and `options` (with their nested `translations`) are returned as **whole JSON** — query each as a bare field (`options`, not `options { … }`); the entire array comes back, and it resolves over GraphQL.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List attributes](/api/graphql-api/admin/catalog/attributes/attributes-listing) | `adminAttributes` query |
| [Attribute detail](/api/graphql-api/admin/catalog/attributes/attributes-detail) | `adminAttribute(id:)` query |
| [Create attribute](/api/graphql-api/admin/catalog/attributes/attributes-create) | `createAdminAttribute` mutation |
| [Update attribute](/api/graphql-api/admin/catalog/attributes/attributes-update) | `updateAdminAttribute` mutation |
| [Delete attribute](/api/graphql-api/admin/catalog/attributes/attributes-delete) | `deleteAdminAttribute` mutation |
| [Mass delete](/api/graphql-api/admin/catalog/attributes/attributes-mass-delete) | `createAdminAttributeMassDelete` mutation |
| [Attribute options (CRUD)](/api/graphql-api/admin/catalog/attributes/attribute-options) | `createAdminAttributeOption` / `updateAdminAttributeOption` / `deleteAdminAttributeOption` mutations |

The single-attribute query embeds the full `translations` and `options` (with their translations) inline; the listing leaves those two heavy blocks out (fetch them by id).

Reads require `catalog.attributes.view`; writes require the matching `catalog.attributes.create` / `.edit` / `.delete` permission.
