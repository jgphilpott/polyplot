# Cities

This documentation is for the cities collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

## Primary Route

The primary cities route is `/api/cities` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

**Sort:** `[("properties.rank",1),("properties.pop_avg",-1),("properties.name",1)]`

**Limit:** `100`

You should get a response that looks something like this, except with complete city documents rather than placeholders:

```
[
  {"City": 1},
  {"City": 2},
  {"City": 3},
  ...
  {"City": 100}
]
```

## Secondary Route

The secondary cities route is `/api/city` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{}`

You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [
      139.74946157054467,
      35.686962764371174
    ],
    "type": "Point"
  },
  "properties": {
    "country": "JPN",
    "name": "Tokyo",
    "pop_avg": 22006299.5,
    "pop_max": 35676000,
    "pop_min": 8336599,
    "rank": 1,
    "wiki": "Q1490",
    "zone": "Tokyo"
  },
  "type": "Feature"
}
```