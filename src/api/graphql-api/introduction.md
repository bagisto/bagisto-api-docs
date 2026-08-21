# GraphQL API - Introduction

Welcome to the Bagisto GraphQL API documentation! This guide will help you build modern, efficient e-commerce applications using our comprehensive GraphQL platform.

## What is GraphQL?

GraphQL is a query language and runtime that allows clients to request exactly the data they need—nothing more, nothing less. It provides a strongly typed schema and enables developers to build flexible, efficient APIs.

**Key Benefits for Bagisto:**
- 🎯 **Precise Data Fetching** - Request only the fields you need
- ⚡ **Reduced Bandwidth** - Smaller payloads improve performance
- 📱 **Mobile Optimized** - Perfect for bandwidth-constrained environments
- 🔄 **Two Endpoints** - Storefront operations through `/api/graphql`, admin operations through `/api/admin/graphql`
- 📚 **Self-Documenting** - Schema includes inline documentation
- 🛠️ **Developer Friendly** - Interactive playground included

## Architecture Overview

Bagisto's GraphQL API is built on **API Platform for Laravel**, a powerful framework that provides robust GraphQL support out of the box. This architecture enables a modern, type-safe API layer with minimal configuration.

Bagisto's GraphQL API is built using the **Platforma API Laravel plugin** with **Bagisto's BagistoApi plugin**, providing two distinct API layers:

### 🛍️ Shop API (Frontend)
The public-facing API for customer-facing operations:
- Product browsing and search
- Customer authentication and profile management
- Shopping cart management
- Checkout and order placement
- Reviews and ratings
- Wishlist management

### 👨‍💼 Admin API (Backend)
The administrative API for management operations:
- Product and category management
- Customer administration
- Order management and fulfillment
- System configuration
- Reports and analytics

## Quick Start
 
### Access the Playground

Two ways to explore the API:

**Interactive GraphQL Playground:**
```
# Storefront
https://your-domain.com/api/graphiql

# Admin
https://your-domain.com/api/admin/graphiql
```

## API Endpoints

Bagisto exposes **two separate GraphQL endpoints** — one for the storefront, one for the admin. They do not share a schema: shop operations are not reachable on the admin endpoint, and admin operations are not reachable on the shop endpoint.

| Endpoint | Purpose | Authentication |
|----------|---------|-----------------|
| `/api/graphql` | Shop (storefront) GraphQL | `X-STOREFRONT-KEY` required; `Authorization: Bearer` added for customer operations |
| `/api/admin/graphql` | Admin GraphQL | `Authorization: Bearer <id>\|<token>` (Integration token) — no `X-STOREFRONT-KEY` |

## Authentication Methods

### Guest Checkout
Perfect for unauthenticated users:

```graphql
mutation {
  createCartToken(input: {}) {
    cartToken {
      id
      cartToken
    }
  }
}
```

Use the `cartToken` in the `Authorization: Bearer TOKEN` header along with the `X-STOREFRONT-KEY` .

### Customer Authentication

```graphql
mutation {
  createCustomerLogin(
    input: {
      email: "customer@example.com"
      password: "password123"
    }
  ) {
    customerLogin {
      id
      _id
      apiToken      
      token
      success
      message
    }
  }
}
```

Use the `token` in the `Authorization: Bearer TOKEN` header along with the `X-STOREFRONT-KEY` .

### Token Verification

```graphql
mutation {
  createVerifyToken(input: {
    token: "your-token-here"
  }) {
    verifyToken {
      isValid
      message
    }
  }
}
```

### Admin Authentication

Admin GraphQL uses a **pre-issued Integration token** generated from the **Integration** menu in the admin panel — there is no admin login mutation. POST admin operations to `/api/admin/graphql` with the token in the `Authorization` header, and **no** `X-STOREFRONT-KEY`:

```bash
curl -X POST https://your-domain.com/api/admin/graphql \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <id>|<token>" \
  -d '{
    "query": "query { adminOrders(first: 10) { edges { node { _id status grandTotal } } } }"
  }'
```

See the [Admin Authentication](/api/graphql-api/admin/authentication) reference for token issuance, rate limits, and permissions.

## Making Your First Request

### Using cURL

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -d '{
    "query": "query {
       products(first: 10) { 
        edges { node { id name } } } }"
  }'
