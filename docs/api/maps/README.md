# Maps

This documentation is for the maps collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**In addition to the standard arguments maps also have one special argument called 'detail'. This argument will accept one of seven possible values: micro, tiny, small, medium, large, huge and massive.**

## Primary Route

The primary maps route is `/api/maps` and will return a list of documents. You can also add a custom query, filter, sort, limit and detail to the API route, the default values for each of these arguments is listed below.

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.name",1)]`

**Limit:** `0`

**Detail:** `micro`

You should get a response that looks something like this, except with complete map documents rather than placeholders:

```
[
  {"Map": 1},
  {"Map": 2},
  {"Map": 3},
  ...
  {"Map": 193}
]
```

## Secondary Route

The secondary maps route is `/api/map` and will return a single document. You can also add a custom query, filter and detail to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

**Detail:** `micro`

You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [...],
    "type": "Polygon"
  },
  "properties": {
    "centroid": [
      65.95985742187501,
      34.1834701171875
    ],
    "code": "AFG",
    "formal_name": "Islamic Republic of Afghanistan",
    "name": "Afghanistan",
    "region": "South Asia",
    "wiki": "https://en.wikipedia.org/wiki/Afghanistan"
  },
  "type": "Feature"
}
```