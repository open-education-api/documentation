# eduXchange

In this documentation of the eduXchange consumer object you will find:

- [Versions](#versions)
- [Required OEAPI Resources](#required-oeapi-resources)
- [Student Registration Consumer Objects](#student-registration-consumer-objects)
- [Agreements per Alliance](#agreements-per-alliance)

---

## Versions

**Last update:** 26 June 2025

| Instance      | Alliances      |
| ------------- | -------------- |
| eduxchange.nl | ewuu, lde, kom |
| eduxchange.eu | euroteq        |

Currently eduXchange uses version 2.2 of this profile.

### Version History

| Version | Period    | Status     | Description                                                                                        |
| ------- | --------- | ---------- | -------------------------------------------------------------------------------------------------- |
| 2.2     | 2025+     | Live       | New features for Dutch and European alliances, adding more alliances and courses for professionals |
| 2.1     | 2023-2024 | Superseded | New features for Dutch alliances, international alliances on eduxchange.eu (starting with EuroTeq) |
| 2.0     | 2021-2022 | Superseded | Built for Dutch alliances EWUU and LDE                                                             |

---

## Required OEAPI Resources

The subset of OEAPI Resources used in eduXchange is described in the picture below:

- **White resources**: Used in the orientation process
  - Dashed lines indicate resources only accessed through the `expand` parameter
- **Grey resources**: Used in the enrolment and grade transmission processes

![OEAPI Resources used in eduXchange](../../_media/Student%20mobility%202025%20-%20OEAPI%20Resources.jpg "OEAPI Resources used in eduXchange")

### Endpoints

To be compatible with eduXchange, an institution needs to implement the following OEAPI endpoints:

#### Orientation Endpoints

!> To select educational information meant for eduXchange, eduXchange will always append the query parameter `consumer=eduxchange` to every call. To select information meant for a particular alliance, eduXchange can append an additional parameter `alliances.name=ALLIANCE_NAME` for an alliance.


| Endpoint                                                       | Used to                                    | Required for minors? | Required for courses? |
| -------------------------------------------------------------- | ------------------------------------------ | :------------------: | :-------------------: |
| `GET /organizations?pageSize={pagesize}&organizationType=root` | Get information about the institutions     |          ✓          |          ✓           |
| `GET /programs?pageSize={pagesize}&programType=minor`          | Get minors                                 |          ✓          |                       |
| `GET /programs/{programId}?expand=coordinators,organization,parent` | Get detailed information about a minor     |          ✓          |                       |
| `GET /programs/{programId}/offerings`                          | Get offerings for a minor                  |          ✓          |                       |
| `GET /programs/{programId}/courses?pageSize={pagesize}`        | Get the courses that are part of a minor   |       (optional)     |                       |
| `GET /courses?pageSize={pageSize}`                             | Get courses                                |                      |          ✓           |
| `GET /courses/{courseId}?expand=coordinators,programs`         | Get detailed information about a course    |                      |          ✓           |
| `GET /courses/{courseId}/offerings`                            | Get offerings for a course                 |                      |          ✓           |
| `GET /offerings/{offeringId}?expand=academicSession`           | Get detailed information about an offering |          ✓          |          ✓           |


#### Enrolment Endpoints

| Endpoint                              | Required? |
| ------------------------------------- | :-------: |
| `GET /persons/me`                     |    ✓     |
| `POST /associations/external/me`      |    ✓     |
| `GET /associations/{associationId}`   |    ✓     |
| `PATCH /associations/{associationId}` |    ✓     |


### Required OEAPI Attributes per Resource

#### Organizations

| Attribute          | Required | Multilingual |
| ------------------ | :------: | :----------: |
| `organizationId`   |    ✓    |              |
| `primaryCode`      |    ✓    |              |
| `organizationType` |    ✓    |              |
| `name`             |    ✓    |      ✓      |
| `shortName`        |    ✓    |              |
| `consumers`        |    ✓    |              |
| `description`      |          |      ✓      |
| `addresses`        |          |              |
| `link`             |          |              |
| `logo`             |          |              |
| `otherCodes`       |          |              |

#### Programs

| Attribute                   |      Required       | Multilingual |
| --------------------------- | :-----------------: | :----------: |
| `programId`                 |         ✓          |              |
| `programType`               | ✓ (value: `minor`) |              |
| `primaryCode`               |         ✓          |              |
| `name`                      |         ✓          |      ✓      |
| `abbreviation`              |         ✓          |              |
| `description`               |         ✓          |      ✓      |
| `teachingLanguage`          |         ✓          |              |
| `level`                     |         ✓          |              |
| `studyLoad`                 |         ✓          |              |
| `consumers`                 |         ✓          |              |
| `modeOfDelivery`            |                     |              |
| `modeOfStudy`               |                     |              |
| `duration`                  |                     |              |
| `firstStartDate`            |                     |              |
| `fieldsOfStudy`             |                     |              |
| `levelOfQualification`      |                     |              |
| `enrollment`                |                     |      ✓      |
| `resources`                 |                     |              |
| `learningOutcomes`          |                     |      ✓      |
| `assessment`                |                     |      ✓      |
| `admissionRequirements`     |                     |      ✓      |
| `qualificationRequirements` |                     |              |
| `link`                      |                     |              |
| `otherCodes`                |                     |              |
| `addresses`                 |                     |              |
| `coordinators`              | ✓ (via `expand`)   |              |
| `organization`              | ✓ (via `expand`)   |              |
| `parent`                    | ✓ (via `expand`)   |      ✓      |

#### Courses

| Attribute                   | Required | Multilingual |
| --------------------------- | :------: | :----------: |
| `courseId`                  |    ✓    |              |
| `primaryCode`               |    ✓    |              |
| `name`                      |    ✓    |      ✓      |
| `abbreviation`              |    ✓    |              |
| `description`               |    ✓    |      ✓      |
| `teachingLanguage`          |    ✓    |              |
| `level`                     |    ✓    |              |
| `studyLoad`                 |    ✓    |              |
| `consumers`                 |    ✓    |              |
| `modeOfDelivery`            |          |              |
| `duration`                  |          |              |
| `firstStartDate`            |          |              |
| `fieldsOfStudy`             |          |              |
| `levelOfQualification`      |          |              |
| `enrollment`                |          |      ✓      |
| `resources`                 |          |              |
| `learningOutcomes`          |          |      ✓      |
| `assessment`                |          |      ✓      |
| `admissionRequirements`     |          |      ✓      |
| `qualificationRequirements` |          |              |
| `link`                      |          |              |
| `otherCodes`                |          |              |
| `addresses`                 |          |              |
| `coordinators`              | ✓ (via `expand`) |              |
| `organization`              |          |              |
| `programs`                  | ✓ (via `expand`) |      ✓      |

#### Offerings

| Attribute                  | Required | Multilingual |
| -------------------------- | :------: | :----------: |
| `offeringId`               |    ✓    |              |
| `primaryCode`              |    ✓    |              |
| `offeringType`             |    ✓    |              |
| `name`                     |    ✓    |      ✓      |
| `description`              |    ✓    |      ✓      |
| `teachingLanguage`         |    ✓    |              |
| `resultExpected`           |    ✓    |              |
| `startDate`                |    ✓    |              |
| `endDate`                  |    ✓    |              |
| `consumers`                |    ✓    |              |
| `abbreviation`             |          |              |
| `modeOfDelivery`           |          |              |
| `maxNumberStudents`        |          |              |
| `enrolledNumberStudents`   |          |              |
| `pendingNumberStudents`    |          |              |
| `minNumberStudents`        |          |              |
| `link`                     |          |              |
| `otherCodes`               |          |              |
| `enrollStartDate`          |          |              |
| `enrollEndDate`            |          |              |
| `flexibleEntryPeriodStart` |          |              |
| `flexibleEntryPeriodEnd`   |          |              |
| `addresses`                |          |              |
| `academicSession`          | ✓ (via `expand`) |      ✓      |
| `priceInformation`         |          |      ✓      |
| `organization`             |          |              |

#### Persons (Coordinators, Orientation Phase)

Persons are returned when using the `expand=coordinators` parameter on programs and courses. For displaying coordinator information, eduXchange only uses `displayName` and `mail`.

| Attribute          | Required |
| ------------------ | :------: |
| `personId`         |          |
| `primaryCode`      |          |
| `givenName`        |          |
| `surname`          |          |
| `displayName`      |    ✓    |
| `mail`             |    ✓    |
| `activeEnrollment` |          |
| `affiliations`     |          |

### Consumer Objects

To be compatible with the [eduXchange catalogue website](https://www.eduxchange.nl), an implementation needs to implement the eduXchange consumer object and query parameter. See [specific consumers](consumers.md) for more information.

The consumer object for eduXchange has the following structure:

#### eduXchange consumer attributes

| Attribute     | Type                           | Required |
| ------------- | ------------------------------ | :------: |
| `consumerKey` | string (always `"eduxchange"`) |    ✓    |
| `alliances`   | array  (see tables below)      |    ✓    |

#### Alliance object for Programs and Courses

| Attribute                    | Required | Type    | Description                                                                                                                                                                                                                      |
| ---------------------------- | :------: | ------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `name`                       |    ✓    | string  | Alliance name. Allowed values: `"ewuu"`, `"lde"`, `"euroteq"`, `"kom"`                                                                                                                                                           |
| `theme`                      |          | string  | **Deprecated.** Theme of the Program/Course within the alliance. Use `themes` instead.                                                                                                                                           |
| `themes`                     |          | array   | Array of theme strings, e.g., `["theme 1", "theme 2"]`. If present, `theme` is ignored.                                                                                                                                          |
| `selection`                  |          | boolean | Whether students need to pass extra requirements before enrolling                                                                                                                                                                |
| `type`                       |          | string  | Allowed values: `"broadening"`, `"deepening"`                                                                                                                                                                                    |
| `instructorNames`            |          | array   | Array of instructor name strings                                                                                                                                                                                                 |
| `contactHours`               |          | float   | Amount of contact hours, e.g., `3.5`                                                                                                                                                                                             |
| `activities`                 |          | string  | Activities in the course, e.g., `"lectures and practises"`                                                                                                                                                                       |
| `microcredential`            |          | string  | Allowed values: `"stackable"`, `"standalone"`. If not specified, no microcredential is rewarded.                                                                                                                                 |
| `targetGroup`                |          | string  | Allowed values: `"forStudents"`, `"forProfessionals"`. Default: `"forStudents"`                                                                                                                                                  |
| `visibleForOwnStudents`      |          | boolean | Whether enrollment should be visible for students of the offering institution. *Note: a higher-level institution setting controls program/course visibility.*                                                                    |
| `enrollmentForOwnStudents`   |          | string  | Enrollment process for own students. Allowed values: `"broker"`, `"url"`. Only used if `visibleForOwnStudents` is `true`. If `"url"`, the `enrollmentUrl` in the **offering** consumer object is mandatory.                      |
| `visibleForGuests`           |          | boolean | Whether enrollment should be visible for students outside partner institutions. *Note: a higher-level institution setting controls program/course visibility.*                                                                   |
| `enrollmentForGuests`        |          | string  | Enrollment process for guest students. Allowed values: `"broker"`, `"url"`. Only used if `visibleForGuests` is `true`. If `"url"`, the `enrollmentUrlForGuests` in the **offering** consumer object is mandatory.                |
| `enrollmentForProfessionals` |          | string  | Enrollment process for professionals. Allowed values: `"broker"`, `"url"`. Only used if `targetGroup` is `"forProfessionals"`. If `"url"`, the `enrollmentUrlForProfessionals` in the **offering** consumer object is mandatory. |
| `jointPartnerCodes`          |          | array   | Array of partner codes for joint programs. Uses agreed partner codes, e.g., `["21PF", "21PB"]` for LDE.                                                                                                                          |
| `source`                     |          | object  | Reference to the source of a Course/Program for joint programs. See `source` object attributes below.                                                                                                                            |
| `modeOfDelivery`             |          | string  | Used only for the EuroTeQ alliance to override the regular OEAPI modes of delivery                                                                                                                                               |
| `level`                      |          | string  | Used only for the EuroTeQ alliance to override the regular OEAPI levels                                                                                                                                                          |

eduXchange can be used by students and professionals. There are three types of students:

1. Students from alliance partner institutions
2. Students from the own institution
3. Guest students from institutions outside the alliance

The following attributes control which students can view a minor or course and what happens if they click on the "register" button.

- `targetGroup`               
- `visibleForOwnStudents`     
- `enrollmentForOwnStudents`  
- `visibleForGuests`          
- `enrollmentForGuests`       
- `enrollmentForProfessionals`

#### `source` Object Attributes

Used when one institution acts as overall coordinator for a joint program, with underlying courses at other institutions.

| Attribute     | Required | Type   | Description                                                  |
| ------------- | :------: | ------ | ------------------------------------------------------------ |
| `shortName`   |          | string | Partner ID of the source institution, e.g., `"21PE"` for LDE |
| `primaryCode` |          | string | Primary code of the source course                            |
| `uuid`        |          | string | UUID referencing the OEAPI endpoint of the source course     |

#### Example: Program/Course Consumer Object

This example reflects:
- Default visibility for `ewuu` (not visible for own students)
- Default visibility for `lde` (visible for own students, broker enrollment)

```json
{
  "consumers": [
    {
      "consumerKey": "eduxchange",
      "alliances": [
        {
          "name": "ewuu",
          "theme": "Information and Communication Technologies",
          "selection": false,
          "type": "broadening",
          "visibleForOwnStudents": false
        },
        {
          "name": "lde",
          "theme": "Information and Communication Technologies",
          "selection": false,
          "type": "deepening",
          "visibleForOwnStudents": true,
          "enrollmentForOwnStudents": "broker",
          "source": {
            "shortName": "21PE",
            "primaryCode": "WB-MI-168",
            "uuid": "123e4567-e89b-12d3-a456-123514174000"
          }
        },
        {
          "name": "euroteq",
          "theme": "Computer Science and ICT, Data, AI",
          "instructorNames": ["John Smith"],
          "modeOfDelivery": "Hybrid",
          "contactHours": 3.5,
          "activities": "lectures and practises",
          "microcredential": "standalone",
          "targetGroup": "forProfessionals"
        }
      ]
    }
  ]
}
```

---

### Consumer Object for Offerings

The structure is the same as for programs/courses: a `consumerKey` attribute and an `alliances` array.

#### Alliance object for Offerings

| Attribute                       | Required | Type         | Description                                                                                            |
| ------------------------------- | :------: | ------------ | ------------------------------------------------------------------------------------------------------ |
| `name`                          |    ✓    | string       | Alliance name. Allowed values: `"ewuu"`, `"lde"`, `"euroteq"`, `"kom"`                                  |
| `enrollmentUrl`                 |          | string (URL) | Redirect URL for own students. Required if `enrollmentForOwnStudents` in program/course is `"url"`.    |
| `enrollmentUrlForGuests`        |          | string (URL) | Redirect URL for guest students. Required if `enrollmentForGuests` in program/course is `"url"`.       |
| `enrollmentUrlForProfessionals` |          | string (URL) | Redirect URL for professionals. Required if `enrollmentForProfessionals` in program/course is `"url"`. |
| `enrollStartTime`               |          | string       | Start time of enrollment, e.g., `"13:00"`. Default: `00:00`                                            |
| `enrollEndTime`                 |          | string       | End time of enrollment, e.g., `"20:00"`. Default: `23:59`                                              |
| `dateComment`                   |          | string       | Additional date information, e.g., `"The course takes place on monday morning"`                        |
| `queuedNumberStudents`          |          | integer (≥0) | Number of students with queued enrolment state                                                         |
| `maxQueuedNumberStudents`       |          | integer (≥0) | Maximum number of students allowed in queue                                                            |
| `hasStudentQueue`               |          | boolean      | Whether enrolment uses a queue                                                                         |

When a waitlist is used for enrolment, these attributes communicate this in the offering. Options:
- **Unlimited queue**: Set `hasStudentQueue` to `true`
- **Limited queue**: Set `maxQueuedNumberStudents > 0`; remaining queue length = `maxQueuedNumberStudents - queuedNumberStudents`

*Note: The queue only comes into effect when there are no regular available places.*

#### Example: Offering Consumer Object

```json
{
  "consumers": [
    {
      "consumerKey": "eduxchange",
      "alliances": [
        {
          "name": "ewuu",
          "enrollmentUrl": "https://www.my-url.nl/",
          "enrollStartTime": "13:00",
          "enrollEndTime": "20:00",
          "dateComment": "This time is in ECT and the course takes place on Monday morning."
        }
      ]
    }
  ]
}
```

---

## Student Registration Consumer Objects

### GET /persons/me

#### Required OEAPI Attributes for Persons (Students)

| Attribute          | Required |
| ------------------ | :------: |
| `personId`         |    ✓    |
| `primaryCode`      |    ✓    |
| `givenName`        |    ✓    |
| `surname`          |    ✓    |
| `displayName`      |    ✓    |
| `activeEnrollment` |    ✓    |
| `affiliations`     |    ✓    |
| `mail`             |    ✓    |
| `otherCodes`       |    ✓    |
| `consumers`        |    ✓    |

!> For eduxchange.nl the following applies: the response to `GET /persons/me` needs to include a `studielinkNumber` to facilitate deduplication. This is achieved by adding an extra object in the `otherCodes` array of Person:

```json
{
  "otherCodes": [
    {
      "codeType": "studielinkNumber",
      "code": "12345678"
    },
    ...
  ],
  ...
}
```

### Consumer Object for Persons

To be compatible with the registering process of the `broker` after the 'register' button is pressed in the eduXchange frontend, implement the following consumer object on the Persons object.

#### Person Consumer Attributes

| Attribute             | Required | Type   | Description                                                     |
| --------------------- | :------: | ------ | --------------------------------------------------------------- |
| `consumerKey`         |    ✓    | string | Always `"eduxchange"`                                           |
| `enrollments`         |    ✓    | array  | Array of CROHO enrollment objects (see below)                   |
| `institutionBRINCode` |    ✓    | string | BRIN code of the institution (two digits + two capital letters) |

#### Enrollments object

| Attribute        | Required | Type   | Description                                                                     |
| ---------------- | :------: | ------ | ------------------------------------------------------------------------------- |
| `crohoCreboCode` |    ✓    | string | CROHO/CREBO code for the program (5 characters), e.g., `"34401"`                |
| `name`           |    ✓    | string | Name of the program                                                             |
| `phase`          |          | string | Program phase. Allowed values: `"bachelor"`, `"master"`                         |
| `modeOfStudy`    |          | string | Allowed values: `"full-time"`, `"part-time"`, `"dual training"`, `"self-paced"` |
| `startDate`      |          | string | Start date (RFC3099 full-date format)                                           |
| `endDate`        |          | string | End date (RFC3099 full-date format)                                             |

#### Example: Person Consumer Object

```json
{
  "consumers": [
    {
      "consumerKey": "eduxchange",
      "enrollments": [
        {
          "crohoCreboCode": "34401",
          "name": "B Bedrijfseconomie",
          "phase": "bachelor",
          "modeOfStudy": "full-time",
          "startDate": "2020-09-01",
          "endDate": "2021-08-31"
        }
      ],
      "institutionBRINCode": "11AA"
    }
  ]
}
```

### POST /associations/external/me

!> For home institutions to get a full overview of the course a student is trying to enroll in, `POST /associations/external/me` needs to have the `courseOffering` or `programOffering` expanded.

#### State and RemoteState

| Field         | Description                                                                                                                                                                                                                      |
| ------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `remoteState` | Initial state of the Guest institution. From the Home institution's perspective, the Guest's state is the remoteState.                                                                                                           |
| `state`       | Mandatory in OEAPI. During the initial POST, the Guest cannot know the Home's state, so set to `associated` (without real meaning at this stage). The Home institution responds with their initial `state` in the HTTP response. |

#### Association States

| State        | Description                                            |
| ------------ | ------------------------------------------------------ |
| `pending`    | Process is waiting on the status of the institution    |
| `associated` | Student is enrolled in the learning activity           |
| `canceled`   | Canceled by student                                    |
| `denied`     | Learning activity is stopped or student is not allowed |
| `queued`     | Student is put on a waiting list                       |

---

## Agreements per Alliance

An alliance is a partnership between two or more institutions that agreed to exchange student information using eduXchange. To refer to partners in an alliance, a list of partner codes is specified.

Some attributes in OEAPI can have multiple values. It is recommended that all participants within an alliance agree on the use of these values. This results in an unambiguous list on the frontend for students.

### EWUU Alliance

| Partner                            | Code  |
| ---------------------------------- | ----- |
| Utrecht University                 | `uu`  |
| Wageningen University              | `wur` |
| Eindhoven University of Technology | `tue` |

### LDE Alliance

| Partner                        | Code   |
| ------------------------------ | ------ |
| Erasmus University Rotterdam   | `21PE` |
| Delft University of Technology | `21PF` |
| Leiden University              | `21PB` |

#### LDE Themes

Participants agreed to use CROHO themes in the `theme` attribute of the consumer object:

| Code | Theme                               |
| ---- | ----------------------------------- |
| 10   | Interdisciplinary                   |
| 11   | Economics                           |
| 12   | Behaviour and society               |
| 13   | Health care                         |
| 14   | Agriculture and natural environment |
| 15   | Nature                              |
| 16   | Educations                          |
| 17   | Law                                 |
| 18   | Language and culture                |
| 19   | Technology                          |

### KOM Alliance (Kies op Maat)

!> For KOM, providing courses is optional. Minors (programs) are required, but underlying courses do not need to be exposed.

#### KOM Partner Codes

*To be determined.*

#### KOM Themes

*To be determined.*

#### KOM Price Information

For KOM, the `priceInformation` attribute on offerings is used to display additional costs for a minor. Use the following structure:

```json
{
  "priceInformation": [
    {
      "costType": "additional costs",
      "displayAmount": "€150",
      "ext": {
        "description": [
          { "language": "nl-NL", "value": "Materiaalkosten" },
          { "language": "en-GB", "value": "Material costs" }
        ]
      }
    }
  ]
}
```

| Field                  | Description                                      |
| ---------------------- | ------------------------------------------------ |
| `costType`             | Use `"additional costs"` for KOM                 |
| `displayAmount`        | Formatted price string, e.g., `"€150"`           |
| `ext.description`      | Multilingual description of the additional costs |

---

### EuroTeQ Alliance

The additional parameter `alliances.name=euroteq` is added to all requests done by the eduXchange frontend.

| Partner                            | Code       |
| ---------------------------------- | ---------- |
| Eindhoven University of Technology | `tue`      |
| Tallinn University of Technology   | `taltech`  |
| Technical University of Denmark    | `dtu`      |
| École Polytechnique                | `lx`       |
| Czech Technical University         | `ctu`      |
| Technical University of Munich     | `tum`      |
| Technion                           | `technion` |
| EPFL                               | `epfl`     |

#### EuroTeq Themes

| Theme                                         |
| --------------------------------------------- |
| Architecture and Construction                 |
| Business and Economics                        |
| Chemical Engineering                          |
| Chemistry and Biology                         |
| Computer Science and ICT, Data, AI            |
| Electrical Engineering                        |
| Entrepreneurship                              |
| Food and Health Sciences, Medical engineering |
| Languages and Culture                         |
| Manufacturing and Processing                  |
| Mathematics and Statistics                    |
| Mechanical Engineering                        |
| Physics and Energy                            |
| Transport                                     |
| Other subject area                            |

#### EuroTeq Mode of Delivery

The mode of delivery values differ from standard OEAPI options. These values need to be specified in the consumer attribute:

| Value                         | Description                                                                                                                    |
| ----------------------------- | ------------------------------------------------------------------------------------------------------------------------------ |
| `Online - at a specific time` | Synchronous online delivery                                                                                                    |
| `Online - time-independent`   | Asynchronous online delivery                                                                                                   |
| `Hybrid`                      | EuroTeQ students attend online, local students attend on campus                                                                |
| `Blended`                     | Course is largely online for all students, but may include face-to-face elements requiring travel (e.g., lab work, final exam) |

#### EuroTeQ Level

| Value      |
| ---------- |
| `Bachelor` |
| `Master`   |
| `Doctoral` |



