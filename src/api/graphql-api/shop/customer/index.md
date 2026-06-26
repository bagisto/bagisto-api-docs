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
- **Invoices** — list invoices, view one, and download an invoice PDF.
- **Downloadable products** — list the customer's purchased downloadable products and download a file.
- **Addresses** — list, create, update, and delete saved addresses (the address book).
- **Reviews** — read the reviews the customer has written.

## Operations in this menu

### Profile & session

| Operation | GraphQL field |
|-----------|---------------|
| [Customer Registration](/api/graphql-api/shop/mutations/customer-registration) | `createCustomer` mutation |
| [Customer Login](/api/graphql-api/shop/mutations/customer-login) | `tokenCreate` mutation |
| [Customer Verify Token](/api/graphql-api/shop/mutations/customer-verify-token) | `verifyToken` mutation |
| [Customer Logout](/api/graphql-api/shop/mutations/customer-logout) | `logout` mutation |
| [Forgot Password](/api/graphql-api/shop/mutations/forgot-password) | `forgotPassword` mutation |
| [Get Customer Profile](/api/graphql-api/shop/queries/get-customer-profile) | `customer` query |
| [Update Customer Profile](/api/graphql-api/shop/mutations/update-customer-profile) | `updateCustomerProfile` mutation |
| [Delete Customer Profile](/api/graphql-api/shop/mutations/delete-customer-profile) | `deleteCustomerProfile` mutation |

### Orders

| Operation | GraphQL field |
|-----------|---------------|
| [Get Customer Orders](/api/graphql-api/shop/queries/get-customer-orders) | `customerOrders` query |
| [Get Customer Order](/api/graphql-api/shop/queries/get-customer-order) | `customerOrder(id:)` query |
| [Get Customer Order Shipments](/api/graphql-api/shop/queries/get-customer-order-shipments) | `customerOrderShipments` query |
| [Get Customer Order Shipment](/api/graphql-api/shop/queries/get-customer-order-shipment) | `customerOrderShipment(id:)` query |
| [Cancel Customer Order](/api/graphql-api/shop/mutations/cancel-customer-order) | `cancelOrder` mutation |
| [Reorder Customer Order](/api/graphql-api/shop/mutations/reorder-customer-order) | `reorder` mutation |

### Invoices

| Operation | GraphQL field |
|-----------|---------------|
| [Get Customer Invoices](/api/graphql-api/shop/queries/get-customer-invoices) | `customerInvoices` query |
| [Get Customer Invoice](/api/graphql-api/shop/queries/get-customer-invoice) | `customerInvoice(id:)` query |
| [Download Invoice](/api/graphql-api/shop/queries/download-invoice) | `downloadInvoice` query |

### Downloadable products

| Operation | GraphQL field |
|-----------|---------------|
| [Get Downloadable Products](/api/graphql-api/shop/queries/get-customer-downloadable-products) | `downloadableProducts` query |
| [Get Downloadable Product](/api/graphql-api/shop/queries/get-customer-downloadable-product) | `downloadableProduct(id:)` query |
| [Download Downloadable Product](/api/graphql-api/shop/queries/download-downloadable-product) | `downloadDownloadableProduct` query |

### Addresses

| Operation | GraphQL field |
|-----------|---------------|
| [Get Customer Addresses](/api/graphql-api/shop/queries/get-customer-addresses) | `addresses` query |
| [Create Customer Address](/api/graphql-api/shop/mutations/create-customer-address) | `createAddress` mutation |
| [Update Customer Address](/api/graphql-api/shop/mutations/update-customer-address) | `updateAddress` mutation |
| [Delete Customer Address](/api/graphql-api/shop/mutations/delete-customer-address) | `deleteAddress` mutation |

### Reviews

| Operation | GraphQL field |
|-----------|---------------|
| [Get Customer Reviews](/api/graphql-api/shop/queries/get-customer-reviews) | `customerReviews` query |
| [Get Customer Review](/api/graphql-api/shop/queries/get-customer-review) | `customerReview(id:)` query |

Registration, Login, and Forgot Password are public (storefront key only); every other operation requires a customer Bearer token — see [Authentication](/api/graphql-api/authentication).
