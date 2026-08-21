---
outline: false
---

# Campaigns

A **campaign** pairs an email template with a customer group (and an optional
event) and sends that email to the group's subscribed members. It mirrors the
admin **Marketing → Communications → Campaigns** screen.

## How a campaign works

A campaign brings together four pieces of marketing data and a subject line:

- **Email template** (`marketingTemplate`) — the HTML body that gets sent. Set
  up under **Marketing → Communications → Email Templates**. Linked on create /
  update by its id (`marketingTemplateId`).
- **Customer group** (`customerGroup`) — who receives it. The send goes to the
  subscribed members of this group; for a guest group it goes to the guest
  newsletter subscribers. Linked by id (`customerGroupId`).
- **Channel** (`channel`) — the storefront channel the campaign belongs to.
  Linked by id (`channelId`).
- **Event** (`marketingEvent`, optional) — a dated marketing event the campaign
  can line up with. May be `null`. Linked by id (`marketingEventId`).

The campaign also carries its own `subject` (the email subject line) and a
`status` (`0` inactive / `1` active).

**Resolved objects.** The [detail](/api/graphql-api/admin/marketing/communications/campaigns-detail)
query resolves the `channel`, `customerGroup`, and `marketingTemplate` objects —
sub-select the fields you need from each. The campaign's event is **REST-only**:
read `marketingEvent` (object or `null`) via the
[REST detail](/api/rest-api/admin/marketing/communications/campaigns-detail); it
is not field-selectable over GraphQL. On
[list](/api/graphql-api/admin/marketing/communications/campaigns-list) rows the
objects are `null`.

**Sending.** [Send](/api/graphql-api/admin/marketing/communications/campaigns-send)
queues the template to every subscribed member of the campaign's customer group
immediately, skipping any event-date gate. Only an active campaign
(`status` = `1`) can be sent — sending an inactive one returns a `422` error.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List](/api/graphql-api/admin/marketing/communications/campaigns-list) | `adminMarketingCampaigns` query |
| [Detail](/api/graphql-api/admin/marketing/communications/campaigns-detail) | `adminMarketingCampaign` query |
| [Create](/api/graphql-api/admin/marketing/communications/campaigns-create) | `createAdminMarketingCampaign` mutation |
| [Update](/api/graphql-api/admin/marketing/communications/campaigns-update) | `updateAdminMarketingCampaign` mutation |
| [Delete](/api/graphql-api/admin/marketing/communications/campaigns-delete) | `deleteAdminMarketingCampaign` mutation |
| [Send](/api/graphql-api/admin/marketing/communications/campaigns-send) | `createAdminMarketingCampaignSend` mutation |

The `channel`, `customerGroup`, and `marketingTemplate` objects resolve only on
the **detail** query — they are `null` on list rows. The campaign's event is
REST-only. Create / update mutation payloads do not resolve the objects — re-query
the detail.

**Relations.** Campaigns draw on **Email Templates** (the body), **Events** (the
optional date anchor), and **Newsletter Subscribers** (the audience — a send
reaches the subscribed members of the chosen customer group).
