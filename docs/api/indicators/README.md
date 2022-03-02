# Indicators

This documentation is for the indicators collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

## Primary Route

The primary indicators route is `/api/indicators` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{"countries":{"$exists":True,"$ne":[]},"completeness":{"$gt":0}}`

**Filter:** `{"countries":0}`

**Sort:** `[("completeness",-1),("name",1)]`

**Limit:** `100`

You should get a response that looks something like this, except with complete indicator documents rather than placeholders:

```
[
  {"Indicator": 1},
  {"Indicator": 2},
  {"Indicator": 3},
  ...
  {"Indicator": 100}
]
```

## Secondary Route

The secondary indicators route is `/api/indicator` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{"countries":{"$exists":True,"$ne":[]},"completeness":{"$gt":0}}`

**Filter:** `{"countries":0}`

You should get a response that looks something like this:

```
{
  "categories": [
    "Agriculture & Rural Development"
  ],
  "code": "SP.RUR.TOTL.ZS",
  "completeness": 98.29270364393102,
  "description": "...",
  "featured": true,
  "last_updated": "2021-02-27",
  "limitations": "...",
  "max_value": 97.923,
  "max_year": 2020,
  "methodology": "...",
  "min_value": 4.574,
  "min_year": 1960,
  "name": "Rural population (% of total population)",
  "relevance": "...",
  "size": 386341
}
```