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

Let's say we want to find an airport in Canada, in this example we will use this dictionary, `{"properties.country":"CAN"}`. **If multiple documents meet the condition the database will simply return the first one that it finds.** The full route will now look like this, `/api/airport?query={"properties.country":"CAN"}`.

**If you don't have a specific value to match you can also use logical operators in your query.** For example let's look for an airport where flow is **less than** 100, for this we will use the **$lt** operator like so: `{"properties.flow":{"$lt":100}}`. For a full list of available operators see the [MongoDB documentation](https://docs.mongodb.com/manual/reference/operator/query).

You can of course also combine these queries to look for an airport in Canada where flow is less than 100. The resulting API route will look like this: `/api/airport?query={"properties.country":"CAN","properties.flow":{"$lt":100}}`.

### Filter

**Adding a filter allows you to select certain fields to include or exclude in the return document.** Select a field in the document **(for nested fields use a . to link fields)** that you want to include or exclude. All filters come in the form of a dictionary where the key is the name of the field and the value is either a 0 or 1 for exclusion and inclusion respectively.

Let's say we only want to return the name of the airport, in this example we will use this dictionary, `{"properties.name":1}`. The full route will now look like this, `/api/airport?filter={"properties.name":1}`. **You can add multiple fields to exclude or include in your filter but you can not mix exclusion and inclusion statements.** See this [MongoDB Tutorial](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results) for more information.

## List of Documents

Once you're familiar with the schema of the documents in a collection you can retrieve a list of documents. **Try visiting `/api/airports` to retrieve a list of all the airport documents in the collection.** You should get a response that looks something like this, except with complete airpot documents rather than placeholders:

```
[
  {"Airport": 1},
  {"Airport": 2},
  {"Airport": 3},
  ...
  {"Airport": x}
]
```

**All collection routes have four optional arguments that you can add; query, filter, sort and limit.** Some collections also have additional special arguments such as the level of detail that can be specified on map data for example. If special arguments are available it will be mentioned in the [collection specific documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md#routes). When no arguments are provided (as in the example above) the defaults are used, each collection's defaults will also be mentioned in it's own documentation. Let's look at each of these arguments and see how it applies to our airports example.

### Query

...

### Filter

...

### Sort

...

### Limit

...

# Routes

...
