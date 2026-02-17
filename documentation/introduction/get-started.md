# Steps to implement an OEAPI endpoint

The OEAPI itself is not an API that can be used out of the box. There
are several implementations of the API, but the OEAPI itself, as it
appears in the GitHub repository, is not a queryable API. It is merely
a starting point on your journey to expose your institutional
information to other parties.

The OEAPI repository provides insights into the data model and the
proposed endpoints. Most of these endpoints are based on GET methods,
as this is currently the method used in most use cases. If you would
like to add new methods or propose additional attributes, please feel
free to contact the OEAPI Technical Working Group.

This page provides four steps that you can take to start implementing
your own OEAPI endpoint.

1. Data modelling locating authoritative sources and determining the
   scope of the OEAPI endpoint, mainly at the level of entities.  

The first step is to determine which OEAPI endpoints you would like to
expose. This determines the data sources that need to be identified.
Once this choice has been made, the source or sources that can act as
the authoritative source for the specific data can be identified and a
global match can be made between the OEAPI data objects and the objects
in the data source or sources.

2. Designing the endpoint using a single source, ESB, etc.  
  
  Depending on the number of data sources and the possibility of joining,
aggregating, patching or using other methods to enable certain use
cases, a decision needs to be made regarding the flow of information to
and from the endpoint. This data flow determines the design of the
endpoint.  
  
  For example, is it possible to source all data from one system, or do
we need to retrieve information from several systems? Does data need to
flow back into one system, or will it be distributed? Will there be
data security on the API based on trust between systems, or trust based
on individual interactions?

3. Detailed information mapping at the level of individual attributes.  
  
  Once the choices regarding interaction have been made, a more detailed
mapping of the data can take place to ensure that all required data can
be made available and appropriately translated.

4. Technical realisation.  
  
  The final step is the actual technical implementation of the selected
endpoints and methods.
