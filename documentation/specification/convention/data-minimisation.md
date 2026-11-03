# Data minimisation

The API follows the principle of data minimisation, ensuring that only the
minimum necessary data is shared with each API client. This approach reduces
unnecessary data transfer and limits exposure of information.

Within the standard, data minimisation is applied for data-usage optimisation.
In this case the API client has access to data within the API, but is not
interested in all information with every API call and it is not necessary to
transmit all data. This is supported via field selection.

## Data minimisation via field selection

Data minimisation is a core principle: the API should provide only the data
necessary for a given request.

To support both data minimisation and performance optimisation, the API can
optionally allow clients to indicate which fields they are interested in.

This can be implemented using the `fields` query parameter. Through this
approach, a client can express which fields it wants the server to return in
the response.

Use and support of this functionality is introduced in v6 and is optional.
It is not a mandatory feature.

A server can indicate support for the `fields` parameter via the service
endpoint. If an endpoint does not support the `fields` parameter and a request
is made using it, the server must return an error following the OEAPI error
model.

*Important:* This is a request hint, *not* a security feature. The server
always determines the final response shape within the data scope available to
the client.

If field selection is implemented, the client can explicitly determine the
subset of fields it wants to receive via the `fields` query parameter.

If no `fields` parameter is used, the server returns all fields the client is
allowed to receive.

If the client makes a selection, the server returns the mandatory fields and,
if applicable, the additional requested fields.

*Please note:* This approach also applies to consumer objects, extension
objects (`ext`) and expanded objects. If the client wants to limit the returned
payload on these objects, the `fields` parameter can be used to indicate which
fields it expects to be returned.

Below are three examples to demonstrate the use of the `fields` parameter if
this is supported.

1. Use of the `fields` query parameter to minimise data fields
2. Use of the `fields` query parameter to receive only required fields
3. Use of the `fields` query parameter together with `expand`

## Example 1: Use of the fields query parameter to minimise data fields

`GET /persons/me` will provide:

```json
{
  "personId": "123e4567-e89b-12d3-a456-426614174000",
  "primaryCode": {
    "codeType": "identifier",
    "code": "1234qwe12"
  },
  "givenName": "Martina",
  "alternateName": "Marieke",
  "preferredName": "Maartje",
  "surnamePrefix": "van",
  "surname": "Damme",
  "displayName": "Maartje van Damme",
  "initials": "MCW",
  "idCheckName": "van der Graaf, Jacobus Adrianus, s12345678",
  "activeEnrolment": false,
  "dateOfBirth": "2003-09-30",
  "cityOfBirth": "Utrecht",
  "countryOfBirth": {
    "iso3166-1-alpha2": "NL",
    "iso3166-1-alpha3": "NLD"
  },
  "nationality": {
    "iso3166-1-alpha2": "NL",
    "iso3166-1-alpha3": "NLD"
  },
  "dateOfNationality": "2003-09-30",
  "affiliations": [
    "student"
  ],
  "email": "vandamme.mcw@universiteitvanharderwijk.nl",
  "secondaryEmail": "poekie@xyz.nl",
  "telephoneNumber": "+31 123 456 789",
  "mobileNumber": "+31 612 345 678",
  "photoSocial": "https://example.org/photo-social.jpg",
  "photoOfficial": "https://example.org/photo-official.jpg",
  "gender": "f",
  "titlePrefix": "drs",
  "titleSuffix": "BSc",
  "office": "Zernikecomplex",
  "address": {
    "addressType": "postal",
    "street": "Moreelsepark",
    "streetNumber": "48",
    "additional": [
      {
        "language": "en-GB",
        "value": "On the other side of the road"
      }
    ],
    "postCode": "3511 EP",
    "city": "Utrecht",
    "countryCode": {
      "iso3166-1-alpha2": "NL",
      "iso3166-1-alpha3": "NLD"
    },
    "geolocation": {
      "latitude": 52.089123,
      "longitude": 5.113337
    },
    "ext": {}
  },
  "ICEName": "Janne",
  "ICEPhoneNumber": "+31 623 456 789",
  "ICERelation": "partner",
  "languageOfChoice": [
    "nl-NL"
  ],
  "otherCodes": [
    {
      "codeType": "nationalIdentityNumber",
      "code": "00000"
    }
  ],
  "assignedNeeds": [
    {
      "code": "ExtraTimeOnlyMaths25%",
      "description": [
        {
          "language": "en-GB",
          "value": "Extra time for Maths tests shown in a percentile of the overall time of a test"
        }
      ],
      "startDateTime": "2025-05-30T20:00:00+01:00",
      "endDateTime": "2025-07-30T20:00:00+01:00"
    }
  ],
  "consumer": {
    "consumerKey": "x-test-consumer",
    "exampleProperty": "custom"
  },
  "ext": {}
}
```

