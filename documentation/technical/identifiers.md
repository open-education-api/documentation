# About identifiers

## UUIDs

Each resource specified in OEAPI has an identifier in the form of a
[UUID (Universally unique identifier)](https://en.wikipedia.org/wiki/Universally_unique_identifier).
The attribute name for this identifier is `Id` prefixed with the name of the
resource, for example `programmeId`.

Using UUIDs guarantees that all identifiers are globally unique. The
identifiers for resources should be stable.

OEAPI recommends using version 4 UUIDs (random). Institutions and suppliers
implementing OEAPI should ensure that UUIDs are properly generated using
sufficient randomness.

## Primary codes

Most institutions already have their own unique, often human-readable,
identifiers or codes for resources. Such codes can be communicated using the
`primaryCode` attribute.

The `primaryCode` attribute contains an `IdentifierEntry` object. If no primary
code is available for a resource, the `primaryCode` attribute may contain the
UUID used as the resource identifier.

## Other codes

Besides the identifier and primary code, resources or entities may also be
known by other codes. These codes can be communicated using the `otherCodes`
attribute, which is an array of `IdentifierEntry` objects.

Each `IdentifierEntry` consists of:

1. `codeType`, which indicates the kind of code
2. `code`, containing the actual code

The following predefined `codeType` values are available:

| Code                       | Description                                                       |
|----------------------------|-------------------------------------------------------------------|
| `account_id`               | Identifier for an account.                                        |
| `bag_id`                   | Identifier for a building in the Dutch Building and Address       |
|                            | Registry (BAG).                                                   |
| `building_id`              | Identifier for a building.                                        |
| `component_code`           | Identifier for a component (part of a course).                    |
| `eckid`                    | Identifier assigned within the Dutch *Educatieve ContentKeten iD* |
|                            | framework. It enables persistent identification and exchange of   |
|                            | digital learning resources within the Dutch educational sector    |
|                            | for EQF levels 1, 2, 3 and 4. Comparable international approaches |
|                            | include LRMI, DOI and Handle identifiers for learning resources.  |
| `email_address`            | An email address.                                                 |
| `esi`                      | European Student Identifier.                                      |
| `group_code`               | Identifier for a group of people.                                 |
| `group_type_code`          | Identifier for the type of group.                                 |
| `identifier`               | Generic identifier.                                               |
| `institution_code`         | Registration number of an educational institution. In the         |
|                            | Netherlands, the former BRIN code has been replaced by the        |
|                            | institution code, issued by the Ministry of Education, Culture    |
|                            | and Science (OCW).                                                |
| `isbn`                     | International Standard Book Number (for books).                   |
| `issn`                     | International Standard Serial Number (for periodicals).           |
| `kvk_organisation_id`      | Identifier for a KvK (Dutch Chamber of Commerce) registered       |
|                            | organisation.                                                     |
| `kvk_establishment_id`     | Identifier for a specific establishment of a KvK                  |
|                            | (Dutch Chamber of Commerce) registered organisation.              |
| `leerbedrijf_id`           | Dutch registration or accreditation identifier for organisations  |
|                            | offering internships for vocational education students.           |
| `national_identity_number` | Government-assigned personal identifier (for example NI number in |
|                            | the UK or *personnummer* in Sweden).                              |
| `offering_code`            | Identifier for a specific offering (programme, course or          |
|                            | component).                                                       |
| `organisation_id`          | Identifier for an organisation.                                   |
| `orcid`                    | Open Researcher and Contributor ID.                               |
| `product_id`               | Identifier for a product.                                         |
| `programme_code`           | Identifier of a programme (a recognised collection of courses).   |
|                            | In the Netherlands, the former CREBO and CROHO codes have been    |
|                            | replaced by the programme code as registered in RIO, under the    |
|                            | authority of OCW.                                                 |
| `room_code`                | Identifier for a room.                                            |
| `schac_home`               | Home organisation represented by its domain name.                 |
| `student_number`           | Identifier for a student.                                         |
| `studielink_number`        | Identifier assigned to a student by Studielink (Dutch central     |
|                            | enrolment system).                                                |
| `system_id`                | Identifier used within a specific system.                         |
| `username`                 | User login name.                                                  |
| `uuid`                     | Universally unique identifier.                                    |

`codeType` is an extensible enumeration. Implementations may add their own
`codeType` values, provided they are prefixed with `x-`.
