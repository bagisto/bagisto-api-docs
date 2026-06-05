---
outline: false
---

# Bookings

The Bookings menu is a read-only list of booking lines produced by orders that contain a booking product. It mirrors the admin **Sales → Bookings** screen. This menu is **read-only** — list and detail only; booking rows are created automatically when an order is placed and cannot be created or edited through the API.

## When a row appears here

A row appears whenever an order is placed that contains a booking product — each booked line shows here. A booking row carries the booked quantity, the from/to time window, and a summary of the order and order item it belongs to.

## Booking sub-types

The `bookingType` field tells you what kind of booking the line is — it comes from the booked product's configuration:

| `bookingType` | Meaning |
|---------------|---------|
| `default` | A simple bookable product with a fixed availability window. |
| `appointment` | A time-slot appointment (e.g. a service booking). |
| `event` | A ticketed event. The booking also carries a `bookingProductEventTicketId` identifying which ticket type was booked. |
| `rental` | A rental booked for a date/time range (hourly or daily). |
| `table` | A table reservation (e.g. restaurant), for a party at a time. |

## The booking window

The booked time window is returned twice: `from` / `to` as raw **unix timestamps** (integers, for programmatic use) and `fromFormatted` / `toFormatted` as readable strings. Some sub-types are not strictly time-windowed, so all four can be `null` for those rows.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List bookings](/api/graphql-api/admin/sales/bookings/list) | `adminBookings` query |
| [Get a single booking](/api/graphql-api/admin/sales/bookings/detail) | `adminBooking(id:)` query |

All Bookings operations require the `sales.bookings.view` permission and an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
