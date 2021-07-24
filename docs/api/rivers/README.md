# Rivers

This documentation is for the rivers collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**In addition to the standard arguments rivers also have one special argument called 'detail'. This argument will accept one of seven possible values: micro, tiny, small, medium, large, huge and massive.**

## Primary Route

The primary rivers route is `/api/rivers` and will return a list of documents. You can also add a custom query, filter, sort, limit and detail to the API route, the default values for each of these arguments is listed below.

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.name",1)]`

**Limit:** `100`

**Detail:** `micro`

You should get a response that looks something like this, except with complete river documents rather than placeholders:

```
[
  {"River": 1},
  {"River": 2},
  {"River": 3},
  ...
  {"River": 100}
]
```

## Secondary Route

The secondary rivers route is `/api/river` and will return a single document. You can also add a custom query, filter and detail to the API route, the default values for each of these arguments is listed below:

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
    "id": 1,
    "name": "Albert Nile",
    "number": 9,
    "rank": 1,
    "wiki": "Q4814791"
  },
  "type": "Feature"
}
```
