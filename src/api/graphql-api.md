# GraphQL API

Bagisto's GraphQL API delivers a modern, flexible approach to e-commerce data access. Built on Laravel Lighthouse, it provides efficient querying capabilities perfect for headless commerce, mobile apps, and modern frontend frameworks.

## 🚀 Quick Navigation

Choose your next step:

| Documentation | Description |
|---|---|
| 📖 [Introduction](/api/graphql-api/introduction) | Get started with GraphQL basics and API overview |
| 🔐 [Authentication](/api/graphql-api/authentication) | Learn all authentication methods and token management |
| 🛍️ [Shop API](/api/graphql-api/shop-api) | Customer-facing e-commerce operations reference |
| 👨‍💼 [Admin API](/api/graphql-api/admin-api) | Administrative operations and management reference |
| 🎮 [Playground Guide](/api/graphql-api/playground) | Interactive testing with sample queries |
| 💻 [Integration Guides](/api/graphql-api/integrations) | Code examples for multiple programming languages |
| 💡 [Best Practices](/api/graphql-api/best-practices) | Performance, security, and testing best practices |

## 🌐 Live Playground

Test queries instantly without any setup:

🎮 **[GraphQL Playground](https://api-demo.bagisto.com/api/graphiql)** - Interactive query builder with schema explorer

## Key Features

✨ **Developer Friendly**
- Interactive GraphiQL playground
- Auto-complete and schema documentation
- Copy as cURL functionality
- Real-time error reporting

🚀 **High Performance**
- Request only the data you need
- Cursor-based pagination
- Query optimization tools
- Caching support

🔒 **Secure**
- Multiple authentication methods
- Guest checkout support
- Token-based security
- Rate limiting

📱 **Mobile Ready**
- Optimized for low bandwidth
- Small payload sizes
- Perfect for native apps

## What Can You Build?

- 🛒 Headless storefronts and e-commerce sites
- 📱 Mobile apps (iOS & Android)
- 🔄 Third-party integrations and marketplaces
- 📊 Analytics dashboards
- ⚡ Progressive Web Apps (PWA)
- 🤖 AI-powered shopping assistants

## Quick Start

### 1. Choose Your Path

**For Building Customer-Facing Apps:**
- Start with [Shop API Reference](/api/graphql-api/shop-api)
- Learn [Authentication Methods](/api/graphql-api/authentication)

**For Admin Dashboards:**
- Start with [Admin API Reference](/api/graphql-api/admin-api)
- Review [Permission Requirements](/api/graphql-api/admin-api#permission--role-management)

**For Your Programming Language:**
- Find your language in [Integration Guides](/api/graphql-api/integrations)
- Copy-paste code examples and adapt

### 2. Test in Playground

- Visit [GraphQL Playground](https://api-demo.bagisto.com/api/graphiql)
- Try [Sample Queries](/api/graphql-api/playground#quick-start-queries)
- Explore the [Schema](/api/graphql-api/playground#schema-explorer)

### 3. Implement in Your App

- Follow the [Authentication Guide](/api/graphql-api/authentication)
- Use examples from [Integration Guides](/api/graphql-api/integrations)
- Apply [Best Practices](/api/graphql-api/best-practices)

## Documentation Structure

### Core Documentation
1. **[Introduction](/api/graphql-api/introduction)** - GraphQL fundamentals, setup, and endpoints
2. **[Authentication](/api/graphql-api/authentication)** - All auth methods (guest, customer, admin)
3. **[Shop API](/api/graphql-api/shop-api)** - Complete Shop API with all queries and mutations

### Advanced Documentation
4. **[Admin API](/api/graphql-api/admin-api)** - Admin operations for management tasks
5. **[Playground Guide](/api/graphql-api/playground)** - Interactive testing with sample queries
6. **[Integration Guides](/api/graphql-api/integrations)** - Code examples for:
   - JavaScript / Node.js / React / Next.js
   - Python / Django
   - PHP / Laravel
   - Ruby / Rails
   - Go
   - Java

### Best Practices
7. **[Best Practices](/api/graphql-api/best-practices)** - Performance optimization, security, testing, debugging

## Common Use Cases

### Building a Headless Storefront
```
1. Get Products → [Shop API - Products](/api/graphql-api/shop-api#products)
2. Manage Cart → [Shop API - Shopping Cart](/api/graphql-api/shop-api#shopping-cart)
3. Checkout → [Shop API - Checkout](/api/graphql-api/shop-api#checkout)
4. Learn Auth → [Authentication Guide](/api/graphql-api/authentication)
```

### Building a Mobile App
```
1. Learn Guest Auth → [Authentication - Guest](/api/graphql-api/authentication#1-guest-checkout-authentication)
2. Browse Products → [Shop API - Products](/api/graphql-api/shop-api#products)
3. Integrate Language → [Integration Guides](/api/graphql-api/integrations)
4. Apply Best Practices → [Best Practices](/api/graphql-api/best-practices)
```

### Building an Admin Dashboard
```
1. Admin Login → [Authentication - Admin](/api/graphql-api/authentication#3-admin-authentication)
2. Manage Data → [Admin API Reference](/api/graphql-api/admin-api)
3. Optimize Performance → [Best Practices - Performance](/api/graphql-api/best-practices#performance-optimization)
4. Implement Testing → [Best Practices - Testing](/api/graphql-api/best-practices#testing)
```

### Building a Third-Party Integration
```
1. Choose Auth Method → [Authentication Guide](/api/graphql-api/authentication)
2. Decide Shop or Admin → [Shop API](/api/graphql-api/shop-api) or [Admin API](/api/graphql-api/admin-api)
3. Select Language → [Integration Guides](/api/graphql-api/integrations)
4. Handle Errors → [Best Practices - Error Handling](/api/graphql-api/best-practices#error-handling)
```

## API Endpoints

::: warning Shop and Admin use DIFFERENT GraphQL endpoints (2026-05-28)
The admin API was moved off the shared `/api/graphql` endpoint and onto a
dedicated route. Always pick the right endpoint based on which API you're
calling.
:::

| Endpoint | Purpose | Authentication |
|----------|---------|-----------------|
| `POST /api/graphql` | **Shop** GraphQL API (public + customer) | `X-STOREFRONT-KEY` (+ `Authorization: Bearer` for customer ops) |
| `POST /api/admin/graphql` | **Admin** GraphQL API | `Authorization: Bearer <integration-token>` only — **no** storefront key |
| `GET /api/graphiql` | Shop GraphiQL Playground | None |
| `GET /api/admin/graphiql` | Admin GraphiQL Playground | None |
| `GET /api/sandbox` | Apollo Sandbox UI | None |

An admin Bearer token sent to `/api/graphql` is **rejected** with 401 — there
is no back door. Admin clients must use `/api/admin/graphql`.

## Popular Queries

### Get Products
```graphql
query {
  products(channel: "default", first: 10) {
    edges {
      node {
        id
        name
        price
      }
    }
  }
}
```

[See more Shop API queries →](/api/graphql-api/shop-api#products)

### Customer Login
```graphql
mutation {
  createLogin(input: {
    email: "user@example.com"
    password: "password"
  }) {
    accessToken
  }
}
```

[See more Auth examples →](/api/graphql-api/authentication#2-customer-authentication)

### Create Order
```graphql
mutation {
  createOrder(input: {
    cartId: "CART_ID"
    billingAddressId: "ADDRESS_ID"
    shippingMethod: "flatrate_flatrate"
    paymentMethod: "paypal"
  }) {
    order {
      id
      incrementId
    }
  }
}
```

[See complete checkout flow →](/api/graphql-api/shop-api#checkout)

## Getting Help

| Resource | Purpose |
|----------|---------|
| 🎮 [Live Playground](https://api-demo.bagisto.com/api/graphiql) | Test queries instantly |
| 📚 [Documentation](/api/graphql-api/introduction) | Comprehensive guides |
| 💬 [Community Forum](https://forums.bagisto.com) | Ask questions |
| 🐛 [Issue Tracker](https://github.com/bagisto/bagisto/issues) | Report bugs |
| 📧 [Contact Support](https://bagisto.com/en/contacts/) | Enterprise support |

---

**Start Building Today!**

👉 **New to GraphQL?** Start with [Introduction](/api/graphql-api/introduction)

👉 **Ready to code?** Choose your language in [Integration Guides](/api/graphql-api/integrations)

👉 **Want to test?** Visit [GraphQL Playground](https://api-demo.bagisto.com/api/graphiql)
