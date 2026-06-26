---
outline: false
---

# Contact Us

The Contact Us menu lets a visitor send the store a message through the storefront contact form — name, email, contact number, and message. A client uses it to power a "Contact Us" page.

## When you use it

Submit the form once the visitor has filled in their details; the store receives the message. No account is needed — this is open to any visitor.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Create Contact Us](/api/graphql-api/shop/mutations/create-contact-us) | `createContactUs` mutation |

This is a public endpoint — it requires the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
