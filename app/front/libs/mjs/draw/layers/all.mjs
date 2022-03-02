import {polymorph} from "../../cartography/projections.mjs"

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

export function drawLayer(layer=null) {

  let canvas = d3.select("#canvas")

  let drawFunctions = {airports: drawAirports,
                       cities: drawCities,
                       graticules: drawGraticules,
                       lakes: drawLakes,
                       ports: drawPorts,
                       railroads: drawRailroads,
                       rivers: drawRivers,
                       roads: drawRoads}

  drawFunctions[layer](canvas)

}

export function drawLayers(layer=null) {

  let canvas = d3.select("#canvas")

  let mapSettings = data.client.settings.map
  let geoProperties = plot.GeoJSON.properties

  if (!("layers" in geoProperties)) {

    geoProperties.layers = {}

    geoProperties.drawLayer = drawLayer
    geoProperties.sortLayers = sortLayers
    geoProperties.updateLayers = updateLayers
    geoProperties.deleteLayer = deleteLayer

    geoProperties.lastDraw = 1
    geoProperties.checkpoint = 1
    geoProperties.checkpoints = [1, 2, 4, 8, 16, 32, 64]

  }

  let layers = geoProperties.layers

  if (mapSettings.airports && !("airports" in layers)) {

    socket.emit("get_airports", {"properties.flow": {"$gte": 10000}}, {"_id": 0}, [["properties.flow", -1], ["properties.code", 1]], 0)

    socket.on("new_airports", function(airports) {

      layers.airports = airports
      geoProperties.drawLayer("airports")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.cities && !("cities" in layers)) {

    socket.emit("get_cities", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.rank", 1], ["properties.pop_avg", -1], ["properties.name", 1]], 0)

    socket.on("new_cities", function(cities) {

      layers.cities = cities
      geoProperties.drawLayer("cities")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.graticules && !("graticules" in layers)) {

    socket.emit("get_graticules", {"step": {"$in": [10, 20, 30]}}, {"_id": 0}, [["step", -1]], 0)

    socket.on("new_graticules", function(graticules) {

      layers.graticules = graticules
      geoProperties.drawLayer("graticules")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.lakes && !("lakes" in layers)) {

    socket.emit("get_lakes", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_lakes", function(lakes) {

      layers.lakes = lakes
      geoProperties.drawLayer("lakes")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.ports && !("ports" in layers)) {

    socket.emit("get_ports", {"properties.flow": {"$gte": 20000}}, {"_id": 0}, [["properties.flow", -1], ["properties.code", 1]], 0)

    socket.on("new_ports", function(ports) {

      layers.ports = ports
      geoProperties.drawLayer("ports")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.railroads && !("railroads" in layers)) {

    socket.emit("get_railroads", {"properties.rank": {"$lte": 7}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_railroads", function(railroads) {

      layers.railroads = railroads
      geoProperties.drawLayer("railroads")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.rivers && !("rivers" in layers)) {

    socket.emit("get_rivers", {"properties.rank": {"$lte": 6}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_rivers", function(rivers) {

      layers.rivers = rivers
      geoProperties.drawLayer("rivers")
      geoProperties.updateLayers()

    })

  }

  if (mapSettings.roads && !("roads" in layers)) {

    socket.emit("get_roads", {"properties.category": {"$in": ["Major Highway", "Secondary Highway", "Road"]}, "properties.rank": {"$lte": 4}}, {"_id": 0}, [["properties.id", 1]], 0, "micro")

    socket.on("new_roads", function(roads) {

      layers.roads = roads
      geoProperties.drawLayer("roads")
      geoProperties.updateLayers()

    })

  }

}

export function sortLayers() {

  d3.selectAll(".port").setAsBackLayer()
  d3.selectAll(".airport").setAsBackLayer()
  d3.selectAll(".city").setAsBackLayer()
  d3.selectAll(".railroad").setAsBackLayer()
  d3.selectAll(".road").setAsBackLayer()
  d3.selectAll(".lake").setAsBackLayer()
  d3.selectAll(".river").setAsBackLayer()
  d3.selectAll(".map").setAsBackLayer()
  d3.selectAll(".graticule").setAsBackLayer()
  d3.selectAll("#ocean").setAsBackLayer()

}

export function updateLayers(type=null, update=null) {

  let geoProperties = plot.GeoJSON.properties

  if (type == "zoom") {

    let canvas = d3.select("#canvas")
    let layers = geoProperties.layers

    for (let i = 1; i <= geoProperties.checkpoints.length; i++) {

      if ((update >= geoProperties.checkpoints[i - 1] && update <= geoProperties.checkpoints[i]) && !(geoProperties.lastDraw >= geoProperties.checkpoints[i - 1] && geoProperties.lastDraw <= geoProperties.checkpoints[i])) {

        geoProperties.checkpoint = i
        geoProperties.lastDraw = update

        if (layers.airports) { drawAirports(canvas) }
        if (layers.cities) { drawCities(canvas) }
        if (layers.graticules) { drawGraticules(canvas) }
        if (layers.lakes) { drawLakes(canvas) }
        if (layers.ports) { drawPorts(canvas) }
        if (layers.railroads) { drawRailroads(canvas) }
        if (layers.rivers) { drawRivers(canvas) }
        if (layers.roads) { drawRoads(canvas) }

      }

    }

  }

  polymorph(data.client.settings.map.projection, 0)

  geoProperties.sortLayers()

}

export function deleteLayer(layer=null) {

  delete plot.GeoJSON.properties.layers[layer]

  // Singularize: https://stackoverflow.com/a/796421/1544937
  if (layer == "cities") { layer = "city" } else { layer = layer.slice(0, -1) }

  $("." + layer + "").remove()

}