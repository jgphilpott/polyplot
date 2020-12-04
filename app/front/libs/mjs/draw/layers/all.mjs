import {drawAirports} from "./airports.mjs"
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

    layers.airports = {}

    socket.emit("get_airports")

    socket.on("new_airports", function(airports) {

      layers.airports = airports
      drawAirports(canvas)

    })

  }

  if (!("ports" in layers)) {

    layers.ports = {}

    socket.emit("get_ports")

    socket.on("new_ports", function(ports) {

      layers.ports = ports
      drawPorts(canvas)

    })

  }

  if (!("rivers" in layers)) {

    layers.rivers = {}

    socket.emit("get_rivers")

    socket.on("new_rivers", function(rivers) {

      layers.rivers = rivers
      drawRivers(canvas)

    })

  }

  for (let i = 1; i < layers.checkpoints.length; i++) {

    if ((zoom >= layers.checkpoints[i - 1] && zoom <= layers.checkpoints[i]) && !(layers.lastDraw >= layers.checkpoints[i - 1] && layers.lastDraw <= layers.checkpoints[i])) {

      layers.checkpoint = i

      drawRivers(canvas)
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
