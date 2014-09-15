---
title: Add a new API Resource
template: layout.jade
subsectionIndex: 3
private: true
---

API resources are described using the [RAML specification][raml-spec]. RAML
uses the YAML format which is sensitive to indentation. A simple resource in
RAML would look like the following:

```yaml
/myResource:
  description: This is my resource
  post:
    description: Create a resource
    body:
      application/json:
        example: { "name" : "myResource" }
    responses:
      201:
        body:
          application/json:
            example: { "id" : 1, "name" : "myResource" }
 
  /{myResourceId}:
    get:
      description: Retrieve a resource
      responses:
        200:
          body:
            application/json:
              example: { "id" : 1, "name" : "myResource" }
        404:
          description: The resource was not found.
```

RAML files are located under the `src/api/raml` folder. Each folder represents 
a resource, subfolders represent subresources.


### Traits

Traits are a feature of the RAML spec which allows to factorise some operation definitions. An API operation can "use" a trait and will automatically be enriched with the definitions associated to the trait. Currently there is one trait defined:

 - **Private**: This is just a marker that results in the resource not being rendered on the public site (see [Private vs. public content](../private-content) section).
   
   
Using a trait:

```yaml
/applications
  ...
  get:
    is: [private]
    ...
    responses:
      200:
        body:
          application/json:
            example: !include application-retrieveAll-res.sample
```

Notice that if you re-define a response code which is already defined in a 
used trait, your definition will override the definition in the trait. This is
not recommended as it reduces the consistency of the documentation... only do 
it if really necessary.


[raml-spec]: https://lotaris.atlassian.net/wiki/raml.org/spec.html