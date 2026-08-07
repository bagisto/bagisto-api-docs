---
outline: false
---

# Customer

The Customer menu is the customer's account area — registering and signing in, managing the profile and address book, viewing past orders, invoices, shipments, and downloadable products, and managing their own reviews. It backs every "My Account" screen on the storefront.

## Authentication & session

A customer registers, then logs in to receive a **Bearer token**. That token is sent on every account operation (and is the same token used by Cart, Checkout, Wishlist, and Compare). The token can be verified, and logging out invalidates it. Forgot Password starts the password-reset flow by email.

## What you can do

- **Profile** — read, update, or delete the signed-in customer's account.
- **Orders** — list the customer's orders, view one order in detail, view its shipments, and cancel or reorder an order.
- **Invoices** — list invoices and view one. The PDF itself is fetched over REST from the invoice's `downloadUrl`.
- **Downloadable products** — list the customer's purchased downloads and read how many uses remain. The file itself is fetched over REST.
- **Addresses** — list, create, update, and delete saved addresses (the address book).
- **Reviews** — read the reviews the customer has written. Submitting one is on [Create Product Review](/api/graphql-api/shop/mutations/create-product-review).

## Operations

### Profile and session

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| Register | [`createCustomer`](/api/graphql-api/shop/mutations/customer-registration) | Create a customer account. |
| Log in | [`createCustomerLogin`](/api/graphql-api/shop/mutations/customer-login) | Exchange credentials for a Bearer token. |
| Verify a token | [`createVerifyToken`](/api/graphql-api/shop/mutations/customer-verify-token) | Check whether a stored token is still valid. |
| Log out | [`createLogout`](/api/graphql-api/shop/mutations/customer-logout) | Invalidate the current token. |
| Start a password reset | [`createForgotPassword`](/api/graphql-api/shop/mutations/forgot-password) | Email the customer a reset link. |
| Read the profile | [`readCustomerProfile`](/api/graphql-api/shop/queries/get-customer-profile) | The signed-in customer's account details. |
| Update the profile | [`createCustomerProfileUpdate`](/api/graphql-api/shop/mutations/update-customer-profile) | Change name, email, phone, or password. |
| Delete the account | [`createCustomerProfileDelete`](/api/graphql-api/shop/mutations/delete-customer-profile) | Close the customer's own account. |

### Orders

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List orders | [`customerOrders`](/api/graphql-api/shop/queries/get-customer-orders) | The customer's own orders, paginated. |
| View one order | [`customerOrder`](/api/graphql-api/shop/queries/get-customer-order) | Full order detail with items, addresses, and payment. |
| List shipments | [`customerOrderShipments`](/api/graphql-api/shop/queries/get-customer-order-shipments) | Shipments across the customer's orders. |
| View one shipment | [`customerOrderShipment`](/api/graphql-api/shop/queries/get-customer-order-shipment) | A single shipment with its items. |
| Cancel an order | [`createCancelOrder`](/api/graphql-api/shop/mutations/cancel-customer-order) | Cancel an order that is still cancellable. |
| Reorder | [`createReorderOrder`](/api/graphql-api/shop/mutations/reorder-customer-order) | Rebuild a cart from a past order. |

### Invoices

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List invoices | [`customerInvoices`](/api/graphql-api/shop/queries/get-customer-invoices) | Invoices raised against the customer's orders. |
| View one invoice | [`customerInvoice`](/api/graphql-api/shop/queries/get-customer-invoice) | A single invoice with its totals and items. |
| Download the PDF | [`customerInvoice`](/api/graphql-api/shop/queries/download-invoice) | Read `downloadUrl` from the invoice, then fetch the PDF over REST — GraphQL cannot return a binary. |

### Downloadable products

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List purchases | [`customerDownloadableProducts`](/api/graphql-api/shop/queries/get-customer-downloadable-products) | Downloadable products the customer has bought, with remaining downloads. |
| View one purchase | [`customerDownloadableProduct`](/api/graphql-api/shop/queries/get-customer-downloadable-product) | A single purchased download. |
| Download the file | [REST only](/api/graphql-api/shop/queries/download-downloadable-product) | The file is served over REST; use the `downloadUrl` from the queries above. |

### Addresses

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List addresses | [`getCustomerAddresses`](/api/graphql-api/shop/queries/get-customer-addresses) | The customer's saved address book. |
| Create an address | [`createAddUpdateCustomerAddress`](/api/graphql-api/shop/mutations/create-customer-address) | Add a new address. |
| Update an address | [`createAddUpdateCustomerAddress`](/api/graphql-api/shop/mutations/update-customer-address) | The same mutation — supplying an existing address ID updates it instead of adding one. |
| Delete an address | [`createDeleteCustomerAddress`](/api/graphql-api/shop/mutations/delete-customer-address) | Remove an address from the book. |

### Reviews

| Operation | GraphQL field | Description |
|-----------|---------------|-------------|
| List own reviews | [`customerReviews`](/api/graphql-api/shop/queries/get-customer-reviews) | Reviews the customer has written. |
| View one review | [`customerReview`](/api/graphql-api/shop/queries/get-customer-review) | A single review the customer owns. |

Registration, Login, and Forgot Password are public (storefront key only); every other operation requires a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
