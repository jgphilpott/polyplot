# Features

**The goal of Polyplot is to be the best data exploration software in the world!** This goal is achieved through a combination of innovative features, some of which are listed here.

### :octocat: Open Source

**Polyplot has been built on [GitHub](https://github.com) from day one!** The power of git and open source is that it enables the internet hive mind to collaborate on a project in a way that's impossible for a small closed group of developers. **You are encouraged to clone, fork and modify the code in any way you like!** If you notice any bugs or have an idea for a new feature please [open an issue](https://github.com/jgphilpott/polyplot/issues).

### :bulb: 3D View

**Polyplot raises the bar and takes data exploration to another dimension, literally!** In addition to 2D plots and a map view Polyplot also offers a 3D visualization environment. Countries can be plotted as spheres in 3D space and animated through time. Under the hood **Polyplots 3D graphics are powered by [three.js](https://github.com/mrdoob/three.js)**, so if you're familiar with that library you can easily modify the plot or add custom features.

### :computer: Flexable UI

**Polyplot has a uniquely lucid interface that creates a smoother experience for users and developers.** Rather than having a fixed/static layout Polyplot expands the plotting area to fullscreen and pops out the controls/tools onto floating panels that can be placed anywhere and toggled on/off. For users this creates a more custom experience that makes better use of screen space. For developers it makes it easier to build new features in isolation without needing to worry about the overall architecture of the application.

### :earth_africa: Custom Map

**Polyplot is a masterpiece of digital cartography!** The base map has the countries of the world coloured by a time series indicator and can be morphed between different projections. You can also build and add custom layers of geospatial data. This mixture of time series and geospatial data can be a powerful catalyst in the discovery process! Under the hood **Polyplots map features are powered by [d3.js](https://github.com/d3/d3)**, so if you're familiar with that library you can easily modify the map or add custom layers.

### :link: API

**Polyplot uses a document-oriented ([NoSQL](https://en.wikipedia.org/wiki/NoSQL)) database called [MongoDB](https://www.mongodb.com), all of Polyplots data is available in an API connected to this database.** The APIs primary routes correlate with collections in the database and the secondary routes correlate with a single document in that collection. You can also add a custom query, filter, sort and limit to the API route. **Read the [API documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md) for more detailed instructions.**

### :open_book: Notebooks

Polyplot uses [docker compose](https://docs.docker.com/compose) to connect its services, if everything [deployed correctly](https://github.com/jgphilpott/polyplot/blob/master/docs/devops/deploy/README.md) then you should be able to view a [Jupyter Notebook](https://jupyter.org) container on port `8888`. **Notebooks can be used as a sandbox to develop and test new code or explore the database.** Polyplot comes preloaded with a [set of notes](https://github.com/jgphilpott/polyplot/tree/master/notes/collections) that correspond to the collections in the database and can be used as a starting point. **For more information on how to use the Jupyter Notebook service read [this documentation](https://github.com/jgphilpott/polyplot/blob/master/docs/notes/README.md).**

### :alarm_clock: Auto Updates

**Polyplot never falls behind the times, the world is changing everyday and so is Polyplot!** The backend connects to several APIs and scrapes various websites across the web everyday for fresh data. New APIs and sites are being added all the time, **connecting a new API or writing a scraper is a great way to contribute!**
