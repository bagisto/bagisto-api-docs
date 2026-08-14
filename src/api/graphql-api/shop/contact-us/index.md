---
outline: false
---

# Contact Us

The Contact Us menu is the storefront enquiry form. It is a single mutation, and it is **public** — a visitor who is not logged in can send a message.

## It Sends an Email, It Does Not Store a Record

This is the one thing to understand before building against it. The enquiry is emailed to the store's configured contact address; nothing addressable is created. There is no id in the response, no query to list past enquiries, and no admin menu that exposes them through the API.

So a client cannot show a customer their previous messages, cannot track whether one was answered, and cannot retry a specific submission. If your product needs any of that, keep your own copy at the point of submission — the API will not hold one for you.

## No Customer Token

Unlike [Newsletter](/api/graphql-api/shop/newsletter/), sending a customer Bearer token changes nothing here: the enquiry is not linked to an account. Whoever is sending it must be identified by the `name` and `email` in the input, even for a signed-in customer — so prefill those fields from the session rather than expecting the API to infer them.

## What Is Required

`name`, `email`, and `message` are required; `contact` (a phone number) is optional, and an enquiry without it is accepted. Every field is nullable in the schema, so the requirement is enforced at execution rather than by the type — omitting one produces a valid query that fails in `errors`.

## Guard the Form Yourself

The storefront key is the only credential, and there is no uniqueness rule — the same message can be submitted repeatedly. An unprotected public form invites automated submissions, so rate limiting or a captcha is the client's responsibility.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Create Contact Us](/api/graphql-api/shop/mutations/create-contact-us) | `createContactUs` mutation |

This is a public endpoint — it requires the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