```
 

## Response Format

All GraphQL responses follow a consistent format:

```json
{
  "data": {
    "products": {
      "edges": [
        {
          "node": {
            "id": "1",
            "name": "Product Name",
            "price": "99.99"
          }
        }
      ]
    }
  }
}
```

### Error Responses

```json
{
  "errors": [
    {
      "message": "Validation failed",
      "extensions": {
        "validation": {
          "email": ["The email field is invalid"]
        }
      }
    }
  ],
  "data": null
}
```

## Common Headers

| Header | Required | Purpose | Example |
|--------|----------|---------|---------|
| `Content-Type` | Yes | Request format | `application/json` |
| `X-STOREFRONT-KEY` | Yes | Storefront API key for public data access | `pk_storefront_WaZh0x0FlbKF1suY...` |
| `Authorization` | Conditional | Authentication token (required for customer/admin APIs) | `Bearer 867\|DlQxl04kMnUj...` |
| `X-LOCALE` | No | Locale code for localized content | `fr` |
| `X-CURRENCY` | No | Currency code for pricing | `EUR` |
| `X-CHANNEL` | No | Channel code for multi-channel stores | `default` |

### Context Headers (X-LOCALE, X-CURRENCY, X-CHANNEL)

These optional headers let you control which locale, currency, and channel context the API uses when returning data. This is useful for building multi-language, multi-currency, or multi-channel storefronts.

```bash
curl -X POST https://your-domain.com/api/graphql \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_WaZh0x0FlbKF1suYmDD37YTfkRKm6BJ1" \
  -H "Authorization: Bearer 867|DlQxl04kMnUjSpduZpd2gaVWX8oi3vvGY3RZn4pE03404429" \
  -H "X-LOCALE: fr" \
  -H "X-CURRENCY: EUR" \
  -H "X-CHANNEL: default" \
  -d '{
    "query": "query { products(first: 10) { edges { node { id name price } } } }"
  }'
```

> **Pre-requisite: Channel Configuration**
> Before the `X-LOCALE` and `X-CURRENCY` headers will have any effect, the desired locale and currency must first be **added to the channel** in the Bagisto admin panel. Navigate to **Settings → Channels → [Your Channel]** and add the locales and currencies you want to support. Only locales and currencies that are assigned to the channel will be recognized by the API — passing a locale or currency that is not configured on the channel will cause the system to fall back to the channel's default values.

**Fallback behavior:**
- If a header is **not present**, the system uses the **default value** configured in your Bagisto instance (e.g., the default locale, base currency, or default channel).
- If the value passed in a header **does not exist** in the system (e.g., `X-LOCALE: xx` where `xx` is not a configured locale), the system falls back to the **default value** instead of throwing an error.

| Header | Fallback When Missing or Invalid |
|--------|----------------------------------|
| `X-LOCALE` | Uses the channel's default locale |
| `X-CURRENCY` | Uses the channel's base currency |
| `X-CHANNEL` | Uses the default channel | 

<!-- ## Rate Limiting

API requests are rate-limited to prevent abuse:

- **Guest Requests**: 100 requests per minute per IP
- **Authenticated Requests**: 1000 requests per minute per customer
- **Admin Requests**: 500 requests per minute per admin user

Rate limit information is included in response headers:

```
X-RateLimit-Limit: 1000
X-RateLimit-Remaining: 999
X-RateLimit-Reset: 1702000000
``` -->

## Pagination

Bagisto uses cursor-based pagination for efficient data retrieval:

```graphql
query {
  products(first: 20, after: "cursor-value") {
    pageInfo {
      hasNextPage
      hasPreviousPage
      startCursor
      endCursor
    }
    edges {
      cursor
      node {
        id
        name
      }
    }
  }
}
```

Parameters:
- `first`: Number of items to return (max: 100)
- `after`: Cursor to start from
- `last`: Number of items from end
- `before`: Cursor to end at

## What's Next?

- 📚 [Shop API Reference](/api/graphql-api/shop-api) - Complete shop operations guide
- 🔑 [Admin API Reference](/api/graphql-api/admin-api) - Admin operations guide
- 🔐 [Authentication Guide](/api/graphql-api/authentication) - Detailed auth methods
- 🧪 [Integration Guides (GraphQL)](/api/graphql-api/integrations) - Code examples for your stack
- 💡 [Best Practices](/api/graphql-api/best-practices) - Performance and security tips

## Support & Resources

- 🌐 [Interactive Playground](https://api-demo.bagisto.com/api/graphiql)
- 💬 [Community Forum](https://forums.bagisto.com)
- 🐛 [Issue Tracker](https://github.com/bagisto/bagisto/issues)
- 📧 [Contact Support](https://bagisto.com/en/contacts/)
---