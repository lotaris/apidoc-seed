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


### Includes

To keep the RAML source code readable (and manageable with concurrent Git contributors), the API documentation is split in many files and uses lots of file inclusions.

The root file includes all the resources.

*index.raml*:
```yaml
#%RAML 0.8
---
title: Index Example
...
 
/applications: !include applications/applications.raml
/products: !include products/products.raml
...
```

The resources include their sub-resources:

*applications.raml*:
```yaml
...
post: ...
get: ...
/{applicationId}:
  get: ...
  put: ...
  delete: ...
  /apiKeys: !include apiKeys/apiKeys.raml
  /clients: !include clients/clients.raml
  ...
```

The resource include all their 1+ line content (descriptions, payload examples, etc.).


*applications.raml*:
```yaml
description: !include applications.md
post:
  ...
  description: !include application-create.md
  body:
    application/json:
      example: !include application-create-req.sample
  responses:
    201:
      body:
        application/json:
          example: !include application-create-res.sample
    422:
      description: !include application-create-422.md
```

This generates a lot of files, is a bit tedious to put in place but it allows to keep the files as readable and manageable as possible.


### Traits

Traits are a feature of the RAML spec which allows to factorise some operation definitions. An API operation can "use" a trait and will automatically be enriched with the definitions associated to the trait. Currently there is one trait defined:

 - **Private**: This is just a marker that results in the resource not being rendered on the public site (see [Private vs. public content](../public-private) section).
   
   
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

Notice that if you re-define a response code which is already defined in a trait used, your definition will override the definition in the trait. This is not recommended as it reduces the consistency of the documentation... only do it if really necessary.


[raml-spec]: https://lotaris.atlassian.net/wiki/raml.org/spec.html