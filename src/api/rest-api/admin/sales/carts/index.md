---
outline: false
apiType: rest
---

# Carts

The Carts menu is the admin **draft cart** used to assemble a brand-new order from the admin side (**Admin → Create Order**). The flow runs in order: a draft cart is created for a customer, then you add items to it, save the billing and shipping addresses, choose a shipping method and a payment method, and finally place the order.

Only **draft** (inactive) admin carts are accessible through this menu. A customer's live storefront cart is not exposed here — these endpoints operate solely on the admin-built draft cart you are preparing into an order.

## Endpoints in this menu

| Action | Endpoint |
|--------|----------|
| [Get Cart](/api/rest-api/admin/sales/carts/get-cart) | `GET /api/admin/carts/{id}` |
| [Add Item](/api/rest-api/admin/sales/carts/add-item) | `POST /api/admin/carts/{id}/items` |
| [Update Items](/api/rest-api/admin/sales/carts/update-items) | `PUT /api/admin/carts/{id}/items` |
| [Remove Item](/api/rest-api/admin/sales/carts/remove-item) | `DELETE /api/admin/carts/{id}/items` |
| [Save Address](/api/rest-api/admin/sales/carts/save-address) | `POST /api/admin/carts/{id}/addresses` |
| [Apply Coupon](/api/rest-api/admin/sales/carts/apply-coupon) | `POST /api/admin/carts/{id}/coupon` |
| [Remove Coupon](/api/rest-api/admin/sales/carts/remove-coupon) | `DELETE /api/admin/carts/{id}/coupon` |
| [List Shipping Methods](/api/rest-api/admin/sales/carts/list-shipping-methods) | `GET /api/admin/carts/{cartId}/shipping-methods` |
| [Set Shipping Method](/api/rest-api/admin/sales/carts/set-shipping-method) | `POST /api/admin/carts/{cartId}/shipping-methods` |
| [List Payment Methods](/api/rest-api/admin/sales/carts/list-payment-methods) | `GET /api/admin/carts/{cartId}/payment-methods` |
| [Set Payment Method](/api/rest-api/admin/sales/carts/set-payment-method) | `POST /api/admin/carts/{cartId}/payment-methods` |

Placing the order itself is the Place Order action under [Orders](/api/rest-api/admin/sales/orders/).

All Carts endpoints require an admin Bearer token — see [Authentication](/api/rest-api/admin/authentication).
