# Change, version and release management

The OEAPI specification evolves continuously based on community feedback,
including feedback submitted via GitHub. Changes range from minor refinements
to substantial updates.

Each change follows a structured process before becoming part of a published
version. This ensures transparency, controlled evolution and stability for
implementations.

This repository contains API specifications. Its branch and release model
distinguishes between:

- active specification development on `main`
- maintenance of published versions on `release/x.y`
- formally published versions represented by tags
- automatic publication to the website

Consumer versioning is described in
[consumers and profiles](/implementation/consumers-and-profiles/README.md).

## Versioning policy

### Version structure and numbering

OEAPI follows the principles of semantic versioning (v2.0.0), with one
exception: only major and minor versions are used. Patch versions are not
applied.

The version format is:

```text
MAJOR.MINOR
```

The two levels are:

- Major versions introduce changes that are incompatible with the previous
  major version.
- Minor versions deliver incremental features and improvements that remain
  backwards compatible within the same major version.

Git tags identify release candidates and stable releases:

- Release candidate: `vX.Y-rcZ`, for example `v6.0-rc1`
- Stable release: `vX.Y`, for example `v6.0`

### Backwards compatibility

All minor releases within the same major version are backwards compatible
with previous minor releases.

Implementations are not required to support every earlier minor version
separately.

A client can send a message using a higher minor version to a server
supporting a lower minor version. The server should be able to process the
message and respond using its own supported version.

Conversely, a client supporting a lower minor version should be able to
process a response from a server using a higher minor version. Any subsequent
request from the client uses a version supported by that client.

Receiving systems should therefore be able to process compatible messages
from other minor versions, while using their own supported version for
outgoing messages.

This allows new features to be introduced without disrupting existing
implementations and enables systems using different minor versions to
continue to interoperate.

### Major versions

A new major version is introduced only when changes are not backwards
compatible with the current version.

Historically, up to and including version 5, development progressed primarily
through major releases, as most changes were not backwards compatible.
Such updates require existing implementations to make the necessary
adjustments before upgrading.

Due to the significant impact on implementations, the number of major
releases is intentionally limited.

For major releases:

- Upcoming major versions are announced well in advance, with a target
  notice period of one year.
- Breaking changes may have longer development and delivery timelines.

### Minor versions

Minor versions introduce new backwards-compatible features and improvements
within an existing major version.

This approach allows for:

- More frequent releases
- Reduced impact on existing implementations
- Continued interoperability between systems using different minor versions

#### Examples of minor changes

**Attribute modification**

When an attribute requires an incompatible change, such as changing its type
from an enum to a string, a new attribute is introduced alongside the
existing one.

The original attribute is deprecated and removed in a future major version,
following clear agreements on the timeline, impact and implementation
guidance.

**Extending objects**

A new optional attribute may be added to an existing object, provided it is
not mandatory.

### Changes to the specification syntax

The standard is specified using the OpenAPI Specification (OAS). OpenAPI
provides a syntax for describing APIs, including:

- The requests a client can send to a server
- The possible responses to each request
- The permitted content of those requests and responses

OpenAPI allows multiple ways to describe the same API. As a result,
non-functional changes to the specification format may affect tooling,
such as code generators, and lead to different outputs.

Changes to the syntax or representation of the API, even without functional
changes, may therefore affect implementations. Such changes are always
accompanied by a major or minor version increment.

## Branch model

### Main branch

`main` represents active development.

This is where:

- new specification changes are introduced
- improvements and clarifications are made
- upcoming versions are prepared

`main` always contains the latest development state, even when that state
has not yet been released.

Only the next upcoming version is developed. More distant future versions
are not implemented in parallel.

### Release branches

For each published minor version, including release candidates, a
corresponding release branch exists.

Examples:

- `release/6.0`
- `release/6.1`

Release branches are used for:

- bug fixes
- clarifications
- documentation updates
- small corrections that apply to an already published version

They do not receive new features or structural changes.

When a correction applies to higher versions, it is also applied to those
versions where relevant and finally merged into `main`.

### Development branches

Individual changes are developed in short-lived working branches created
from either `main` or a release branch.

Examples:

- `clarify-version-negotiation`
- `schema-correction`

These branches:

- focus on a specific change
- exist only for review and discussion
- are removed after merge

