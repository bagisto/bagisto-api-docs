---
outline: false
apiType: rest
---

# Customer

The Customer menu is the shopper's account surface — everything tied to a registered customer: signing up and in, managing the profile and saved addresses, and reading their order history, invoices, downloadable products and reviews.

## Authentication

Registration, login and forgot-password are reached with the storefront key alone. Everything else here acts on a specific customer's data and requires that customer to be authenticated — log in to obtain a customer Bearer token, then send it on every account request. A customer can only ever see and act on their own data.

## How a client uses this

A typical flow is: **register** (or **login**) to obtain a token, **verify the token** when resuming a session, manage the **profile** and **addresses**, and read back **orders**, **invoices**, **downloadable products** and **reviews**. Logout invalidates the token; forgot/change password handle credential recovery and rotation.

## Operations in this menu

### Registration & session

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Registration](/api/rest-api/shop/customers/customer-registration) | `POST /api/shop/customers` | Create a new customer account. |
| [Login](/api/rest-api/shop/customers/customer-login) | `POST /api/shop/customer/login` | Authenticate and receive a Bearer token. |
| [Verify Token](/api/rest-api/shop/customers/customer-verify-token) | `POST /api/shop/verify-tokens` | Check that a customer token is still valid. |
| [Customer Logout](/api/rest-api/shop/customers/customer-logout) | `POST /api/shop/customer/logout` | Invalidate the current token. |
| [Forgot Password](/api/rest-api/shop/customers/forgot-password) | `POST /api/shop/forgot-passwords` | Send a password-reset email. |
| [Change Password](/api/rest-api/shop/customers/change-password) | `PUT /api/shop/customer-profile-updates/{id}` | Change the customer's password. |

### Profile

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Profile](/api/rest-api/shop/customers/get-customer-profile) | `GET /api/shop/customer-profile` | Read the authenticated customer's profile. |
| [Update Profile](/api/rest-api/shop/customers/update-customer-profile) | `PUT /api/shop/customer-profile-updates/{id}` | Update profile details. |
| [Delete Profile](/api/rest-api/shop/customers/delete-customer-profile) | `POST /api/shop/customer-profile-deletes/{id}` | Delete the customer account. |

### Addresses

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Addresses](/api/rest-api/shop/customers/get-customer-addresses) | `GET /api/shop/customer-addresses` | List the customer's saved addresses. |
| [Create Address](/api/rest-api/shop/customers/create-customer-address) | `POST /api/shop/customer-addresses` | Add a new address. |
| [Update Address](/api/rest-api/shop/customers/update-customer-address) | `PUT /api/shop/customer-addresses/{id}` | Edit an address. |
| [Delete Address](/api/rest-api/shop/customers/delete-customer-address) | `DELETE /api/shop/customer-addresses/{id}` | Remove an address. |

### Orders

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Orders](/api/rest-api/shop/customer-orders/get-customer-orders) | `GET /api/shop/customer-orders` | List the customer's orders. |
| [Get Order](/api/rest-api/shop/customer-orders/get-customer-order) | `GET /api/shop/customer-orders/{id}` | A single order with its detail. |

### Invoices

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Invoices](/api/rest-api/shop/customer-invoices/get-customer-invoices) | `GET /api/shop/customer-invoices` | List the customer's invoices. |
| [Get Invoice](/api/rest-api/shop/customer-invoices/get-customer-invoice) | `GET /api/shop/customer-invoices/{id}` | A single invoice. |
| [Download Invoice PDF](/api/rest-api/shop/customer-invoices/download-customer-invoice-pdf) | `GET /api/shop/customer-invoices/{id}/pdf` | Download the invoice as a PDF. |

### Downloadable products

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Downloadable Products](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-products) | `GET /api/shop/customer-downloadable-products` | List the customer's purchased downloads. |
| [Get Downloadable Product](/api/rest-api/shop/customer-downloadable-products/get-customer-downloadable-product) | `GET /api/shop/customer-downloadable-products/{id}` | A single downloadable purchase. |

### Reviews

| Operation | Method & Path | Description |
|-----------|---------------|-------------|
| [Get Customer Reviews](/api/rest-api/shop/customer-reviews/get-customer-reviews) | `GET /api/shop/customer-reviews` | List the reviews the customer has written. |
| [Get Customer Review](/api/rest-api/shop/customer-reviews/get-customer-review) | `GET /api/shop/customer-reviews/{id}` | A single review by the customer. |

Registration, login and forgot-password need only the storefront key; every other Customer endpoint requires a customer Bearer token — see [Authentication](/api/rest-api/authentication).
