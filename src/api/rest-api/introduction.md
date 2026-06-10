# REST API - Introduction

Welcome to the Bagisto REST API documentation! This guide will help you build modern, efficient e-commerce applications using our comprehensive REST API platform built with **API Platform** and **Laravel**.

## Endpoints and Requests

All Bagisto REST API endpoints follow this pattern:

```
https://{your-domain.com}/api/{type}/{resource}
```

API endpoints are organized by resource type. You'll need to use different endpoints depending on your app's requirements.

### Common Endpoint Patterns

| Pattern | Example | Purpose |
|---------|---------|---------|
| `GET /api/{type}/{resource}` | `GET /api/shop/products` | List resources with pagination |
| `GET /api/{type}/{resource}/{id}` | `GET /api/shop/products/1` | Retrieve a specific resource |
| `POST /api/{type}/{resource}` | `POST /api/shop/customers` | Create a new resource |
| `PATCH /api/{type}/{resource}/{id}` | `PATCH /api/admin/products/1` | Update a resource |
| `DELETE /api/{type}/{resource}/{id}` | `DELETE /api/admin/products/5` | Delete a resource |

## What is REST API?

REST (Representational State Transfer) is an architectural style for building web services using HTTP. It provides a simple, stateless interface for building client-server applications with standard HTTP methods (GET, POST, PATCH, DELETE).

**Key Benefits for Bagisto:**
- 🎯 **Standard HTTP Methods** - Familiar REST conventions for all developers
- ⚡ **Efficient Data Transfer** - Optimized payloads with selective field inclusion
- 📱 **Mobile Optimized** - Perfect for native mobile app integrations
- 🔒 **Secure Authentication** - Token-based authentication with Laravel Sanctum
- 📚 **Well-Documented** - Comprehensive OpenAPI/Swagger documentation
- � **Consistent API Design** - Uniform patterns across all resources

## Architecture Overview

Bagisto's REST API is built using the **API Platform** framework with **Laravel**, providing two distinct API layers:

### 🛍️ Shop API (Frontend)
The public-facing API for customer-facing operations:
- Product browsing and catalog management
- Shopping cart management
- Customer registration and authentication
- Order placement and management
- Address and customer profile management
- Reviews and ratings
- Wishlist and product reviews

### 👨‍💼 Admin API (Backend)
The administrative API for management operations:
- Product and category management
- Customer administration
- Order management and fulfillment
- Inventory management
- System configuration
- Reports and analytics

## Quick Start

### 1. Installation
See the [Installation Guide](/api/installation).**

### 2. Enable Swagger UI 

- By default swagger UI is enabled but you can enable / disable using the file
config/api-platform.conf

