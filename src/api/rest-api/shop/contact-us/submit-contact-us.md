---
outline: false
examples:
  - id: submit-contact-us
    title: Submit an Enquiry
    description: Send a contact-form enquiry. Public — the storefront key is the only credential needed, and a customer token is not used.
    request: |
      POST /api/shop/contact-us
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "name": "John Doe",
        "email": "john@example.com",
        "contact": "+1234567890",
        "message": "I have a question about your products"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "success": true,
        "message": "Your inquiry has been submitted successfully. We will get back to you soon"
      }
    commonErrors:
      - error: 400 Bad Request — The name field is required.
        cause: name was missing from the body
        solution: Send name as a non-empty string
      - error: 400 Bad Request — The email field must be a valid email address.
        cause: The value is not a well-formed email
        solution: Validate the address client-side before submitting
      - error: 400 Bad Request — The message field is required.
        cause: message was missing from the body
        solution: Send message as a non-empty string
      - error: 401 Unauthorized — X-STOREFRONT-KEY header is required
        cause: The storefront key was not sent
        solution: Send the storefront key on every shop request

  - id: submit-contact-us-minimal
    title: Without a Phone Number
    description: contact is optional. An enquiry submitted without it is accepted, which suits a form that only asks for an email reply.
    request: |
      POST /api/shop/contact-us
      Content-Type: application/json
      X-STOREFRONT-KEY: pk_storefront_PvlE42nWGsKRVIf8bDlJngTPAdWAZbIy

      {
        "name": "Jane Smith",
        "email": "jane.smith@example.com",
        "message": "Do you ship to Ireland?"
      }
    response: |
      HTTP/1.1 201 Created

      {
        "success": true,
        "message": "Your inquiry has been submitted successfully. We will get back to you soon"
      }
---

# Submit an Enquiry

Send a message through the storefront contact form. The store emails the enquiry to its configured contact address.

## Endpoint

```
POST /api/shop/contact-us
```

## Request Headers

| Header | Required | Description |
|--------|----------|-------------|
| `Content-Type` | Yes | application/json |
| `X-STOREFRONT-KEY` | Yes | Your storefront API key |

There is no `Authorization` header on this endpoint. Unlike [Newsletter](/api/rest-api/shop/newsletter/subscribe), sending a customer token changes nothing — the enquiry is not linked to an account, so include the sender's identity in the body.

## Request Body

| Field | Type | Required | Max length | Description |
|-------|------|----------|-----------|-------------|
| `name` | string | Yes | 255 | Sender's name. |
| `email` | string | Yes | 255 | Sender's email address — must be well-formed, and it is where the reply goes. |
| `message` | string | Yes | — | The enquiry body. No length cap is applied. |
| `contact` | string | No | 50 | Phone number. No format rule — any string up to 50 characters is accepted, and an enquiry without it still succeeds. |

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "contact": "+1234567890",
  "message": "I have a question about your products"
}
```

## Response

`201 Created` with a two-field acknowledgement:

| Field | Type | Description |
|-------|------|-------------|
| `success` | boolean | `true` when the enquiry was handed to the mail queue. |
| `message` | string | Translated confirmation text. |

Nothing addressable comes back — no id, no record to fetch. The enquiry leaves as an email, so a client cannot list, track, or follow up on submissions through the API. Show the confirmation and treat the exchange as finished.

## `success` Can Be `false` on a 201

The enquiry is **queued**, not sent inline, so the response confirms the hand-off rather than delivery. If queueing itself fails the response is still `201`, but with:

```json
{
  "success": false,
  "message": "Unable to send your inquiry at this time. Please try again later"
}
```

Read `success` before showing a confirmation — the status code alone does not tell you whether the enquiry got through. Delivery after a successful queue is not reported at all.

## Validation

The required fields are validated server-side and a failure returns **`400`**, not the `422` used by most other write endpoints. All failures are reported together in one message, space-separated, so a body missing both `name` and `message` returns `"The name field is required. The message field is required."`

## This Endpoint Is Public

The storefront key is the only credential, which means an unprotected form invites automated submissions and there is no per-address uniqueness rule to blunt them — the same message can be sent repeatedly. Rate limiting or a captcha in front of the form is the client's responsibility; the API applies no additional check.

## Same Operation Over GraphQL

The [`createContactUs`](/api/graphql-api/shop/mutations/create-contact-us) mutation takes the same four fields and returns the same `success` and `message`. Only the request shape differs.
