# Railroads

This documentation is for the railroads collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**In addition to the standard arguments railroads also have one special argument called 'detail'. This argument will accept one of seven possible values: micro, tiny, small, medium, large, huge and massive.**

## Primary Route

The primary railroads route is `/api/railroads` and will return a list of documents. You can also add a custom query, filter, sort, limit and detail to the API route, the default values for each of these arguments is listed below.

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.id",1)]`

**Limit:** `100`

**Detail:** `micro`

You should get a response that looks something like this, except with complete railroad documents rather than placeholders:

```
[
  {"Railroad": 1},
  {"Railroad": 2},
  {"Railroad": 3},
  ...
  {"Railroad": 100}
]
```

## Secondary Route

The secondary railroads route is `/api/railroad` and will return a single document. You can also add a custom query, filter and detail to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

**Detail:** `micro`

You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [...],
    "type": "LineString"
  },
  "properties": {
    "electric": 2,
    "id": 1,
    "mult_track": 2,
    "rank": 4
  },
  "type": "Feature"
}
```