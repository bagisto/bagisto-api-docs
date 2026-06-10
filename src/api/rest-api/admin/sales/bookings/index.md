---
outline: false
apiType: rest
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

## What the booking detail embeds

In the admin, viewing a booking jumps to the underlying order view. The booking detail mirrors that by embedding the order's **billing and shipping address**, its **payment & shipping info** (payment method/title, shipping method/title), and its **invoices, shipments and refunds** — matching what the admin Booking view shows when it opens the order. Addresses can be `null` when the order has none, and the invoices/shipments/refunds arrays are empty when there are none.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [List bookings](/api/rest-api/admin/sales/bookings/list) | `GET /api/admin/bookings` |
| [Get a single booking](/api/rest-api/admin/sales/bookings/detail) | `GET /api/admin/bookings/{id}` |

All Bookings endpoints require the `sales.bookings.view` permission and an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
