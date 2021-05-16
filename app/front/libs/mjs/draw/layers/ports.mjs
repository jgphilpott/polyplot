import {newProjection, isProjected} from "../../cartography/projections.mjs"

let plot = data.plot

export function drawPorts(canvas, ports=plot.GeoJSON.properties.layers.ports) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint
  let transform = geoProperties.transform
  let size = [12, 6, 3, 1.5, 0.75, 0.375][checkpoint - 1]

  let mapSettings = data.client.settings.map
  let orientation = mapSettings.orientation
  let projection = newProjection(mapSettings.projection, [orientation.λ, orientation.φ, orientation.γ])

  $(".port").remove()

  canvas.selectAll(".port")
        .data(ports.filter(function(port) {

          return port.properties.flow >= [20000000, 5000000, 1250000, 312500, 78125, 19531.25][checkpoint - 1]

        }))
        .enter()
        .append("svg:image")
        .attr("xlink:href", "/front/imgs/layers/port.png")
        .attr("id", function(port) { return port.properties.code })
        .attr("class", "port")
        .attr("transform", transform ? transform : "translate(0, 0)")
        .attr("x", function(port) {

          return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[0] - (size / 2)

        })
        .attr("y", function(port) {

          return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[1] - size

        })
        .style("width", size)
        .style("height", size)
        .style("visibility", function(port) { return isProjected(port, projection) })

}
