# Airports

This documentation is for the airports collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

## Primary Route

The primary airports route is `/api/airports` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.flow", -1), ("properties.code", 1)]`

**Limit:** `100`

You should get a response that looks something like this, except with complete airpot documents rather than placeholders:

```
[
  {"Airport": 1},
  {"Airport": 2},
  {"Airport": 3},
  ...
  {"Airport": 100}
]
```

## Secondary Route

The secondary airports route is `/api/airport` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [
      55.35779953, 
      25.25
    ], 
    "type": "Point"
  }, 
  "properties": {
    "code": "DXB", 
    "country": "ARE", 
    "flow": 55655669.13, 
    "name": "Dubai International"
  }, 
  "type": "Feature"
}
```
