# Ports

This documentation is for the ports collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

## Primary Route

The primary ports route is `/api/ports` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.flow",-1),("properties.code",1)]`

**Limit:** `100`

You should get a response that looks something like this, except with complete port documents rather than placeholders:

```
[
  {"Port": 1},
  {"Port": 2},
  {"Port": 3},
  ...
  {"Port": 100}
]
```

## Secondary Route

The secondary ports route is `/api/port` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [
      103.85007,
      1.28967
    ],
    "type": "Point"
  },
  "properties": {
    "code": "SGSIN",
    "country": "SGP",
    "flow": 126673817.40886995,
    "name": "Singapore",
    "status": "AI"
  },
  "type": "Feature"
}
```