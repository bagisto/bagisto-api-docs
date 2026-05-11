---
outline: false
examples:
  - id: get-default-slots
    title: Default / Appointment / Table / Event slots
    description: |
      For non-rental booking types, each entry is a flat slot with `from`, `to`, `timestamp`, `qty`. The example below is for a `default`-type booking product on a specific date.
    request: |
      curl -X GET "http://localhost/api/shop/booking-slots?id=1&date=2026-05-04" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "slotId": "1777876200-1777897800",
          "from": "12:00 PM",
          "to": "06:00 PM",
          "timestamp": "1777876200-1777897800"
        }
      ]
    commonErrors:
      - error: 400 Bad Request
        cause: Missing or invalid `id` / `date`
        solution: Pass `?id=<booking_product_id>&date=YYYY-MM-DD` (both required).
      - error: 404 Not Found
        cause: No booking product with the given `id`
        solution: Discover IDs via `GET /api/shop/products?type=booking` then `GET /api/shop/products/{id}` (the `bookingProducts[].id` is the value to send here).
      - error: 401 Unauthorized
        cause: Missing or invalid `X-STOREFRONT-KEY`
        solution: Send a valid storefront API key.

  - id: get-rental-slots
    title: Rental hourly slots
    description: |
      For rental hourly products, the response is a list of **time-range groups**. Each group has a `time` label and a nested `slots[]` array of individual hourly sub-slots.
    request: |
      curl -X GET "http://localhost/api/shop/booking-slots?id=4&date=2026-05-04" \
        -H "Accept: application/json" \
        -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
    response: |
      HTTP/1.1 200 OK

      [
        {
          "slotId": "1",
          "time": "10:00 AM - 12:00 PM",
          "slots": [
            { "from": "10:00 AM", "to": "11:00 AM", "timestamp": "1777867200-1777870800", "qty": "5" },
            { "from": "11:00 AM", "to": "12:00 PM", "timestamp": "1777870800-1777874400", "qty": "5" }
          ]
        },
        {
          "slotId": "2",
          "time": "02:00 PM - 04:00 PM",
          "slots": [
            { "from": "02:00 PM", "to": "03:00 PM", "timestamp": "1777881600-1777885200", "qty": "5" }
          ]
        }
      ]

---

# Booking Slots

Returns the **runtime availability** of slots for a booking product on a specific date. The Bagisto booking system supports five booking types (`default`, `appointment`, `rental`, `event`, `table`); the slot-config block lives on the parent product (see `bookingProducts[]` in [Single Product](/api/rest-api/shop/products/get-product)). This endpoint converts that config + a target date into the actual bookable time slots.

## Endpoint

```
GET /api/shop/booking-slots
```

## Request Headers

| Header             | Required | Description                              |
|--------------------|----------|------------------------------------------|
| `Accept`           | Yes      | `application/json`                       |
| `X-STOREFRONT-KEY` | Yes      | Storefront API key (`pk_storefront_…`)   |
| `X-Locale`         | No       | Override request locale                  |
| `X-Channel`        | No       | Override channel scope                   |

## Query Parameters

| Parameter | Type    | Required | Description                                                                                                          |
|-----------|---------|----------|----------------------------------------------------------------------------------------------------------------------|
| `id`      | integer | Yes      | **Booking product ID** — i.e. `bookingProducts[].id` from a parent product, **not** the parent product's `id`.       |
| `date`    | string  | Yes      | Target date in `YYYY-MM-DD` format. Times in the response are computed against the channel's timezone for that date. |

> Pagination headers are **not** emitted — the response is the full list of slots for the date in one shot.

## Response shape — by booking type

The internal structure depends on the booking product's `type` field. The API auto-routes to the right shape based on the parent booking product, so you don't pick which response — you get the right one for the product.

### Flat slots (`default` · `appointment` · `event` · `table`)

```json
[
  { "slotId": "...", "from": "12:00 PM", "to": "06:00 PM", "timestamp": "1777876200-1777897800", "qty": "5" }
]
```

| Field        | Type            | Description                                                                            |
|--------------|-----------------|----------------------------------------------------------------------------------------|
| `slotId`     | string          | Stable identifier — pass it back to the cart endpoint when adding the slot.            |
| `from`       | string          | Slot start time (`hh:mm AM/PM`)                                                        |
| `to`         | string          | Slot end time                                                                          |
| `timestamp`  | string          | Unix `from-to` range — server-computed, useful for logging and analytics               |
| `qty`        | string \| null  | Remaining capacity. `null` for types that don't track per-slot inventory               |

### Grouped slots (`rental` hourly)

```json
[
  {
    "slotId": "1",
    "time": "10:00 AM - 12:00 PM",
    "slots": [
      { "from": "10:00 AM", "to": "11:00 AM", "timestamp": "1777867200-1777870800", "qty": "5" }
    ]
  }
]
```

| Field        | Type            | Description                                                                            |
|--------------|-----------------|----------------------------------------------------------------------------------------|
| `slotId`     | string          | Sequential index of the time-range group                                               |
| `time`       | string          | Group label (e.g. `"10:00 AM - 12:00 PM"`)                                             |
| `slots`      | array           | Nested hourly sub-slots — same `{ from, to, timestamp, qty }` shape as flat slots       |

## Typical Flow

```
GET /api/shop/products/110
   └─ response.type            = "booking"
   └─ response.bookingProducts = [{ id: 1, type: "default", … }]

GET /api/shop/booking-slots?id=1&date=2026-05-04
   └─ [{ slotId: "...", from: "12:00 PM", to: "06:00 PM", … }]
```

The `id` you pass to `/booking-slots` is the **booking product** ID (the entry from the parent's `bookingProducts[]` array), **not** the parent product ID.

## Empty results

A `200 OK` with an empty array `[]` means "the product is bookable in principle but has no slots on this date". Common causes:

- The booking product's weekly schedule excludes that day of the week.
- All slots for the date are sold out.
- The date is before/after the booking product's allowed window.

## Use Cases

- Render a date-picker on a booking-product detail page that shows available slots when a date is selected.
- Validate a chosen `slotId` before adding it to the cart (re-fetch with the same date to confirm it's still in the response).
- Power an admin "view today's bookings" tool — combine `?date=` with each active booking product.

## Related Resources

- [Single Product](/api/rest-api/shop/products/get-product) — embeds the `bookingProducts[]` slot config that this endpoint dereferences
- [Products](/api/rest-api/shop/products/get-products) — discover booking products via `?type=booking`
- [Search Products](/api/rest-api/shop/products/search-product)
