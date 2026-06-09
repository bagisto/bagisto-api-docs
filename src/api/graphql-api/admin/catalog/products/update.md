---
outline: false
examples:
  - id: admin-catalog-product-update-attributes
    title: Attributes (any type)
    description: Partial update — send only the fields you change. Structural fields (price, weight, status, categories, channels, ...) are named camelCase args on the input; any other attribute code (name, url_key, color, meta_title, ...) goes inside extras. Omitted fields keep their current value.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/42",
          "price": "24.99",
          "weight": "0.3",
          "status": 1,
          "categories": [43, 44],
          "extras": {
            "name": "Arctic Beanie",
            "url_key": "arctic-beanie",
            "meta_title": "Arctic Beanie",
            "color": 1
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/42",
              "sku": "sp-001",
              "type": "simple"
            }
          }
        }
      }
  - id: admin-catalog-product-update-downloadable
    title: Downloadable — links & samples
    description: Replace the download links and samples. Send the full set under downloadableLinks / downloadableSamples — they replace the current structure.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/45",
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
            "sample_1": {
              "title": "Preview",
              "sort_order": "1",
              "type": "url",
              "url": "https://example.com/preview.pdf"
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/45",
              "sku": "dl-001",
              "type": "downloadable"
            }
          }
        }
      }
  - id: admin-catalog-product-update-grouped
    title: Grouped — linked products
    description: Replace the associated products of a grouped product under links. Each link references an existing product id with a default quantity and sort order.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/46",
          "links": {
            "link_1": { "associated_product_id": 142, "qty": "2", "sort_order": "1" },
            "link_2": { "associated_product_id": 143, "qty": "1", "sort_order": "2" }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/46",
              "sku": "gr-001",
              "type": "grouped"
            }
          }
        }
      }
  - id: admin-catalog-product-update-bundle
    title: Bundle — options
    description: Replace the bundle option groups under bundleOptions. Each option has a label, a type (radio/checkbox/select/multiselect), and a set of selectable products with default flags.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/47",
          "bundleOptions": {
            "option_1": {
              "en": { "label": "Choose your accessory" },
              "type": "radio",
              "is_required": "1",
              "sort_order": "1",
              "products": {
                "p1": { "product_id": 142, "qty": "1", "is_default": "1", "sort_order": "1" },
                "p2": { "product_id": 143, "qty": "1", "is_default": "0", "sort_order": "2" }
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
              "id": "/api/admin/catalog/products/47",
              "sku": "bn-001",
              "type": "bundle"
            }
          }
        }
      }
  - id: admin-catalog-product-update-configurable
    title: Configurable — variants
    description: Update per-variant fields under variants, keyed by the variant product id (from the create response or detail variants[].id). Replace-semantics — send every variant you want to keep.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/48",
          "variants": {
            "2711": {
              "sku": "BEANIE-RED-S",
              "name": "Red / Small",
              "price": "29.99",
              "weight": "0.3",
              "status": "1"
            }
          }
        }
      }
    response: |
      {
        "data": {
          "updateAdminCatalogProduct": {
            "adminCatalogProduct": {
              "id": "/api/admin/catalog/products/48",
              "sku": "cf-001",
              "type": "configurable"
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-default
    title: Booking — default
    description: Configure a default booking product under booking — recurring weekly slots with a duration, break time and quantity.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
          }
        }
      }
    variables: |
      {
        "input": {
          "id": "/api/admin/catalog/products/53",
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
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-appointment
    title: Booking — appointment
    description: Configure an appointment booking product under booking — per-day slot windows with a fixed appointment duration.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
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
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-event
    title: Booking — event
    description: Configure an event booking product under booking — a fixed date/time window with one or more named tickets.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
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
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-rental
    title: Booking — rental
    description: Configure a rental booking product under booking — daily and/or hourly pricing over recurring weekly slots.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
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
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
  - id: admin-catalog-product-update-booking-table
    title: Booking — table
    description: Configure a table booking product under booking — per-guest pricing, guest limit and recurring weekly slots.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
            sku
            type
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
              "id": "/api/admin/catalog/products/53",
              "sku": "bk-001",
              "type": "booking"
            }
          }
        }
      }
  - id: admin-catalog-product-update-locale
    title: Change locale (extras)
    description: GraphQL has no query string, so the locale/channel default to the store default. Translatable fields (name, description, ...) go inside extras. To target a specific locale, use the REST endpoint's ?locale= query parameter.
    query: |
      mutation UpdateCatalogProduct($input: updateAdminCatalogProductInput!) {
        updateAdminCatalogProduct(input: $input) {
          adminCatalogProduct {
            id
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
              "id": "/api/admin/catalog/products/42",
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

::: tip Prerequisites
The examples use illustrative IRIs. Replace them with the IRI of a product that
exists in your store — use the [`adminCatalogProducts`](./list.md) query to
discover valid ids.
:::

## Operation

| Operation | Type |
|-----------|------|
| `updateAdminCatalogProduct` | Mutation |

## Input shape

The input has **named camelCase args** for the common and structural fields,
plus an `extras` object for everything else:

| Arg | Notes |
|-----|-------|
| `id` | The product IRI. Required. |
| `urlKey`, `status`, `price`, `weight` | Common scalar fields. |
| `categories`, `channels` | `int[]` — replace the product's assignment when sent, preserved when omitted. |
| `superAttributes`, `variants` | Configurable structure. |
| `bundleOptions` | Bundle structure. |
| `links` | Grouped structure. |
| `downloadableLinks`, `downloadableSamples` | Downloadable structure. |
| `booking` | Booking structure (`type` ∈ `default` / `appointment` / `event` / `rental` / `table`). |
| `extras` | Any **other** attribute code — `name`, `color`, `meta_title`, `short_description`, `brand`, … — as a JSON object keyed by attribute code. |

Family attribute fields (e.g. `name`, `color`, `meta_title`,
`short_description`) that aren't one of the named args go inside `extras`.
Structure args **replace** that structure when sent — send the full set. See
the `examples:` dropdown for each type's verified payload.

## Locale & channel

GraphQL has no query string, so translatable fields are written to the store's
**default** locale and channel. To target a specific locale (e.g. write the
French translation while leaving English untouched), use the REST endpoint with
its `?locale=fr&channel=default` query parameter — see the
[REST Update page](/api/rest-api/admin/catalog/products/update).

## Sub-resources are not updated here

`images`, `videos`, `inventories`, and `customerGroupPrices` are **not** handled
by this mutation — they have dedicated operations. If sent, they are ignored and
noted in the response `_warnings` array:

- Images → [reorder images](/api/graphql-api/admin/catalog/products/images-reorder)
- Inventories → [update inventories](/api/graphql-api/admin/catalog/products/inventories-update)
- Customer-group prices → [customer-group prices](/api/graphql-api/admin/catalog/products/customer-group-prices-create)

## Response

Returns the updated product. Select `{ adminCatalogProduct { id sku type } }`,
or query the full detail fields — same shape as the
[detail query](/api/graphql-api/admin/catalog/products/products-detail).