### 3. Access Swagger UI
 - [Shop API Swagger](https://api-demo.bagisto.com/api/shop)
 - [Admin API Swagger](https://api-demo.bagisto.com/api/admin)


## API Endpoints Structure

Bagisto REST API follows a hierarchical endpoint structure:

| Category | Base Path | Purpose |
|----------|-----------|---------|
| Shop API | `/api/shop/` | Customer-facing operations |
| Admin API | `/api/admin/` | Administrative operations |

## REST API HTTP Methods

| Method | Purpose | Use Case |
|--------|---------|----------|
| `GET` | Retrieve resources | Fetch single or collection of resources |
| `POST` | Create resource | Create new resource or perform mutations |
| `PUT` | Full replace | Replace entire resource |
| `DELETE` | Remove resource | Delete a resource |


## Common Headers

Every Shop API call must carry a storefront key. Authentication, scoping, and content negotiation are all controlled through HTTP headers — there are no query parameters for any of them.

| Header             | Required          | Purpose                                                      | Example                                          |
|--------------------|-------------------|--------------------------------------------------------------|--------------------------------------------------|
| `Accept`           | Yes               | Expected response format                                     | `application/json`                               |
| `Content-Type`     | On `POST`/`PUT`   | Request payload format                                       | `application/json`                               |
| `X-STOREFRONT-KEY` | **Yes** (Shop API) | Identifies the calling storefront — every Shop endpoint requires it | `pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx` |
| `Authorization`    | Auth-only routes  | Sanctum bearer token for endpoints scoped to a logged-in customer (orders, addresses, profile, etc.) | `Bearer 1\|abcdef…`                              |
| `X-Locale`         | No                | Override request locale (falls back to channel default)      | `en`, `fr`, `ar`                                 |
| `X-Channel`        | No                | Override the channel scope (falls back to current channel)   | `default`                                        |
| `X-Currency`       | No                | Override response currency (falls back to channel default)   | `USD`, `EUR`, `INR`                              |

### About the storefront key

The `X-STOREFRONT-KEY` is generated by the package installer (`php artisan bagisto-api-platform:install`) and lives in your `.env` as `STOREFRONT_PLAYGROUND_KEY`. You can also issue additional keys with:

```bash
php artisan bagisto-api:generate-key --name="My Mobile App"
```

Each key is rate-limited and can be revoked or rotated from the admin panel. **A 401 response from any Shop endpoint usually means the key is missing, inactive, or expired** — not a customer-auth problem.

### `X-Locale`, `X-Channel`, `X-Currency`

These three headers control the *scope* of the response. They are independent — you can set any combination:

- `X-Channel` switches catalog/channel scope (different products, different inventory).
- `X-Locale` switches translation locale (product names, category labels, attribute labels).
- `X-Currency` switches currency formatting on `formattedPrice`, `formattedSpecialPrice`, etc. and influences cart totals.

If a header is omitted, the API falls back to the **default for the current channel** (configured in admin → Channels). When a non-default value is sent, the SetLocaleChannel middleware swaps the active scope for the rest of the request.

## Authorizing on Swagger UI

The Swagger playground (`/api/shop`, `/api/admin`) ships with **a single global "Authorize" button at the top of the page**. There is no per-endpoint auth UI — every endpoint reuses the credentials you set there.

### Workflow

1. Click **Authorize** at the top of the page.
2. Fill in the relevant credentials:
   - `STOREFRONT_KEY (apiKey)` — paste your `pk_storefront_…` key. **Required for every Shop request**, including public catalog endpoints.
   - `Bearer (http, Bearer)` — paste a Sanctum token *without* the `Bearer ` prefix. Only required for customer-scoped endpoints (`/customer-orders`, `/customer-addresses`, `/customer-profile-*`, etc.).
3. Click **Authorize**, then **Close**.

The values are cached in the browser session and automatically attached to every subsequent request you trigger from the page.

### Updating the auth values

Switching between accounts (e.g. testing as a different customer) requires a manual update — the playground will not refresh tokens for you:

1. Click **Authorize** again.
2. Click **Logout** next to the credential you want to change (this clears it).
3. Paste the new value and click **Authorize** → **Close**.

### Logging out

There's no automatic session expiry inside the UI. To clear credentials:

- Open **Authorize** and click **Logout** for each credential you set, or
- Refresh the page in a fresh browser tab — credentials are stored only for the active session.

## IRIs & HATEOAS

Bagisto's REST API is built on **API Platform**, which follows the [HATEOAS](https://en.wikipedia.org/wiki/HATEOAS) principle: instead of embedding every related resource inline, responses expose **IRIs** (Internationalized Resource Identifiers — server-relative URL strings) that the client can dereference on demand.

### What an IRI looks like

An IRI is just a path string in the same API namespace:

```
/api/shop/attribute_translations/23
/api/shop/categories/4
/api/shop/products/42/customer-group-prices
```

You GET it directly to retrieve the resource — no special parser, no envelope:

```bash
curl "https://your-domain/api/shop/attribute_translations/23" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

### Where they appear

Three patterns in responses:

1. **Inline objects** — the most common related-data is already expanded:
   ```json
   "translation": { "id": 1, "attributeId": 1, "locale": "en", "name": "SKU" }
   ```
   No follow-up call needed.

2. **IRI strings** — for "the rest of the locales / the rest of the relation":
   ```json
   "translations": [
     "/api/shop/attribute_translations/1",
     "/api/shop/attribute_translations/86"
   ]
   ```
   Each entry is a fully-resolvable URL — `GET <iri>` returns that single resource.

3. **Inline arrays of objects** — when the relation is small or always needed inline (e.g. an attribute's options, an order's items): the related objects are returned in full, no IRIs.

The same field can be inline on one resource and IRI on another. This is intentional — payload size is balanced against how often the client needs the data.

### Why follow IRIs instead of constructing URLs

- **Stability** — the API can change a route prefix or restructure a sub-resource without breaking clients that follow links rather than build them.
- **No guessing** — you never have to know how to assemble `/api/shop/foo/{id}/bar`; the server tells you the exact URL.
- **Discoverability** — every related resource is reachable from its parent, so a client can crawl the graph.

### Rule of thumb

- Need the field that's already inline → use it.
- Need data behind an IRI → `GET` the IRI as-is, with the same headers (storefront key, optional locale/channel/currency overrides).
- Don't construct routes from IDs unless an endpoint is documented with a fixed URL pattern (`/api/shop/products/{id}`, `/api/shop/categories/{id}`, etc.).

## Pagination

Every collection endpoint (`GET /api/shop/products`, `/categories`, `/attributes`, `/customer-orders`, …) returns a JSON **array** — not an envelope. Paging metadata is delivered as **response headers**, so the array can be rendered directly without unwrapping.

### Query parameters

| Parameter   | Type    | Default | Description                                          |
|-------------|---------|---------|------------------------------------------------------|
| `page`      | integer | `1`     | Page number (1-based)                                |
| `per_page`  | integer | `10`    | Items per page. Hard-capped at **50** server-side.   |

> Use `per_page` (snake_case). The legacy API Platform name `itemsPerPage` is **not** accepted — it's remapped to `per_page` in the package config.

### Response headers

| Header           | Type    | Description                                          |
|------------------|---------|------------------------------------------------------|
| `X-Total-Count`  | integer | Total items across **all** pages                     |
| `X-Page`         | integer | Current page (1-based)                               |
| `X-Per-Page`     | integer | Items returned on this page                          |
| `X-Total-Pages`  | integer | Total number of pages (`ceil(X-Total-Count / X-Per-Page)`) |

All four headers are CORS-exposed via `Access-Control-Expose-Headers`, so JS clients can read them with `response.headers.get('X-Total-Count')` from a browser without extra server config.

### Example

Request:

```
GET /api/shop/products?page=2&per_page=20
```

Response headers:

```
HTTP/1.1 200 OK
X-Total-Count: 137
X-Page: 2
X-Per-Page: 20
X-Total-Pages: 7
Access-Control-Expose-Headers: X-Total-Count, X-Page, X-Per-Page, X-Total-Pages
```

Response body: a JSON array of 20 product objects (or fewer on the last page).

### Building pager UI

```js
const res = await fetch(`/api/shop/products?page=${page}&per_page=20`, { headers });
const items = await res.json();
const total = Number(res.headers.get('X-Total-Count'));
const pages = Number(res.headers.get('X-Total-Pages'));
// items is an array — render it directly
```

### Notes

- Requesting `?page=N` beyond `X-Total-Pages` returns an empty array `[]` with `200 OK` (not a 404).
- Single-resource endpoints (`GET /…/{id}`) don't paginate and don't emit these headers.
- Pagination defaults are configurable in `config/api-platform.php` (`pagination_items_per_page`, `pagination_maximum_items_per_page`).

## Working with Carts as a Guest

Guest customers (no Sanctum token) cannot rely on session cookies — every request stands alone. To add products to a cart as a guest, the flow is **always** two requests:

### 1. Create a cart token

```
POST /api/shop/cart-tokens
X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
Accept: application/json
Content-Type: application/json
```

The response carries a server-generated `cartToken` string. Store it client-side (cookie / localStorage / mobile keychain).

### 2. Send that token on every cart-related request

Pass the token as `cart_token` in the request body of every subsequent cart endpoint (`add-product-in-cart`, `update-cart-items`, `remove-cart-items`, `apply-coupon`, …) and on cart reads (`POST /api/shop/cart`):

```json
{
  "cart_token": "cT_5b3a1c…",
  "product_id": 42,
  "quantity": 1
}
```

The same token also drives checkout — pass it through the address, shipping-method, payment-method and order-place steps.

> Logged-in customers (who send `Authorization: Bearer …`) do **not** need a cart token. Their cart is identified by the authenticated user, and any guest cart they previously held is merged into their account on login.

> See the [Cart Token endpoint](/api/rest-api/shop/cart/cart-token) and [Add Product to Cart](/api/rest-api/shop/cart/add-product-in-cart) for full request/response shapes.

## What's Next?

- 🛍️ [Shop API Resources](/api/rest-api/shop-resources) - Complete shop operations guide
- 👨‍💼 [Cart & Checkout](/api/rest-api/cart-checkout) - Shopping cart and order management
- 👤 [Customer Management](/api/rest-api/customers) - Customer profiles and addresses
- 📦 [Product Management](/api/rest-api/products) - Product operations and details
- 🔐 [Authentication Guide](/api/rest-api/authentication) - Detailed auth methods
- 💡 [Best Practices](/api/rest-api/best-practices) - Performance and security tips

## Support & Resources

- 🌐 [Interactive Swagger UI](https://api-demo.bagisto.com/api)
- 📖 [OpenAPI Schema](https://api-demo.bagisto.com/api/docs.json)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto-api/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)

---