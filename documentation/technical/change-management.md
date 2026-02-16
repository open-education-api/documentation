## Change management

Changes to the OEAPI API specification follow a clear and structured
process. Each change moves through defined steps before becoming part
of a published version.

The process ensures transparency and controlled evolution of the
specification.

## 1. Change request or feedback

A change starts with feedback or a change request.

The request must clearly describe:

- the issue or proposed improvement
- the intended outcome
- the version in which the issue was found, if applicable

If the change concerns a bug, clarification, or inconsistency, the
version where it was identified must be stated.

New functionality is always introduced in a new minor or major
version. It is not added to an already published version.

## 2. Assessment

The change request is assessed.

During assessment:

- the relevance of the change is considered
- the impact on existing versions is examined
- it is decided whether the change applies to an existing version or a
  future version

The outcome of this step is a clear decision on how the change will be
handled and in which version it will appear.

## 3. Implementation

A dedicated working branch is created from the branch of the version
for which the change is intended.

- branch from `release/x.y` when fixing an existing published version
- branch from `main` when targeting the next upcoming version

Only the next upcoming version is developed. More distant future
versions are not implemented in parallel.

The change is implemented in this working branch.

## 4. Review

The implemented change is reviewed.

The review verifies:

- correctness of the modification
- consistency with the overall specification
- alignment with versioning rules
- backward compatibility where applicable
- clarity and precision of wording

Only after review does the change proceed to merge.

## 5. Merge

After review, the working branch is merged into the target branch.

If the change concerns an existing published version, the correction is
applied to higher versions where relevant and finally merged into the
development version.

## 6. Website publication

Publication to the website follows automatically.

- the development version is published to `specification/unreleased`
- once a version tag such as `vX.Y` or `vX.Y.Z` is created, it is
  published to `specification/vX.Y`

The published version represents the official state of that release.

## 7. Version release

When changes to a version are ready for publication, a new version
number is assigned in accordance with the versioning policy.

Examples:

- a new minor or major version is released as `vX.Y`
- a fix on an existing version is released as `vX.Y.Z`

A minor or major release introduces new functionality or structural
changes.

A patch release contains corrections or clarifications to an already
published version.

Each released version represents the exact state of the specification
at that moment.

Previously published versions remain unchanged and are not modified.
