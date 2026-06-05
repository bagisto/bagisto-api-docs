---
outline: false
apiType: rest
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

Only `select`, `multiselect`, and `checkbox` attributes have options (e.g. a `color` attribute's Red / Green / Blue). Options are managed through their own endpoints under the attribute, and each option carries its own per-locale translations. A `select` attribute can also drive **swatches** (`swatchType` = dropdown / color / image) used on the storefront.

## Configurable, filterable, system

- **`isConfigurable`** — whether the attribute can be used as a variant-defining attribute for configurable products (e.g. colour × size). Only `select`-type attributes qualify.
- **`isFilterable`** — whether it appears in storefront layered navigation.
- **`isRequired` / `isUnique`** — validation on the product form.
- **`valuePerLocale` / `valuePerChannel`** — whether the value can differ per locale / per channel.
- **System attributes** (`isUserDefined = false`) are the built-in fields (sku, name, price, …). Their `code` and `type` are immutable and they cannot be deleted.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List attributes](/api/rest-api/admin/catalog/attributes/attributes-listing) | `GET /api/admin/catalog/attributes` |
| [Attribute detail](/api/rest-api/admin/catalog/attributes/attributes-detail) | `GET /api/admin/catalog/attributes/{id}` |
| [Create attribute](/api/rest-api/admin/catalog/attributes/attributes-create) | `POST /api/admin/catalog/attributes` |
| [Update attribute](/api/rest-api/admin/catalog/attributes/attributes-update) | `PUT /api/admin/catalog/attributes/{id}` |
| [Delete attribute](/api/rest-api/admin/catalog/attributes/attributes-delete) | `DELETE /api/admin/catalog/attributes/{id}` |
| [Mass delete](/api/rest-api/admin/catalog/attributes/attributes-mass-delete) | `POST /api/admin/catalog/attributes/mass-delete` |
| [Attribute options (CRUD)](/api/rest-api/admin/catalog/attributes/attribute-options) | `POST` / `PUT` / `DELETE /api/admin/catalog/attributes/{id}/options[/{optionId}]` |

The single-attribute endpoint embeds the full `translations` and `options` (with their translations) inline; the listing leaves those two heavy blocks out (fetch them by id).

All Attributes endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication). Reads require `catalog.attributes.view`; writes require the matching `catalog.attributes.create` / `.edit` / `.delete` permission.
