# OEAPI v6: Major Changes Since v5

## Introduction

OEAPI v6 introduces a significant redesign since v5. This overview uses
the v5 API specification as the baseline, and uses both the v6 conceptual
model and the v6 API specification to describe the changes.

## Key Changes Since v5

1. **Standardisation to British English terminology**  
   Terminology has been aligned across the specification.  
   Examples include:
   - `organizations` → `organisations`
   - `programs` → `programmes`
   - `organizationType` → `organisationType`

2. **Decomposition of generic entities**  
   Generic v5 entities have been split into more specific v6 entities.  
   This applies to:
   - `Offering`
   - `Component`
   - `Association`

   These are now represented by more specific concepts such as:
   - `ProgrammeOffering`
   - `CourseOffering`
   - `LearningComponentOffering`
   - `TestComponentOffering`
   - `LearningComponent`
   - `TestComponent`
   - offering-specific association entities

3. **Generic concepts retained only in the conceptual model**  
   Some generic concepts still appear in the v6 conceptual model as
   abstract or grouping concepts, but are no longer exposed as generic API
   resources.

   This applies to:
   - `EducationSpecification`
   - `Offering`

   In the API, only the concrete resources are exposed.

4. **Explicit education structure**  
   The v6 model makes the education structure more explicit through:
   - `Programme`
   - `Course`
   - `LearningComponent`
   - `TestComponent`

   This replaces the more generic structure around
   `EducationSpecification` and `Component` in v5.

5. **Explicit offering structure**  
   Offerings are no longer modelled as one generic resource. They are split
   into separate offering types:
   - `ProgrammeOffering`
   - `CourseOffering`
   - `LearningComponentOffering`
   - `TestComponentOffering`

   This makes the link between education structure, scheduling and
   participation clearer.

6. **Support for supplementary information**  
   v6 adds support for supplementary information for programmes and
   courses, including programme offerings and course offerings.

7. **Expanded enrolment and association model**  
   The generic v5 association model has been replaced by specific
   association resources per offering type:
   - `ProgrammeOfferingAssociation`
   - `CourseOfferingAssociation`
   - `LearningComponentOfferingAssociation`
   - `TestComponentOfferingAssociation`

   v6 also introduces attempts for test component offering associations.

8. **Learning outcomes made explicit**  
   `LearningOutcome` is part of the v6 model and is explicitly related to
   education entities such as programmes, courses, learning components and
   test components.

9. **Improved alignment with European standards and vocabularies**  
   v6 improves alignment with European interoperability standards,
   including the use of ELM vocabularies where applicable.

10. **Expanded organisational context**  
    The v6 model includes a clearer organisational context with:
    - `Organisation`
    - `Person`
    - `Group`
    - `Membership`
    - `AcademicSession`
    - `Building`
    - `Room`

    This supports a clearer connection between education, people, groups,
    locations and time periods.

11. **Extensible enumerations**  
    v6 introduces extensible enumerations, allowing implementations to use
    predefined values while still supporting sector-specific or
    implementation-specific extensions.

12. **Minimised number of mandatory fields**  
    The number of mandatory fields has been minimised where possible,
    making the specification easier to implement while preserving
    semantic clarity.

13. **Standardised and extended filtering**  
    Filtering has been made more consistent across endpoints, including:
    - `filterQuery`
    - `filterQueryOr`
    - `fields`

    This provides a more uniform query mechanism across resources.

14. **Expanded write capabilities**  
    v6 adds more write operations, including additional `PUT` support for
    resources such as:
    - `Person`
    - `Group`

15. **Formalised version negotiation**  
    Version negotiation is explicitly defined in v6, including support for
    `406 Not Acceptable` when no compatible version can be selected.

16. **Technical modernisation**  
    The specification has been upgraded from OpenAPI 3.0.3 to OpenAPI 3.1.1.

17. **Security definitions no longer included**  
    Security schemes are no longer defined in the specification itself.
    This is because OEAPI describes the API specification, while the way
    security is configured is an implementation concern.

## Summary

OEAPI v6 moves from a more generic v5 API model towards a more explicit
and domain-driven model. The main change is the decomposition of generic
education, offering and association structures into concrete resources
that better reflect the v6 conceptual model.
