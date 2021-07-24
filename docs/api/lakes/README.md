# Lakes

This documentation is for the lakes collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**In addition to the standard arguments lakes also have one special argument called 'detail'. This argument will accept one of seven possible values: micro, tiny, small, medium, large, huge and massive.**

## Primary Route

The primary lakes route is `/api/lakes` and will return a list of documents. You can also add a custom query, filter, sort, limit and detail to the API route, the default values for each of these arguments is listed below.

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.id",1)]`

**Limit:** `100`

**Detail:** `micro`

You should get a response that looks something like this, except with complete lake documents rather than placeholders:

```
[
  {"Lake": 1},
  {"Lake": 2},
  {"Lake": 3},
  ...
  {"Map": 100}
]
```

## Secondary Route

The secondary lakes route is `/api/lake` and will return a single document. You can also add a custom query, filter and detail to the API route, the default values for each of these arguments is listed below:

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
    "category": "Alkaline Lake", 
    "id": 1, 
    "name": "Aral Sea", 
    "rank": 1, 
    "wiki": "Q35883", 
    "year": null
  }, 
  "type": "Feature"
}
```
