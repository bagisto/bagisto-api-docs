---
outline: false
examples:
  - id: get-booking-slots-flat
    title: Get Booking Slots (Appointment / Table / Default)
    description: |
      Retrieve available slots for a booking product that uses the flat shape. Appointment and table products return one entry per bookable slot with `from`, `to`, `timestamp`, and `qty`; default products return a single entry spanning the day's whole window. The `id` argument is the `bookingProductId` taken from the product query's `bookingProducts` relationship.
    query: |
      query {
        bookingSlots(id: 3, date: "2026-08-13") {
          slotId
          from
          to
          timestamp
          qty
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "bookingSlots": [
            {
              "slotId": "1786595400-1786598100",
              "from": "10:00 AM",
              "to": "10:45 AM",
              "timestamp": "1786595400-1786598100",
              "qty": "1"
            },
            {
              "slotId": "1786599000-1786601700",
              "from": "11:00 AM",
              "to": "11:45 AM",
              "timestamp": "1786599000-1786601700",
              "qty": "1"
            },
            {
              "slotId": "1786602600-1786605300",
              "from": "12:00 PM",
              "to": "12:45 PM",
              "timestamp": "1786602600-1786605300",
              "qty": "1"
            },
            {
              "slotId": "1786609800-1786612500",
              "from": "02:00 PM",
              "to": "02:45 PM",
              "timestamp": "1786609800-1786612500",
              "qty": "1"
            },
            {
              "slotId": "1786613400-1786616100",
              "from": "03:00 PM",
              "to": "03:45 PM",
              "timestamp": "1786613400-1786616100",
              "qty": "1"
            }
          ]
        }
      }
    commonErrors:
      - error: Booking product not found
        cause: The bookingProductId does not exist
        solution: Use the bookingProductId from the product query's bookingProducts relationship
      - error: No slots returned
        cause: The product has no availability on the selected date
        solution: Try another date — availability is configured per day of the week

  - id: get-booking-slots-rental
    title: Get Booking Slots (Rental)
    description: |
      Retrieve available slots for a rental booking product. Rental returns a **grouped structure** — each entry is a time-range group carrying a `time` label and a `slots` array of the individual hourly slots inside it. The top-level `from`, `to`, `timestamp`, and `qty` are `null` on these entries.
    query: |
      query {
        bookingSlots(id: 4, date: "2026-08-13") {
          slotId
          time
          slots
        }
      }
    variables: |
      {}
    response: |
      {
        "data": {
          "bookingSlots": [
            {
              "slotId": "1",
              "time": "12:00 PM - 06:00 PM",
              "slots": [
                {
                  "from": "12:00 PM",
                  "to": "01:00 PM",
                  "timestamp": "1786602600-1786606200",
                  "qty": "1"
                },
                {
                  "from": "01:00 PM",
                  "to": "02:00 PM",
                  "timestamp": "1786606200-1786609800",
                  "qty": "1"
                },
                {
                  "from": "02:00 PM",
                  "to": "03:00 PM",
                  "timestamp": "1786609800-1786613400",
                  "qty": "1"
                },
                {
                  "from": "03:00 PM",
                  "to": "04:00 PM",
                  "timestamp": "1786613400-1786617000",
                  "qty": "1"
                },
                {
                  "from": "04:00 PM",
                  "to": "05:00 PM",
                  "timestamp": "1786617000-1786620600",
                  "qty": "1"
                },
                {
                  "from": "05:00 PM",
                  "to": "06:00 PM",
                  "timestamp": "1786620600-1786624200",
                  "qty": "1"
                }
              ]
            }
          ]
        }
      }
    commonErrors:
      - error: Booking product not found
        cause: The bookingProductId does not exist
        solution: Use the bookingProductId from the product query's bookingProducts relationship
      - error: No slots returned
        cause: No rental slots are configured for the selected date
        solution: Try another date — check the product's configured slot days

---

# Get Booking Slots

## About

The `bookingSlots` query retrieves available time slots for a booking product on a specific date. This query is essential for building the booking UI — when a customer selects a date, you use this query to fetch and display the available slots they can choose from before adding the product to cart.

### Why This Query Is Needed

When adding a booking product to the cart, the `booking` input requires a specific time slot (e.g., `"slot": "12:00 PM - 01:00 PM"`). But the available slots depend on the product's configuration (duration, break time, operating hours) and the selected date (day-of-week availability, existing bookings). This query resolves all of that and returns only the slots that are actually available for selection.

The typical flow is:
1. **Query the product** to get `bookingProductId` from the `bookingProducts` relationship
2. **Customer selects a date** on the frontend
3. **Query `bookingSlots`** with the `bookingProductId` and selected date to get available slots
4. **Customer picks a slot** from the results
5. **Add to cart** using the selected slot value in the `booking` JSON

