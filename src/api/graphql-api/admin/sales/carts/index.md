---
outline: false
---

# Carts

The Carts menu is the admin **draft cart** used to assemble a brand-new order from the admin side (**Admin → Create Order**). The flow runs in order: a draft cart is created for a customer, then you add items to it, save the billing and shipping addresses, choose a shipping method and a payment method, and finally place the order.

Only **draft** (inactive) admin carts are accessible through this menu. A customer's live storefront cart is not exposed here — these operations work solely on the admin-built draft cart you are preparing into an order.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [Get Cart](/api/graphql-api/admin/sales/carts/get-cart) | `adminCart` query |
| [Add Item](/api/graphql-api/admin/sales/carts/add-item) | `addItemAdminCart` mutation |
| [Update Items](/api/graphql-api/admin/sales/carts/update-items) | `updateItemsAdminCart` mutation |
| [Remove Item](/api/graphql-api/admin/sales/carts/remove-item) | `removeItemAdminCart` mutation |
| [Save Address](/api/graphql-api/admin/sales/carts/save-address) | `saveAddressAdminCart` mutation |
| [Apply Coupon](/api/graphql-api/admin/sales/carts/apply-coupon) | `applyCouponAdminCart` mutation |
| [Remove Coupon](/api/graphql-api/admin/sales/carts/remove-coupon) | `removeCouponAdminCart` mutation |
| [List Shipping Methods](/api/graphql-api/admin/sales/carts/list-shipping-methods) | `adminCartShippingRates` query |
| [Set Shipping Method](/api/graphql-api/admin/sales/carts/set-shipping-method) | `setShippingMethodAdminCart` mutation |
| [List Payment Methods](/api/graphql-api/admin/sales/carts/list-payment-methods) | `adminCartPaymentMethods` query |
| [Set Payment Method](/api/graphql-api/admin/sales/carts/set-payment-method) | `setPaymentMethodAdminCart` mutation |

Placing the order itself is the Place Order action under [Orders](/api/graphql-api/admin/sales/orders/).

All Carts endpoints require an admin Bearer token — see [Authentication](/api/graphql-api/admin/authentication).
