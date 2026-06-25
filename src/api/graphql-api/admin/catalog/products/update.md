---
outline: false
examples:
  - id: admin-catalog-product-update-simple
    title: Simple — every edit-form field
    description: Full update of a simple product covering every field on the edit form. Structural/common fields (price, cost, special price, weight, status, categories, channels, …) are named camelCase args; every other attribute code (name, url_key is named, but color, size, brand, product_number, GST, short_description, description, meta_*, length, width, height, manage_stock, up_sells, cross_sells, related_products, customizable_options) goes inside extras. Custom options (customizable_options) are supported on simple & virtual products only.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            price
            specialPrice
            weight
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/42",
          "urlKey": "arctic-beanie",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "new": 1,
          "featured": 1,
          "price": "99.99",
          "cost": "40.00",
          "specialPrice": "79.99",
          "specialPriceFrom": "2026-08-01",
          "specialPriceTo": "2026-08-31",
          "weight": "0.5",
          "taxCategoryId": 2,
          "categories": [1, 8],
          "channels": [1],
          "extras": {
            "name": "Arctic Beanie",
            "product_number": "PN-1001",
            "color": 1,
            "size": 6,
            "brand": 10,
            "GST": "5.00",
            "short_description": "Warm knit beanie.",
            "description": "Full HTML description.",
            "length": "10",
            "width": "5",
            "height": "3",
            "meta_title": "Arctic Beanie",
            "meta_keywords": "beanie, winter",
            "meta_description": "Buy the Arctic Beanie.",
            "manage_stock": 1,
            "up_sells": [2],
            "cross_sells": [3],
            "related_products": [2],
            "customizable_options": {
              "option_1": { "en": { "label": "Engraving text" }, "type": "text", "is_required": "1", "max_characters": "30", "sort_order": "1", "price": "5.00" },
              "option_2": {
                "en": { "label": "Gift wrap" },
                "type": "checkbox",
                "is_required": "0",
                "sort_order": "2",
                "prices": {
                  "price_1": { "en": { "label": "Standard" }, "price": "3.00", "sort_order": "1" },
                  "price_2": { "en": { "label": "Premium" }, "price": "6.00", "sort_order": "2" }
                }
              }
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 42,
              "sku": "sp-001",
              "type": "simple",
              "status": "1",
              "urlKey": "arctic-beanie",
              "price": "99.99",
              "specialPrice": null,
              "weight": "0.5",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-virtual
    title: Virtual — same fields as simple
    description: A virtual product takes the same fields as a simple product (no shipping is required, so dimensions are optional). Custom options (customizable_options) are supported here too.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            price
            weight
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/44",
          "urlKey": "online-gift-wrap",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "price": "9.99",
          "cost": "3.00",
          "taxCategoryId": 2,
          "categories": [1],
          "channels": [1],
          "extras": {
            "name": "Online Gift Wrap",
            "GST": "5.00",
            "short_description": "Virtual add-on.",
            "description": "No shipping required.",
            "meta_title": "Gift Wrap",
            "manage_stock": 1,
            "customizable_options": {
              "option_1": { "en": { "label": "Message" }, "type": "textarea", "is_required": "0", "sort_order": "1", "price": "0.00" }
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 44,
              "sku": "vr-001",
              "type": "virtual",
              "status": "1",
              "urlKey": "online-gift-wrap",
              "price": "9.99",
              "weight": "0",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-downloadable
    title: Downloadable — common fields + links & samples
    description: Common fields plus the download links and samples. downloadableLinks / downloadableSamples replace the current structure — send the full set. Custom options are NOT supported on downloadable products.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            price
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/45",
          "urlKey": "ebook-bundle",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "price": "15.00",
          "cost": "4.00",
          "taxCategoryId": 2,
          "categories": [1],
          "channels": [1],
          "extras": {
            "name": "E-Book Bundle",
            "GST": "5.00",
            "short_description": "Downloadable e-book.",
            "description": "Instant download.",
            "meta_title": "E-Book",
            "manage_stock": 1,
            "up_sells": [2],
            "cross_sells": [3],
            "related_products": [2]
          },
          "downloadableLinks": {
            "link_1": {
              "en": { "title": "Chapter 1 PDF" },
              "price": "5.00",
              "downloads": "3",
              "sort_order": "1",
              "type": "url",
              "url": "https://example.com/ch1.pdf",
              "sample_type": "url",
              "sample_url": "https://example.com/sample.pdf"
            }
          },
          "downloadableSamples": {
            "sample_1": { "title": "Preview", "sort_order": "1", "type": "url", "url": "https://example.com/preview.pdf" }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 45,
              "sku": "dl-001",
              "type": "downloadable",
              "status": "1",
              "urlKey": "ebook-bundle",
              "price": "15",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-grouped
    title: Grouped — common fields + linked products
    description: A grouped product has no own price — it sells its associated products. Common fields plus links (associated products keyed link_*). links replaces the current set.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/46",
          "urlKey": "starter-pack",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "weight": "0.5",
          "taxCategoryId": 2,
          "categories": [1, 8],
          "channels": [1],
          "extras": {
            "name": "Starter Pack",
            "GST": "5.00",
            "short_description": "A bundle of essentials.",
            "description": "Buy the set.",
            "meta_title": "Starter Pack",
            "up_sells": [2],
            "cross_sells": [3],
            "related_products": [2]
          },
          "links": {
            "link_1": { "associated_product_id": 1, "qty": "2", "sort_order": "1" },
            "link_2": { "associated_product_id": 2, "qty": "1", "sort_order": "2" }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 46,
              "sku": "gr-001",
              "type": "grouped",
              "status": "1",
              "urlKey": "starter-pack",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-bundle
    title: Bundle — common fields + option groups
    description: A bundle has dynamic pricing (set price to "0", no special price). Common fields plus bundleOptions. Each option group is keyed option_*, and its selectable products are keyed product_* (these prefixes are REQUIRED — a bare key like "p1" is treated as an existing row id and fails).
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            price
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/47",
          "urlKey": "build-your-kit",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "price": "0",
          "weight": "0.5",
          "taxCategoryId": 2,
          "categories": [1, 8],
          "channels": [1],
          "extras": {
            "name": "Build Your Kit",
            "GST": "5.00",
            "short_description": "Pick your parts.",
            "description": "Custom kit.",
            "meta_title": "Build Your Kit"
          },
          "bundleOptions": {
            "option_1": {
              "en": { "label": "Choose your accessory" },
              "type": "radio",
              "is_required": "1",
              "sort_order": "1",
              "products": {
                "product_1": { "product_id": 1, "qty": "1", "is_default": "1", "sort_order": "1" },
                "product_2": { "product_id": 2, "qty": "1", "is_default": "0", "sort_order": "2" }
              }
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 47,
              "sku": "bn-001",
              "type": "bundle",
              "status": "1",
              "urlKey": "build-your-kit",
              "price": "0",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-configurable
    title: Configurable — common fields + per-variant fields
    description: The configurable parent has no own price — colour/size live on each variant. Common parent fields plus variants, keyed by the variant product id (from the create response or the detail variants connection). Each variant carries its own sku/name/price/cost/weight/status and its super-attribute option ids (color, size). Replace-semantics — send every variant you want to keep.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/48",
          "urlKey": "wool-beanie",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "taxCategoryId": 2,
          "categories": [1, 8],
          "channels": [1],
          "extras": {
            "name": "Wool Beanie",
            "GST": "5.00",
            "short_description": "Choose colour & size.",
            "description": "Configurable beanie.",
            "meta_title": "Wool Beanie"
          },
          "variants": {
            "2872": { "sku": "BEANIE-RED-S", "name": "Red / Small", "price": "29.99", "cost": "8.00", "weight": "0.3", "status": "1", "color": 1, "size": 6 },
            "2873": { "sku": "BEANIE-BLUE-S", "name": "Blue / Small", "price": "29.99", "cost": "8.00", "weight": "0.3", "status": "1", "color": 2, "size": 6 }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 48,
              "sku": "cf-001",
              "type": "configurable",
              "status": "1",
              "urlKey": "wool-beanie",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-default
    title: Booking — default (+ common fields)
    description: Common fields plus the booking block. A default booking is recurring weekly slots with a duration, break time and quantity. The other booking sub-types (appointment / event / rental / table) are shown in the following dropdown entries — each replaces the booking structure.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            status
            urlKey
            price
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
          "urlKey": "studio-session",
          "status": 1,
          "visibleIndividually": 1,
          "guestCheckout": 1,
          "price": "99.99",
          "weight": "0.5",
          "taxCategoryId": 2,
          "categories": [1],
          "channels": [1],
          "extras": {
            "name": "Studio Session",
            "GST": "5.00",
            "short_description": "Book a slot.",
            "description": "Recurring weekly slots.",
            "meta_title": "Studio Session"
          },
          "booking": {
            "type": "default",
            "qty": "1",
            "location": "Studio A",
            "available_every_week": "1",
            "booking_type": "many",
            "duration": "60",
            "break_time": "10",
            "slots": [ { "from": "09:00", "to": "17:00" } ]
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "status": "1",
              "urlKey": "studio-session",
              "price": "99.99",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-appointment
    title: Booking — appointment
    description: An appointment booking — per-day slot windows with a fixed appointment duration. Send the booking block alongside any common fields you want to change.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
          "booking": {
            "type": "appointment",
            "qty": "1",
            "location": "Main Clinic",
            "available_every_week": "1",
            "duration": "30",
            "break_time": "10",
            "same_slot_all_days": "1",
            "slots": [ { "from": "09:00", "to": "12:00" }, { "from": "14:00", "to": "17:00" } ]
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-event
    title: Booking — event
    description: An event booking — a fixed date/time window with one or more named tickets (keyed ticket_*).
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
          "booking": {
            "type": "event",
            "location": "Grand Arena",
            "available_from": "2026-08-01 09:00:00",
            "available_to": "2026-08-01 22:00:00",
            "tickets": {
              "ticket_1": {
                "en": { "name": "VIP", "description": "Front row" },
                "price": "120.00",
                "qty": "50",
                "special_price": "99.00"
              }
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-rental
    title: Booking — rental
    description: A rental booking — daily and/or hourly pricing over recurring weekly slots.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
          "booking": {
            "type": "rental",
            "qty": "1",
            "location": "Bike Shop",
            "available_every_week": "1",
            "renting_type": "daily_hourly",
            "daily_price": "40.00",
            "hourly_price": "10.00",
            "same_slot_all_days": "1",
            "slots": [ { "from": "09:00", "to": "18:00" } ]
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-table
    title: Booking — table
    description: A table booking — per-guest pricing, guest limit and recurring weekly slots.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
            warnings
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
          "booking": {
            "type": "table",
            "qty": "10",
            "location": "Downtown Bistro",
            "available_every_week": "1",
            "price_type": "guest",
            "guest_limit": "4",
            "duration": "60",
            "break_time": "15",
            "prevent_scheduling_before": "2",
            "same_slot_all_days": "1",
            "slots": [ { "from": "12:00", "to": "22:00" } ]
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 53,
              "sku": "bk-001",
              "type": "booking",
              "warnings": null
            }
          }
        }
      }
  - id: admin-catalog-product-update-locale
    title: Change locale (extras)
    description: GraphQL has no query string, so translatable fields default to the store default locale. Put translatable values in extras. To target a specific locale, use the REST endpoint's ?locale= query parameter.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            _id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/42",
          "extras": {
            "name": "Bonnet Arctique",
            "description": "Texte complet."
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "_id": 42,
              "sku": "sp-001",
              "type": "simple"
            }
          }
        }
      }
---

# Catalog Product — Update

Equivalent to [`PUT /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/update).

This is a **partial patch** — send only the fields you want to change inside
`input`. Omitted fields keep their current value. Pass the product IRI as `id`
(e.g. `"/api/admin/catalog/products/42"`).

Every field the admin **Edit Product** screen exposes is editable here. Pick a
product type in the **Examples** dropdown (top-right) to see the complete
edit-form body for that type.

::: tip Prerequisites
The examples use illustrative IRIs and ids. Replace them with ids that exist in
your store — use the [`adminCatalogProducts`](./list.md) query to find products,
and the [detail query](./products-detail.md) `variants` connection to discover a
configurable product's variant ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProduct` | Mutation |

## Input shape — named args vs `extras`

The input has **named camelCase args** for the common/structural fields, plus an
`extras` object for every other attribute code:

| Named arg | Notes |
|-----------|-------|
| `id` | The product IRI. Required. |
| `urlKey`, `status`, `visibleIndividually`, `guestCheckout`, `new`, `featured` | Common scalar fields. |
| `price`, `cost`, `specialPrice`, `specialPriceFrom`, `specialPriceTo`, `weight`, `taxCategoryId` | Pricing & shipping scalars. |
| `categories`, `channels` | `int[]` — replace the assignment when sent, preserved when omitted. |
| `superAttributes` | Configurable super-attribute map (normally set at create). |
| `variants` | Configurable per-variant fields, keyed by variant product id. |
| `bundleOptions` | Bundle option groups. |
| `links` | Grouped associated products. |
| `downloadableLinks`, `downloadableSamples` | Downloadable structure. |
| `booking` | Booking structure (`type` ∈ `default` / `appointment` / `event` / `rental` / `table`). |
| `translations` | Optional locale-keyed override map. |
| `extras` | **Any other attribute code** — `name`, `color`, `size`, `brand`, `product_number`, `GST`, `short_description`, `description`, `meta_title`, `meta_keywords`, `meta_description`, `length`, `width`, `height`, `manage_stock`, `up_sells`, `cross_sells`, `related_products`, `customizable_options` — as a JSON object keyed by attribute code. |

Anything not in the named-args list goes in `extras` (it is merged into the
payload as a top-level attribute by code). Structure args **replace** that
structure when sent — send the full set.

## Field applicability by type

| Field / block | simple | virtual | downloadable | grouped | bundle | configurable | booking |
|---|---|---|---|---|---|---|---|
| Common attrs (name, sku, url_key, meta, color/size/brand, dimensions, settings) | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ (colour/size on variants) | ✅ |
| `price` / `cost` / `specialPrice` | ✅ | ✅ | ✅ | — (sells linked products) | `price:"0"` (dynamic) | — (per variant) | ✅ |
| `categories`, `channels`, `up_sells`, `cross_sells`, `related_products` | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ | ✅ |
| `customizable_options` (custom options) | ✅ | ✅ | — | — | — | — | — |
| Type structure | — | — | `downloadableLinks` / `downloadableSamples` | `links` | `bundleOptions` | `variants` | `booking` |

Custom options are a Bagisto **simple/virtual-only** feature — sending
`customizable_options` on any other type is ignored by the store.

## Keying rules for nested structures

New nested rows are keyed by a **prefixed marker**; a numeric/bare key is treated
as an existing row id:

| Structure | New-row key prefix |
|-----------|--------------------|
| `bundleOptions` option group | `option_*` |
| `bundleOptions` → `products` | `product_*` |
| `links` (grouped) | `link_*` |
| `downloadableLinks` | `link_*` |
| `downloadableSamples` | `sample_*` |
| `customizable_options` | `option_*` (its `prices` → `price_*`) |
| `booking` → `tickets` (event) | `ticket_*` |
| `variants` (configurable) | the **existing** variant product id (numeric) |

## Locale & channel

GraphQL has no query string, so translatable fields are written to the store's
**default** locale and channel. To target a specific locale (e.g. write the
French translation while leaving English untouched), use the REST endpoint with
its `?locale=fr&channel=default` query parameter — see the
[REST Update page](/api/rest-api/admin/catalog/products/update).

## Sub-resources are not updated here

`images`, `videos`, `inventories`, and `customerGroupPrices` are **not** handled
by this mutation — they have dedicated operations. If sent, they are ignored and
noted in the response `warnings` array:

- Images → [reorder images](/api/graphql-api/admin/catalog/products/images-reorder)
- Inventories → [update inventories](/api/graphql-api/admin/catalog/products/inventories-update)
- Customer-group prices → [customer-group prices](/api/graphql-api/admin/catalog/products/customer-group-prices-create)

## Response

Returns the updated product. The mutation result resolves the product's scalar
fields — select `{ adminCatalogProduct { _id sku type status urlKey price weight warnings } }`.

::: tip Select `_id`, not `id`
On a create/update **mutation result** the auto-injected `id` IRI points at an
internal route — query `_id` for the numeric product id. To read the full
type-specific detail back (variants, bundle options, links, …) re-query the
[detail query](/api/graphql-api/admin/catalog/products/products-detail), which
resolves every nested connection.
:::

::: tip `specialPrice` resolves to `null` until its window opens
If you set `specialPriceFrom` to a future date, the stored special price is
saved but `specialPrice` reads `null` until that date — it only resolves while
the from/to window is active.
:::
