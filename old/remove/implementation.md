# Steps to implement an OEAPI endpoint

The OEAPI itself is not an API that can be used out of the box. There are
several implementations of the API, but OEAPI itself, as defined in the
GitHub repository, is not a queryable API. It is merely a starting point on
your journey to expose your institutional information to other parties. The
OEAPI repository provides you with insights into the data model and proposed
endpoints. Most of these endpoints use the GET method, as this is currently
the method most commonly used in use cases. If you wish to add new methods or
propose additional attributes, please feel free to contact the OEAPI Technical
Working Group.

This page provides you, the reader, with four steps that you can take to start
implementing your own OEAPI endpoint.

1. Data modelling (locating authoritative sources, determining the scope of
   the OEAPI endpoint), mainly on the level of entities.

   The first step is to determine which OEAPI endpoints you would like to
   expose. This determines the data sources that need to be found. When the
   choice has been made, the source or sources that can act as a source of
   truth for the specific data can be identified and a mapping can be made
   between the OEAPI data objects and the objects in the data source(s).

2. Designing the endpoint (using a single source, ESB, etc)

   Depending on the number of data sources and the possibility of joining,
   aggregating, patching or using other methods needed to enable certain use
   cases, a decision needs to be made on the flow of information to and from
   the endpoint. This data flow determines the design of the endpoint. For
   example, is it possible to source all data from one system or do we need to
   retrieve information from several systems? Do we need data to flow back
   into one system or will it be distributed? Will there be data security on
   the API based on trust between systems or trust at the level of individual
   interactions?

3. Detailed information mapping, at the level of individual attributes.

   Once the interaction choices have been made, a further detailed mapping of
   the data can take place to ensure all the data needed can be made available
   and translated.

4. Technical realisation.

   The final step is to carry out the technical implementation of the selected
   endpoints and methods.
