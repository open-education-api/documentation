# Version Management

The standard evolves continuously based on (amongs others) community feedback submitted via GitHub. Changes to the specification can vary in impact, ranging from minor refinements to substantial updates.

To ensure stability and usability, we avoid introducing breaking changes with every release. Instead, backwards compatibility is guaranteed within each major version.

Please note that consumer versioning is described in the [consumers and profiles](../technical/consumers-and-profiles/README.md).

## Version Structure

The versioning model consists of two levels:

Major versions – Introduce significant changes that are likely to be incompatible with previous major version.

Minor versions – Deliver incremental features and improvements that remain backwards compatible with the same major version.

## Backwards Compatibility

All minor versions within the same major version are backwards compatible.

Definition:
Within a major version of OEAPI, all minor releases are backwards compatible with previous minor releases.

Special notice: It is not required that all ‘lower’ minor versions need to be supported by OEAPI implementations

A client can send a ‘higher’ minor version message to a server running a ‘lower’ version OEAPI implementation. The server should be able to process this message and return a ‘lower’ version response to the client.
And vice versa: a server can send a ‘higher’ minor version message to a client running a ‘lower’ version OEAPI implementation. The client should be able to process this message and return a ‘lower’ version response to the client.

In both cases, the receiving system should:
Process the message
Respond using its own (lower) supported version

Implications:

New features can be introduced without disrupting existing implementations
Systems using different minor versions can continue to interoperate seamlessly

## Version numbering

OEAPI follows the principles of semantic versioning (v2.0.0), with one exception:

* Only major and minor versions are used (i.e. patch versions are not applied)

Version format: `MAJOR.MINOR`

Release candidates are denoted as: `MAJOR.MINOR-rc.#`

## Major version

Major versions are used for changes that introduce breaking modifications to the specification.

Historically (up to and including version 5), development progressed primarily through major releases, as most changes were not backwards compatible. Such updates require existing implementations to make the necessary adjustments before upgrading.

A new major version is introduced only when changes are not backwards compatible with the current version. Due to the significant impact on implementations, the number of major releases is intentionally limited.

For major releases:

* Upcoming major versions are announced well in advance (target: one year).
* Breaking changes may have longer development and delivery timelines.

## Minor version

Minor versions enable the introduction of new (backwards-compatible) features and improvements within an existing major version.

This approach allows for:

* More frequent releases
* Reduced impact on existing implementations
* Continued interoperability between systems using different minor versions

### Examples of minor changes

Typical examples include:

* Attribute modification
When an attribute requires a change (e.g. from enum to string), a new attribute is introduced alongside the existing one.
The original attribute is deprecated and removed in a future major version, following clear agreements on timeline, impact, and implementation guidance.
* Extending objects
Adding a new optional attribute to an existing object is permitted, provided it is not mandatory.

## Release candidate

Bugs and ‘breaking’ issues can continue to occur after a release. Every new release (major.minor) of the specification can contain issues.
Most of these issues are detected during the development phase of the specification, but some are only to be found once the specification starts being used for implementations.
This is no problem for normal issues (those will be fixed and released with a new minor release), but ‘breaking’ issues cause a problem, because fixing these would require a new major release. This is not desired and thus requires a different approach.
Because of that OEAPI uses ‘release candidates’ first when releasing new versions. A new release will always be released as a release candidate until the next major.minor version is to be released. From that moment on the previous major.minor release will become final.

This is the selected approach where we do not end up with a continuous stream of major/minor releases to solve breaking changes in the specification.

Rules for release candidates:

* Only required corrections (*NOT* new features) are included in subsequent release candidates.
* Release candidates will not be used to introduce new functionality.
* Only the most recent release candidate of a given version is displayed on the website.
* Detailed documentation is provided:
  * In the changelog.
  * On dedicated pages for each release candidate.

## Versioning and syntax specification changes

The standard is specified using the OpenAPI specification (OAS). OpenAPI describes how to define an API. OpenAPI is a ‘syntax’ used to describe APIs. A specification in accordance with OpenAPI consists of a number of components, including:
• A description of the requests that a client can send to a server.
• For each request, a description of the possible responses.
• What the content of those requests and responses may be.

OpenAPI allows multiple ways to describe the same API. As a result, even non-functional changes to the specification format may impact tooling, such as code generators, potentially leading to different outputs.

Changes to the syntax or representation of the API (even without functional changes) may still impact implementations. Such changes will always be accompanied by a major or minor version increment.
