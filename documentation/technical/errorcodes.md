
# Error codes

This page describes all error responses that MAY be returned by OOAPI
endpoints.

All errors are returned using the `application/problem+json` media type,
conforming to [RFC 7807 – Problem Details for HTTP APIs].

Each error code is described with:
- its intended usage within OOAPI
- behavioural rules
- concrete JSON examples

---

## Error response format

All error responses MUST conform to the Problem Details format.

### Common fields

All OOAPI error responses MUST include the following required Problem Details
fields:

- `type`
- `status`
- `title`

Other Problem Details fields are optional unless explicitly stated otherwise.

| Field | Required | Description |
|------|----------|-------------|
| `type` | MUST | A URI identifying the problem type |
| `title` | MUST | A short, human-readable summary |
| `status` | MUST | The HTTP status code |
| `detail` | MAY | A human-readable explanation |
| `instance` | MAY | A URI identifying the specific request instance |


Some error responses MAY define additional fields.

---

## 400 Bad Request

Returned when the request is syntactically valid but semantically invalid.

Typical causes:
- Invalid query parameter values
- Invalid request body structure
- Unsupported enum values
- Missing required fields

This error indicates a client-side issue that can be corrected.

### Example

```json
{
  "type": "https://api.example.org/problems/invalid-parameter",
  "title": "Invalid request parameters",
  "status": 400,
  "detail": "The query parameter 'mode' must be one of: full, basic.",
  "instance": "https://api.example.org/courses?mode=invalid"
}
```

---

## 401 Unauthorized

Returned when authentication credentials are missing, invalid, or expired.

This error MUST be returned when authentication fails.

### Example

```json
{
  "type": "https://api.example.org/problems/unauthorized",
  "title": "Unauthorized",
  "status": 401,
  "detail": "Authentication credentials were missing or invalid.",
  "instance": "https://api.example.org/student/12345"
}
```

---

## 403 Forbidden

Returned when authentication succeeded but the authenticated client is not
authorised to access the requested resource.

This indicates a permission issue, not an authentication issue.

### Example

```json
{
  "type": "https://api.example.org/problems/forbidden",
  "title": "Forbidden",
  "status": 403,
  "detail": "You do not have permission to access this resource.",
  "instance": "https://api.example.org/admin/enrolments"
}
```

---

## 404 Not Found

Returned only when a specific resource instance cannot be located.

Rules:
- Instance endpoints MAY return `404`
- Collection endpoints MUST NOT return `404` for empty results
- Empty collections MUST return `200` with an empty array

### Example – instance not found

```json
{
  "type": "https://api.example.org/problems/not-found",
  "title": "Resource not found",
  "status": 404,
  "detail": "The course with id 'abc123' could not be found.",
  "instance": "https://api.example.org/courses/abc123"
}
```

### Example – endpoint not found

```json
{
  "type": "https://api.example.org/problems/not-found",
  "title": "Collection endpoint not found",
  "status": 404,
  "detail": "The collection endpoint '/course-offerings' does not exist or is not accessible.",
  "instance": "https://api.example.org/course-offerings"
}
```

---

## 405 Method Not Allowed

Returned when the HTTP method is not supported for the requested endpoint.

Servers SHOULD return an `Allow` header indicating supported methods.

### Example

```json
{
  "type": "https://api.example.org/problems/method-not-allowed",
  "title": "Method not allowed",
  "status": 405,
  "detail": "The method POST is not supported for this endpoint.",
  "instance": "https://api.example.org/courses/abc123"
}
```

---

## 406 Not Acceptable (Version negotiation)

Returned when the server cannot provide a representation for the requested
OOAPI or consumer version.

OOAPI uses explicit version negotiation rather than HTTP `Accept` headers.
If neither the requested version nor a lower compatible minor version is
supported, a `406` response MUST be returned.

This behaviour intentionally deviates from strict HTTP semantics to:
- make version mismatches explicit
- improve interoperability
- improve logging and diagnostics

### Example – unsupported OOAPI version

```json
{
  "type": "https://api.example.org/problems/version-not-acceptable",
  "title": "Version not acceptable",
  "status": 406,
  "detail": "The requested OOAPI version '5.0' cannot be served.",
  "requestedVersion": "5.0",
  "supportedVersions": ["6.1", "6.0"],
  "instance": "https://api.example.org/courses"
}
```

### Example – unsupported consumer version

```json
{
  "type": "https://api.example.org/problems/version-not-acceptable",
  "title": "Consumer version not acceptable",
  "status": 406,
  "detail": "The consumer version '2.0' is not supported.",
  "requestedVersion": "2.0",
  "supportedVersions": ["1.0", "0.94"],
  "instance": "https://api.example.org/enrolments"
}
```

---

## 429 Too Many Requests

Returned when the client exceeds server-defined rate limits.

Clients SHOULD implement retry logic using back-off strategies.

### Example

```json
{
  "type": "https://api.example.org/problems/too-many-requests",
  "title": "Too many requests",
  "status": 429,
  "detail": "You have exceeded the rate limit of 100 requests per minute.",
  "instance": "https://api.example.org/courses"
}
```

---

## 500 Internal Server Error

Returned when an unexpected error occurs while processing a valid request.

This indicates a server-side failure.

### Example

```json
{
  "type": "https://api.example.org/problems/internal-server-error",
  "title": "Internal server error",
  "status": 500,
  "detail": "An unexpected error occurred while processing your request.",
  "instance": "https://api.example.org/enrolments/submit"
}
```

---

## Summary

| Status | Meaning |
|-------:|--------|
| 400 | Invalid request |
| 401 | Authentication failed |
| 403 | Not authorised |
| 404 | Resource not found |
| 405 | Method not allowed |
| 406 | Version not acceptable |
| 429 | Rate limit exceeded |
| 500 | Internal server error |
