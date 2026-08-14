# API Authentication Guide

Authentication depends on the surface you are calling. There are two, each with a fixed scheme:

- **Shop API** (`/api/shop/*`, `/api/graphql`) — always send the `X-STOREFRONT-KEY`. That alone gives public access, which covers browsing plus the handful of writes any visitor is allowed to make. For anything tied to a customer account add a customer Bearer token (from [login](/api/rest-api/shop/customers/customer-login)); a guest can shop and check out without an account by using a [cart token](/api/rest-api/shop/cart/create-cart) as the Bearer.
- **Admin API** (`/api/admin/*`, `/api/admin/graphql`) — send a pre-issued **Integration** Bearer token. No `X-STOREFRONT-KEY`, no login.

Pick the row that matches your surface below.

## Quick Authentication Overview

| Your Use Case | Authentication Method | API Type | Read More |
|---|---|---|---|
| **Public data and open forms** (products, categories, contact, newsletter, registration) | `X-STOREFRONT-KEY` header | Shop API | [Public APIs](#_1-public-apis-storefront) |
| **Customer operations** (profile, addresses, order history) | `X-STOREFRONT-KEY` + Bearer token | Shop API | [Customer APIs](#_2-customer-apis) |
| **Admin operations** (manage products, inventory) | Bearer token (admin) | Admin API | [Admin APIs](#_3-admin-apis) |

## Authentication Architecture

The three credentials are separate systems, not one scheme with three modes:

- **Storefront key** — a store-wide key checked at the edge of every `/api/shop/*` request. It identifies the client application, never a person.
- **Customer token** — issued by customer login and built on **Laravel Sanctum**. Format `<id>|<secret>`.
- **Admin Integration token** — its own credential store and guard, independent of Sanctum and of the storefront key. Same `<id>|<secret>` shape, different lookup.

Because they are independent, a credential never substitutes for another: an admin token sent to a shop route still fails on the missing storefront key, and a storefront key sent to an admin route is ignored.

Common ground across all three: secrets are generated cryptographically and stored hashed, expiry is configurable, and rate limits apply per credential. In production the API also sends an HSTS header advertising HTTPS-only — that instructs browsers, it does not by itself reject a plaintext request, so terminate TLS in front of the application.

## 1. Public APIs (Storefront)

**Best for:** Anything a visitor can do before they have an account — browsing the catalog, and the small set of open forms.

### The Basics

- **What you need:** `X-STOREFRONT-KEY` header
- **What you get:** All public storefront data, plus the writes listed below
- **Who can use it:** Anyone (no login required)
- **Perfect for:** Mobile apps, websites, third-party integrations

### What You Can Do

Reads available with the key alone:

- Browse products and get detailed product information
- View categories and subcategories
- Get product attributes and variations
- Read CMS pages and content
- Get available countries and locales
- Retrieve shipping and payment methods (available options)

### The Key Is Not Read-Only

This is the part that surprises people. Several endpoints accept a write on the storefront key alone, with no Bearer token at all, because they are open to any visitor by design:

| Write | Endpoint |
|---|---|
| Submit a contact-form enquiry | [`POST /api/shop/contact-us`](/api/rest-api/shop/contact-us/submit-contact-us) |
| Subscribe to the newsletter | [`POST /api/shop/newsletters`](/api/rest-api/shop/newsletter/subscribe) |
| Register a customer account | [`POST /api/shop/customers`](/api/rest-api/shop/customers/customer-registration) |
| Create a cart | [`POST /api/shop/cart-tokens`](/api/rest-api/shop/cart/create-cart) |

Treat the storefront key as a **public** credential — it ships inside browser bundles and mobile apps, so anyone can read it and replay these calls. Put your own abuse controls in front of the open forms; the key identifies your app, it does not vouch for the person using it.

### Guest checkout — order without an account

A guest can build a cart and place a full order without a customer account by using a **cart token** as the Bearer:

1. Create a cart to obtain a cart token — [Create Cart](/api/rest-api/shop/cart/create-cart).
2. Send it as `Authorization: Bearer <cartToken>` **alongside** the `X-STOREFRONT-KEY` on every cart and checkout call.
3. Drive the [Cart](/api/workflows/shop/cart) and [Checkout](/api/workflows/shop/checkout) flows to place the order — no customer login required.

The cart token is a UUID, not the `<id>|<secret>` shape the customer and admin tokens use. It stands in for a customer Bearer for the duration of that one cart.

### Using the Storefront Key

**1. Get your Storefront Key**

```bash
php artisan bagisto-api:generate-key --name="Web Storefront"
```

You'll get something like: `pk_storefront_xxxxxxxxxxxxx`

To generate, rotate, or revoke keys, see the [Storefront Key Management Guide](/api/storefront-api-key-management-guide).

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
    "query": "query { products(first: 2) { edges { node { _id sku name formattedPrice } } } }"
  }'
```

Collections are Relay connections, so a list query always selects through `edges { node { … } }` — see [Identifiers](/api/graphql-api/identifiers) for why nodes carry both `id` and `_id`.

### Key Facts

- **Public by nature** — the key travels in client code; treat it as identification, not a secret
- **Mostly read, with open writes** — see the table above for the four writes it permits
- **Cacheable** — catalog responses can be cached; the open-form responses cannot
- **Rate limited** — a generated key defaults to 100 requests/minute (see [Rate Limiting Guide](./rate-limiting))
- **Rejected two different ways** — a missing key is `401`, a wrong or deactivated key is `403`

## 2. Customer APIs

**Best for:** Anything tied to a customer account — profile, addresses, order history, wishlists.

### The Basics

- **What you need:** `X-STOREFRONT-KEY` header + Bearer token (from customer login)
- **What you get:** Access to that customer's personal data
- **Who can use it:** Authenticated customers only
- **Perfect for:** Mobile apps, customer portals, account pages

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
  "_id": 1,
  "apiToken": "QNlbojGwmfrmYdKOot5Oc59shiPTwkR2xLbz8fWq3Ea",
  "token": "3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G",
  "message": "You have logged in successfully",
  "success": true
}
```

Two token-looking fields come back, and only one of them authenticates. **`token`** — format `<id>|<secret>` — is the Bearer for both REST and GraphQL. **`apiToken`** is a legacy field kept for backward compatibility; sending it in the `Authorization` header returns `401 Invalid or expired token`. Full field reference on the [Customer Login](/api/rest-api/shop/customers/customer-login) page.

**Step 2: Save the token**

Store the token securely — never in source code, logs, or URL query strings. See [Security Essentials](#security-essentials) below for the full do / don't list and per-platform storage.

**Step 3: Use token in future requests**

```bash
curl -X GET "https://your-domain.com/api/shop/customer-addresses" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer 3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G"
```

### What You Can Do

Logging in unlocks the customer's personal account. An authenticated customer can:

- View and edit their profile
- Manage delivery addresses
- Create and manage wishlists
- Compare products
- Place orders and view order history, invoices, and downloadable products
- Write product reviews
- Request returns (RMA) and EU withdrawals
- Raise GDPR data requests
- Subscribe to or unsubscribe from the newsletter

Building a cart and checking out are **not** login-only — a guest can do both with a cart token (see [Guest checkout](#guest-checkout-order-without-an-account)). Login adds the personal account features above.

### Key Facts

- **User-specific** — Each customer sees only their own data
- **Requires login** — Must authenticate first (Bearer token)
- **Read & Write** — Can view and modify data
- **No default expiry** — the customer token does not expire unless the server sets one; there is **no refresh token** — recovery is re-login (see [Credential lifetimes](#credential-lifetimes))
- **Not cacheable** — Personal data shouldn't be cached
- **Requires both headers** — Need `X-STOREFRONT-KEY` AND `Authorization: Bearer`

## 3. Admin APIs

**Best for:** Building admin dashboards to manage products, inventory, customers, and system settings.

Admin clients authenticate with an **Integration token** generated from the **Integration** menu in the admin panel — there is no admin login. Send it as `Authorization: Bearer <id>|<token>` (no `X-STOREFRONT-KEY`). Admin **GraphQL** clients POST to `/api/admin/graphql`.

The token is highly configurable for security — scope its **permissions** (all access, a custom subset, or mirror the owner's role), restrict it to an **IP allowlist**, set an **expiry**, and cap its **rate limits**. See the [Admin Authentication](/api/rest-api/admin/authentication#token-security) reference for the full breakdown.

### The Basics

- **What you need:** A pre-issued Integration token (no login)
- **What you get:** Full control over all store data
- **Who can use it:** Admins (and sub-admins) holding a valid Integration token
- **Perfect for:** Admin dashboards, inventory management, reporting tools

### How It Works (3 Steps)

**Step 1: Generate an Integration token**

In the admin panel, open the **Integration** menu and generate a token. A store owner can generate tokens here and share them with the sub-admins who need API access — each token is tied to a specific admin user and inherits that admin's permissions. The token is shown **once** — copy it.

**Step 2: Save the token**

Store the token securely — never in source code, logs, or URL query strings. See [Security Essentials](#security-essentials) below for the full do / don't list and per-platform storage.

**Step 3: Use the token in API requests**

```bash
curl -X GET "https://your-domain.com/api/admin/catalog/products" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer <id>|<token>"
```

**JavaScript example:**

```javascript
const token = '<your-integration-token>';

fetch('https://your-domain.com/api/admin/catalog/products', {
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

- Create, read, update, and delete products
- Manage categories and product attributes
- Manage inventory and stock levels
- View and manage all customers
- Process and manage orders
- Generate reports and analytics
- Configure system settings
- Set up shipping and payment methods
- Manage admin users and permissions

### Key Facts

- **Admin-only** — Requires an admin Integration token (no Storefront Key needed)
- **Token-based** — Authenticate with a pre-issued Integration token (no login)
- **Full CRUD** — Create, read, update, and delete everything
- **System-wide** — Can affect all store data
- **Not cacheable** — Data changes frequently
- **Role-based** — What you can do depends on the owning admin's role and the token's own permission scope

## Authentication Summary Table

**Quick reference — Which auth method for which API?**

| API Type | Use Case | Headers Required | Login Needed |
|----------|----------|------------------|---|
| **Public** | Browse the catalog, contact form, newsletter, registration | `X-STOREFRONT-KEY` only | No |
| **Customer** | Profile, addresses, order history | `X-STOREFRONT-KEY` + `Authorization: Bearer` | Customer login |
| **Guest checkout** | Cart and checkout without an account | `X-STOREFRONT-KEY` + `Authorization: Bearer <cartToken>` | No |
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

A header naming something the store does not have — a locale that is not installed, a currency the channel does not carry — is not an error. The API silently falls back to the default, so a response in the wrong language means the value was never applied rather than rejected. Verify against the store's configured locales and currencies before assuming a translation is missing. For more details, see the [GraphQL Introduction](/api/graphql-api/introduction#context-headers-x-locale-x-currency-x-channel).

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
curl -X POST "https://your-domain.com/api/shop/customer-addresses" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -H "Authorization: Bearer 3627|DfkAK11F8qdqtaFVJPvBxlJyNbCSMNl8TFWhWm4G" \
  -d '{"firstName": "John", "lastName": "Doe", "address": "123 Main St"}'
```

### Admin API Request

```bash
# Only need the Bearer token (no Storefront Key)
curl -X GET "https://your-domain.com/api/admin/catalog/products" \
  -H "Authorization: Bearer 5|1dYWpciAn2Ro8dfsabA89ohhduVWWXqicyPyQeIH"
```

## Using Tokens in Requests

All authenticated requests require the Bearer token in the `Authorization` header. How you pass the token depends on your platform:

**Web/Frontend:**
Use the token from your authentication state, cookie, or session storage.

**Mobile Apps:**
Retrieve the token from secure device storage.

**Backend Services:**
Use the token from environment variables or secure vaults.

For the full do / don't list and per-platform storage guidance, see [Security Essentials](#security-essentials) below.

## Security Essentials

**Do This:**
- Use HTTPS in production (local development over `http://localhost` is fine)
- Include the token in the `Authorization: Bearer` header
- Handle `401` by obtaining a new credential — there is no refresh flow
- Keep the admin Integration token server-side; it is the one credential that must never reach a browser bundle
- Scope an admin token to the permissions and IP range it actually needs, rather than granting all access
- Use strong passwords (12+ characters, mixed case, numbers, special chars)

**Don't Do This:**
- Don't hardcode tokens in source code
- Don't log tokens or API keys
- Don't send tokens in URL query parameters
- Don't commit `.env` files to Git
- Don't reuse the same token across environments
- Don't treat the storefront key as a secret — it is public by design, so protect open forms with your own abuse controls instead

## Troubleshooting Authentication Issues

### Storefront Key Rejected

The two failures are distinct, and the status tells you which:

| Status | Body | Meaning |
|---|---|---|
| `401` | `{"error": "missing_key"}` | The `X-STOREFRONT-KEY` header was not sent |
| `403` | `{"error": "invalid_key"}` | A key was sent but is wrong, deactivated, expired, or blocked by its IP allowlist |

A `403` here is about the key, not about permissions. Check the header name is exactly `X-STOREFRONT-KEY` (hyphens, not underscores), then confirm the key is active:

```bash
php artisan bagisto-api:key:manage status --key="Your Key"
```

### "Unauthorized" (401) Error

**Problem:** The token is missing, invalid, or no longer accepted.

The message varies by endpoint and transport — `Authentication token is required…`, `Invalid or expired token`, `Unauthenticated. Please login to perform this action`. Branch on the **`401` status**, never on the message text; all of them mean the same thing. There is no refresh token, so recovery is a new credential:

```bash
# Login again to get a fresh token (no refresh flow exists)
curl -X POST "https://your-domain.com/api/shop/customer/login" \
  -H "Content-Type: application/json" \
  -H "X-STOREFRONT-KEY: pk_storefront_xxxxxxxxxxxxx" \
  -d '{"email": "user@example.com", "password": "password"}'

# Then send the new token as: Authorization: Bearer <token>
```

Send `token` from the response as the Bearer — never `apiToken`, which returns this same `401`.

### "Forbidden" (403) Error

**Problem:** The credential is valid but not allowed to do this.

- **Shop API** — you are calling a customer-scoped endpoint with only the storefront key, or with a token belonging to a different customer. A customer can only ever act on their own records.
- **Admin API** — the token authenticated, but the action needs a permission it does not carry. Two things cap it: the token's own permission scope, and the role of the admin who owns it. Widening the token's scope does nothing if the owning admin's role lacks the permission.

## Related Documentation

- [API Key Management Guide](./storefront-api-key-management-guide.md) — How to generate and manage API keys
- [REST API Guide](/api/rest-api/introduction) — REST API endpoints
- [GraphQL API Guide](/api/graphql-api/introduction) — GraphQL queries and mutations
