# Interactive Playground Guide

Bagisto ships a **GraphiQL** playground — an in-browser editor with schema autocomplete, inline docs, and a run button. It is the fastest way to shape a query before you write any client code.

## Two playgrounds, one per surface

The shop and admin schemas are served from different endpoints, so each has its own playground. A query written in one will not run in the other.

| Playground | URL | Schema |
|---|---|---|
| Shop | `https://your-domain.com/api/graphiql` | Catalog, cart, checkout, customer account |
| Admin | `https://your-domain.com/api/admin/graphiql` | Orders, catalog management, customers, settings |

On the public demo the shop playground is at `https://api-demo.bagisto.com/api/graphiql`.

## Exploring costs nothing, running needs a key

Schema introspection is deliberately exempt from the storefront-key check, so the **Docs** panel, autocomplete, and type search all work the moment the page loads, with no credentials.

Running an actual query is different. Without `X-STOREFRONT-KEY` the response is:

```json
{
  "message": "X-STOREFRONT-KEY header is required for this operation",
  "error": "missing_key",
  "header_name": "X-STOREFRONT-KEY",
  "key_type": "shop"
}
```

So you can browse the whole schema before you have a key, but the first query you run needs one.

## Authenticating inside the playground

The bar above the editor manages credentials for you, and the state it shows tells you which identity the next request will use.

- **Customer** — paste the `token` returned by `createCustomerLogin`. Everything customer-scoped (profile, orders, wishlist) then resolves.
- **Guest cart** — paste the `cartToken` returned by `createCartToken` to act as a guest shopper through cart and checkout.
- **Manual entry** — for any other Bearer value, including an admin Integration token on the admin playground.

When both a customer token and a guest cart token are stored, **the customer token wins** — clear it if you want to test the guest path. Tokens are encrypted before being stored in the browser, and **Clear** removes them.

The storefront key is only injected automatically when the store sets `API_PLAYGROUND_AUTO_INJECT_STOREFRONT_KEY=true`; it is off by default. When it is off, add the key yourself in the **Headers** panel at the bottom of the editor:

```json
{
  "X-STOREFRONT-KEY": "pk_storefront_xxxxxxxxxxxxx"
}
```

### Headers you can set

| Header | Purpose |
|---|---|
| `X-STOREFRONT-KEY` | Required on every shop operation |
| `Authorization` | `Bearer <token>` — customer token or guest cart token |
| `X-LOCALE` | Return content in a specific locale, e.g. `fr` |
| `X-CHANNEL` | Use a specific sales channel, e.g. `default` |
| `X-CURRENCY` | Return pricing in a specific currency, e.g. `EUR` |

A locale, channel, or currency the store does not have is not an error — the API falls back to the default silently, so content in the wrong language means the value was never applied.

## Starter queries

Paste any of these into the editor and run them.

### List products

```graphql
query GetProducts {
  products(channel: "default", first: 10) {
    pageInfo {
      hasNextPage
      endCursor
    }
    edges {
      node {
        id
        _id
        name
        sku
        price
        description
      }
    }
  }
}
```

Collections are Relay connections, so results always come back through `edges { node { … } }`. Page forward by passing the previous `endCursor` as `after`.

### Search products

Text search is the `query` argument — there is no `search` argument on `products`.

```graphql
query SearchProducts($q: String!) {
  products(query: $q, first: 20) {
    edges {
      node {
        _id
        name
        sku
        price
      }
    }
  }
}
```

**Variables:**
```json
{
  "q": "skirt"
}
```

### Fetch one product

`product(id:)` takes an `ID`, so declare the variable `ID!` — an `Int!` variable is rejected before the query runs. The same query also accepts `sku:` or `urlKey:` instead of `id:`.

```graphql
query GetProduct($id: ID!) {
  product(id: $id) {
    id
    _id
    name
    sku
    price
    status
    urlKey
    description
  }
}
```

**Variables:**
```json
{
  "id": "1"
}
```

### Category tree

```graphql
query GetCategories {
  treeCategories(parentId: 1) {
    id
    translation {
      name
      slug
    }
    children {
      edges {
        node {
          id
          translation {
            name
            slug
          }
        }
      }
    }
  }
}
```

### Create a guest cart

```graphql
mutation CreateGuestCart {
  createCartToken(input: {}) {
    cartToken {
      cartToken
      _id
      itemsCount
      grandTotal
    }
  }
}
```

The outer `cartToken` is the payload wrapper and the inner one is the token string — paste that string into the playground's guest-cart slot to continue as that shopper.

### Customer login

```graphql
mutation LoginCustomer($email: String!, $password: String!) {
  createCustomerLogin(input: { email: $email, password: $password }) {
    customerLogin {
      token
      success
      message
    }
  }
}
```

**Variables:**
```json
{
  "email": "customer@example.com",
  "password": "your-password"
}
```

The Bearer is `token`. The response also carries `apiToken`, which is a legacy field and is **not** accepted for authentication.

### Customer profile (needs the customer token)

The profile fields come back directly — there is no `customer { … }` wrapper to select through.

```graphql
query GetProfile {
  readCustomerProfile {
    _id
    firstName
    lastName
    email
    phone
    gender
    dateOfBirth
  }
}
```

## Finding everything else

The starter set above is a fraction of the schema. Two ways to find the rest:

- **The Docs panel** in the playground — search a type or field name and follow the arguments and return types. It is always accurate, because it is generated from the running server.
- **[The Shop API reference](/api/graphql-api/shop-api)** — the same operations with request bodies, response payloads, and error cases documented per endpoint. For an ordered call sequence (cart → checkout → order), follow the [Workflows](/api/workflows/shop/).

## Reading errors

GraphQL answers with HTTP `200` even when the operation fails, so always inspect the top-level `errors` array rather than the status code.

| Message | What it means |
|---|---|
| `Cannot query field "x" on type "Y"` | The field does not exist — check the Docs panel for the real name |
| `Unknown argument "x" on field "y"` | The argument does not exist on that field |
| `Variable "$x" of type "Int!" used in position expecting type "ID"` | The variable's declared type does not match the argument |
| `Field "x" of type "Y" must have a sub selection` | The field returns an object; select fields inside it |
| `X-STOREFRONT-KEY header is required for this operation` | Add the key in the Headers panel |
| `Unauthenticated. Please login to perform this action` | The operation needs a customer or cart token in the auth bar |

The first four are caught before the server executes anything, which is why a bad field name never partially runs.

## Keyboard shortcuts

| Shortcut | Action |
|----------|--------|
| `Ctrl+Enter` / `Cmd+Enter` | Run the current operation |
| `Ctrl+Space` | Trigger autocomplete |
| `Shift+Ctrl+P` | Prettify the query |

## Writing queries that stay fast

- **Select only what you render.** The point of GraphQL is that a screen fetches its own field set — asking for every field on every node gives away the advantage.
- **Always paginate.** Collections take `first` (or `last`); page with `after: <endCursor>` until `pageInfo.hasNextPage` is false. See [Pagination](/api/pagination).
- **Use variables, not string interpolation.** They are validated against the schema and keep the query text stable for client-side caching.
- **Store `_id`, pass `id` back.** Nodes carry both — the numeric `_id` is what belongs in your database and in REST URLs. See [Identifiers](/api/graphql-api/identifiers).

## Related Documentation

- [Authentication](/api/graphql-api/authentication) — the credential model
- [Shop API Reference](/api/graphql-api/shop-api) — every shop operation
- [Integration Guides](/api/integrations) — client code once the query works
- [Identifiers (`id` vs `_id`)](/api/graphql-api/identifiers)
