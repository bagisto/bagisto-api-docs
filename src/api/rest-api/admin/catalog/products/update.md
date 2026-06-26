---
outline: false
apiType: rest
examples:
  - id: admin-catalog-product-update-attributes
    title: Attributes (any type)
    description: Partial update — send only the attribute codes you change. Every attribute on the product's family is editable by its code (name, url_key, price, status, color, brand, ...). Omitted fields keep their current value. categories/channels replace the current set when sent.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/42" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Arctic Beanie",
          "url_key": "arctic-beanie",
          "short_description": "Warm.",
          "description": "Full text.",
          "meta_title": "Arctic Beanie",
          "price": "24.99",
          "weight": "0.3",
          "status": 1,
          "new": 1,
          "color": 1,
          "categories": [43, 44]
        }'
    variables: |
      {
        "name": "Arctic Beanie",
        "url_key": "arctic-beanie",
        "price": "24.99",
        "status": 1,
        "color": 1,
        "categories": [43, 44]
      }
    response: |
      {
        "id": 42,
        "sku": "sp-001",
        "type": "simple",
        "name": "Arctic Beanie",
        "urlKey": "arctic-beanie",
        "shortDescription": "Warm.",
        "description": "Full text.",
        "metaTitle": "Arctic Beanie",
        "price": "24.9900",
        "weight": 0.3,
        "status": 1,
        "new": true,
        "categories": [
          { "id": 43, "name": "Hats", "slug": "hats" },
          { "id": 44, "name": "Winter", "slug": "winter" }
        ],
        "warnings": []
      }
  - id: admin-catalog-product-update-downloadable
    title: Downloadable — links & samples
    description: Replace the download links and samples for a downloadable product. Send the full set — downloadable_links/downloadable_samples replace the current structure.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/45" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "downloadable_links": {
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
          "downloadable_samples": {
            "sample_1": {
              "title": "Preview",
              "sort_order": "1",
              "type": "url",
              "url": "https://example.com/preview.pdf"
            }
          }
        }'
    variables: |
      {
        "downloadable_links": {
          "link_1": {
            "en": { "title": "Chapter 1 PDF" },
            "price": "5.00",
            "type": "url",
            "url": "https://example.com/ch1.pdf"
          }
        }
      }
    response: |
      {
        "id": 45,
        "sku": "dl-001",
        "type": "downloadable",
        "name": "E-Book",
        "downloadableLinks": [
          {
            "id": 7,
            "title": "Chapter 1 PDF",
            "type": "url",
            "url": "https://example.com/ch1.pdf",
            "price": "5.0000",
            "downloads": 3,
            "sortOrder": 1
          }
        ],
        "downloadableSamples": [
          {
            "id": 4,
            "title": "Preview",
            "type": "url",
            "url": "https://example.com/preview.pdf",
            "sortOrder": 1
          }
        ],
        "warnings": []
      }
  - id: admin-catalog-product-update-grouped
    title: Grouped — linked products
    description: Replace the associated products of a grouped product. Each link references an existing product id with a default quantity and sort order.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/46" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "links": {
            "link_1": { "associated_product_id": 142, "qty": "2", "sort_order": "1" },
            "link_2": { "associated_product_id": 143, "qty": "1", "sort_order": "2" }
          }
        }'
    variables: |
      {
        "links": {
          "link_1": { "associated_product_id": 142, "qty": "2", "sort_order": "1" },
          "link_2": { "associated_product_id": 143, "qty": "1", "sort_order": "2" }
        }
      }
    response: |
      {
        "id": 46,
        "sku": "gr-001",
        "type": "grouped",
        "name": "Starter Kit",
        "linkedProducts": [
          { "id": 142, "sku": "SP-142", "name": "Cable", "qty": 2, "sortOrder": 1 },
          { "id": 143, "sku": "SP-143", "name": "Adapter", "qty": 1, "sortOrder": 2 }
        ],
        "warnings": []
      }
  - id: admin-catalog-product-update-bundle
    title: Bundle — options
    description: Replace the bundle option groups. Each option has a label, a type (radio/checkbox/select/multiselect), and a set of selectable products with default flags.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/47" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "bundle_options": {
            "option_1": {
              "en": { "label": "Choose your accessory" },
              "type": "radio",
              "is_required": "1",
              "sort_order": "1",
              "products": {
                "product_1": { "product_id": 142, "qty": "1", "is_default": "1", "sort_order": "1" },
                "product_2": { "product_id": 143, "qty": "1", "is_default": "0", "sort_order": "2" }
              }
            }
          }
        }'
    variables: |
      {
        "bundle_options": {
          "option_1": {
            "en": { "label": "Choose your accessory" },
            "type": "radio",
            "is_required": "1",
            "sort_order": "1",
            "products": {
              "product_1": { "product_id": 142, "qty": "1", "is_default": "1", "sort_order": "1" },
              "product_2": { "product_id": 143, "qty": "1", "is_default": "0", "sort_order": "2" }
            }
          }
        }
      }
    response: |
      {
        "id": 47,
        "sku": "bn-001",
        "type": "bundle",
        "name": "Accessory Bundle",
        "bundleOptions": [
          {
            "id": 11,
            "label": "Choose your accessory",
            "type": "radio",
            "isRequired": true,
            "sortOrder": 1,
            "products": [
              { "id": 21, "productId": 142, "qty": 1, "isDefault": true, "sortOrder": 1 },
              { "id": 22, "productId": 143, "qty": 1, "isDefault": false, "sortOrder": 2 }
            ]
          }
        ],
        "warnings": []
      }
  - id: admin-catalog-product-update-configurable
    title: Configurable — variants
    description: Update per-variant fields. variants is keyed by the variant product id (from the create response or detail variants[].id). Replace-semantics — send every variant you want to keep.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/48" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "variants": {
            "2711": {
              "sku": "BEANIE-RED-S",
              "name": "Red / Small",
              "price": "29.99",
              "weight": "0.3",
              "status": "1"
            }
          }
        }'
    variables: |
      {
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
    response: |
      {
        "id": 48,
        "sku": "cf-001",
        "type": "configurable",
        "name": "Beanie",
        "variants": [
          {
            "id": 2711,
            "sku": "BEANIE-RED-S",
            "name": "Red / Small",
            "price": "29.9900",
            "weight": 0.3,
            "status": 1
          }
        ],
        "warnings": []
      }
  - id: admin-catalog-product-update-booking-default
    title: Booking — default
    description: Configure a default booking product — recurring weekly slots with a duration, break time and quantity.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/53" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
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
        }'
    variables: |
      {
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
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
        "name": "Studio Session",
        "bookingProduct": {
          "type": "default",
          "qty": 1,
          "location": "Studio A",
          "availableEveryWeek": true,
          "bookingType": "many",
          "duration": 60,
          "breakTime": 10,
          "slots": [ { "from": "09:00", "to": "17:00" } ]
        },
        "warnings": []
      }
  - id: admin-catalog-product-update-booking-appointment
    title: Booking — appointment
    description: Configure an appointment booking product — per-day slot windows with a fixed appointment duration.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/53" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
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
        }'
    variables: |
      {
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
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
        "name": "Consultation",
        "bookingProduct": {
          "type": "appointment",
          "qty": 1,
          "location": "Main Clinic",
          "availableEveryWeek": true,
          "duration": 30,
          "breakTime": 10,
          "sameSlotAllDays": true,
          "slots": [ { "from": "09:00", "to": "12:00" }, { "from": "14:00", "to": "17:00" } ]
        },
        "warnings": []
      }
  - id: admin-catalog-product-update-booking-event
    title: Booking — event
    description: Configure an event booking product — a fixed date/time window with one or more named tickets.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/53" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
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
        }'
    variables: |
      {
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
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
        "name": "Summer Concert",
        "bookingProduct": {
          "type": "event",
          "location": "Grand Arena",
          "availableFrom": "2026-08-01 09:00:00",
          "availableTo": "2026-08-01 22:00:00",
          "tickets": [
            {
              "id": 9,
              "name": "VIP",
              "description": "Front row",
              "price": "120.0000",
              "qty": 50,
              "specialPrice": "99.0000"
            }
          ]
        },
        "warnings": []
      }
  - id: admin-catalog-product-update-booking-rental
    title: Booking — rental
    description: Configure a rental booking product — daily and/or hourly pricing over recurring weekly slots.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/53" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
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
        }'
    variables: |
      {
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
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
        "name": "Bike Rental",
        "bookingProduct": {
          "type": "rental",
          "qty": 1,
          "location": "Bike Shop",
          "availableEveryWeek": true,
          "rentingType": "daily_hourly",
          "dailyPrice": "40.0000",
          "hourlyPrice": "10.0000",
          "sameSlotAllDays": true,
          "slots": [ { "from": "09:00", "to": "18:00" } ]
        },
        "warnings": []
      }
  - id: admin-catalog-product-update-booking-table
    title: Booking — table
    description: Configure a table booking product — per-guest pricing, guest limit and recurring weekly slots.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/53" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
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
        }'
    variables: |
      {
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
    response: |
      {
        "id": 53,
        "sku": "bk-001",
        "type": "booking",
        "name": "Dinner Table",
        "bookingProduct": {
          "type": "table",
          "qty": 10,
          "location": "Downtown Bistro",
          "availableEveryWeek": true,
          "priceType": "guest",
          "guestLimit": 4,
          "duration": 60,
          "breakTime": 15,
          "preventSchedulingBefore": 2,
          "sameSlotAllDays": true,
          "slots": [ { "from": "12:00", "to": "22:00" } ]
        },
        "warnings": []
      }
  - id: admin-catalog-product-update-locale
    title: Change locale (?locale=)
    description: Translatable fields write to the locale named in the URL query string. Add ?locale=fr&channel=default to target the French translation — English is untouched. One locale per request; repeat with a different ?locale= to edit another.
    query: |
      curl -X PUT "https://your-domain.com/api/admin/catalog/products/42?locale=fr&channel=default" \
        -H "Authorization: Bearer <token>" \
        -H "Content-Type: application/json" \
        -d '{
          "name": "Bonnet Arctique",
          "description": "Texte complet."
        }'
    variables: |
      {
        "name": "Bonnet Arctique",
        "description": "Texte complet."
      }
    response: |
      {
        "id": 42,
        "sku": "sp-001",
        "type": "simple",
        "name": "Bonnet Arctique",
        "description": "Texte complet.",
        "locale": "fr",
        "translations": [
          { "locale": "en", "name": "Arctic Beanie", "description": "Full text." },
          { "locale": "fr", "name": "Bonnet Arctique", "description": "Texte complet." }
        ],
        "warnings": []
      }
    commonErrors:
      - error: Validation (422)
        cause: SKU/url_key duplicate, invalid boolean field, special_price ≥ price, invalid date range
        solution: Send a unique SKU/url_key and valid field combinations
      - error: Not Found (404)
        cause: Product not found
        solution: Verify the `{id}` exists
