---
outline: false
---

# CMS Pages

The CMS Pages menu exposes the store's static content pages — About Us, Privacy Policy, Terms & Conditions, and any other page the store owner has published. A client uses it to render those pages and to build footer / informational links.

## When you use it

List the pages to discover every published page (with its `urlKey` so you can build a link), then fetch a single page by id (or url key) to render its full HTML content and meta information.

## Operations in this menu

| Operation | GraphQL field |
|-----------|---------------|
| [Pages](/api/graphql-api/shop/queries/get-pages) | `cmsPages` query |
| [Single Page](/api/graphql-api/shop/queries/get-page) | `cmsPage(id:)` query |

These are public read endpoints — they require the storefront key header but no customer Bearer token. See [Authentication](/api/graphql-api/authentication).
