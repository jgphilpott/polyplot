# Intro

**Polyplot uses a document-oriented ([NoSQL](https://en.wikipedia.org/wiki/NoSQL)) database called [MongoDB](https://www.mongodb.com), all of Polyplots data is available in an API connected to this database.** The APIs primary routes correlate with collections in the database and the secondary routes correlate with a single document in that collection. You can also add a custom query, filter, sort and limit to the API route.

# Example

Let's look at Airports as an example. To start, the root API path is `/api`, if you visit [`polyplot.app/api`](https://www.polyplot.app/api) or [`localhost:5000/api`](http://localhost:5000/api) you will be redirected to this page. Try visiting `/api/airport` to retrieve a single airport document.