---

# Catalog Product — Update

Updates a catalog product (any of the 7 types). This is a **partial patch** —
send only the fields you want to change. Omitted fields keep their current
value.

## Endpoint

| Endpoint | Method |
|----------|--------|
| `/api/admin/catalog/products/{id}` | PUT |

## Path parameters

| Field | Type | Required | Notes |
|-------|------|----------|-------|
| `id` | integer | yes | Product ID. |

## Query parameters

| Param | Default | Notes |
|-------|---------|-------|
| `locale` | store default | The locale that translatable fields (`name`, `description`, `short_description`, meta fields, …) are written to. One locale per request — repeat the call with a different `?locale=` to edit another translation. |
| `channel` | store default | The channel used for channel-scoped attribute values. |

## Editing attributes by code

Every attribute on the product's family is editable **by its code**, sent at
the **top level** of the JSON body (snake_case). This includes the common
fields and any family-specific ones:

| Field code | Notes |
|------------|-------|
| `name`, `url_key`, `short_description`, `description` | Translatable — written to the requested `?locale=`. |
| `meta_title`, `meta_keywords`, `meta_description` | SEO fields (translatable). |
| `price`, `weight` | Decimal as string. |
| `status`, `new`, `featured`, `visible_individually`, `guest_checkout` | Boolean flags as `0` / `1`. |
| `tax_category_id` | Existing tax category id. |
| `color`, `size`, `brand`, `product_number`, … | Any family-specific attribute, by its code. |

