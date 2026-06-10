---
outline: false
examples:
  - id: list-variants
    title: Variants — for a configurable product
    description: |
      List the child variant products of a configurable parent. Each variant is a `simple` product with the same card-level fields as the listing endpoint.
    request: |
      curl -X GET "http://localhost/api/shop/products/23/variants" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 24,
          "sku": "LUGGAGE-RED",
          "type": "simple",
          "name": "Luggage bags-Red",
          "price": 100,
          "formattedPrice": "$100.00",
          "...": "..."
        }
      ]
    commonErrors:
      - error: 404 Not Found
        cause: Parent product `{productId}` doesn't exist or isn't configurable
        solution: Use `GET /api/shop/products?type=configurable` to find configurable products.

  - id: list-booking-products
    title: Booking Products — config for a product
    description: |
      Booking-specific configuration row(s) for a `booking`-type product. The `type` field on each row tells you which slot helper drives availability — pair it with [Booking Slots](/api/rest-api/shop/products/get-booking-slots) for a date.
    request: |
      curl -X GET "http://localhost/api/shop/products/2507/booking-products" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "type": "default",
          "qty": 150,
          "location": "Noida, Uttar Pradesh",
          "showLocation": 0,
          "availableFrom": "2026-04-06T12:00:00+05:30",
          "availableTo": "2026-12-31T12:00:00+05:30",
          "createdAt": "2026-04-03T00:24:30+05:30",
          "updatedAt": "2026-04-06T21:09:47+05:30",
          "slots": {
            "bookingType": "one",
            "sameSlotAllDays": null,
            "slots": [
              { "id": "1", "from": "12:00", "to": "18:00", "from_day": "1", "to_day": "1" },
              { "id": "2", "from": "12:00", "to": "18:00", "from_day": "2", "to_day": "2" }
            ]
          }
        }
      ]

  - id: get-booking-product
    title: Booking Products — single by ID
    description: |
      Fetch a single booking config row by its global ID (the value found in `bookingProducts[].id` on the parent product). Includes IRI references to the type-specific slot config.
    request: |
      curl -X GET "http://localhost/api/shop/booking-products/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "type": "default",
        "qty": 150,
        "location": "Noida, Uttar Pradesh",
        "showLocation": 0,
        "availableEveryWeek": null,
        "availableFrom": "2026-04-06T12:00:00+05:30",
        "availableTo": "2026-12-31T12:00:00+05:30",
        "slots": { "bookingType": "one", "slots": [ "..." ] },
        "defaultSlot": "/api/shop/booking_product_default_slots/1",
        "appointmentSlot": null,
        "rentalSlot": null,
        "tableSlot": null,
        "eventTickets": []
      }

  - id: get-booking-default-slot
    title: Booking Slot Config — `default` type
    description: |
      Static slot configuration for a `default`-type booking product. The `slots` field is a **JSON string** — parse it client-side. For runtime availability on a specific date, use [Booking Slots](/api/rest-api/shop/products/get-booking-slots).
    request: |
      curl -X GET "http://localhost/api/shop/booking_product_default_slots/1" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 1,
        "bookingType": "one",
        "duration": null,
        "breakTime": null,
        "slots": "[{\"id\": \"1\", \"to\": \"18:00\", \"from\": \"12:00\", \"to_day\": \"1\", \"from_day\": \"1\"}]"
      }

  - id: get-booking-event-ticket
    title: Booking Slot Config — `event` ticket
    description: |
      Single ticket row for an `event`-type booking product. Each ticket is its own purchasable line with its own price, qty, and locale-specific `name` / `description`.
    request: |
      curl -X GET "http://localhost/api/shop/booking_product_event_tickets/7" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      {
        "id": 7,
        "bookingProductId": 2,
        "price": 120,
        "qty": 1500,
        "specialPrice": 115,
        "specialPriceFrom": "2026-04-06 12:00:00",
        "specialPriceTo": "2026-04-30 12:00:00",
        "formattedPrice": "$120.00",
        "formattedSpecialPrice": "$115.00",
        "translations": ["/api/booking_product_event_ticket_translations/7"],
        "translation": "/api/booking_product_event_ticket_translations/7"
      }

  - id: list-bundle-options
    title: Bundle Options — for a bundle product
    description: |
      Decision groups for a `bundle`-type product. Each option has its member products as IRIs (under `bundleOptionProducts[]`) — dereference for full member details.
    request: |
      curl -X GET "http://localhost/api/shop/products/2517/bundle-options" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "type": "radio",
          "isRequired": 1,
          "sortOrder": 0,
          "product": "/api/shop/products/2517",
          "bundleOptionProducts": ["/api/shop/product-bundle-option-products/1"],
          "translation": "/api/shop/product_bundle_option_translations/1",
          "translations": [
            "/api/shop/product_bundle_option_translations/5",
            "/api/shop/product_bundle_option_translations/1"
          ]
        }
      ]

  - id: list-bundle-option-products
    title: Bundle Option Products
    description: |
      Member products inside a bundle option (the actual SKUs the customer can pick). Each row links back to its parent `bundleOption` and its `product`.
    request: |
      curl -X GET "http://localhost/api/shop/product-bundle-option-products?per_page=2" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK
      X-Total-Count: 12
      X-Page: 1
      X-Per-Page: 2
      X-Total-Pages: 6

      [
        {
          "id": 1,
          "qty": 1,
          "isUserDefined": 1,
          "isDefault": 1,
          "sortOrder": 0,
          "bundleOption": "/api/shop/product_bundle_options/1",
          "product": "/api/shop/products/2512"
        }
      ]

  - id: list-grouped-products
    title: Grouped Products — members of a grouped product
    description: |
      Associated products inside a `grouped`-type product. The customer can add any subset to the cart with their own quantities.
    request: |
      curl -X GET "http://localhost/api/shop/products/2516/grouped-products" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        { "id": 1, "qty": 1, "sortOrder": 0, "product": "/api/shop/products/2516", "associatedProduct": "/api/shop/products/2512" },
        { "id": 2, "qty": 1, "sortOrder": 1, "product": "/api/shop/products/2516", "associatedProduct": "/api/shop/products/2514" }
      ]

  - id: list-downloadable-links
    title: Downloadable Links — for a downloadable product
    description: |
      Purchasable downloadable links attached to a `downloadable`-type product. Each link carries its own price, sample file, and download limit.
    request: |
      curl -X GET "http://localhost/api/shop/products/2506/downloadable-links" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 2,
          "url": "https://example.com/textbook.pdf",
          "type": "url",
          "price": 69,
          "sampleFile": "product_downloadable_links/2506/...pdf",
          "sampleFileName": "Personal Finance.pdf",
          "sampleType": "file",
          "downloads": 10,
          "sortOrder": 0,
          "createdAt": "2026-04-03T00:14:55+05:30",
          "updatedAt": "2026-04-03T00:14:55+05:30",
          "formattedPrice": "$69.00",
          "fileUrl": "http://localhost/storage/",
          "sampleFileUrl": "http://localhost/api/downloadable/download-sample/link/2",
          "product": "/api/shop/products/2506",
          "translation": "/api/shop/product_downloadable_link_translations/2",
          "translations": [
            "/api/shop/product_downloadable_link_translations/2",
            "/api/shop/product_downloadable_link_translations/3"
          ]
        }
      ]

  - id: list-downloadable-samples
    title: Downloadable Samples — for a downloadable product
    description: |
      Free preview files attached to a downloadable product. Listed separately from the paid links so the customer can preview before buying.
    request: |
      curl -X GET "http://localhost/api/shop/products/2506/downloadable-samples" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "id": 1,
          "file": "product_downloadable_links/2506/....pdf",
          "fileName": "document.pdf",
          "type": "file",
          "sortOrder": 0,
          "createdAt": "2026-04-03T00:14:55+05:30",
          "updatedAt": "2026-04-03T00:14:55+05:30",
          "fileUrl": "http://localhost/api/downloadable/download-sample/sample/1",
          "product": "/api/shop/products/2506",
          "translation": "/api/shop/product_downloadable_sample_translations/1",
          "translations": ["/api/shop/product_downloadable_sample_translations/1"]
        }
      ]

