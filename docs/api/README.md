# Intro

**Polyplot uses a document-oriented ([NoSQL](https://en.wikipedia.org/wiki/NoSQL)) database called [MongoDB](https://www.mongodb.com), all of Polyplots data is available in an API connected to this database.** The APIs primary routes correlate with collections in the database and the secondary routes correlate with a single document in that collection. You can also add a custom query, filter, sort and limit to the API route.

# Example

Let's look at airports as an example. **To start, the root API path is `/api`, if you visit [polyplot.app/api](https://www.polyplot.app/api) or [localhost:5000/api](http://localhost:5000/api) you will be redirected to this page.**

## Single Document

The best way to get started with a collection is to retrieve a single document and examine its schema. **Try visiting `/api/airport` to retrieve a single airport document.** You should get a response that looks something like this:

```
{
  "geometry": {
    "coordinates": [
      55.35779953, 
      25.25
    ], 
    "type": "Point"
  }, 
  "properties": {
    "code": "DXB", 
    "country": "ARE", 
    "flow": 55655669.13, 
    "name": "Dubai International"
  }, 
  "type": "Feature"
}
```

**All document routes have two optional arguments that you can add; query and filter.** Some documents also have additional special arguments such as the level of detail that can be specified on map data for example. If special arguments are available it will be mentioned in the [collection specific documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md#routes). When no arguments are provided (as in the example above) the defaults are used, each collection's defaults will also be mentioned in it's own documentation. Let's look at each of these arguments and see how it applies to our airports example.

### Query

**Adding a query allows you to find a document that matches a condition or set of conditions.** Select a field in the document **(for nested fields use a . to link fields)** and a condition. All queries come in the form of a dictionary where the key is the name of the field and the value is the condition you want met.

Let's say we want to find an airport in Canada, in this example we will use this dictionary, `{"properties.country":"CAN"}`. **If multiple documents meet the condition the database will simply return the first one that it finds.** The full route will now look like this, `/api/airport?query={"properties.country":"CAN"}`

### Filter

...

## List of Documents

...

### Sort

...

### Limit

...

# Routes

...
