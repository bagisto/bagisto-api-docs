---
outline: false
---

# Events

A **marketing event** is a dated milestone — such as a sale kickoff or a holiday — that anchors when campaigns go out. It mirrors the admin **Marketing → Communications → Events** screen.

## How an event works

An event is intentionally lightweight: a name, a description, and a single date.

- **`name`** — a short label for the event (e.g. *Holiday Sale Kickoff*).
- **`description`** — free-text notes about what the event is for.
- **`date`** — the event date in `YYYY-MM-DD` form. This is the day the event is anchored to.

**What an event is used for.** A campaign can reference an event so that a scheduled send lines up with the event's date — the event provides the calendar anchor while the campaign provides the email template and audience.

**No mass delete.** Events are managed one at a time; the admin screen offers no bulk-delete action, so neither does the API.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/communications/events-list) | `adminMarketingEvents` query |
| [Detail](/api/graphql-api/admin/marketing/communications/events-detail) | `adminMarketingEvent` query |
| [Create](/api/graphql-api/admin/marketing/communications/events-create) | `createAdminMarketingEvent` mutation |
| [Update](/api/graphql-api/admin/marketing/communications/events-update) | `updateAdminMarketingEvent` mutation |
| [Delete](/api/graphql-api/admin/marketing/communications/events-delete) | `deleteAdminMarketingEvent` mutation |

**Relation.** Events pair with [Campaigns](/api/graphql-api/admin/marketing/communications/campaigns/) — a campaign may reference an event so its send lines up with the event date.
