---
outline: false
apiType: rest
---

# Contact Us

The Contact Us menu is the storefront enquiry form. It is a single endpoint, and it is **public** — a visitor who is not logged in can send a message.

## It Sends an Email, It Does Not Store a Record

This is the one thing to understand before building against it. The enquiry is emailed to the store's configured contact address; nothing addressable is created. There is no id in the response, no list endpoint, and no admin menu that shows past enquiries through the API.

So a client cannot show a customer their previous messages, cannot track whether one was answered, and cannot retry a specific submission. If your product needs any of that, keep your own copy at the point of submission — the API will not hold one for you.

## No Customer Token

Unlike [Newsletter](/api/rest-api/shop/newsletter/), sending a customer Bearer token changes nothing here: the enquiry is not linked to an account. Whoever is sending it must be identified by the `name` and `email` in the body, even for a signed-in customer — so prefill those fields from the session rather than expecting the API to infer them.

## What Is Required

`name`, `email`, and `message` are required; `contact` (a phone number) is optional, and an enquiry without it is accepted. Validation failures return `400` rather than the `422` used by most other write endpoints.

## Guard the Form Yourself

The storefront key is the only credential, and there is no uniqueness rule — the same message can be submitted repeatedly. An unprotected public form invites automated submissions, so rate limiting or a captcha is the client's responsibility.

## Operations in this menu

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Submit an Enquiry](/api/rest-api/shop/contact-us/submit-contact-us) | `POST /api/shop/contact-us` | Send a contact-form enquiry to the store. |

The Contact Us endpoint is public — it needs the storefront key only. See [Authentication](/api/rest-api/authentication).
