
# Generic filtering

## Implementation notes

- Filtering support is **optional**. Implementing organisations **MAY** support it fully,
  partially, or not at all. Support for filtering **SHOULD** be documented in the service
  endpoint description. Support for this functionality **cannot be enforced** by any
  party, including organisations that provide or consume OOAPI endpoints.
- The **availability** of this filter functionality is determined by each implementing
  organisation. The general structure and semantics are
  **standardised** within the OOAPI specification.
- This mechanism is intended to promote **consistency** across implementations, while
  allowing flexibility in technical realisation.
- Filtering can complement **[data minimisation](technical/data-minimisation.md)** principles, as it allows clients to
  request only relevant data subsets.
- Consumers or working groups that wish to apply **generic filtering mechanisms** are
  encouraged to use this approach for the sake of consistency across implementations.
- The structure is **extensible**. New operations or fields can be introduced if they
  follow the same serialisation pattern.
- Filters are a **convenience feature** and not part of the formal API contract.

---

When requesting collections of resources, a client can optionally request items to be
filtered using the query parameter `filter_query`.

This mechanism is a **generic structure** that enables flexible filtering on any exposed
field of a resource. It is **not required** and **may not be implemented** by every
implementing organisation. When unsupported, the parameter is simply ignored.

---

## Generic filter structure using `filter_query`

The `filter_query` parameter allows clients to express conditions on fields in a
structured way using *deepObject* serialisation.

### Example pattern

```http
filter_query[field][operation]=value
```

Each condition defines one filter on a specific field. When multiple filters are present,
they are combined using logical **AND**.

### Example request

```http
GET /organisations/{organisationId}/course-offerings
  ?filter_query[programme_offerings.programme.primary_code][in]=B-IT-2025
  &filter_query[enrol_start_date_time][gt_date]=2025-08-01T00:00:00Z
```

This request returns all course offerings from an organisation with organisationId that starts
after 1 August 2025 and belong to the programme with code `B-IT-2025`.

Additional fields can be filtered in the same way. For instance:

```http
GET /persons?filter_query[surname][like]=Sm*&filter_query[dateOfBirth][eq_date]=1998-05-12
```

This example returns all persons whose surname starts with “Sm” and whose date of
birth is exactly 12 May 1998.

---

## Using wildcards

Partial matches can be expressed using wildcards. Implementing organisations **SHOULD**
use only the asterisk `*` as a wildcard.

### Example request

```http
GET /courses?filter_query[name[].value][like]=bio*
```

This request returns all items whose `name` starts with “bio”.

---

## Combining filters with OR blocks

To combine conditions with logical OR, filters can be grouped in a special array called
`__or`. Each array element represents one filter condition. All elements inside the same
`__or` block are combined using OR.

### Example pattern

```http
filter_query[__or][][field][operation]=value
```

### Example request

```http
GET /courses?filter_query[__or][][name[].value][like]=bio*&filter_query[__or][][name][like]=chem*
```

This request returns all course offerings whose `name` starts with either “bio” or “chem”.
Outside the `__or` block, all filters continue to be combined with logical **AND**.

**Note:** OR blocks support a **restricted subset of operators**, typically those used for
string or categorical matching such as `eq`, `neq`, `like`, and `in`. Comparison operators
(e.g., `gt`, `lt`, `gte`, `lte`, or date comparisons) are usually **not supported** within
`__or` blocks for implementation consistency and performance reasons.


### Example request

```http
GET /courses?filter_query[__or][][name[].value][like]=bio*&filter_query[__or][][name[].value][like]=chem*&filter_query[programmescode][eq]=B-IT-2025
GET /organisations/{organisationId}/course-offerings
  ?filter_query[__or][][course.name[].value][like]=bio*
  &filter_query[__or][][course.name[].value][like]=hem*
  &filter_query[programme_offerings.programme.primary_code][in]=B-IT-2025

This request returns all course offerings whose `name` starts with either “bio” or “chem”
and belong to the programme with code `B-IT-2025`.

Within this example, filters inside the `__or` block are combined with logical **OR**,
while filters outside it are combined with logical **AND**.

---

## Supported operators

The following operators are supported in the generic filtering mechanism. The actual
subset implemented **may vary** per organisation, and support **must be documented** in
the service endpoint description.

| Operator | Meaning | Example |
|-----------|----------|----------|
| `eq` | Equal to | `filter_query[name][eq]=Biology` |
| `neq` | Not equal to | `filter_query[status][neq]=inactive` |
| `lt` | Less than | `filter_query[credits][lt]=5` |
| `lte` | Less than or equal to | `filter_query[credits][lte]=10` |
| `gt` | Greater than | `filter_query[credits][gt]=3` |
| `gte` | Greater than or equal to | `filter_query[credits][gte]=5` |
| `eq_date` | Equal to a specific date (RFC3339 date-time) | `filter_query[start_date][eq_date]=2025-09-01T00:00:00Z` |
| `lt_date` | Before a specific date | `filter_query[start_date][lt_date]=2025-09-01T00:00:00Z` |
| `gt_date` | After a specific date | `filter_query[start_date][gt_date]=2025-09-01T00:00:00Z` |
| `in` | Field value is in list (comma-separated) | `filter_query[status][in]=active,pending` |
| `nin` | Field value is not in list | `filter_query[status][nin]=draft,archived` |
| `like` | Partial match using wildcard `*` | `filter_query[name][like]=bio*` |
| `nlike` | Negative partial match | `filter_query[name][nlike]=chem*` |
| `exists` | Field exists and is not null | `filter_query[end_date][exists]=true` |
| `nexists` | Field is missing or null | `filter_query[end_date][nexists]=true` |

### Operators available within OR blocks

| Operator | Meaning | Example |
|-----------|----------|----------|
| `eq` | Equal to | `filter_query[__or][][name][eq]=Biology` |
| `neq` | Not equal to | `filter_query[__or][][status][neq]=inactive` |
| `like` | Partial match using wildcard `*` | `filter_query[__or][][name][like]=bio*` |
| `in` | Field value is in list (comma-separated) | `filter_query[__or][][status][in]=active,pending` |

Implementers **SHOULD document** the supported subset and ensure consistent behaviour.

---

## Design inspiration

The design of `filter_query` is inspired by
[Storyblok’s Content Delivery API filter
queries](https://www.storyblok.com/docs/api/content-delivery/v2/filter-queries). It adopts
a similar principle: a clear, extensible structure for flexible querying without defining
new endpoint-specific parameters.

---

## Summary

`filter_query` provides a consistent and extensible way for clients to filter API
responses. It improves flexibility and reduces the need for endpoint-specific query
parameters.

However, support for filtering is **optional**, and implementers may differ in the
**set of attributes** they allow filtering on, or the **extent to which complex filter
logic (such as nested OR/AND combinations)** is supported. Where supported, the
behaviour of individual operators and wildcards is expected to be consistent across
implementations.

Implementing organisations are encouraged to document which fields and
operators are available, but support for this feature can **never be required** by the
specification or by any organisation.
