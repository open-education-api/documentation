# Security implementation guideline

## Scope

Security is not part of the OEAPI specification itself. The specification
defines the structure and behaviour of the API, but not how access control is
implemented.

This document provides implementation guidance on how security can be applied
when exposing OEAPI endpoints.

## Principle

All access to data must be controlled and enforced by the server.

The server is responsible for the following:

1. Determining which data a client is allowed to access
2. Enforcing access restrictions consistently
3. Preventing access to unauthorised data, regardless of request parameters

Clients must never be able to influence access control decisions through
query parameters, headers or request manipulation.

## Access control

Access control should be applied based on the identity and context of the
client.

Typical differentiation:

1. Internal clients

   Access to broader datasets, still subject to privacy constraints.

2. External or third-party clients

   Access limited to a minimal required dataset.

3. Public clients

   Access restricted to data explicitly classified as public.

Access policies should be centrally defined and consistently enforced.

## Data classification

It is recommended to classify data based on confidentiality, integrity, and availability.

Examples:

1. Public data
2. Internal data
3. Sensitive personal data

Access decisions should be based on a data classification approach defined by the implementor, For example using the CIA triad (Confidentiality, Integrity, and Availability) as recommended above.

## Enforcement

Security must be enforced server-side at all times.

The server must do the following:

1. Ignore unauthorised field requests
2. Never expose restricted data
3. Ensure consistent behaviour across all endpoints

## Relation to data minimisation

Security and data minimisation are separate concerns.

Security determines what a client is allowed to access.

Data minimisation determines what is returned within that allowed scope.

Security always takes precedence.

## Summary

1. Security is implementation-specific.
2. The server is fully responsible for access control.
3. Clients cannot influence security decisions.
4. Non-public data exposure must always be explicitly authorised.
5. Public data exposure is allowed by default, but still controlled by the server.
