# About identifiers

## UUIDs
Each resource specified in OOAPI has an identifier in the form of a [UUID (Universally unique identifier)](https://en.wikipedia.org/wiki/Universally_unique_identifier), the attribute name for this identifier is `Id` prefixed with the name of the resource, e.g. `programmeId`. Using UUIDs guarantees that all identifiers are globally unique. The id's for resources should be stable.

OOAPI recommends using version 4 UUIDs (random). We strongly advise institutions and suppliers implementing OOAPI to make sure their UUIDs are properly generated  using enough randomness.

## Primary codes
Most institutions already have their own unique, often human-readable, identifiers or codes for resources. Such codes can be communicated using the `primaryCode` attribute. If no primary code is available for a resource, the `primaryCode` attribute can be filled with the UUID used as the resource id.

## Other codes
Besides the identifier and primary code, resources or entities may also be known by other codes. These codes can be communicated using the `otherCodes` attribute, which is an array of "Identifier Entries". Each entry consists of a `codeType`, which indicates what kind of code it is and a `code` containing the actual code.

The following `codeTypes` are available:

| Code                      | Description                                                       |
|---------------------------|-------------------------------------------------------------------|
| `account_id`              | Identifier for an account.                                        |
| `bag_id`                  | Identifier for a building in the Dutch Building and Address       |
|                           | Registry (BAG).                                                   |
| `building_id`             | Identifier for a building.                                        |
| `component_code`          | Identifier for a component (part of a course).                    |
| `eckid`                   | Identifier assigned within the Dutch *Educatieve ContentKeten iD* |
|                           | framework. It enables persistent identification and exchange of   |
|                           | digital learning resources within the Dutch educational sector for|
|                           | EQF levels 1, 2, 3 and 4. Comparable international approaches     |
|                           | include LRMI, DOI and Handle                                      |
|                           | identifiers for learning resources.                               |
| `email_address`           | An email address.                                                 |
| `esi`                     | European Student Identifier.                                      |
| `group_code`              | Identifier for a group of people.                                 |
| `group_type_code`         | Identifier for the type of group.                                 |
| `identifier`              | Generic identifier.                                               |
| `institution_code`        | Registration number of an educational institution. In the         |
|                           | Netherlands, the former BRIN code has been replaced by the        |
|                           | institution code, issued by the Ministry of Education, Culture    |
|                           | and Science (OCW).                                                |
| `isbn`                    | International Standard Book Number (for books).                   |
| `issn`                    | International Standard Serial Number (for periodicals).           |
| `kvk_organisation_id`     | Identifier for a KvK (Dutch Chamber of Commerce) registered       |
|                           | organisation.                                                     |
| `kvk_establishment_id`    | Identifier for a specific establishment of a KvK                  |
|                           | (Dutch Chamber of Commerce) registered organisation.              |
| `leerbedrijf_id`          | Dutch registration/accreditation id for organisations offering    |
|                           | internships for vocational education students.                    |
| `national_identity_number`| Government-assigned personal identifier (e.g. NI number in the UK,|
|                           | or *personnummer* in Sweden).                                     |
| `offering_code`           | Identifier for a specific offering (programme, course or          |
|                           | component).                                                       |
| `organisation_id`         | Identifier for an organisation.                                   |
| `orcid`                   | Open Researcher and Contributor ID.                               |
| `product_id`              | Identifier for a product.                                         |
| `programme_code`          | Identifier of a programme (a recognised collection of courses).   |
|                           | In the Netherlands, the former CREBO and CROHO codes have been    |
|                           | replaced by the programme code as registered in RIO, under the    |
|                           | authority of OCW.                                                 |
| `room_code`               | Identifier for a room.                                            |
| `schac_home`              | Home organisation represented by its domain name.                 |
| `student_number`          | Identifier for a student.                                         |
| `studielink_number`       | Identifier assigned to a student by Studielink (Dutch central     |
|                           | enrolment system).                                                |
| `system_id`               | Identifier used within a specific system.                         |
| `username`                | User login name.                                                  |
| `uuid`                    | Universally unique identifier.                                    |

Since `codeType` is an extensible enumeration, implementations may add their own `codeTypes`, as long as they are prefixed with "x-".
