import {drawAirports} from "./airports.mjs"
import {drawGraticules} from "./graticules.mjs"
import {drawLakes} from "./lakes.mjs"
import {drawPorts} from "./ports.mjs"
import {drawRivers} from "./rivers.mjs"

let plot = data.plot

export function drawLayers(zoom) {

  let canvas = d3.select("#canvas")

  let geoProperties = plot.GeoJSON.properties

  if (!("layers" in geoProperties)) {

    geoProperties.layers = {}

    geoProperties.layers.lastDraw = 1

    geoProperties.layers.checkpoint = 1
    geoProperties.layers.checkpoints = [1, 2, 4, 8, 16, 32, 64]

    geoProperties.layers.sizeSwitch = sizeSwitch

  }

  let layers = geoProperties.layers

  if (!("airports" in layers)) {

    socket.emit("get_airports")

    socket.on("new_airports", function(airports) {

      layers.airports = airports
      drawAirports(canvas)

    })

  }

  if (!("graticules" in layers)) {

    socket.emit("get_graticules", [10, 20, 30])

    socket.on("new_graticules", function(graticules) {

      layers.graticules = graticules
      drawGraticules(canvas)

    })

  }

  if (!("lakes" in layers)) {

    socket.emit("get_lakes")

    socket.on("new_lakes", function(lakes) {

      layers.lakes = lakes
      drawLakes(canvas)

    })

  }

  if (!("ports" in layers)) {

    socket.emit("get_ports")

    socket.on("new_ports", function(ports) {

      layers.ports = ports
      drawPorts(canvas)

    })

  }

  if (!("rivers" in layers)) {

    socket.emit("get_rivers")

    socket.on("new_rivers", function(rivers) {

      layers.rivers = rivers
      drawRivers(canvas)

    })

  }

  for (let i = 1; i < layers.checkpoints.length; i++) {

    if ((zoom >= layers.checkpoints[i - 1] && zoom <= layers.checkpoints[i]) && !(layers.lastDraw >= layers.checkpoints[i - 1] && layers.lastDraw <= layers.checkpoints[i])) {

      layers.checkpoint = i

      drawGraticules(canvas)
      drawRivers(canvas)
      drawLakes(canvas)
      drawAirports(canvas)
      drawPorts(canvas)

      layers.lastDraw = zoom

    }

  }

  function sizeSwitch() {

    let checkpoint = layers.checkpoint

    if (checkpoint == 1) {
      return 12
    } else if (checkpoint == 2) {
      return 6
    } else if (checkpoint == 3) {
      return 3
    } else if (checkpoint == 4) {
      return 1.5
    } else if (checkpoint == 5) {
      return 0.75
    } else if (checkpoint == 6) {
      return 0.375
    } else {
      return 0
    }

  }

}
