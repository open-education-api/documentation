# Enumerations

Enumerations play a crucial role within the specification, as they provide a
clearly defined and controlled set of values that promote consistency,
predictability and interoperability across implementations.

By using enumerations, implementers and consumers of the specification work
with a shared vocabulary. This reduces ambiguity, improves data quality and
helps to ensure that systems interpret exchanged information consistently.

Within the specification, extensible enumerations are implemented using the
`x-ooapi-extensible-enum` extension. Enumeration values defined in this list
represent the standardised OEAPI vocabulary for that field.

Although enumerations are intended to encourage standardisation, the
specification also supports extensibility. This flexibility allows the
specification to evolve over time without unnecessarily requiring breaking
changes or new major releases whenever additional values become necessary.

The use of extensible enumerations therefore aims to balance two important
goals:

1. Providing a stable and interoperable standard vocabulary.
2. Allowing controlled flexibility for emerging requirements and sector-
   specific use cases.

## Extensible enumerations disclaimer

While we prefer to use clearly defined enumerations in the specification for
standardisation purposes, we do support extensible enumerations to minimise the
need for major releases when enumeration changes are required.

This support provides flexibility to users and implementers of the
specification, particularly in situations where institutions, suppliers or
national implementations require temporary or domain-specific extensions that
are not yet part of the standard OEAPI vocabulary.

At the same time, the use of extensible enumerations introduces additional
complexity. Custom values require explicit agreements between communicating
parties and may reduce interoperability between implementations that do not
share those extensions.

The use of custom enumeration values may also reduce the out-of-the-box
compatibility and exchangeability that the specification aims to provide.
Implementations that heavily rely on custom values may become less portable and
less compatible with other OEAPI implementations.

For these reasons, the use of extensible enumerations should remain limited.
Implementations should strongly prefer the predefined enumeration values
included in the specification wherever possible.

Custom values should only be introduced when:

1. No suitable standard value exists.
2. The use case cannot reasonably be represented using an existing value.
3. The extension is expected to provide meaningful additional value within the
   specific implementation context.

## Extensible enumerations based on external vocabularies disclaimer

Some enumerations within the specification are based on externally managed
vocabularies, standards or frameworks, such as European or international
classification systems.

For these enumerations, extending the vocabulary is strongly discouraged. The
main purpose of referencing an external vocabulary is to align with an existing
standard and maximise interoperability across organisations, sectors and
countries.

Adding custom values to such enumerations may conflict with the semantics or
governance of the original vocabulary and can reduce compatibility with systems
that rely on strict adherence to that external standard.

However, extensibility is still technically supported in exceptional cases,
such as:

1. Planned additions to the external vocabulary that are not yet officially
   published.
2. Temporary implementation needs during transition periods.
3. Pilot implementations validating future extensions.

Even in these situations, implementers are strongly encouraged to minimise the
use of custom extensions and align with the official external vocabulary as
soon as possible.

## Extending an enumeration

If an enumeration is extended, all additional custom values must be prefixed
with `x-`.

This convention clearly distinguishes custom values from standard OEAPI values
and reduces the risk of naming conflicts or ambiguity between implementations.

The `x-` prefix also makes it immediately visible to implementers, validators
and integrators that a value is not part of the standard OEAPI vocabulary but
represents a custom extension introduced by a specific implementation or
agreement between parties.