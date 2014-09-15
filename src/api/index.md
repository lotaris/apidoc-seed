---
title: Overview
sectionName: API Reference
template: api.jade
menuIndex: 4
---

This pages contains general documentation about the API. Use the links on the
right to navigate to specific resources.


### Content-type

The API uses the JSON format. Unless specified otherwise, all requests and 
response should have the `Content-Type: application/json` header.


### HTTP verbs

The API uses the standard HTTP verbs to perform CRUD operations (**C**reate, 
**R**etrieve, **U**pdate, **D**elete) on resources, following standard RESTful
API practices.

Find below a quick summary of how HTTP verbs are used in the API:

| Verb     | Description |
|----------|--------
| `GET`    | Used for retrieving a resource or a collection of resources.
| `HEAD`   | Has the same behaviour as the `GET` verb but does not return the response body (only the headers). Notice that this verb is only available for some resources.
| `POST`   | Used for creating a new resource or performing a non-CRUD operation on a resource.
| `PUT`    | Used to perform a full update of a resource (replacing the resource by the JSON data provided in the request).
| `PATCH`  | Used to perform a partial update of a resource (only updating the fields of the resource specified in the JSON data provided in the request).
| `DELETE` | Used for deleting resources.


### Authentication

To interact with the API, your client will need to be authenticated. This is done by using the **Authorization** header with the username and password of the client and gives something that looks like:

	Authorization: Basic QWxhZGRpbjpvcGVuIHNlc2FtZQ==


### Errors

In case of error, the API will send a JSON response with the list of errors. 
Each error has a human-readable message and a code. The code identifies the 
error type and can be used to handle specific errors differently or for 
translation purposes.


```
HTTP/1.1 400 Bad Request
 
{
  "errors": [
    { 
      "message": "JSON parsing error.",
      "code": 10000
    }
  ]
}
```

### Dates

All dates returned by the API are in UTC and use the `ISO-8601` format (ex: 
`2015-02-15T05:21:07Z`).