---

# Product Type Sub-Resources (`Product Types` tag)

The endpoints in this group expose the type-specific configuration of products that aren't just `simple`: configurable variants, booking slots, bundle option groups, grouped associations, downloadable links and samples. Most of this data is also inlined on [Single Product](/api/rest-api/shop/products/get-product) — these dedicated endpoints exist for clients that need just one slice.

> ⚠️ **Naming pattern alert**:
> - `*-bundle-option-products`, `*-downloadable-links`, `*-downloadable-samples`, `booking-products`, `booking-slots` use **dashed** root URLs.
> - `product_bundle_options`, `product_grouped_products`, `booking_product_default_slots`, `booking_product_appointment_slots`, `booking_product_rental_slots`, `booking_product_event_tickets`, `booking_product_table_slots`, plus all `*_translations` endpoints use **underscored** root URLs.
> - When in doubt, copy the URL from a parent resource's IRI — they're authoritative.

For runtime slot availability (a date-specific list of bookable times) see the dedicated [Booking Slots](/api/rest-api/shop/products/get-booking-slots) page — it's separate from the static **slot config** endpoints documented here.

## Endpoints in this group

### Variants (configurable type)

| Method | Path                                              | Purpose                                |
|--------|---------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/variants`         | Child variants of a configurable parent |

### Booking Products (booking type — slot config)

| Method | Path                                                | Purpose                                  |
|--------|-----------------------------------------------------|------------------------------------------|
| GET    | `/api/shop/products/{productId}/booking-products`   | Booking config rows for a product         |
| GET    | `/api/shop/booking-products/{id}`                   | Single booking config (with slot IRIs)   |

### Booking Slot Configs (one model per type)

These are the **static configuration rows** referenced by the `defaultSlot` / `appointmentSlot` / `rentalSlot` / `tableSlot` / `eventTickets[]` IRIs on a `BookingProduct`. They describe the schedule template — not the per-date runtime slots.

| Method | Path                                                         | For booking type |
|--------|--------------------------------------------------------------|------------------|
| GET    | `/api/shop/booking_product_default_slots`                    | `default`        |
| GET    | `/api/shop/booking_product_default_slots/{id}`               | `default`        |
| GET    | `/api/shop/booking_product_appointment_slots`                | `appointment`    |
| GET    | `/api/shop/booking_product_appointment_slots/{id}`           | `appointment`    |
| GET    | `/api/shop/booking_product_rental_slots`                     | `rental`         |
| GET    | `/api/shop/booking_product_rental_slots/{id}`                | `rental`         |
| GET    | `/api/shop/booking_product_table_slots`                      | `table`          |
| GET    | `/api/shop/booking_product_table_slots/{id}`                 | `table`          |
| GET    | `/api/shop/booking_product_event_tickets`                    | `event` (tickets) |
| GET    | `/api/shop/booking_product_event_tickets/{id}`               | `event` (tickets) |

### Bundle Options + Member Products + Translations (bundle type)

| Method | Path                                                  | Purpose                                |
|--------|-------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/bundle-options`       | Decision groups for a bundle (nested)  |
| GET    | `/api/shop/product_bundle_options/{id}`               | Single bundle option                   |
| GET    | `/api/shop/product-bundle-option-products`            | Paginated list of every member-row     |
| GET    | `/api/shop/product-bundle-option-products/{id}`       | Single member-row by global ID         |
| GET    | `/api/shop/product_bundle_option_translations`        | Paginated locale labels                |
| GET    | `/api/shop/product_bundle_option_translations/{id}`   | Single label                           |

