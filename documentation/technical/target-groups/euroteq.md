# EuroTeQ targetGroup definition

## Required requests

To be compatible with OOAPI V4 and eduXchange v1, an institution within the EuroTeQ
alliance must implement the following requests:

* `GET /organisations`
* `GET /organisations?type=root`
* `GET /organisations/{organisationId}`
* `GET /organisations/{organisationId}/courses`
* `GET /courses`
* `GET /courses/{courseId}`
* `GET /courses/{courseId}/offerings`
* `GET /offerings/{offeringId}`
* `GET /academic-sessions`
* `GET /academic-sessions/{academicSessionId}`
* `GET /academic-sessions/{academicSessionId}/offerings`

## Parameters used

!> The general `pageSize` parameter must be supported.

!> For `/organisations`, the `type=root` parameter must be supported.

!> For `/course/{ID}`, the `expand=coordinator` and `expand=organisation` parameters
must be supported.

!> To select educational information intended for eduXchange, eduXchange will always
append the query parameter `targetgroup=euroteq` to every call.

## Agreements on language use

Some attributes in OOAPI can have multiple values. It is recommended that all
participants agree on the use of these values. This results in an unambiguous list on
the front end.

### Level attribute of a course

For the level attribute of a course, the participants agreed to use:

- Bachelor
- Master
- Doctoral

## Extension objects

Extension objects are used to supply the eduXchange front end with additional
information that is not specified in the OOAPI V4 specification.

### Course extension

When eduXchange requests courses and the query parameter `targetgroup` is set to
`euroteq`, only courses intended for EuroTeQ should be returned.

In addition, the targetGroup extension object should be added to the course object.
The ext object for eduXchange courses has the following attributes:

* `targetGroup`: an array of target groups for all alliances this course is offered
  within. Each targetGroup is an object with the following attributes:
  * `name`: (required) the name of the alliance. Allowed values: `"euroteq"`
  * `theme`: the theme of the course within the alliance. Allowed values:
    * `"Architecture and Construction"`
    * `"Business and Economics"`
    * `"Chemistry and Biology"`
    * `"Computer Science and ICT, Data, AI"`
    * `"Electrical Engineering"`
    * `"Entrepreneurship"`
    * `"Food and Health Sciences, Medical engineering"`
    * `"Languages and Culture"`
    * `"Manufacturing and Processing"`
    * `"Mathematics and Statistics"`
    * `"Mechanical Engineering"`
    * `"Physics and Energy"`
    * `"Transport"`
    * `"Other subject area"`
  * `instructorNames`: an array containing the names of all instructors, for example
    `["instructor name", "instructor name"]`
  * `contactHours`: a float indicating the number of contact hours, for example `3.5`
  * `modeOfDelivery`: the mode of delivery specific to this alliance. Allowed values:
    * `"Online - at a specific time"`
    * `"Online - time-independent"`
    * `"Hybrid"`: EuroTeQ students attend online, local students attend on campus.
    * `"Blended"`: the course is largely online for all students, but may include
      face-to-face elements that require travelling, for example lab work or a final
      exam.
  * `activities`: a string describing the activities that take place in the course,
    for example `"lectures and practices"`

**Example**

This is an example of the extension object for eduXchange courses.

```json
{
  "ext": {
    "targetGroup": [{
      "name": "euroteq",
      "theme": "Computer Science and ICT, Data, AI",
      "instructorNames": ["John Smith"],
      "contactHours": 3.5,
      "modeOfDelivery": "Hybrid",
      "activities": "lectures and practices"
    }]
  }
}
