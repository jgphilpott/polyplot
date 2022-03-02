import {isProjected} from "./projections.mjs"

export function translateLayers(projection) {

  let canvas = d3.select("#canvas")

  let airportSize = $(".airport").width()
  let portSize = $(".port").width()

  canvas.selectAll("path").attr("d", d3.geoPath().projection(projection))

  canvas.selectAll(".airport").attr("x", function(airport) { return projection([airport.geometry.coordinates[0], airport.geometry.coordinates[1]])[0] - (airportSize / 2) })
                              .attr("y", function(airport) { return projection([airport.geometry.coordinates[0], airport.geometry.coordinates[1]])[1] - airportSize })
                              .style("visibility", function(airport) { return isProjected(airport, projection) })

  canvas.selectAll(".city-point").attr("cx", function(cityPoint) { return projection([cityPoint.geometry.coordinates[0], cityPoint.geometry.coordinates[1]])[0] })
                                 .attr("cy", function(cityPoint) { return projection([cityPoint.geometry.coordinates[0], cityPoint.geometry.coordinates[1]])[1] })
                                 .style("visibility", function(cityPoint) { return isProjected(cityPoint, projection) })

  canvas.selectAll(".city-label").attr("x", function(cityLabel) { return projection([cityLabel.geometry.coordinates[0], cityLabel.geometry.coordinates[1]])[0] })
                                 .attr("y", function(cityLabel) { return projection([cityLabel.geometry.coordinates[0], cityLabel.geometry.coordinates[1]])[1] })
                                 .style("visibility", function(cityLabel) { return isProjected(cityLabel, projection) })

  canvas.selectAll(".port").attr("x", function(port) { return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[0] - (portSize / 2) })
                           .attr("y", function(port) { return projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[1] - portSize })
                           .style("visibility", function(port) { return isProjected(port, projection) })

}