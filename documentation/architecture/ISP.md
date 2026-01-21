
# Mapping OOAPI to BIV

## CIA and BIV
CIA (or in Dutch BIV) classifications help institutions choose proper measures to secure and optimise systems that have been classified. CIA is an acronym for Confidentiality, Integrity and Availability. More information on CIA/BIV can be found [here](https://nl.wikipedia.org/wiki/BIV-classificatie)

## Institutions in the lead
Determining the CIA classification of an OOAPI endpoint is usually done by institutions themselves since they are in the best position to assess impact regarding for instance availability issues.

## Classification through matching
This document helps institutions to get a general overview of the objects within the specification and their preliminary CIA classification. The objects and specifically the endpoints in question are [OOAPI endpoints](https://open-education-api.github.io/specification/v5/docs.html). To make a preliminary CIA classification we have chosen to map the endpoints to [HORA](https://www.wikixl.nl/wiki/hora/index.php/Hoofdpagina). This is done by mapping the OOAPI objects to HORA business objects. These HORA business objects already have a CIA consensus from architects at the educational institutions.

## The OOAPI objects
![OOAPI objects and their relationships in a schema](https://open-education-api.github.io/specification/v5/OOAPIv5_model.png)

## Description of the objects
| OOAPI object                       | OOAPI endpoint                       | description                                                                                                                                                                                                                            |
| ---------------------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| service                            | "/"                                  | The service additional metadata needed to make the OOAPI fit for this organisation.                                                                                                                                                    |
| organisation                       | "/organisations"                     | The organisations that are responsible for the execution and recognition of education.                                                                                                                                                 |
| organisationRelation               | "/organisations"                     | The relations between different organisations mainly parent-child relations or indication of root.                                                                                                                                     |
| educationSpecification             | "/education-specifications"          | The generic description of a general education object such as a programme or course.                                                                                                                                                      |
| education                          | "/programmes" "/courses" "/components" | A genaralisation object that is used mainly for aggregating shared information across programmes, courses and components.                                                                                                                |
| programme                            | "/programmes"                          | A coherent set of educational courses, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the programme must have.                             |
| programmeRelation                    | "/programmes"                          | The relations between different programmes mainly parent-child relations or indication of root.                                                                                                                                          |
| course                             | "/courses"                           | A coherent set of educational components, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the course must have.                           |
| component                          | "/components"                        | Educational components, aimed at the realization of competences or objectives in the field of knowledge, insight, attitudes and skills that the person who completes the component must have.                                          |
| offering                           | "/offerings"                         | A genaralisation object that is used mainly for aggregating shared information on the offerings of programmes, courses and components. Offerings have a global timeframe, or academicSession, e.g. a period to which students can enrol |
| programmeOffering                    | "/offerings"                         | An offering of a specific programme in an academicSession                                                                                                                                                                                 |
| courseOffering                     | "/offerings"                         | An offering of a specific course in an academicSession                                                                                                                                                                                  |
| componentOffering                  | "/offerings"                         | An offering of a specific component in an academicSession                                                                                                                                                                               |
| academicSession                    | "/academic-sessions"                 | The academic sessions provides information about the different time periods a programme, course or component (education) can be offered                                                                                                  |
| association                        | "/associations"                      | An offeringAssociation provides the information regarding the association between an offering (of type programme, course or component) and a person (e.g. students, lecturers, etc).                                                     |
| result (as part of an association) | "/associations"                      | Result of a unit of study participation, Study Activity or test                                                                                                                                                                        |
| group                              | "/groups"                            | A collection of persons that has a relationship with an organisation and optionally an offering                                                                                                                                          |
| person                             | "/persons"                           | A person that has a relationship with this institution                                                                                                                                                                                 |
| room                               | "/rooms"                             | Rooms are part of a building where an activity can take place. Including detail information on the resources available, number of seats, etc. (Updated continuously)                                                                   |
| building                           | "/buildings"                         | Building that is currently used by the organisation. Including all location details.                                                                                                                                                   |
| newsfeed                           | "/news-feeds"                        | Clustering of news items usually based on a specific topic.                                                                                                                                                                            |
| newsitem                           | "/news-items"                        | Text which is used to inform readers about events which are considered newsworthy or important. These news items are messages usually clustered in a feed regarding a specific topic.                                                     |

## The HORA objects for education and education support

![HORA business objects and their relationships in a schema](https://github.com/open-education-api/specification/wiki/HORA2_onderwijsobjecten_wiki.png)

## CIA and BIV clasification
CIA (or BIV) is a triad of
- Confidentiality
- Integrity
- Availability

These three elements of the triad are then classified in 4 different levels:
- H = high
- M = medium,
- L = low,
- P = publicly available

## Overview of OOAPI endpoints and their classification

| Data element                       |                                                                                                                                                                   | Security  | Security |
| ---------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------- | -------- |
| OOAPI object                       | Maps to HORA object                                                                                                                                               | HORA CIA* | HORA BIV |
| service                            | Not part of HORA (could be part of Institution: "Instelling" )                                                                                                      | LLL       | LLL      |
| organisation                       | Organisation "Organisatie"                                                                                                                                        | LLL       | LLL      |
| organisationRelation               | Organisation "Organisatie"                                                                                                                                        | LLL       | LLL      |
| educationSpecification             | Generic desciption of a general education object such as a programme or course: "RIO opleidingseenheid"                                                             | PHM       | MHP      |
| education                          | Collection of units of study, Study, Programme, Minor, Unit of study: "Opleiding, Onderwijsprogramma, Minor, Onderwijseenheid"                                      | LHM       | MHL      |
| programme                            | Collection of units of study, Study, Programme, Collection of units of study "Samenhangende collectie van onderwijs eenheden, Opleiding, Onderwijsprogramma"        | LHM       | MHL      |
| programmeRelation                    | Not part of HORA (could be part of Study, Programme, Minor, Unit of study: "Opleiding, Onderwijsprogramma, Minor, Onderwijseenheid")                                | LHM       | MHL      |
| course                             | Unit of study "Onderwijseenheid"                                                                                                                                  | PHM       | MHP      |
| component                          | Learning activity, Test activity "Leeractiviteit, toetsactiviteit"                                                                                                | LHM       | MHL      |
| offering                           | Exam programme, Unit of study implementation, Study activity "Examenprogramma, Onderwijseenheiduitvoering, Onderwijsactiviteit"                                     | LHM       | MHL      |
| programmeOffering                    | Collection of units of study in which a student can enrol, Exam programme "Examenprogramma"                                                                         | LHM       | MHL      |
| courseOffering                     | Unit of study Execution "Onderwijseenheiduitvoering"                                                                                                              | PHM       | MHP      |
| componentOffering                  | Educational Activity "Onderwijsactiviteit"                                                                                                                        | LMM       | MML      |
| academicSession                    | Not part of HORA (could be part of Exam programme, Unit of study implementation, Study activity "Examenprogramma, Onderwijseenheiduitvoering, Onderwijsactiviteit") | LHM       | MHL      |
| association                        | Unit of study participation, Study Activity  "Onderwijseenheidresultaat, Toetsresultaat"                                                                          | HMM       | MMH      |
| result (as part of an association) | Result of a unit of study participation, Study Activity or test  "Onderwijseenheidresultaat, Toetsresultaat"                                                      | MHL       | LHM      |
| group                              | Collection of persons that has a relationship with an organisation and optional an offering "Leergroep, Lesgroep"                                                 | LML       | LML      |
| person                             | Participant, Employee  "Individu, Deelnemer, Alumnus, Medewerker, Contact"                                                                                         | HHM       | MHH      |
| room                               | Room: "Ruimte"                                                                                                                                                    | MLM       | MLM      |
| building                           | Building: "Gebouw"                                                                                                                                                | LMM       | MML      |
| newsfeed                           | Not part of HORA (could be cluster of Notification: "Melding")                                                                                                    | LLL       | LLL      |
| newsitem                           | Melding: "Notification"                                                                                                                                           | LLL       | LLL      |

- When an OOAPI objects maps to more than one HORA object the CIA classification is based on the highest values of the joint objects, e.g. if CIA for object one is LLH and for object two is HLL, the combined CIA classification results in HLH
- Unit of Study. (Unit) means a component of a higher education course of study with a designated unit code, title and credit point allocation in which students enrol and undertake assessment tasks in order to achieve specified learning outcomes.(based on [Law Insider](https://www.lawinsider.com/dictionary/unit-of-study) )
