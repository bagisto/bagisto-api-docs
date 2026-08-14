---
outline: false
examples:
  - id: create-contact-us-basic
    title: Submit an Enquiry
    description: Send a contact-form enquiry. Public — the storefront key is the only credential needed, and a customer token is not used.
    query: |
      mutation createContactUs($input: createContactUsInput!) {
        createContactUs(input: $input) {
          contactUs {
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "name": "John Doe",
          "email": "john@example.com",
          "contact": "+1234567890",
          "message": "I have a question about your products"
        }
      }
    response: |
      {
        "data": {
          "createContactUs": {
            "contactUs": {
              "success": true,
              "message": "Your inquiry has been submitted successfully. We will get back to you soon"
            }
          }
        }
      }
    commonErrors:
      - error: The name field is required.
        cause: name was omitted or sent empty
        solution: Send name as a non-empty string of at most 255 characters
      - error: The email field must be a valid email address.
        cause: The value is not a well-formed email
        solution: Validate the address client-side before submitting
      - error: The message field is required.
        cause: message was omitted or sent empty
        solution: Send message as a non-empty string

  - id: create-contact-us-minimal
    title: Without a Phone Number
    description: contact is optional. An enquiry submitted without it is accepted, which suits a form that only asks for an email reply.
    query: |
      mutation createContactUs($input: createContactUsInput!) {
        createContactUs(input: $input) {
          contactUs {
            success
            message
          }
        }
      }
    variables: |
      {
        "input": {
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "message": "Do you ship to Ireland?"
        }
      }
    response: |
      {
        "data": {
          "createContactUs": {
            "contactUs": {
              "success": true,
              "message": "Your inquiry has been submitted successfully. We will get back to you soon"
            }
          }
        }
      }

  - id: create-contact-us-with-mutation-id
    title: With a Client Mutation ID
    description: Echo an identifier back with the response to correlate it with the originating form submission.
    query: |
      mutation createContactUs($input: createContactUsInput!) {
        createContactUs(input: $input) {
          contactUs {
            success
            message
          }
          clientMutationId
        }
      }
    variables: |
      {
        "input": {
          "name": "Jane Smith",
          "email": "jane.smith@example.com",
          "contact": "+0987654321",
          "message": "I would like to inquire about bulk order discounts for your clothing range.",
          "clientMutationId": "contact-form-001"
        }
      }
    response: |
      {
        "data": {
          "createContactUs": {
            "contactUs": {
              "success": true,
              "message": "Your inquiry has been submitted successfully. We will get back to you soon"
            },
            "clientMutationId": "contact-form-001"
          }
        }
      }
---

# Create Contact Us

Send a message through the storefront contact form. The store emails the enquiry to its configured contact address.

This mutation is public — the storefront key is the only credential, and a customer token changes nothing. The enquiry is not linked to an account, so identify the sender through `name` and `email` even for a signed-in customer.

## Arguments

| Argument | Type | Required | Description |
|----------|------|----------|-------------|
| `input` | `createContactUsInput!` | Yes | Input object containing the contact-form fields. |

### Input Fields (`createContactUsInput`)

Every field is nullable in the schema — the requirement is enforced by server-side validation, not by the type, so omitting `name` is a valid query that fails at execution.

| Field | Type | Required | Max length | Description |
|-------|------|----------|-----------|-------------|
| `name` | `String` | Yes | 255 | Sender's name. |
| `email` | `String` | Yes | 255 | Email address to reply to. Must be well-formed. |
| `message` | `String` | Yes | — | The enquiry body. No length cap is applied. |
| `contact` | `String` | No | 50 | Phone number. No format rule — any string up to 50 characters is accepted, and an enquiry without it still succeeds. |
| `clientMutationId` | `String` | No | — | Echoed back on the response. |

## Possible Returns

| Field | Type | Description |
|-------|------|-------------|
| `contactUs.success` | `Boolean` | `true` when the enquiry was handed to the mail queue. |
| `contactUs.message` | `String` | Translated confirmation text. |
| `clientMutationId` | `String` | Echoed from the input when provided. |

Nothing addressable comes back — no id, no record to fetch. The enquiry leaves as an email, so a client cannot list, track, or follow up on submissions. Show the confirmation and treat the exchange as finished.

## `success` Can Be `false` Without an Error

The enquiry is **queued**, not sent inline, so the response confirms the hand-off rather than delivery. If queueing itself fails the mutation still resolves normally, with no `errors` array, and returns:

```json
{
  "success": false,
  "message": "Unable to send your inquiry at this time. Please try again later"
}
```

Read `success` before showing a confirmation — the absence of `errors` does not mean the enquiry got through. Delivery after a successful queue is not reported at all.

## Validation

Required fields are validated server-side. A failure surfaces as a top-level `errors` entry with every problem joined into one string, so a submission missing both `name` and `message` returns `"The name field is required. The message field is required."` rather than two separate entries.

## Guard the Form Yourself

The storefront key is the only credential, and there is no uniqueness rule — the same message can be submitted repeatedly. An unprotected public form invites automated submissions, so rate limiting or a captcha in front of it is the client's responsibility; the API applies no additional check.

## Same Operation Over REST

[`POST /api/shop/contact-us`](/api/rest-api/shop/contact-us/submit-contact-us) takes the same four fields and returns the same `success` and `message`. Only the request shape differs.
