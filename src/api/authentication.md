# API Authentication Guide

Bagisto provides multiple authentication methods to secure your API requests. Choose the authentication method based on the type of API access you need.

## Quick Authentication Overview

| Your Use Case | Authentication Method | API Type | Read More |
|---|---|---|---|
| **Public data** (products, categories) | `X-STOREFRONT-KEY` header | Shop API | [Public APIs](#_1-public-apis-storefront) |
| **Customer operations** (cart, orders, profile) | `X-STOREFRONT-KEY` + Bearer token | Shop API | [Customer APIs](#_2-customer-apis) |
| **Admin operations** (manage products, inventory) | Bearer token (admin) | Admin API | [Admin APIs](#_3-admin-apis) |

## Authentication Architecture

All Bagisto APIs are built on a secure, Laravel-native foundation:

- **Laravel Sanctum** — Token-based authentication framework
- **Secure Token Generation** — Cryptographically secure token creation
- **Token Expiration** — Configurable token lifetime
- **Rate Limiting** — Per-key rate limit protection
- **HTTPS Required** — Enforced in production environments

---

## 1. Public APIs (Storefront)

**Best for:** Reading public data (products, categories, prices) without user login.

### The Basics

- **What you need:** `X-STOREFRONT-KEY` header
- **What you get:** Read-only access to storefront data
- **Who can use it:** Anyone (no login required)
- **Perfect for:** Mobile apps, websites, third-party integrations

### What You Can Do

Here are common things you can do with Public APIs:

- 📦 Browse products and get detailed product information
- 🏷️ View categories and subcategories
- 🎨 Get product attributes and variations
- 📄 Read CMS pages and content
- 🌍 Get available countries and locales
- 📮 Retrieve shipping and payment methods (available options)

::: tip Guest checkout — placing an order without login
The Storefront Key alone is read-only, but a **guest can build a cart and place an order** without a customer account. Create a **Cart Token** (`createCartToken`), then send it as `Authorization: Bearer <cartToken>` alongside the `X-STOREFRONT-KEY` on the cart and checkout calls — no customer login required. See the [Cart workflow](/api/workflows/shop/cart) and [Checkout workflow](/api/workflows/shop/checkout).
:::

### How to Use

**1. Get your Storefront Key**

```bash
php artisan bagisto-api:generate-key --name="Web Storefront"
```

You'll get something like: `pk_storefront_xxxxxxxxxxxxx`

**2. Make a REST API request:**

```bash
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

**3. Or a GraphQL request:**

```bash
curl -X POST "https://your-domain.com/api/graphql" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{
    "query": "query { products { id name price } }"
  }'
```


### Key Facts

- 🔓 **Read-only** — You can't modify data, only view it
- 📊 **Cacheable** — Responses can be cached for better performance
- ⚡ **Fast** — No database lookups for user data
- 🚀 **Scalable** — Can handle high request volumes
- 🔄 **Rate limited** — Default: 100 requests/minute per key (see [Rate Limiting Guide](./rate-limiting))
---

## 2. Customer APIs

**Best for:** Building customer-facing features (shopping cart, orders, profiles) after user login.

### The Basics

- **What you need:** `X-STOREFRONT-KEY` header + Bearer token (from customer login)
- **What you get:** Access to customer's personal data and ability to perform actions
- **Who can use it:** Authenticated customers only
- **Perfect for:** Mobile apps, customer portals, checkout flows

### How It Works (3 Steps)

**Step 1: Customer logs in**

```bash
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{
    "email": "john@example.com",
    "password": "SecurePass@123"
  }'
```

**You'll get back:**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "john@example.com",
  "apiToken": "aRfn7cVRSN7qUR6W7vGnlgb40XXa1mko4QNoLbiui1dAAKFcFh3yHY1PtG68OfJdksl0aHgbRKO",
  "token": "3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G5c9660e4",
  "success": true,
  "message": "Login successful"
}
```

::: warning Two fields come back — use `token`, not `apiToken`
`token` (format `<id>|<secret>`) is the Bearer for **both** REST and GraphQL. `apiToken` is a **legacy** field kept for backward compatibility — it is **not** an auth Bearer; sending it in the `Authorization` header returns `Unauthenticated`. Full field reference on the [Customer Login](/api/rest-api/shop/customers/customer-login) page.
:::

**Step 2: Save the token**

Store the token securely in your application. See the [Introduction Guide](./introduction.md) for recommended storage patterns.

**Step 3: Use token in future requests**

```bash
curl -X GET "https://your-domain.com/api/shop/customers/addresses" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer IsInRbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```


### What You Can Do

Once authenticated, customers can:

- 👤 View and edit their profile
- 📍 Manage delivery addresses
- 🛒 Add/remove items from cart
- ❤️ Create and manage wishlists
- 🛍️ Place orders
- 📦 View order history and tracking
- ⭐ Create product reviews
- 🔄 Manage subscriptions (if enabled)

### Key Facts

- 👤 **User-specific** — Each customer sees only their own data
- 🔐 **Requires login** — Must authenticate first (Bearer token)
- 📝 **Read & Write** — Can view and modify data
- ⏱️ **No default expiry** — the customer token does not expire unless the server sets one; there is **no refresh token** — recovery is re-login (see [Credential lifetimes](#credential-lifetimes))
- 🚫 **Not cacheable** — Personal data shouldn't be cached
- 🔄 **Requires both headers** — Need `X-STOREFRONT-KEY` AND `Authorization: Bearer`
---

## 3. Admin APIs

**Best for:** Building admin dashboards to manage products, inventory, customers, and system settings.

::: tip Admin uses a pre-issued Integration token
Admin clients authenticate with an **Integration token** generated from the **Integration** menu in the admin panel — there is no admin login. Send it as `Authorization: Bearer <id>|<token>` (no `X-STOREFRONT-KEY`). Admin **GraphQL** clients POST to `/api/admin/graphql`. See the [Admin Authentication](/api/graphql-api/admin/authentication) reference.
:::

### The Basics

- **What you need:** A pre-issued Integration token (no login)
- **What you get:** Full control over all store data
- **Who can use it:** Admins (and sub-admins) holding a valid Integration token
- **Perfect for:** Admin dashboards, inventory management, reporting tools

### How It Works (3 Steps)

**Step 1: Generate an Integration token**

In the admin panel, open the **Integration** menu and generate a token. A store owner can generate tokens here and share them with the sub-admins who need API access — each token is tied to a specific admin user and inherits that admin's permissions. The token is shown **once** — copy it.

**Step 2: Save the token**

Store the token securely in your application. See the [Introduction Guide](./introduction.md) for recommended storage patterns.

**Step 3: Use the token in API requests**

```bash
curl -X GET "https://your-domain.com/api/admin/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <id>|<token>"
```

**JavaScript example:**

```javascript
const token = '<your-integration-token>';

fetch('https://your-domain.com/api/admin/products', {
  headers: {
    'Authorization': `Bearer ${token}`,
    'Content-Type': 'application/json'
  }
})
.then(res => res.json())
.then(data => console.log(data));
```

### What You Can Do

Admins have full control over:

- 📦 Create, read, update, and delete products
- 🏷️ Manage categories and product attributes
- 📊 Manage inventory and stock levels
- 👥 View and manage all customers
- 🛍️ Process and manage orders
- 📈 Generate reports and analytics
- ⚙️ Configure system settings
- 📮 Set up shipping and payment methods
- 🔐 Manage admin users and permissions

### Key Facts

- 🔑 **Admin-only** — Requires an admin Integration token (no Storefront Key needed)
- 🔐 **Token-based** — Authenticate with a pre-issued Integration token (no login)
- 📝 **Full CRUD** — Create, read, update, and delete everything
- ⚙️ **System-wide** — Can affect all store data
- 🚫 **Not cacheable** — Data changes frequently
- 🔒 **Role-based** — What you can do depends on your admin role

---

## Authentication Summary Table

**Quick reference — Which auth method for which API?**

| API Type | Use Case | Headers Required | Login Needed |
|----------|----------|------------------|---|
| **Public** | Browse products, categories | `X-STOREFRONT-KEY` only | ❌ No |
| **Customer** | Cart, orders, profile | `X-STOREFRONT-KEY` + `Authorization: Bearer` | ✅ Customer login |
| **Admin** | Manage products, inventory | `Authorization: Bearer` only | Integration token |

### Credential lifetimes

There is **no refresh token** anywhere in the API. When a credential is no longer accepted, you obtain a new one — you never refresh.

| Credential | Sent as | Expires by default | How to renew |
|---|---|---|---|
| **Storefront key** | `X-STOREFRONT-KEY` | **Never** — a generated key has no expiry | Rotate it (a rotated key is valid 12 months) |
| **Customer token** | `Authorization: Bearer` | **Never** — unless the server sets a token lifetime | Re-login (`POST /api/shop/customer/login`) |
| **Admin Integration token** | `Authorization: Bearer` | **365 days** (or a custom/unlimited value set when it is issued) | Regenerate it in the admin **Integration** menu |

- The public demo may cap the customer token to a short window for safety — that is a demo setting, not the default. A self-hosted store's customer token does not expire unless you configure a lifetime.
- Because there is no refresh flow, treat a `401` as "get a new credential": re-login for a customer token, regenerate for an admin token, rotate for a storefront key.

### Optional Context Headers

In addition to authentication headers, you can pass these optional headers to control the locale, currency, and channel context for the response data:

| Header | Purpose | Example | Fallback |
|--------|---------|---------|----------|
| `X-LOCALE` | Return content in a specific locale | `fr` | Channel's default locale |
| `X-CURRENCY` | Return pricing in a specific currency | `EUR` | Channel's base currency |
| `X-CHANNEL` | Use a specific sales channel | `default` | Default channel |

If these headers are omitted or contain a value that doesn't exist in the system, the API silently falls back to the default value. For more details, see the [GraphQL Introduction](/api/graphql-api/introduction#context-headers-x-locale-x-currency-x-channel).

---

## Common Patterns
### Public API Request

```bash
# Just need the Storefront Key
curl -X GET "https://your-domain.com/api/shop/products" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx"
```

### Customer API Request

```bash
# Need BOTH Storefront Key AND Bearer token
curl -X POST "https://your-domain.com/api/shop/customers/addresses" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..." \
  -d '{"address": "123 Main St"}'
```

### Admin API Request

```bash
# Only need the Bearer token (no Storefront Key)
curl -X GET "https://your-domain.com/api/admin/products" \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## Using Tokens in Requests

All authenticated requests require the Bearer token in the `Authorization` header. How you pass the token depends on your platform:

**Web/Frontend:**
Use the token from your authentication state, cookie, or session storage.

**Mobile Apps:**
Retrieve the token from secure device storage.

**Backend Services:**
Use the token from environment variables or secure vaults.

For detailed token storage and security guidance, see the [Introduction Guide](./introduction.md).

---

## Security Essentials

✅ **Do This:**
- Use HTTPS for all requests (required in production)
- Include the token in the `Authorization: Bearer` header
- Validate token before making requests
- Handle 401 errors by re-authenticating
- Use strong passwords (12+ characters, mixed case, numbers, special chars)

❌ **Don't Do This:**
- Don't hardcode tokens in source code
- Don't log tokens or API keys
- Don't send tokens in URL query parameters
- Don't commit `.env` files to Git
- Don't reuse the same token across environments
- Don't ignore token expiration
---

## Troubleshooting Authentication Issues

### "Invalid API Key" Error

**Problem:** Your Storefront Key is rejected.

**Solution:**
```bash
# 1. Double-check your key
echo $BAGISTO_STOREFRONT_KEY

# 2. Verify it's active
php artisan bagisto-api:key:manage status --key="Your Key"

# 3. Make sure header name is exactly correct
# Should be: X-STOREFRONT-KEY (with hyphen, not underscore)
```

### "Unauthorized" (401) Error

**Problem:** The token is missing, invalid, or no longer accepted.

A 401 comes back with one of **two** messages — treat both the same way:

- `Unauthenticated. Please login to perform this action`
- `Invalid or expired authentication token`

Branch on the **`401` status**, not on the message text — either one means "get a new credential". There is no refresh token; recovery is:

```bash
# Login again to get a fresh token (no refresh flow exists)
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"email": "user@example.com", "password": "password"}'

# Then send the new token as: Authorization: Bearer <token>
```

Send `token` from the response as the Bearer — never `apiToken` (see [Credential lifetimes](#credential-lifetimes)).

### "Forbidden" (403) Error

**Problem:** You're authenticated but don't have permission.

**Solution:**
- If Customer API: Make sure you logged in as the customer
- If Admin API: Make sure you logged in as an admin, not a customer
- Check your admin role has permission for this endpoint

---

## Related Documentation

- [API Key Management Guide](./storefront-api-key-management-guide.md) — How to generate and manage API keys
- [REST API Guide](/api/rest-api/introduction) — REST API endpoints
- [GraphQL API Guide](/api/graphql-api/introduction) — GraphQL queries and mutations 