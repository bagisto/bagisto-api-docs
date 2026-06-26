---
outline: false
---

# Campaigns

A **campaign** pairs an email template with a customer group (and an optional
event) and sends that template to the group. It mirrors the admin **Marketing →
Communications → Campaigns** screen.

## How a campaign works

A campaign brings together four pieces and then sends them as one email blast.

- **Template** — `marketing_template_id` points at the [email template](/api/rest-api/admin/marketing/communications/templates/)
  whose HTML body is sent. The `subject` is the email subject line.
- **Audience** — `customer_group_id` selects which customer group receives the
  email. Only subscribed members of that group are mailed. When the group is the
  guest group, the guest newsletter subscribers are mailed instead.
- **Channel** — `channel_id` is the storefront channel the campaign sends from.
- **Event** — `marketing_event_id` is an optional [event](/api/rest-api/admin/marketing/communications/events/)
  the campaign can be timed against; it may be `null`.

**Status.** `status` (`0`/`1`) toggles the campaign on. The
[send](/api/rest-api/admin/marketing/communications/campaigns-send) action
refuses an inactive (`status = 0`) campaign.

**Resolved objects.** The [detail](/api/rest-api/admin/marketing/communications/campaigns-detail)
endpoint resolves the `channel`, `customerGroup`, `marketingTemplate`, and
`marketingEvent` objects (`marketingEvent` is an object or `null` when no event is
linked). These objects are `null` on list rows.

**Sending.** Send queues the email to every subscribed member of the customer
group right away, skipping any event-date gate. There is no mass-delete for
campaigns — the admin UI exposes per-row delete only.

**Relations.** Campaigns draw their body from [Email Templates](/api/rest-api/admin/marketing/communications/templates/),
can be timed against [Events](/api/rest-api/admin/marketing/communications/events/),
and reach the subscribed members tracked under [Newsletter Subscribers](/api/rest-api/admin/marketing/communications/subscribers/).

## Operations in this menu

| Action | Endpoint |
|--------|----------|
| [List](/api/rest-api/admin/marketing/communications/campaigns-list) | `GET /api/admin/marketing/campaigns` |
| [Detail](/api/rest-api/admin/marketing/communications/campaigns-detail) | `GET /api/admin/marketing/campaigns/{id}` |
| [Create](/api/rest-api/admin/marketing/communications/campaigns-create) | `POST /api/admin/marketing/campaigns` |
| [Update](/api/rest-api/admin/marketing/communications/campaigns-update) | `PUT /api/admin/marketing/campaigns/{id}` |
| [Delete](/api/rest-api/admin/marketing/communications/campaigns-delete) | `DELETE /api/admin/marketing/campaigns/{id}` |
| [Send](/api/rest-api/admin/marketing/communications/campaigns-send) | `POST /api/admin/marketing/campaigns/{id}/send` |

All Campaigns endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
