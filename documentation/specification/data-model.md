# Data model

![OEAPI objects and their relationships in a schema](https://openonderwijsapi.nl/specification/v6.0/source/ooapi_v6.png)

## Entity definitions

### Service
The Service entity describes metadata relating to the OEAPI endpoint,
such as who to contact regarding questions about this endpoint, links
to documentation, etc.

### Educations

#### Programme

A Programme describes a coherent collection of courses leading to a
certain outcome. Programmes can be repeatedly offered to learners
through ProgrammeOfferings.

#### Course

A Course describes an educational activity that can result in credits
being awarded to the learner once the learner successfully completes an
Offering of that Course. A Course is the smallest educational unit that
a learner can pass or fail.

#### LearningComponent

A LearningComponent is a component, part of a course, containing most
concrete learning activities the OEAPI describes. Examples include working
groups and lectures.

#### TestComponent

A TestComponent is a component, part of a course, containing test activities
the OEAPI describes.

### AcademicSession

An AcademicSession is a named period in time. AcademicSessions can be
nested in multiple hierarchical trees. The highest possible level of
such a tree should be an AcademicSession describing an (academic) year.
AcademicSessions can have relations to Offerings to indicate that those
Offerings take place within the period described by the
AcademicSession.

### Offerings

Offerings are concrete instances of Educations, taking place at a
certain time. Offerings come in three forms:
* ProgrammeOfferings
* CourseOfferings
* LearningComponentOfferings
* TestComponentOfferings

#### ProgrammeOffering

A ProgrammeOffering is the concrete offering of a Programme in time.
Persons can be associated with a ProgrammeOffering through a
ProgrammeOfferingAssociation.

#### CourseOffering

A CourseOffering is the concrete offering of a Course in time. Persons
can be associated with a CourseOffering through a
CourseOfferingAssociation.

#### LearningComponentOffering

A LearningComponentOffering is the concrete offering of a LearningComponent in time.
Persons can be associated with a LearningComponentOffering through a
LearningComponentOfferingAssociation.

#### TestComponentOffering

A TestComponentOffering is the concrete offering of a TestComponent in time.
Persons can be associated with a TestComponentOffering through a
TestComponentOfferingAssociation.

### Associations

An Association represents the relationship between a person and an
offering. It captures the context of that relationship, such as participation, 
enrolment, or involvement, and may include role and state information.

#### ProgrammeOfferingAssociation

A ProgrammeOfferingAssociation provides information about the
association between a ProgrammeOffering and a person, such as a
student or lecturer.

#### CourseOfferingAssociation

A CourseOfferingAssociation provides information about the association
between a CourseOffering and a person, such as a student or lecturer.

#### LearningComponentOfferingAssociation

A LearningComponentOfferingAssociation provides information about the
association between a LearningComponentOffering and a person.

#### TestComponentOfferingAssociation

A TestComponentOfferingAssociation provides information about the
association between a TestComponentOffering and a person.

#### TestComponentOfferingAssociationAttempt

Planning and execution information on an attempt belong to a
TestComponentOfferingAssociation. Result on the attempt is only
relevant when a score or rawScore can be determined.

### Person

A Person provides information about a person related to an
organisation.

### Organisation

An Organisation provides information about organisations responsible
for the execution and recognition of education, either as an
educational institution or as an organisation providing services,
internships, or facilities.

### Group

A Group provides information about groups related to organisations,
persons, and offerings.

#### Membership

A Membership contains the information on a membership of a person for a
specific group.

### LearningOutcome

Statements regarding what a learner knows, understands and is able to
do on completion of a learning process, which are defined in terms of
knowledge, skills, and responsibility and autonomy.

### Building

A Building provides information about a building currently used by the
organisation.

#### Room

A Room provides information about the part of a building where an
activity can take place.

### Document

A Document represents a document associated with an entity, such as a
formal document, attachment, or additional information.