If not all returned information is required or desired by the client, the
`fields` query parameter can be used to reduce the information returned by the
server.

For example, the following request:

```http
GET /persons/me?fields=(alternateName,surnamePrefix,preferredName,assignedNeeds(code,description))
```

This will return all required fields and the specified fields. In this example,
the response includes the required person fields and the requested name fields,
together with the requested fields from the `assignedNeeds` object. This limits
the amount of data being shared:

```json
{
  "personId": "123e4567-e89b-12d3-a456-426614174000",
  "primaryCode": {
    "codeType": "identifier",
    "code": "1234qwe12"
  },
  "alternateName": "Marieke",
  "preferredName": "Maartje",
  "surnamePrefix": "van",
  "surname": "Damme",
  "activeEnrolment": false,
  "assignedNeeds": [
    {
      "code": "ExtraTimeOnlyMaths25%",
      "description": [
        {
          "language": "en-GB",
          "value": "Extra time for Maths tests shown in a percentile of the overall time of a test"
        }
      ]
    }
  ]
}
```

## Example 2: Use of the fields query parameter to receive only required fields

If the client wants to retrieve only the most minimal set of attributes, this
can be achieved by using the `fields` parameter.

For example, the following request:

```http
GET /persons/me?fields=email
```

This returns the required attributes and the requested `email` field:

```json
{
  "personId": "123e4567-e89b-12d3-a456-426614174000",
  "primaryCode": {
    "codeType": "identifier",
    "code": "1234qwe12"
  },
  "surname": "Damme",
  "activeEnrolment": false,
  "email": "vandamme.mcw@universiteitvanharderwijk.nl"
}
```

## Example 3: Use of the fields query parameter together with expand

Clients can also minimise the amount of information returned from the server
when the `expand` parameter is used.

For example, the following call expands the `person` object:

```http
GET /test-component-offering-associations/{testComponentOfferingAssociationId}?expand=person
```

This will provide the association with the expanded `person` object:

