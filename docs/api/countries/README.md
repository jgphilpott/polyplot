# Countries

This documentation is for the countries collection. If you're not familiar with how to use the Polyplot API read [this example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example). For a list of all available API routes see [this table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes).

## Primary Route

The primary countries route is `/api/countries` and will return a list of documents. You can also add a custom query, filter, sort and limit to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{"description":0,"indicators":0}`

**Sort:** `[("name",1)]`

**Limit:** `0`

You should get a response that looks something like this, except with complete country documents rather than placeholders:

```
[
  {"Country": 1},
  {"Country": 2},
  {"Country": 3},
  ...
  {"Country": 193}
]
```

## Secondary Route

The secondary countries route is `/api/country` and will return a single document. You can also add a custom query and filter to the API route, the default values for each of these arguments is listed below:

**Query:** `{}`

**Filter:** `{"description":0,"indicators":0}`

You should get a response that looks something like this:

```
{
  "centroid": [
    65.95985742187501,
    34.1834701171875
  ],
  "code": "AFG",
  "factbook": "https://www.cia.gov/the-world-factbook/countries/afghanistan",
  "formal_name": "Islamic Republic of Afghanistan",
  "last_updated": "2021-04-02",
  "max_year": 2020,
  "min_year": 1960,
  "name": "Afghanistan",
  "region": "South Asia",
  "wiki": "https://en.wikipedia.org/wiki/Afghanistan"
}
```
