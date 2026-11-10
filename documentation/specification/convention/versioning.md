# Versioning

## Header-based versioning model

OEAPI uses a header-based, explicit, single-choice versioning model.

For each request, the client specifies exactly one OEAPI version and may
optionally include exactly one consumer tuple, consisting of one consumer and
one consumer version, using the `Accept` header.

The server does not perform HTTP content negotiation between multiple
alternative versions.

This is referred to as the *closed* versioning approach.

In practice this means:

- the client sends one explicit OEAPI version via `Accept`
- the client may include one consumer tuple via `Accept`, consisting of one
  consumer and one consumer version
- the server evaluates whether the requested version or a compatible higher or
  lower minor version within the same major can be provided
- the same principle applies to the optional consumer tuple
- if no compatible version exists, the server rejects the request

The server always indicates the actual versions used in the response via the
`Content-Type` header.

OEAPI deliberately does not use:

- multiple alternative versions in the `Accept` header
- HTTP standard `Accept` negotiation
- query parameters for versioning
- version attributes in the request body

In short: the client chooses, the server validates. There is no negotiation.

## Version format

OEAPI, profile and consumer versions use a major and minor version number:

```text
vMAJOR.MINOR
```

Examples:

```text
v5.0
v6.0
v6.1
```

Patch versions are not used for OEAPI.

## OEAPI version compatibility

Minor versions are backwards and forwards compatible within the same
major version.

Implementations that support a specific minor version within a major version
should also support later minor versions of the same major version, provided
they ignore unknown optional fields.

For example, an implementation supporting `v6.0` should also be able to process
responses from `v6.1`.

Implementations must not assume that future minor versions contain exactly the
same set of attributes. Additional optional data may be introduced in any minor
version.

## Profile version compatibility

Profile minor versions are backwards compatible within the same major
version.

Each profile version defines the minimum OEAPI version it requires.

### Profile compatibility examples

| Profile version | Minimum OEAPI version(s) |
|-----------------|--------------------------|
| v2.0            | v5.0, v6.1               |
| v2.1            | v6.1                     |
| v3.0            | v6.1                     |
| v3.1            | v6.4                     |
| v4.0            | v6.6, v7.0               |

In this example:

- Profile version `v2.0` works with OEAPI versions `v5.0` and `v6.1` (profiles
  can be compatible with multiple major OEAPI versions).
- Profile version `v2.1` is a non-breaking update of `v2.0` and therefore
  continues to require OEAPI `v6.1`.
- Profile version `v3.0` introduces breaking changes and still requires OEAPI
  `v6.1`.
- Profile version `v3.1` is a non-breaking update of `v3.0` but requires at
  least OEAPI `v6.4`.
- Profile version `v4.0` introduces breaking changes and requires minimum OEAPI
  `v6.6` or `v7.0`.
- A profile based on version `v3.1` cannot be used with an OEAPI
  implementation that only supports `v6.1` through `v6.3`.

## Consumer version compatibility

Consumer minor versions are backwards compatible within the same major version.

Each consumer version defines the minimum OEAPI version it requires.

### Consumer compatibility examples

| Consumer version | Minimum OEAPI version(s) |
|------------------|--------------------------|
| v2.0             | v5.0, v6.1               |
| v2.1             | v6.1                     |
| v3.0             | v6.1                     |
| v3.1             | v6.4                     |
| v4.0             | v6.6, v7.0               |

In this example:

- Consumer version `v2.0` works with OEAPI versions `v5.0` and `v6.1` (consumers
  can be compatible with multiple major OEAPI versions).
- Consumer version `v2.1` is a non-breaking update of `v2.0` and therefore
  continues to require OEAPI `v6.1`.
- Consumer version `v3.0` introduces breaking changes and still requires OEAPI
  `v6.1`.
- Consumer version `v3.1` is a non-breaking update of `v3.0` but requires at
  least OEAPI `v6.4`.
- Consumer version `v4.0` introduces breaking changes and requires OEAPI
  `v6.6` and is compatible with `v7.0`.
- A request using consumer version `v3.1` cannot be served by an OEAPI
  implementation that only supports `v6.1` through `v6.3`.

## Minor version fallback

Only minor version fallback is allowed. Major version fallback is never
permitted.

The server may provide a compatible higher or lower minor version within
the requested major version. The same principle applies to the optional
consumer tuple.

The server always indicates the actual versions used in the response via
the `Content-Type` header.

## Unsupported versions

If the requested version cannot be satisfied and no compatible minor version
is available, the server returns `406 Not Acceptable`.

The response body includes:

- `type`: a URI identifying the problem type
- `title`: a short description of the problem
- `status`: `406`
- `detail`: an explanation identifying the unsupported OEAPI or consumer version
- `requestedVersion`: the version that could not be served
- `supportedVersions`: the versions supported by the server
- `instance`: a URI identifying the request that caused the problem

For an unsupported OEAPI version, `supportedVersions` lists the OEAPI versions
supported by the server.

For an unsupported consumer version, the response body also includes
`consumer.consumerKey` to identify the consumer. In that case,
`supportedVersions` lists the supported versions of that consumer.

## Handling a 406 response

When the server returns `406 Not Acceptable`, the client should inspect
the requested version and supported versions in the response body.

The client may send a new request using a version supported by the server,
provided the client also supports that version and the combination of OEAPI
and consumer versions is compatible.

If client and server have no compatible version in common, the request
cannot be completed.
  