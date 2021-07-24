# Roads

This documentation is for the roads collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**In addition to the standard arguments roads also have one special argument called 'detail'. This argument will accept one of seven possible values: micro, tiny, small, medium, large, huge and massive.**

## Primary Route

The primary roads route is `/api/roads` and will return a list of documents. You can also add a custom query, filter, sort, limit and detail to the API route, the default values for each of these arguments is listed below.

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.id",1)]`

**Limit:** `100`

**Detail:** `micro`

You should get a response that looks something like this, except with complete road documents rather than placeholders:

```
[
  {"Road": 1},
  {"Road": 2},
  {"Road": 3},
  ...
  {"Road": 100}
]
```

## Secondary Route

The secondary roads route is `/api/road` and will return a single document. You can also add a custom query, filter and detail to the API route, the default values for each of these arguments is listed below:

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
    "category": "Major Highway", 
    "country": "", 
    "id": 1, 
    "jurisdiction": "", 
    "label": "", 
    "length_km": 1378, 
    "name": "", 
    "rank": 3, 
    "toll": 0
  }, 
  "type": "Feature"
}
```