```json
{
  "associationId": "123e4567-e89b-12d3-a456-426614174000",
  "role": "student",
  "startDateTime": "2025-01-01T08:30:00+01:00",
  "expectedEndDateTime": "2025-10-25T08:30:00+01:00",
  "actualEndDateTime": "2025-10-23T08:30:00+01:00",
  "state": "associated",
  "remoteState": "associated",
  "consumer": {
    "consumerKey": "x-test-consumer",
    "exampleProperty": "custom"
  },
  "ext": {},
  "extraDuration": "PT20M",
  "requiredPersonalNeeds": [
    "extra_time"
  ],
  "attempt": 2,
  "attendance": "present",
  "irregularities": [
    "late_submission"
  ],
  "documents": [
    {
      "documentId": "12345678-1234-1234-1234-123456789012",
      "documentType": "test_made",
      "documentName": "paper_test_1234333.pdf"
    }
  ],
  "result": {
    "state": "completed",
    "pass": "passed",
    "comment": "Strong performance overall, only minor calculation errors in section 3.",
    "score": "9",
    "rawScore": 72,
    "maxRawScore": 80,
    "final": true,
    "assessorId": "123e4567-e89b-12d3-a456-426614174000",
    "resultDateTime": "2025-11-28T08:30:00+01:00",
    "documents": [
      {
        "documentId": "12345678-1234-1234-1234-123456789012",
        "documentType": "test_made",
        "documentName": "paper_test_1234333.pdf"
      }
    ],
    "consumer": {
      "consumerKey": "x-test-consumer",
      "exampleProperty": "custom"
    },
    "ext": {},
    "weight": 100
  },
  "person": {
    "personId": "05035972-0619-4d0b-8a09-7bdb6eee5e6d",
    "primaryCode": {
      "codeType": "identifier",
      "code": "s12345678"
    },
    "givenName": "Martina",
    "alternateName": "Marieke",
    "preferredName": "Maartje",
    "surnamePrefix": "van",
    "surname": "Damme",
    "displayName": "Maartje van Damme",
    "initials": "MCW",
    "idCheckName": "van der Graaf, Jacobus Adrianus, s12345678",
    "activeEnrolment": false,
    "dateOfBirth": "2003-09-30",
    "cityOfBirth": "Utrecht",
    "countryOfBirth": {
      "iso3166-1-alpha2": "NL",
      "iso3166-1-alpha3": "NLD"
    },
    "nationality": {
      "iso3166-1-alpha2": "NL",
      "iso3166-1-alpha3": "NLD"
    },
    "dateOfNationality": "2003-09-30",
    "affiliations": [
      "student"
    ],
    "email": "vandamme.mcw@universiteitvanharderwijk.nl",
    "secondaryEmail": "poekie@xyz.nl",
    "telephoneNumber": "+31 123 456 789",
    "mobileNumber": "+31 612 345 678",
    "photoSocial": "https://example.org/photo-social.jpg",
    "photoOfficial": "https://example.org/photo-official.jpg",
    "gender": "f",
    "titlePrefix": "drs",
    "titleSuffix": "BSc",
    "office": "Zernikecomplex",
    "address": {
      "addressType": "postal",
      "street": "Moreelsepark",
      "streetNumber": "48",
      "additional": [
        {
          "language": "en-GB",
          "value": "On the other side of the road"
        }
      ],
      "postCode": "3511 EP",
      "city": "Utrecht",
      "countryCode": {
        "iso3166-1-alpha2": "NL",
        "iso3166-1-alpha3": "NLD"
      },
      "geolocation": {
        "latitude": 52.089123,
        "longitude": 5.113337
      },
      "ext": {}
    },
    "ICEName": "Janne",
    "ICEPhoneNumber": "+31 623 456 789",
    "ICERelation": "partner",
    "languageOfChoice": [
      "nl-NL"
    ],
    "otherCodes": [
      {
        "codeType": "nationalIdentityNumber",
        "code": "00000"
      }
    ],
    "assignedNeeds": [
      {
        "code": "ExtraTimeOnlyMaths25%",
        "description": [
          {
            "language": "en-GB",
            "value": "Extra time for Maths tests shown in a percentile of the overall time of a test"
          }
        ],
        "startDateTime": "2025-05-30T20:00:00+01:00",
        "endDateTime": "2025-07-30T20:00:00+01:00"
      }
    ],
    "consumer": {
      "consumerKey": "x-test-consumer",
      "exampleProperty": "custom"
    },
    "ext": {}
  },
  "testComponentOfferingId": "123e4567-e89b-12d3-a456-426614174000"
}
```

To minimise the response for this request, the `fields` query parameter can
also be used.

An example to limit the data is the following call:

```http
GET /test-component-offering-associations/{testComponentOfferingAssociationId}?expand=person&fields=(remoteState,documents(documentName),ext,person(email,secondaryEmail,ext))
```

The `expand` parameter determines that the `person` object is included. The
`fields` parameter determines which fields are returned from the association
and from the expanded `person` object.

Because `Document` has required fields in v6, the mandatory `documentId` and
`documentType` fields remain present, even when only `documentName` is
requested.

This will return the mandatory fields and the specified fields and reduces the
response data:

```json
{
  "associationId": "123e4567-e89b-12d3-a456-426614174000",
  "role": "student",
  "state": "associated",
  "remoteState": "associated",
  "ext": {},
  "documents": [
    {
      "documentId": "12345678-1234-1234-1234-123456789012",
      "documentType": "test_made",
      "documentName": "paper_test_1234333.pdf"
    }
  ],
  "person": {
    "personId": "05035972-0619-4d0b-8a09-7bdb6eee5e6d",
    "primaryCode": {
      "codeType": "identifier",
      "code": "s12345678"
    },
    "surname": "Damme",
    "activeEnrolment": false,
    "email": "vandamme.mcw@universiteitvanharderwijk.nl",
    "secondaryEmail": "poekie@xyz.nl",
    "ext": {}
  },
  "testComponentOfferingId": "123e4567-e89b-12d3-a456-426614174000"
}
```
