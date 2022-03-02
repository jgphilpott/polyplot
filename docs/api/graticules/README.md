# Graticules

This documentation is for the graticules collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

**Graticules are available in six different step increments: 1°, 5°, 10°, 15°, 20°, 30°.**

## Primary Route

The primary graticules route is `/api/graticules` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{"step":{"$in":[10,20,30]}}`

**Filter:** `{}`

**Sort:** `[("step",-1)]`

**Limit:** `0`

You should get a response that looks something like this, except with complete graticule documents rather than placeholders:

```
[
  {"Graticule": 1},
  {"Graticule": 2},
  {"Graticule": 3}
]
```

## Secondary Route

The secondary graticules route is `/api/graticule` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{"step":15}`

**Filter:** `{}`

You should get a response that looks something like this:

```
{
  "grid": [...],
  "step": 15
}
```