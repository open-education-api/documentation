# Enumerations
Enumerations play a crucial role in the standard, as they offer a defined set of values that promote consistency, clarity, and reusability throughout its implementation. By using enumerations, developers and users can ensure that they are working with a controlled vocabulary, which helps to avoid ambiguity and misinterpretation of data.  

All enumerations within the standard are defined as extensible. At first glance, this may appear to contradict the primary objective of standardisation, which is to create uniformity and consistency. However, the decision to allow extensibility has been made for a specific purpose: it enables the standard to adapt and evolve over time. This flexibility allows for the incorporation of new values as requirements change or as new use cases emerge, ensuring that the standard remains relevant and useful in a dynamic environment. By balancing the need for a controlled set of values with the ability to extend those values, the standard can achieve both stability and adaptability.

## Extensible enumerations disclaimer
While we prefer to use clearly defined enumerations in the specification for standardisation purposes, we do support extensible enumerations to minimise the need for major releases when enumeration changes are required. This support provides flexibility to users of the specification but does require additional agreements between parties when using such extensions. This in turn reduces the OOAPI out-of-the-box usage. Therefore, the use of extensible enumerations should be limited. We strongly recommend using the predefined enumeration list by default.
 
## Extensible enumerations based on external vocabulary disclaimer
For enumerations that use an external vocabulary, we strongly discourage extending the enumeration and recommend using only the values defined by the referenced external vocabulary. The rationale for this recommendation: the use of extensible enumerations would be conflicting with adherence to the original vocabulary and reduce interoperability. However, support for extensible enumerations is supported in those cases where an addition is based on planned extensions to the external vocabulary that are not yet officially supported.


## Extending an enumeration
If an enumeration is extended these additional values must be prefixed with  `x-`. This helps to distinguish custom values from the standard ones, ensuring clarity and reducing the risk of conflicts. 