### Grouped Products (grouped type)

| Method | Path                                                  | Purpose                                |
|--------|-------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/grouped-products`     | Members of a grouped product (nested)  |
| GET    | `/api/shop/product_grouped_products/{id}`             | Single grouped-product association     |

### Downloadable Links + Samples + Translations (downloadable type)

| Method | Path                                                          | Purpose                                |
|--------|---------------------------------------------------------------|----------------------------------------|
| GET    | `/api/shop/products/{productId}/downloadable-links`           | Purchasable links for a product        |
| GET    | `/api/shop/product-downloadable-links`                        | Paginated root collection              |
| GET    | `/api/shop/product-downloadable-links/{id}`                   | Single link                            |
| GET    | `/api/shop/product_downloadable_link_translations`            | Paginated locale labels                |
| GET    | `/api/shop/product_downloadable_link_translations/{id}`       | Single label                           |
| GET    | `/api/shop/products/{productId}/downloadable-samples`         | Preview samples for a product          |
| GET    | `/api/shop/product-downloadable-samples`                      | Paginated root collection              |
| GET    | `/api/shop/product-downloadable-samples/{id}`                 | Single sample                          |
| GET    | `/api/shop/product_downloadable_sample_translations`          | Paginated locale labels                |
| GET    | `/api/shop/product_downloadable_sample_translations/{id}`     | Single label                           |

## Response field reference (key shapes)

### Variant

Same shape as a card-level [Product](/api/rest-api/shop/products/get-products#card-level-fields) — variants are themselves `simple` products.

### Booking Product

| Field                | Type             | Description                                                            |
|----------------------|------------------|------------------------------------------------------------------------|
| `id`                 | integer          | Booking config row ID — pass to `/booking-slots?id=…` for runtime availability |
| `type`               | string           | `default`, `appointment`, `rental`, `event`, `table`                   |
| `qty`                | integer          | Total capacity (where applicable)                                      |
| `location`           | string           | Physical location for in-person bookings                               |
| `showLocation`       | boolean (0/1)    | Whether to show `location` to the customer                             |
| `availableFrom` / `availableTo` | string (ISO) | Allowed booking window                                          |
| `slots`              | object \| null   | Inline preview of the schedule template (also reachable via the type-specific IRI) |
| `defaultSlot` / `appointmentSlot` / `rentalSlot` / `tableSlot` | string (IRI) \| null | Type-specific config IRI — only one is non-null per row |
| `eventTickets`       | array            | For `event` type — list of ticket rows                                 |

### Booking Slot Config (default / appointment / rental / table)

| Field          | Type            | Description                                                              |
|----------------|-----------------|--------------------------------------------------------------------------|
| `id`           | integer         | Config primary key                                                       |
| `bookingType`  | string          | `one` (single slot per day), `many` (multiple slots per day)             |
| `duration`     | integer \| null | Slot length in minutes                                                   |
| `breakTime`    | integer \| null | Gap between slots in minutes                                             |
| `slots`        | string (JSON)   | Schedule template. **JSON-encoded string** — `JSON.parse()` on the client |

### Booking Event Ticket

| Field              | Type            | Description                                              |
|--------------------|-----------------|----------------------------------------------------------|
| `id`               | integer         | Ticket primary key                                       |
| `bookingProductId` | integer         | Owning booking product                                   |
| `price`            | number          | Ticket price                                             |
| `qty`              | integer         | Ticket inventory                                         |
| `specialPrice`     | number \| null  | Sale price                                               |
| `specialPriceFrom` / `specialPriceTo` | string \| null | Sale window                                |
| `formattedPrice` / `formattedSpecialPrice` | string \| null | Currency-formatted strings                |
| `translation` / `translations` | IRI / array | Locale-specific `name` and `description`             |

### Bundle Option

| Field                    | Type            | Description                                              |
|--------------------------|-----------------|----------------------------------------------------------|
| `id`                     | integer         | Option primary key                                       |
| `type`                   | string          | `radio`, `checkbox`, `select`, `multi`                   |
| `isRequired`             | boolean (0/1)   | Whether the customer must pick at least one member       |
| `sortOrder`              | integer         | Display order                                            |
| `product`                | string (IRI)    | Parent bundle product                                    |
| `bundleOptionProducts`   | array (IRI)     | Member rows — dereference for actual SKUs                |
| `translation`            | string (IRI)    | Locale-specific label                                    |
| `translations`           | array (IRI)     | All locale labels                                        |

### Bundle Option Product

| Field            | Type            | Description                                              |
|------------------|-----------------|----------------------------------------------------------|
| `id`             | integer         | Member row primary key                                   |
| `qty`            | integer         | Default quantity contributed when this member is selected |
| `isUserDefined`  | boolean (0/1)   | Whether the customer can change `qty`                    |
| `isDefault`      | boolean (0/1)   | Whether the member is pre-selected on the PDP            |
| `sortOrder`      | integer         | Display order                                            |
| `bundleOption`   | string (IRI)    | Parent bundle option                                     |
| `product`        | string (IRI)    | Member SKU — dereference for full product details        |

### Grouped Product

| Field               | Type            | Description                                              |
|---------------------|-----------------|----------------------------------------------------------|
| `id`                | integer         | Association primary key                                  |
| `qty`               | integer         | Default quantity                                         |
| `sortOrder`         | integer         | Display order                                            |
| `product`           | string (IRI)    | Parent grouped product                                   |
| `associatedProduct` | string (IRI)    | The simple product associated with the group             |

### Downloadable Link

| Field                | Type            | Description                                                  |
|----------------------|-----------------|--------------------------------------------------------------|
| `id`                 | integer         | Link primary key                                             |
| `url`                | string \| null  | Externally-hosted file URL (`type = url`)                    |
| `type`               | string          | `file` (uploaded) or `url` (external)                        |
| `price`              | number          | Per-link price                                               |
| `formattedPrice`     | string          | Currency-formatted                                           |
| `sampleFile`         | string \| null  | Sample file storage path                                     |
| `sampleFileName`     | string \| null  | Original filename                                            |
| `sampleType`         | string \| null  | `file` or `url`                                              |
| `downloads`          | integer         | Download cap per purchase                                    |
| `sortOrder`          | integer         | Display order                                                |
| `fileUrl`            | string          | Public URL for the actual purchasable file                   |
| `sampleFileUrl`      | string          | Public URL for the preview                                   |
| `product`            | string (IRI)    | Parent product                                               |
| `translation`        | string (IRI)    | Locale-specific name + description                           |
| `translations`       | array (IRI)     | All locale translations                                      |

### Downloadable Sample

| Field           | Type            | Description                                                  |
|-----------------|-----------------|--------------------------------------------------------------|
| `id`            | integer         | Sample primary key                                           |
| `file`          | string          | Storage path                                                 |
| `fileName`      | string          | Original filename                                            |
| `type`          | string          | `file` or `url`                                              |
| `sortOrder`     | integer         | Display order                                                |
| `fileUrl`       | string          | Public URL for the preview                                   |
| `product`       | string (IRI)    | Parent product                                               |
| `translation` / `translations` | IRI / array | Locale-specific labels                            |

## Use Cases

- **Variant picker on a configurable PDP** — the parent's `superAttributes[]` describes the dimensions; `GET /products/{id}/variants` returns the inventory of combinations.
- **Booking flow** — fetch `/products/{id}/booking-products` for the schedule template, then `/booking-slots?id=…&date=…` for the actual selectable times on a date.
- **Event ticket purchase** — read `eventTickets[]` from the booking-product response; each row is its own purchasable line with its own qty and price.
- **Bundle builder** — walk `bundleOptions[]` for the groups, dereference each `bundleOptionProducts[]` IRI for member details.
- **Grouped product cart row** — list members from `/products/{id}/grouped-products`, render a qty input per `associatedProduct`.
- **Downloadable PDP** — paid `downloadableLinks` and free `downloadableSamples` are separate lists; show the sample download button next to the paid link.

## Related Resources

- [Single Product](/api/rest-api/shop/products/get-product) — embeds `variants`, `bookingProducts`, `bundleOptions`, `groupedProducts`, `downloadableLinks`, `downloadableSamples` inline
- [Booking Slots](/api/rest-api/shop/products/get-booking-slots) — date-specific runtime availability
- [Product Sub-Resources](/api/rest-api/shop/products/product-subresources) — the `Product` tag (images, videos, customer-group prices, customizable options, attribute values)
- [Introduction → IRIs & HATEOAS](/api/rest-api/introduction#iris-hateoas)