## Change process

### 1. Change request or feedback

A change starts with feedback or a change request.

The request must clearly describe:

- the issue or proposed improvement
- the intended outcome
- the version in which the issue was found, if applicable

If the change concerns a bug, clarification or inconsistency, the version
in which it was identified must be stated.

New functionality is always introduced in a new minor or major version.
It is not added to an already published version.

### 2. Assessment

During assessment:

- the relevance of the change is considered
- the impact on existing versions is examined
- it is decided whether the change applies to an existing version or a
  future version

The outcome is a clear decision on how the change will be handled and
in which version it will appear.

### 3. Implementation

A dedicated working branch is created from the branch of the version
for which the change is intended:

- branch from `release/x.y` when correcting an existing published version
- branch from `main` when targeting the next upcoming version

The change is implemented in this working branch.

### 4. Review

A pull request is opened for the implemented change.

The review verifies:

- correctness of the modification
- consistency with the overall specification
- alignment with versioning rules
- backwards compatibility where applicable
- clarity and precision of wording

Only after review does the change proceed to merge.

### 5. Merge

After review, the working branch is merged into the target branch.

If the change concerns an existing published version, the correction is
applied to higher versions where relevant and finally merged into the
development version.

The working branch is removed after merge.

### 6. Website publication

Publication to the website follows automatically:

- `main` is published to `specification/unreleased`
- release candidate tags (`vX.Y-rcZ`) and stable tags (`vX.Y`) are published
  to `specification/vX.Y`

The development publication represents the latest development state.
A tagged publication represents the official state of that release.

### 7. Version release

When changes are ready for release, the version number is determined
in accordance with the versioning policy.

New minor and major versions are first published as release candidates.
The stable tag is created once the next version line starts, as described
below.

## Release candidates and stable releases

### Purpose of release candidates

Every new major or minor version can contain issues. Most are detected
during development, but some become apparent only when the specification
is used for implementations.

Ordinary issues can be corrected in a new minor release. However, some
issues require corrections that would normally constitute breaking changes
and therefore require a new major release.

To avoid a continuous stream of major and minor releases solely to resolve
such issues, OEAPI initially publishes each new version as a release
candidate.

A version remains a release candidate until the next major or minor
version is released as a release candidate. At that point, the previous
version becomes final.

For example, publishing `v6.1-rc1` allows `v6.0` to become stable.

### Rules for release candidates

- Only required corrections, not new features, are included in subsequent
  release candidates.
- Release candidates are not used to introduce new functionality.
- Corrections or clarifications to an already published version are made
  only under exceptional circumstances and follow the release candidate
  process within the same version line.
- Only the most recent release candidate of a given version is displayed
  on the website.
- Detailed documentation is provided in the changelog and on dedicated
  pages for each release candidate.

New functionality belongs in a new minor or major version.

### Releases and tags

Published versions are represented by Git tags.

Examples:

- `v6.0-rc1`
- `v6.0`
- `v6.1-rc1`

A tag:

- marks the exact state of a published specification
- is created from `main` or a release branch
- never changes after creation

Tags define the official version history. Each released version represents
the exact state of the specification at that moment.

Previously published versions remain unchanged. Corrections are published
through a subsequent release candidate or a new version, rather than by
modifying an existing tag.

A stable tag (`vX.Y`) is created only once development of the next minor
or major version has reached its first release candidate.

## Typical workflow

1. A change is proposed and assessed.
2. A working branch is created from `main` or `release/x.y`.
3. The change is implemented.
4. A pull request is opened.
5. After review, the change is merged.
6. Relevant corrections are also applied to higher versions and `main`.
7. The website is updated automatically from the relevant branch or tag.
8. Release candidate tags are created for validation.
9. The stable tag is created once the next version line starts.

## Summary

- `main` contains active development and publishes to
  `specification/unreleased`.
- `release/x.y` contains maintenance changes for a published version line.
- Working branches are temporary and used for individual changes and review.
- Major releases introduce breaking changes.
- Minor releases introduce backwards-compatible features and improvements.
- Patch versions are not used.
- Release candidates use `vX.Y-rcZ`.
- Stable releases use `vX.Y`.
- Tags represent official releases and publish to `specification/vX.Y`.
- Existing tags and the versions they identify remain unchanged.
