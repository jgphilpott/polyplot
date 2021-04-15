import {drawAirports} from "./airports.mjs"
import {drawCities} from "./cities.mjs"
import {drawGraticules} from "./graticules.mjs"
import {drawLakes} from "./lakes.mjs"
import {drawPorts} from "./ports.mjs"
import {drawRailroads} from "./railroads.mjs"
import {drawRivers} from "./rivers.mjs"
import {drawRoads} from "./roads.mjs"

let plot = data.plot
let plots = plot.plots

export function drawLayers() {

  let canvas = d3.select("#canvas")
  let mapSettings = localRead("settings").map
  let geoProperties = plot.GeoJSON.properties

  if (!("layers" in geoProperties)) {

    geoProperties.layers = {}

    geoProperties.layers.sort = sort

    geoProperties.layers.lastDraw = 1
    geoProperties.layers.checkpoint = 1
    geoProperties.layers.checkpoints = [1, 2, 4, 8, 16, 32, 64]

  }

  let layers = geoProperties.layers

  if (mapSettings.airports && !("airports" in layers)) {

    socket.emit("get_airports", {"properties.flow": {"$gte": 10000}}, {"_id": 0}, [["properties.flow", -1], ["properties.code", 1]], 0)

    socket.on("new_airports", function(airports) {

      layers.airports = airports
      drawAirports(canvas)
      layers.sort()

    })

  }

  if (mapSettings.cities && !("cities" in layers)) {

    socket.emit("get_cities", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.rank", 1], ["properties.pop_avg", -1], ["properties.name", 1]], 0)

    socket.on("new_cities", function(cities) {

      layers.cities = cities
      drawCities(canvas)
      layers.sort()

    })

  }

  if (mapSettings.graticules && !("graticules" in layers)) {

    socket.emit("get_graticules", {"step": {"$in": [10, 20, 30]}}, {"_id": 0}, [["step", 1]], 0)

    socket.on("new_graticules", function(graticules) {

      layers.graticules = graticules
      drawGraticules(canvas)
      layers.sort()

    })

  }

  if (mapSettings.lakes && !("lakes" in layers)) {

    socket.emit("get_lakes", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_lakes", function(lakes) {

      layers.lakes = lakes
      drawLakes(canvas)
      layers.sort()

    })

  }

  if (mapSettings.ports && !("ports" in layers)) {

    socket.emit("get_ports", {"properties.flow": {"$gte": 20000}}, {"_id": 0}, [["properties.flow", -1], ["properties.code", 1]], 0)

    socket.on("new_ports", function(ports) {

      layers.ports = ports
      drawPorts(canvas)
      layers.sort()

    })

  }

  if (mapSettings.railroads && !("railroads" in layers)) {

    socket.emit("get_railroads", {"properties.rank": {"$lte": 7}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_railroads", function(railroads) {

      layers.railroads = railroads
      drawRailroads(canvas)
      layers.sort()

    })

  }

  if (mapSettings.rivers && !("rivers" in layers)) {

    socket.emit("get_rivers", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_rivers", function(rivers) {

      layers.rivers = rivers
      drawRivers(canvas)
      layers.sort()

    })

  }

  if (mapSettings.roads && !("roads" in layers)) {

    socket.emit("get_roads", {"properties.category": {"$in": ["Major Highway", "Secondary Highway", "Road"]}, "properties.rank": {"$lte": 4}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_roads", function(roads) {

      layers.roads = roads
      drawRoads(canvas)
      layers.sort()

    })

  }

  function sort() {

    d3.selectAll(".port").setAsBackLayer()
    d3.selectAll(".airport").setAsBackLayer()
    d3.selectAll(".city").setAsBackLayer()
    d3.selectAll(".railroad").setAsBackLayer()
    d3.selectAll(".road").setAsBackLayer()
    d3.selectAll(".lake").setAsBackLayer()
    d3.selectAll(".river").setAsBackLayer()
    d3.selectAll(".map").setAsBackLayer()
    d3.selectAll(".graticule").setAsBackLayer()

  }

}

export function updateLayers(zoom) {

  // let canvas = d3.select("#canvas")
  // let layers = plot.GeoJSON.properties.layers
  //
  // for (let i = 1; i < layers.checkpoints.length; i++) {
  //
  //   if ((zoom >= layers.checkpoints[i - 1] && zoom <= layers.checkpoints[i]) && !(layers.lastDraw >= layers.checkpoints[i - 1] && layers.lastDraw <= layers.checkpoints[i])) {
  //
  //     layers.checkpoint = i
  //
  //     if (layers.airports) { drawAirports(canvas) }
  //     if (layers.cities) { drawCities(canvas) }
  //     if (layers.graticules) { drawGraticules(canvas) }
  //     if (layers.lakes) { drawLakes(canvas) }
  //     if (layers.ports) { drawPorts(canvas) }
  //     if (layers.railroads) { drawRailroads(canvas) }
  //     if (layers.rivers) { drawRivers(canvas) }
  //     if (layers.roads) { drawRoads(canvas) }
  //
  //     layers.lastDraw = zoom
  //     layers.sort()
  //
  //   }
  //
  // }

}

export function deleteLayers(layer) {

  // let layers = plot.GeoJSON.properties.layers
  //
  // delete layers[layer]
  //
  // if (!("airports" in layers)) { $(".airport").remove() }
  // if (!("cities" in layers)) { $(".city").remove() }
  // if (!("graticules" in layers)) { $(".graticule").remove() }
  // if (!("lakes" in layers)) { $(".lake").remove() }
  // if (!("ports" in layers)) { $(".port").remove() }
  // if (!("railroads" in layers)) { $(".railroad").remove() }
  // if (!("rivers" in layers)) { $(".river").remove() }
  // if (!("roads" in layers)) { $(".road").remove() }

}
