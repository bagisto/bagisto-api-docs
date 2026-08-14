---
outline: false
---

# Addresses

The Addresses menu manages a customer's address book — the billing and shipping addresses saved against their account. It mirrors the address section of the admin customer screen, and the addresses here are what an admin picks from when placing an order on the customer's behalf.

## What an address holds

An address carries the recipient's name, company, the street/city/state/country/postcode, and a phone number. One address per customer can be marked the **default**; that one is pre-selected at checkout and in the admin Create-Order flow.

## Default-address semantics

A customer has at most one default address. When you create or update an address with the default flag set, the previously-default address is automatically un-flagged — there is never more than one default. The dedicated **Set as Default** operation flips an existing address to default and clears the flag on all the customer's other addresses.

## Ownership guard

Every address belongs to exactly one customer. Address operations are addressed under that customer, and an address whose owner doesn't match the customer in the request is rejected — one customer's addresses can never be read or modified through another customer.

## What create / update / delete do

- **Create** adds an address to the customer's book. Setting the default flag promotes it (and demotes the old default).
- **Update** edits an address; it is partial. Editing across customers is blocked by the ownership guard.
- **Set as Default** marks an address as the customer's default.
- **Delete** removes an address from the book.

## Operations in this menu

| Action | Operation |
|--------|-----------|
| [List Addresses](../addresses.md) | `adminCustomerAddresses(customerId:)` query |
| [Address Detail](./detail.md) | `adminCustomerAddress(customerId:, id:)` query |
| [Create Address](./create.md) | `createAdminCustomerAddress` mutation |
| [Update Address](./update.md) | `updateAdminCustomerAddress` mutation |
| [Delete Address](./delete.md) | `deleteAdminCustomerAddress` mutation |
| [Set as Default](./set-default.md) | `setDefaultAdminCustomerAddress` mutation |

Permissions: `customers.addresses.create` / `.edit` / `.delete`.
