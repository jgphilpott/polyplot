import {updateSettings} from "../panels/menu.mjs"

let plot = data.plot

export function startRotation() {

  let canvas = d3.select("#mini-map")

  let mapProperties = plot.GeoJSON.properties
  let mapSettings = data.client.settings.map
  let orientation = mapSettings.orientation

  function rotate() {

    orientation.λ += 1

    let rotation = d3.geoPath().projection(mapProperties.projection.rotate([orientation.λ, 0, 0]))

    canvas.selectAll(".graticule").attr("d", function(graticule) { return rotation(graticule) })
    canvas.selectAll(".map").attr("d", function(map) { return rotation(map) })

  }

  function updateOrientation() { updateSettings("map", "orientation", orientation) }

  mapProperties.rotation = setInterval(rotate, 100)
  mapProperties.update = setInterval(updateOrientation, 1000)

}

export function stopRotation() {

  clearInterval(plot.GeoJSON.properties.rotation)
  clearInterval(plot.GeoJSON.properties.update)

}