Translatable fields write to the requested locale only — pass
`?locale=fr&channel=default` to target the French translation; the other
locales are untouched.

## Replace-on-send relations

These fields **replace** the product's current set when present, and are
**preserved** when omitted:

| Field | Notes |
|-------|-------|
| `categories` | `int[]` — the product's category assignment. |
| `channels` | `int[]` — the product's channel assignment. |
| `up_sells`, `cross_sells`, `related_products` | `int[]` — product relation lists. |

## Type-structure fields

The type-specific structure keys **replace** that structure when sent — send
the full set. See the `examples:` dropdown for the verified payload of each:

| Type | Field | Notes |
|------|-------|-------|
| downloadable | `downloadable_links`, `downloadable_samples` | Keyed map of link/sample rows. |
| grouped | `links` | Keyed map of `{ associated_product_id, qty, sort_order }`. |
| bundle | `bundle_options` | Keyed map of option groups (`type` ∈ `radio` / `checkbox` / `select` / `multiselect`) each with a `products` map. |
| configurable | `variants` | Keyed by variant product id (from the create response or detail `variants[].id`). Replace-semantics — send every variant to keep. |
| booking | `booking` | Object with `type` (`default` / `appointment` / `event` / `rental` / `table`) plus sub-type fields (slots / tickets / pricing). |