The shape of the response depends on the product's booking type — Default, Appointment, and Table return a flat list, Rental returns time-range groups, and Event returns nothing. See [Response by Booking Type](#response-by-booking-type).

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `id` | `Int!` | Yes | The `bookingProductId` — obtained from the product query's `bookingProducts` relationship (not the product ID). |
| `date` | `String!` | Yes | The date to check for available slots in `YYYY-MM-DD` format. |

## Response Fields

Every entry is the same object type. Which fields carry a value depends on the booking type — the unused ones come back `null`.

| Field | Type | Populated for | Description |
|-------|------|---------------|-------------|
| `slotId` | `String` | All | Identifier for the entry. Flat types repeat the timestamp range here; grouped rental entries carry the group's index. |
| `from` | `String` | Flat types | Slot start. Appointment and Table return a time (`"10:00 AM"`); Default returns a full day and time (`"Thu, 13 Aug 08:00 AM"`). |
| `to` | `String` | Flat types | Slot end, in the same format as `from`. |
| `timestamp` | `String` | Flat types | Unix range as `"from-to"`, e.g. `"1786595400-1786599000"`. |
| `qty` | `String` | Appointment, Table | Bookings still available for the slot. `null` for Default. |
| `time` | `String` | Rental | Label of the time-range group, e.g. `"08:00 AM - 11:59 PM"`. |
| `slots` | `Iterable` | Rental | JSON array of the individual hourly slots in the group, each an object of `from`, `to`, `timestamp`, and `qty`. |

Select `slots` on its own — it is a JSON value, so it returns whole and cannot take a sub-selection. Do not select `id`: the entries have no standalone endpoint, so asking for it fails the whole entry.

## Response by Booking Type

| Booking Type | Response Structure | Fields to Query |
|---|---|---|
| **Default** | Flat — one entry spanning the product's whole availability window | `slotId`, `from`, `to`, `timestamp` |
| **Appointment** | Flat — one entry per bookable slot | `slotId`, `from`, `to`, `timestamp`, `qty` |
| **Table** | Flat — one entry per bookable sitting | `slotId`, `from`, `to`, `timestamp`, `qty` |
| **Rental** | Grouped by time range, hourly slots nested inside | `slotId`, `time`, `slots` |
| **Event** | Empty array — availability is sold as tickets | — |

Rental returns the grouped hourly shape whichever renting type the product uses, daily included. Read the ticket fields on the product's `bookingProducts` node for events.

## How to Get the `bookingProductId`

The `id` parameter for this query is **not** the product ID — it is the `bookingProductId` from the product's `bookingProducts` relationship. Query it like this:

```graphql
query getProduct($id: ID!) {
  product(id: $id) {
    id
    name
    bookingProducts {
      edges {
        node {
          _id           # This is the bookingProductId to use
          type          # default, appointment, rental, table, event
        }
      }
    }
  }
}
```

Use the `_id` value from `bookingProducts.edges.node` as the `id` argument in the `bookingSlots` query.

## Common Use Cases

### Build a Date + Slot Picker (Non-Rental)

```graphql
# Step 1: User selects a date, fetch available slots
query {
  bookingSlots(id: 3, date: "2026-08-13") {
    from
    to
    timestamp
    qty
  }
}
```

Then use the `from` and `to` values to construct the `slot` field for the add-to-cart mutation:
```json
{
  "booking": "{\"type\":\"appointment\",\"date\":\"2026-08-13\",\"slot\":\"10:00 AM - 10:45 AM\"}"
}
```

### Build an Hourly Rental Slot Picker

```graphql
# Fetch grouped rental slots
query {
  bookingSlots(id: 4, date: "2026-08-13") {
    time
    slots
  }
}
```

Display the `time` groups as headers and individual `slots` as selectable options. Then use the selected slot for add-to-cart:
```json
{
  "booking": "{\"type\":\"rental\",\"renting_type\":\"hourly\",\"date\":\"2026-08-13\",\"slot\":\"12:00 PM - 01:00 PM\"}"
}
```

## Best Practices

1. **Use the `bookingProductId`, not the product ID** — the `id` argument takes the `_id` from the `bookingProducts` relationship
2. **Check for empty results** — an empty array means no slots are available on that date; prompt for a different one
3. **Check `qty` where it applies** — Appointment and Table slots carry a `qty`; hide any slot whose `qty` is `0`. Default slots return `qty` as `null`, so there is nothing to test.
4. **Handle both structures** — read the product's booking `type` to know whether to expect flat slots or grouped rental groups
5. **Refresh on date change** — re-query whenever the customer picks a different date

## Related Resources

- [Single Product](/api/graphql-api/shop/queries/get-product) - Get product details including `bookingProducts` relationship
- [Add to Cart](/api/graphql-api/shop/mutations/add-to-cart) - Add booking product to cart with selected slot
