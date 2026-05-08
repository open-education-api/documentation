# Extending OEAPI

Implementations can extend OEAPI by adding extra attributes to the `ext`
object that is defined in the specification for most resources. Extending
OEAPI can also be done by specifying a specific consumer. This is a
mechanism that allows specifying an extension that can be more easily reused
across several implementations. See [Specific consumers](../governance/README.md#community-governance)
for more information.

All users of OEAPI are encouraged to feed their extensions back to the OEAPI
Technical Working Group so this information can be used as feedback for future
versions of OEAPI.

## When to use `ext` and when to use `consumer`?

Use `ext` when:

- You only need a few extra attributes that will only be used by a limited
  set of clients or consuming systems.
- The attributes are specific to your own institution.
- The extension is implementation-specific and not intended for reuse across
  multiple institutions or systems.

Use `consumer` when:

- You need a set of extra attributes to supply a system that will be used by
  more than one institution.
- You would like to promote the use of this extension.
- The extension represents a reusable integration profile or consumer-specific
  agreement.

Consumer extensions are intended to improve reuse and interoperability between
implementations that share the same integration requirements.

## Do not add extra paths or resources

Adding extra paths or resources that are not defined in the specification is
discouraged. If you have a specific use case that cannot be served with the
existing resources and paths, we recommend contacting the OEAPI Technical
Working Group to determine how the specification should be updated to
accommodate your use case.

The preferred approach is to extend existing resources through the supported
extension mechanisms instead of introducing custom endpoints that reduce
interoperability between OEAPI implementations.