# Mapping OEAPI to BIV

## CIA and BIV

CIA (or, in Dutch, BIV) classifications help institutions choose proper
measures to secure and optimise systems that have been classified. CIA is
an acronym for Confidentiality, Integrity and Availability. More
information on [CIA/BIV classificatie](https://nl.wikipedia.org/wiki/BIV-classificatie).

## Institutions in the lead

Determining the CIA classification of an OEAPI endpoint is usually done
by institutions themselves, as they are in the best position to assess
impact regarding, for instance, availability issues.

## Classification through mapping

This document helps institutions to get a general overview of the
objects within the specification and their preliminary CIA
classification. The objects and specifically the endpoints in question
are [OEAPI endpoints](https://oeapi.eu/specification/v6.0).
To make a preliminary CIA classification, we have chosen to map the
endpoints to
[HORA](https://www.wikixl.nl/wiki/hora/index.php/Hoofdpagina).
This is done by mapping the OEAPI objects to HORA business objects.
These HORA business objects already have a CIA consensus from architects
at the educational institutions.

## The OEAPI objects

![OEAPI objects and their relationships in a schema](https://oeapi.eu/specification/v6.0/source/ooapi_v6.png)

## Description of the objects

| OEAPI object                       | OEAPI endpoint                       | description                                                                                                                                                                                                                            |
| ---------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service                            | "/"                                  | The service additional metadata needed to make the OEAPI fit for this organisation.                                                                                                                                                    |
| organisation                       | "/organisations"                     | The organisations that are responsible for the execution and recognition of education.                                                                                                                                                 |
| organisationRelation               | "/organisations"                     | The relations between different organisations, mainly parent-child relations or indication of root.                                                                                                                                     |
| programme                          | "/programmes"                        | A coherent set of educational courses, aimed at the realisation of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the programme must have.                             |
| programmeRelation                  | "/programmes"                        | The relations between different programmes, mainly parent-child relations or indication of root.                                                                                                                                          |
| course                             | "/courses"                           | A coherent set of educational components, aimed at the realisation of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the course must have.                           |
| learningComponent                  | "/learning-components"               | A learning component is a part of a course.                                                                                                                                                                                           |
| testComponent                      | "/test-components"                   | A test component is a part of a course.                                                                                                                                                                                               |
| programmeOffering                  | "/programme-offerings/{programmeOfferingId}" | An offering of a specific programme in an academicSession.                                                                                                                                                                       |
| courseOffering                     | "/course-offerings/{courseOfferingId}" | An offering of a specific course in an academicSession.                                                                                                                                                                          |
| learningComponentOffering          | "/learning-component-offerings/{learningComponentOfferingId}" | An offering of a specific learning component in an academicSession.                                                                                                                                             |
| testComponentOffering              | "/test-component-offerings/{testComponentOfferingId}" | An offering of a specific test component in an academicSession.                                                                                                                                                     |
| academicSession                    | "/academic-sessions"                 | The academic sessions provide information about the different time periods a programme, course, learning component or test component can be offered.                                                                                    |
| programmeOfferingAssociation       | "/programme-offering-associations/{programmeOfferingAssociationId}" | A programme offering association provides information regarding the association between a programme offering and a person.                                                                                       |
| courseOfferingAssociation          | "/course-offering-associations/{courseOfferingAssociationId}" | A course offering association provides information regarding the association between a course offering and a person.                                                                                                 |
| learningComponentOfferingAssociation | "/learning-component-offering-associations/{learningComponentOfferingAssociationId}" | A learning component offering association provides information regarding the association between a learning component offering and a person.                                      |
| testComponentOfferingAssociation   | "/test-component-offering-associations/{testComponentOfferingAssociationId}" | A test component offering association provides information regarding the association between a test component offering and a person.                                                                  |
| testComponentOfferingAssociationAttempt | "/test-component-offering-associations/{testComponentOfferingAssociationId}/test-component-offering-association-attempts" | Planning and execution information on an attempt belonging to a test component offering association.                       |
| result (as part of an association) | association-specific endpoints        | Result of a unit of study participation, study activity or test.                                                                                                                                                                      |
| group                              | "/groups"                            | A collection of persons that has a relationship with an organisation and optionally an offering.                                                                                                                                       |
| person                             | "/persons"                           | A person that has a relationship with this institution.                                                                                                                                                                               |
| learningOutcome                    | "/learning-outcomes"                 | A statement regarding what a learner knows, understands and is able to do on completion of a learning process.                                                                                                                        |
| document                           | "/documents/{documentId}"            | A document that can be referenced by other objects.                                                                                                                                                                                   |
| room                               | "/rooms"                             | Rooms are part of a building where an activity can take place. Including detailed information on the resources available, number of seats, etc. (Updated continuously)                                                                   |
| building                           | "/buildings"                         | Building that is currently used by the organisation. Including all location details.                                                                                                                                                   |

## The HORA objects for education and education support

![HORA business objects and their relationships in a schema](https://github.com/open-education-api/specification/wiki/HORA2_onderwijsobjecten_wiki.png)

## CIA (BIV)

CIA (or BIV) is a triad of

- Confidentiality
- Integrity
- Availability

These three elements of the triad are then classified into 4 different levels:

- H = high
- M = medium
- L = low
- P = publicly available

## Overview of OEAPI endpoints and their classification

| Data element                       | Maps to HORA object                                                                                                                                               | HORA CIA* | HORA BIV |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| service                            | Not part of HORA (could be part of Institution: "Instelling")                                                                                                    | LLL       | LLL      |
| organisation                       | Organisation "Organisatie"                                                                                                                                        | LLL       | LLL      |
| organisationRelation               | Organisation "Organisatie"                                                                                                                                        | LLL       | LLL      |
| programme                          | Collection of units of study, Study, Programme, Collection of units of study "Samenhangende collectie van onderwijseenheden, Opleiding, Onderwijsprogramma"     | LHM       | MHL      |
| programmeRelation                  | Not part of HORA (could be part of Study, Programme, Minor, Unit of study: "Opleiding, Onderwijsprogramma, Minor, Onderwijseenheid")                            | LHM       | MHL      |
| course                             | Unit of study "Onderwijseenheid"                                                                                                                                  | PHM       | MHP      |
| learningComponent                  | Learning activity "Leeractiviteit"                                                                                                                               | LHM       | MHL      |
| testComponent                      | Test activity "Toetsactiviteit"                                                                                                                                  | LHM       | MHL      |
| programmeOffering                  | Collection of units of study in which a student can enrol, Exam programme "Examenprogramma"                                                                      | LHM       | MHL      |
| courseOffering                     | Unit of study implementation "Onderwijseenheiduitvoering"                                                                                                         | PHM       | MHP      |
| learningComponentOffering          | Educational Activity "Onderwijsactiviteit"                                                                                                                        | LMM       | MML      |
| testComponentOffering              | Educational Activity "Onderwijsactiviteit"                                                                                                                        | LMM       | MML      |
| academicSession                    | Not part of HORA (could be part of Exam programme, Unit of study implementation, Study activity "Examenprogramma, Onderwijseenheiduitvoering, Onderwijsactiviteit") | LHM       | MHL      |
| programmeOfferingAssociation       | Unit of study participation, Study Activity "Onderwijseenheidresultaat, Toetsresultaat"                                                                          | HMM       | MMH      |
| courseOfferingAssociation          | Unit of study participation, Study Activity "Onderwijseenheidresultaat, Toetsresultaat"                                                                          | HMM       | MMH      |
| learningComponentOfferingAssociation | Unit of study participation, Study Activity "Onderwijseenheidresultaat, Toetsresultaat"                                                                        | HMM       | MMH      |
| testComponentOfferingAssociation   | Unit of study participation, Study Activity "Onderwijseenheidresultaat, Toetsresultaat"                                                                          | HMM       | MMH      |
| testComponentOfferingAssociationAttempt | Result of a unit of study participation, Study Activity or test "Onderwijseenheidresultaat, Toetsresultaat"                                                | MHL       | LHM      |
| result (as part of an association) | Result of a unit of study participation, Study Activity or test "Onderwijseenheidresultaat, Toetsresultaat"                                                      | MHL       | LHM      |
| group                              | Collection of persons that has a relationship with an organisation and optionally an offering "Leergroep, Lesgroep"                                              | LML       | LML      |
| person                             | Participant, Employee "Individu, Deelnemer, Alumnus, Medewerker, Contact"                                                                                         | HHM       | MHH      |
| learningOutcome                    | Not yet mapped                                                                                                                                                    | TBD       | TBD      |
| document                           | Not yet mapped                                                                                                                                                    | TBD       | TBD      |
| room                               | Room: "Ruimte"                                                                                                                                                    | MLM       | MLM      |
| building                           | Building: "Gebouw"                                                                                                                                                | LMM       | MML      |

- When an OEAPI object maps to more than one HORA object the CIA classification is based on the highest values of the joint objects, e.g. if CIA for object one is LLH and for object two is HLL, the combined CIA classification results in HLH.

- Unit of Study. (Unit) means a component of a higher education course of study with a designated unit code, title and credit point allocation in which students enrol and undertake assessment tasks in order to achieve specified learning outcomes (based on [Law Insider](https://www.lawinsider.com/dictionary/unit-of-study)).
