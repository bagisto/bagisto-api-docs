---
outline: false
---

# Communications

Communications is the store's **outbound email** toolkit — define a reusable email body, optionally anchor it to a dated event, then send it to a segment of subscribers. It mirrors the admin **Marketing → Communications** menu.

## Resources

| Resource | What it's for |
|----------|----------------|
| [Email Templates](/api/rest-api/admin/marketing/communications/templates/) | Reusable HTML email bodies with a name and an active / inactive / draft status. |
| [Events](/api/rest-api/admin/marketing/communications/events/) | Dated marketing events (e.g. a sale kickoff) that a campaign can be anchored to. |
| [Campaigns](/api/rest-api/admin/marketing/communications/campaigns/) | A template sent to a customer group through a channel — optionally tied to an event. Includes a manual **Send**. |
| [Newsletter Subscribers](/api/rest-api/admin/marketing/communications/subscribers/) | The audience — the email addresses that opted in on the storefront. |

## How they fit together

A **Campaign** is the hub: it pairs an **Email Template** (the body) with a **customer group** of **Newsletter Subscribers** (the audience), sent over a **channel**, and may reference an **Event** (the occasion). Sending a campaign queues the template to every subscribed member of its customer group. Templates and events are reusable building blocks — many campaigns can share one template. Subscribers are created by the storefront opt-in, not through this API.