### New-row key prefixes

Inside a nested structure a **new** row is keyed by a prefixed marker; a bare or
numeric key is treated as an existing row id (and fails if it doesn't exist):

| Structure | New-row key prefix |
|-----------|--------------------|
| `bundle_options` option group | `option_*` |
| `bundle_options` → `products` | `product_*` |
| `links` (grouped) | `link_*` |
| `downloadable_links` | `link_*` |
| `downloadable_samples` | `sample_*` |
| `customizable_options` | `option_*` (its `prices` → `price_*`) |
| `booking` → `tickets` (event) | `ticket_*` |
| `variants` (configurable) | the **existing** variant product id (numeric) |

### Custom options are simple/virtual only

`customizable_options` (custom options) are a Bagisto **simple & virtual**-only
feature — the edit form shows the Custom Options accordion only for those two
types, and the API ignores the field on any other type.

## Sub-resources are not updated here

`images`, `videos`, `inventories`, and `customer_group_prices` are **not**
handled by this endpoint — they have dedicated endpoints. If sent, they are
ignored and noted in the `warnings` array on the response:

- Images → [`POST /api/admin/catalog/products/{id}/images`](/api/rest-api/admin/catalog/products/images-upload)
- Inventories → [`PUT /api/admin/catalog/products/{productId}/inventories`](/api/rest-api/admin/catalog/products/inventories-update)
- Customer-group prices → [`POST …/customer-group-prices`](/api/rest-api/admin/catalog/products/customer-group-prices-create)

## Response

`200 OK` returning the full product detail payload — same shape as
[`GET /api/admin/catalog/products/{id}`](/api/rest-api/admin/catalog/products/products-detail).

`warnings` is an array of human-readable strings; it is empty when nothing was
dropped, and non-empty (naming each dropped sub-resource field and the endpoint
it should be sent to instead) when sub-resource fields were stripped.

## Errors

| HTTP | Cause |
|------|-------|
| `401 Unauthorized` | Missing or invalid admin Bearer token. |
| `403 Forbidden` | Admin role lacks `catalog.products.edit`. |
| `404 Not Found` | Product not found. |
| `422 Unprocessable Entity` | Validation failure (duplicate SKU / url_key, invalid boolean, special_price ≥ price, invalid date range). |
