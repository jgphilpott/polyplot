# Intro

**Polyplot uses a document-oriented ([NoSQL](https://en.wikipedia.org/wiki/NoSQL)) database called [MongoDB](https://www.mongodb.com), all of Polyplots data is available in an API connected to this database.** The APIs primary routes correlate with collections in the database and the secondary routes correlate with a single document in that collection. You can also add a custom query, filter, sort and limit to the API routes.

 - **For a step by step API tutorial read the [example section](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example) below.**
 - **For a list of all available routes see the [table](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes) below.**

# Contents

 - [Intro](https://github.com/jgphilpott/polyplot/tree/master/docs/api#intro)
 - [Contents](https://github.com/jgphilpott/polyplot/tree/master/docs/api#contents)
 - [Example](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example)
   - [Single Document](https://github.com/jgphilpott/polyplot/tree/master/docs/api#single-document)
     - [Query](https://github.com/jgphilpott/polyplot/tree/master/docs/api#query)
     - [Filter](https://github.com/jgphilpott/polyplot/tree/master/docs/api#filter)
   - [List of Documents](https://github.com/jgphilpott/polyplot/tree/master/docs/api#list-of-documents)
     - [Query](https://github.com/jgphilpott/polyplot/tree/master/docs/api#query-1)
     - [Filter](https://github.com/jgphilpott/polyplot/tree/master/docs/api#filter-1)
     - [Sort](https://github.com/jgphilpott/polyplot/tree/master/docs/api#sort)
     - [Limit](https://github.com/jgphilpott/polyplot/tree/master/docs/api#limit)
 - [Routes](https://github.com/jgphilpott/polyplot/tree/master/docs/api#routes)
   - [Airports](https://github.com/jgphilpott/polyplot/blob/master/docs/api/airports/README.md)
   - [Cities](https://github.com/jgphilpott/polyplot/blob/master/docs/api/cities/README.md)
   - [Countries](https://github.com/jgphilpott/polyplot/blob/master/docs/api/countries/README.md)
   - [Graticules](https://github.com/jgphilpott/polyplot/blob/master/docs/api/graticules/README.md)
   - [Indicators](https://github.com/jgphilpott/polyplot/blob/master/docs/api/indicators/README.md)
   - [Lakes](https://github.com/jgphilpott/polyplot/blob/master/docs/api/lakes/README.md)
   - [Maps](https://github.com/jgphilpott/polyplot/blob/master/docs/api/maps/README.md)
   - [Ports](https://github.com/jgphilpott/polyplot/blob/master/docs/api/ports/README.md)
   - [Railroads](https://github.com/jgphilpott/polyplot/blob/master/docs/api/railroads/README.md)
   - [Rivers](https://github.com/jgphilpott/polyplot/blob/master/docs/api/rivers/README.md)
   - [Roads](https://github.com/jgphilpott/polyplot/blob/master/docs/api/roads/README.md)

# Example

Let's look at airports as an example. **To start, the root API path is `/api`, if you visit [polyplot.app/api](https://www.polyplot.app/api) or [localhost:5000/api](http://localhost:5000/api) you will be redirected to this page.**

:warning: **The API path can not include spaces, they must be either removed or replaced with `%20`. Most browsers will do this automatically if you paste the path into the address bar but a direct request with spaces will return an error.**

## Single Document

The best way to get started with a collection is to retrieve a single document and examine it's schema. **Try visiting `/api/airport` to retrieve a single airport document.** You should get a response that looks something like this:

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

**All document routes have two optional arguments that you can add; query and filter.** Some routes also have additional special arguments such as the level of detail that can be specified on map data for example. If special arguments are available it will be mentioned in the [collection specific documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md#routes). When no arguments are provided (as in the example above) the defaults are used, each collection's defaults will also be mentioned in it's own documentation. **Let's look at each of these arguments and see how it applies to our airports example.**

### Query

**Adding a query allows you to find a document that matches a condition or set of conditions.** Select a field in the document **(for nested fields use a . to link fields)** and a condition. All queries come in the form of a dictionary where the key is the name of the field and the value is the condition you want met.

Let's say we want to find an airport in Canada, in this example we will use this dictionary, `{"properties.country":"CAN"}`. **If multiple documents meet the condition the database will simply return the first one that it finds.** The route will now look like this, `/api/airport?query={"properties.country":"CAN"}`.

**If you don't have a specific value to match you can also use logical operators in your query.** For example let's look for an airport where flow is **less than** 100, for this we will use the **$lt** operator like this, `{"properties.flow":{"$lt":100}}`. The route will now look like this, `/api/airport?query={"properties.flow":{"$lt":100}}`. **For a list of all available operators see this [MongoDB documentation](https://docs.mongodb.com/manual/reference/operator/query).**

**You can of course also combine these queries to look for an airport in Canada where flow is less than 100.** The resulting API route will look like this: `/api/airport?query={"properties.country":"CAN","properties.flow":{"$lt":100}}`.

### Filter

**Adding a filter allows you to select certain fields to exclude or include in the return document.** Select a field in the document **(for nested fields use a . to link fields)** that you want to exclude or include. All filters come in the form of a dictionary where the key is the name of the field and the value is either a 0 or 1 for exclusion and inclusion respectively.

Let's say we only want to return the name of the airport, in this example we will use this dictionary, `{"properties.name":1}`. The route will now look like this, `/api/airport?filter={"properties.name":1}`.

**You can add multiple fields to exclude or include in your filter but you can not mix exclusion and inclusion statements.** Try returning both the name of the airport and it's code, the route will now look like this, `/api/airport?filter={"properties.name":1,"properties.code":1}`. **See this [MongoDB Tutorial](https://docs.mongodb.com/manual/tutorial/project-fields-from-query-results) for more information.**

**You can of course also combine queries and filters to return only the name of an airport in Canada.** The resulting API route will look like this: `/api/airport?query={"properties.country":"CAN"}&filter={"properties.name":1}`.

## List of Documents

Once you're familiar with the schema of the documents in a collection you can retrieve a list of documents. **Try visiting `/api/airports` to retrieve a list of airport documents.** You should get a response that looks something like this, except with complete airpot documents rather than placeholders:

```
[
  {"Airport": 1},
  {"Airport": 2},
  {"Airport": 3},
  ...
  {"Airport": x}
]
```

**All collection routes have four optional arguments that you can add; query, filter, sort and limit.** Some routes also have additional special arguments such as the level of detail that can be specified on map data for example. If special arguments are available it will be mentioned in the [collection specific documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md#routes). When no arguments are provided (as in the example above) the defaults are used, each collection's defaults will also be mentioned in it's own documentation. **Let's look at each of these arguments and see how it applies to our airports example.**

### Query

Collection queries work the same as [document queries](https://github.com/jgphilpott/polyplot/tree/master/docs/api#query) except that the database will return all documents that match the query rather than just the first one that it finds.

### Filter

Collection filters work the same as [document filters](https://github.com/jgphilpott/polyplot/tree/master/docs/api#filter), the database will apply the filter to all documents that it finds.

### Sort

**Adding a sort allows you to change the order in which data is returned.** Select a field in the document **(for nested fields use a . to link fields)** that you want to sort. All sorts come in the form of a list of tuples where the first value in the tuple is the field you want to sort by and the second is either a -1 or 1 for descending and ascending order respectively.

Let's say we want to sort airports by flow in descending order so that the largest airports are on the top of the list and the smallest are on the bottom. For this example we will use this list, `[("properties.flow",-1)]`. The route will now look like this, `/api/airports?sort=[("properties.flow",-1)]`.

**You can add multiple tuples to the list to act as secondary or tertiary sort values to be used in the event of a tie in the primary sort value.** Let's sort the airports by code in ascending order as a secondary value. For this example we will use this list, `[("properties.flow",-1),("properties.code",1)]`. The route will now look like this, `/api/airports?sort=[("properties.flow",-1),("properties.code",1)]`. **See this [MongoDB documentation](https://docs.mongodb.com/manual/reference/method/cursor.sort) for more information.**

**You can of course also combine sorts with queries and filters.**

### Limit

**Adding a limit allows you to restrict the number of documents that will be returned. The limit can be any positive integer, use 0 to set no limit.**

Let's say we want to limit the number of airports returned to 10, for this example the route will look like this, `/api/airports?limit=10`. **See this [MongoDB documentation](https://docs.mongodb.com/manual/reference/method/cursor.limit) for more information.**

**You can of course also combine limit with sorts, queries and filters.**

# Routes

**There are two API routes for each relevant collection in the database.** The primary routes correlate with a collection and will return a list of documents. The secondary routes correlate with a single document in that collection. As [explained above](https://github.com/jgphilpott/polyplot/tree/master/docs/api#example), you can also add a custom query, filter, sort and limit to the API routes. **A list of all available API routes is available in the table below:**

Collection | Primary Route (List) | Secondary Route (Document) | Special Args | GeoJSON
--- | --- | --- | --- | ---
[Airports](https://github.com/jgphilpott/polyplot/blob/master/docs/api/airports/README.md) | [/api/airports](https://www.polyplot.app/api/airports) | [/api/airport](https://www.polyplot.app/api/airport) | :x: | :heavy_check_mark:
[Cities](https://github.com/jgphilpott/polyplot/blob/master/docs/api/cities/README.md) | [/api/cities](https://www.polyplot.app/api/cities) | [/api/city](https://www.polyplot.app/api/city) | :x: | :heavy_check_mark:
[Countries](https://github.com/jgphilpott/polyplot/blob/master/docs/api/countries/README.md) | [/api/countries](https://www.polyplot.app/api/countries) | [/api/country](https://www.polyplot.app/api/country) | :x: | :x:
[Graticules](https://github.com/jgphilpott/polyplot/blob/master/docs/api/graticules/README.md) | [/api/graticules](https://www.polyplot.app/api/graticules) | [/api/graticule](https://www.polyplot.app/api/graticule) | :x: | :heavy_check_mark:
[Indicators](https://github.com/jgphilpott/polyplot/blob/master/docs/api/indicators/README.md) | [/api/indicators](https://www.polyplot.app/api/indicators) | [/api/indicator](https://www.polyplot.app/api/indicator) | :x: | :x:
[Lakes](https://github.com/jgphilpott/polyplot/blob/master/docs/api/lakes/README.md) | [/api/lakes](https://www.polyplot.app/api/lakes) | [/api/lake](https://www.polyplot.app/api/lake) | :heavy_check_mark: | :heavy_check_mark:
[Maps](https://github.com/jgphilpott/polyplot/blob/master/docs/api/maps/README.md) | [/api/maps](https://www.polyplot.app/api/maps) | [/api/map](https://www.polyplot.app/api/map) | :heavy_check_mark: | :heavy_check_mark:
[Ports](https://github.com/jgphilpott/polyplot/blob/master/docs/api/ports/README.md) | [/api/ports](https://www.polyplot.app/api/ports) | [/api/port](https://www.polyplot.app/api/port) | :x: | :heavy_check_mark:
[Railroads](https://github.com/jgphilpott/polyplot/blob/master/docs/api/railroads/README.md) | [/api/railroads](https://www.polyplot.app/api/railroads) | [/api/railroad](https://www.polyplot.app/api/railroad) | :heavy_check_mark: | :heavy_check_mark:
[Rivers](https://github.com/jgphilpott/polyplot/blob/master/docs/api/rivers/README.md) | [/api/rivers](https://www.polyplot.app/api/rivers) | [/api/river](https://www.polyplot.app/api/river) | :heavy_check_mark: | :heavy_check_mark:
[Roads](https://github.com/jgphilpott/polyplot/blob/master/docs/api/roads/README.md) | [/api/roads](https://www.polyplot.app/api/roads) | [/api/road](https://www.polyplot.app/api/road) | :heavy_check_mark: | :heavy_check_mark:
