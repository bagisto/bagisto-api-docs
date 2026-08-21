---
outline: false
---

# Events

A **marketing event** is a dated entry that anchors campaigns — for example a sale
kickoff date. It mirrors the admin **Marketing → Communications → Events** screen.

## How an event works

An event is intentionally simple: a `name`, a `description`, and a `date`. Its
purpose is to give campaigns a fixed calendar anchor.

- **`name`** — the event label shown in the admin list.
- **`description`** — free-text notes about what the event is for.
- **`date`** — the calendar date (`YYYY-MM-DD`) the event lands on.

**Relation to Campaigns.** A campaign may reference an event so a scheduled send
lines up with the event's date. The event itself sends nothing — it only marks the
date a campaign can be timed against.

There is no mass-delete for events — the admin UI exposes per-row delete only.

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/communications/events-list) | `GET /api/admin/marketing/events` |
| [Detail](/api/rest-api/admin/marketing/communications/events-detail) | `GET /api/admin/marketing/events/{id}` |
| [Create](/api/rest-api/admin/marketing/communications/events-create) | `POST /api/admin/marketing/events` |
| [Update](/api/rest-api/admin/marketing/communications/events-update) | `PUT /api/admin/marketing/events/{id}` |
| [Delete](/api/rest-api/admin/marketing/communications/events-delete) | `DELETE /api/admin/marketing/events/{id}` |
