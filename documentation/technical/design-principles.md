<!-- markdownlint-disable MD036 -->
# OEAPI Design Principles

**Version:** 0.1 (Draft)  
**Date:** June 2026  
**Status:** Draft for review  
**Relates to:** [Profiling Guidelines](./consumers-and-profiles/profiling-guidelines.md)

---

## Table of Contents

1. [Purpose](#1-purpose)
2. [Architectural principles](#2-architectural-principles)
3. [Information model principles](#3-information-model-principles)
4. [Identifier design](#4-identifier-design)
5. [Extensibility mechanisms](#5-extensibility-mechanisms)
6. [Versioning](#6-versioning)
7. [Querying, filtering, and field selection](#7-querying-filtering-and-field-selection)
8. [Enumerations](#8-enumerations)
9. [Security and data minimisation](#9-security-and-data-minimisation)
10. [Language](#10-language)

---

## 1. Purpose

This document describes the design principles behind the OEAPI base specification. It is intended as a reference for anyone creating an OEAPI profile, consumer, or implementation. Profiles that respect these principles are more likely to be interoperable, maintainable, and accepted by the broader community. Profiles that violate them create friction for implementers and reduce ecosystem coherence.

---

## 2. Architectural principles

**OEAPI is a specification, not an API.** It defines a contract for implementation by educational institutions and their suppliers. There is no single central OEAPI endpoint — each institution runs its own implementation.

**REST, following Dutch API design rules.** The REST interface is based on the [REST-API Design Rules](https://forumstandaardisatie.nl/open-standaarden/rest-api-design-rules) (Nederlandse API Strategie) and the Digikoppeling RESTful API Profile. These rules govern path design, HTTP method use, response codes, and pagination. Profiles inherit this REST foundation and must not deviate from it.

**Data in transit, not historical records.** OEAPI is primarily designed for data that is currently available — information that can be aggregated from within an institution at the time of the request. Profiling for historical or audit purposes requires explicit consideration and documentation of how this diverges from the base spec's primary intent. There is a mechanism that allows for changes over time (timelineOverrides). This mechnanism is used sparsely, only on courses and programmes.

**Three-layer model.** The specification sits between a conceptual data model and a concrete REST realisation. The data model is broader than the API — the overarching educational concept is not exposed as an endpoint. Profiles that need to expose relationships not in the REST layer should first check whether they can be derived from existing endpoints before introducing new ones.

**Scope: student activities and information needs.** The specification is specifically aimed at providing information related to student activities. It is mapped to the HORA (Higher Education Reference Architecture) and MORA (MBO Reference Architecture) information models. Profiles that extend into territory outside this scope should document the justification explicitly.

**Alignment with international standards.** The base specification is designed with conscious alignment to IMS/1EdTech standards (OneRoster, LIS, Edu-API), ECTS guidelines, and European frameworks. Profiles should build on, not contradict, these alignments.

> **Profile implication.** REST conventions, URL patterns, and HTTP semantics from the base specification must be preserved in profiles. Profiles that extend scope beyond student activities should document the alignment (or deliberate divergence) with HORA/MORA.

---

## 3. Information model principles

**Four base educational objects with dedicated endpoints.** The specification defines four core educational entities: programme, course, learning component, and test component. Each has its own endpoint. There is no generic "educational unit" endpoint.

**Be specific even though the data could be generic.** Offerings (scheduled instances of the base objects) are not exposed through a generic offering endpoint. Instead, they are represented through four specific types: programme offering, course offering, learning component offering, and test component offering. Profiles must work within this structure rather than inventing a generic offering layer.

**Associations for enrolment relationships.** Relationships between offerings and persons (enrolments, participation, results) are modelled as associations with dedicated endpoints. This pattern is fundamental to the spec and must be respected by profiles dealing with enrolment or participation data.

**Hierarchical structures are modelled, not flattened.** Organisations, programmes, and academic sessions can all be nested hierarchically. Profiles should use this structure rather than denormalising data into flat objects.

**Simplification is intentional.** In some places the REST API is a simplification of the underlying data model, chosen deliberately to make endpoints easier to consume. For example, the aggregated educational concept is not a REST endpoint — only the three specific forms are. Profiles should respect this simplification rather than re-introducing complexity at the API level.

> **Profile implication.** Profiles must work within the four-object, offering, association structure. If a use case appears to require a different structure, the first step is to verify whether the existing model can accommodate it before proposing additions.

---

## 4. Identifier design

**UUIDs for all resources.** Every resource has a `{resourceName}Id` UUID identifier. Version 4 (random) UUIDs are recommended. These identifiers must be stable — a resource should not change its UUID over time. Profiles that introduce new objects must assign UUIDs to them consistently.

**Primary codes for institutional identifiers.** Most institutions have existing human-readable codes for their resources (course codes, student numbers, etc.). These are communicated using the `primaryCode` attribute, which contains an `IdentifierEntry` object with a `codeType` and `code`. If no primary code exists, the UUID may be used.

**Other codes for additional identifiers.** The `otherCodes` array carries additional identifier types. A predefined set of `codeType` values is specified (e.g. `schacHome`, `esi`, `institution_code`, `programme_code`). Custom `codeType` values are permitted but must be prefixed with `x-`.

The following `codeType` values are predefined in v6.0:

| Code | Description |
|---|---|
| `account_id` | Identifier for an account |
| `eckid` | Dutch Educatieve ContentKeten iD framework identifier |
| `esi` | European Student Identifier |
| `institution_code` | Dutch institution code (OCW) |
| `programme_code` | Dutch programme code (OCW, replaces CREBO/CROHO) |
| `schac_home` | Home organisation by domain name |
| `student_number` | Student identifier |
| `username` | User login name |
| `uuid` | Universally unique identifier |
| `x-*` | Custom values (must use `x-` prefix) |

*(Full list available in the OEAPI v6 technical documentation.)*

> **Profile implication.** Profiles must not invent their own identifier fields. All identifiers — including those added through consumers — must follow the `primaryCode` / `otherCodes` pattern or use the resource UUID.

---

## 5. Extensibility mechanisms

The OEAPI specification provides two sanctioned extension mechanisms. Profiles must use these and must not introduce custom endpoints or resource types outside them.

**`ext` attribute — implementation-specific extensions.** Most OEAPI objects include an `ext` field for unstructured, arbitrary JSON additions. Use `ext` when:

- the extra data is specific to one institution,
- it is used by a limited set of clients,
- it is not intended for ecosystem-wide reuse.

**`consumer` object — shared, reusable extensions.** When extra attributes are needed by more than one institution, or represent a reusable integration agreement, they should be encapsulated in a named consumer object. The consumer object must include a `consumerKey` and may add any further attributes. Consumer keys that are not registered must be prefixed with `x-`.

Currently registered consumer keys:

| Key | Description |
|---|---|
| `rio` | Dutch central registry of educational institutions and offerings |
| `eduxchange` | Cross-institutional student enrolment platform |
| `nl-test-admin` | Exam and testing tool integration (NED-OOAPI / OKE) |

**Do not add extra paths or resources.** Adding endpoints not defined in the specification is explicitly discouraged. If a genuine gap is found, raise a change request with the OEAPI Technical Working Group. Profiles should document any such gaps and the change requests raised.

**Feed extensions back.** Users of the OEAPI are encouraged to share their `ext` and consumer extensions with the Technical Working Group, so they can inform future versions of the base specification.

> **Profile implication.** Choose the right extension mechanism for the use case. `ext` for local additions, named consumer for cross-institution agreements. Document any `ext` content or custom consumer keys used by the profile.

---

## 6. Versioning

**Header-based versioning.** The OEAPI uses the `Accept` header for version negotiation:

```http
Accept: application/vnd.oeapi+json;version=6.0;consumer=nl-test-admin;consumer-version=6.0
```

This is a deliberate, closed approach — the client specifies exactly one version per request. The server returns the actual version used in the `Content-Type` header.

**No URL versioning or query parameter versioning.** OEAPI deliberately does not use version numbers in URLs or query parameters.

**Minor version fallback, not major.** A server may serve a compatible minor version within the same major if the exact requested version is not supported. Major version fallback is never permitted — the server returns `406 Not Acceptable`.

**Consumer versioning follows base spec major versions.** When a new major OEAPI version is released, all consumers must be reviewed and a new consumer version published. Minor and patch consumer versions follow specific compatibility rules.

| Situation | Consumer version behaviour |
|---|---|
| New OEAPI major release | Consumer version adopts new major number (required) |
| New OEAPI minor release, consumer unaffected | Consumer version unchanged |
| New OEAPI minor release, consumer affected | Consumer version updated; reflects lowest compatible minor |
| New consumer release without OEAPI release | Consumer patch version incremented |

> **Profile implication.** Every profile must state which OEAPI version it requires. If a profile introduces a consumer, that consumer must be versioned following the rules above.

---

## 7. Querying, filtering, and field selection

**Text search via `q`.** Collections can be filtered by a text search term matching `name`, `abbreviation`, `description`, and (for persons) name and contact fields. Matching is case-insensitive and supports partial matches.

**Consumer filtering via `consumer` query parameter.** A client passes `?consumer={key}` to request items and consumer-specific attributes for a named consumer. This is distinct from the `consumer` object in the response body.

**Entity-specific filters.** Individual endpoints define their own filter parameters (e.g. filtering courses by `level`). These are endpoint-specific and documented in the specification.

**Server-determined ordering with pagination consistency.** The server determines the order of results. Clients must not rely on a specific default ordering. The server must, however, return records in a consistent and deterministic order within a request context so that pagination works correctly.

**Field selection via `fields` (optional, v6+).** Clients can pass a `fields` parameter to indicate which fields they want returned:

```http
GET /persons/me?fields=(givenName,surname,email)
```

This is a hint, not a security control — the server always determines the final response shape. Support for `fields` is optional and advertised through the service endpoint.

> **Profile implication.** Profiles may require or recommend support for the `fields` parameter as part of a data minimisation strategy. Any consumer-defined or `ext` fields are also accessible via `fields`.

---

## 8. Enumerations

**Controlled vocabularies are central to interoperability.** Enumerations provide a shared vocabulary across implementations and reduce ambiguity. The base spec defines extensible enumerations using the `x-ooapi-extensible-enum` OpenAPI extension.

**Extension with `x-` prefix.** Any custom enumeration values — values not in the standard OEAPI vocabulary — must be prefixed with `x-`. This makes non-standard values immediately visible to implementers and validators.

**Prefer standard values.** Custom values require explicit bilateral agreements between systems and reduce portability. They should only be introduced when no suitable standard value exists and the use case cannot be represented otherwise.

**External vocabularies are especially sensitive.** Some enumerations reference external standards (e.g. European classification frameworks). Adding custom values to these is strongly discouraged, as it conflicts with the semantics of the external standard. It is only acceptable for planned additions not yet officially published, temporary transition needs, or pilot implementations.

> **Profile implication.** Profiles that restrict or extend enumerations must explicitly document which values are permitted and which are not. Any custom values must use the `x-` prefix and be documented with their meaning and intended lifecycle.

---

## 9. Security and data minimisation

**Security is implementation-specific, not part of the specification.** The base spec does not define a global security model. Each implementation is responsible for its own access control. Security is enforced exclusively server-side — no client query parameter, header, or request body field can influence access control decisions.

Typical access control levels to consider:

| Client type | Typical access scope |
|---|---|
| Internal clients | Broader datasets, subject to privacy constraints |
| External / third-party clients | Minimal required dataset |
| Public clients | Data explicitly classified as public |

**Data minimisation is a core principle.** The API should return only the minimum data necessary for a given request. This is supported by the optional `fields` parameter and by the server's ability to return different data to clients with different authorisation levels.

**Security and data minimisation are separate concerns.** Security determines what a client is allowed to access. Data minimisation determines what is returned within that allowed scope. Security always takes precedence.

> **Profile implication.** Profiles must document their security approach, even though this is outside the base specification. This includes which OAuth2 flows or token mechanisms are required, which scopes are defined, and how identity is established (e.g. via MyAcademicID/schacHome for cross-institutional flows, or eduKoppeling for domestic Dutch government-to-government flows).

---

## 10. Language

**British English for documentation and enumerations.** Following EU policy norms and the practice of European higher education institutions, the OEAPI uses British English in its documentation, descriptions, and enumeration values (ADR 0001, accepted August 2025).

> **Profile implication.** Profiles should follow British English for all new documentation, field descriptions, and enumeration values they introduce, consistent with the base specification's language policy.

---

*This document is maintained alongside the [OEAPI Profiling Guidelines](./OEAPI-Profiling-Guidelines.md). Feedback and contributions are welcome via the project repository.*
